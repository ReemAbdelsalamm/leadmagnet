"use client";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";

function formatDate(value) {
  if (!value) return "-";
  return new Date(value).toLocaleDateString();
}

function statusColor(status) {
  if (status === "active" || status === "trialing") return "#2f625d";
  if (status === "canceled" || status === "past_due") return "#f87171";
  return "#fbbf24";
}

async function readJson(res, fallbackMessage) {
  const contentType = res.headers.get("content-type") || "";

  if (!contentType.includes("application/json")) {
    throw new Error(fallbackMessage);
  }

  return res.json();
}

export default function AdminPage() {
  const [user, setUser] = useState(null);
  const [plans, setPlans] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [activeTab, setActiveTab] = useState("plans");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [warning, setWarning] = useState("");
  const [success, setSuccess] = useState("");
  const [search, setSearch] = useState("");

  const loadAdminData = useCallback(async () => {
    setLoading(true);
    setError("");
    setWarning("");
    try {
      const [plansRes, subscribersRes] = await Promise.all([
        fetch("/api/admin/plans"),
        fetch("/api/admin/subscribers"),
      ]);

      if (plansRes.status === 401 || plansRes.status === 403 || subscribersRes.status === 401 || subscribersRes.status === 403) {
        window.location.href = "/admin/login";
        return;
      }

      const plansData = await readJson(plansRes, "Could not load packages. The admin API returned an app page instead of data.");
      const subscribersData = await readJson(subscribersRes, "Could not load subscribers. The admin API returned an app page instead of data.");

      if (!plansRes.ok) throw new Error(plansData.error || "Could not load plans");
      if (!subscribersRes.ok) throw new Error(subscribersData.error || "Could not load subscribers");

      setPlans(plansData.plans || []);
      setSubscribers(subscribersData.subscribers || []);
      setWarning(plansData.warning || subscribersData.warning || "");
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    document.title = "Admin - LeadMagnet";
    fetch("/api/admin/session")
      .then(async res => {
        const data = await res.json();
        if (!res.ok || !data.authenticated) {
          window.location.href = "/admin/login";
          return;
        }
        setUser(data.admin);
        loadAdminData();
      })
      .catch(() => {
        window.location.href = "/admin/login";
      });
  }, [loadAdminData]);

  const logout = async () => {
    await fetch("/api/admin/session", { method: "DELETE" });
    window.location.href = "/admin/login";
  };

  const handleAdminResponse = (res, data, fallbackMessage) => {
    if (res.status === 401 || res.status === 403) {
      window.location.href = "/admin/login";
      return true;
    }

    if (!res.ok) {
      throw new Error(data.error || fallbackMessage);
    }

    return false;
  };

  const updatePlan = (index, field, value) => {
    setPlans(prev => prev.map((plan, i) => i === index ? { ...plan, [field]: value } : plan));
  };

  const updateFeatures = (index, value) => {
    setPlans(prev => prev.map((plan, i) => i === index ? { ...plan, features: value.split("\n") } : plan));
  };

  const savePlans = async () => {
    setSaving(true);
    setError("");
    setSuccess("");
    try {
      const res = await fetch("/api/admin/plans", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plans }),
      });
      const data = await readJson(res, "Could not save packages. The admin API returned an app page instead of data.");
      if (handleAdminResponse(res, data, "Could not save plans")) {
        setSaving(false);
        return;
      }
      setPlans(data.plans || plans);
      setSuccess("Packages updated successfully.");
    } catch (err) {
      setError(err.message);
    }
    setSaving(false);
    setTimeout(() => setSuccess(""), 3500);
  };

  const filteredSubscribers = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return subscribers;
    return subscribers.filter(sub => {
      return [
        sub.email,
        sub.agency_name,
        sub.plan,
        sub.status,
        sub.stripe_customer_id,
        sub.stripe_subscription_id,
      ].some(value => String(value || "").toLowerCase().includes(q));
    });
  }, [subscribers, search]);

  const stats = useMemo(() => {
    const active = subscribers.filter(sub => sub.status === "active" || sub.status === "trialing").length;
    const byPlan = subscribers.reduce((acc, sub) => {
      acc[sub.plan || "free"] = (acc[sub.plan || "free"] || 0) + 1;
      return acc;
    }, {});

    return { active, total: subscribers.length, byPlan };
  }, [subscribers]);

  return (
    <main style={{ minHeight: "100vh", background: "#f8fbfa", fontFamily: "'Inter', sans-serif", color: "#173838" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        .nav{height:68px;padding:0 1.75rem;background:rgba(255,255,255,0.88);backdrop-filter:blur(18px);border-bottom:1px solid rgba(23,56,56,0.08);display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:20;box-shadow:0 10px 30px rgba(23,56,56,0.04);}
        .logo{display:flex;align-items:center;gap:0.62rem;text-decoration:none;}
        .brand-mark{width:30px;height:30px;border-radius:50%;background:conic-gradient(from -12deg,#ff7f67 0 44%,transparent 44% 51%,#8fc8c1 51% 86%,transparent 86% 100%);position:relative;flex:0 0 auto;}
        .brand-mark:after{content:"";position:absolute;inset:8px;border-radius:50%;background:#ffffff;}
        .brand-name{font-family:'Plus Jakarta Sans',sans-serif;font-size:1.06rem;font-weight:900;letter-spacing:-0.035em;color:#173838;line-height:1;}
        .brand-name .lead{color:#ff7f67;}
        .brand-name .magnet{color:#8fc8c1;}
        .nav-right{display:flex;align-items:center;gap:0.75rem;}
        .user{font-size:0.78rem;color:#2f625d;}
        .back{background:transparent;border:1px solid rgba(23,56,56,0.09);color:#2f625d;padding:0.42rem 0.85rem;border-radius:8px;text-decoration:none;font-size:0.8rem;}
        .back:hover{border-color:rgba(255,127,103,0.25);color:#ff7f67;}
        .wrap{max-width:1160px;margin:0 auto;padding:2rem 1.5rem 3rem;}
        .head{display:flex;align-items:flex-end;justify-content:space-between;gap:1rem;margin-bottom:1.5rem;flex-wrap:wrap;}
        .eyebrow{font-size:0.68rem;font-weight:700;color:#ff7f67;text-transform:uppercase;letter-spacing:0.12em;margin-bottom:0.5rem;}
        h1{font-family:'Plus Jakarta Sans',sans-serif;font-size:1.75rem;font-weight:800;color:#173838;letter-spacing:-0.035em;}
        .sub{font-size:0.84rem;color:#5f7774;margin-top:0.3rem;line-height:1.6;}
        .tabs{display:flex;gap:0.35rem;background:#edf7f5;padding:0.25rem;border-radius:10px;width:fit-content;border:1px solid rgba(23,56,56,0.07);}
        .tab{background:transparent;border:none;color:#5f7774;font-size:0.82rem;padding:0.52rem 1.1rem;border-radius:8px;cursor:pointer;font-weight:700;font-family:'Plus Jakarta Sans',sans-serif;}
        .tab.active{background:rgba(255,127,103,0.1);color:#ff7f67;}
        .alert{font-size:0.84rem;padding:0.8rem 1rem;border-radius:11px;margin-bottom:1rem;line-height:1.5;}
        .error{background:rgba(239,68,68,0.07);border:1px solid rgba(239,68,68,0.18);color:#f87171;}
        .warning{background:rgba(251,191,36,0.07);border:1px solid rgba(251,191,36,0.18);color:#fbbf24;}
        .success{background:rgba(255,127,103,0.07);border:1px solid rgba(255,127,103,0.18);color:#ff7f67;}
        .stats{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:0.75rem;margin-bottom:1.5rem;}
        .stat{background:linear-gradient(145deg,#ffffff,#f2f8f7);border:1px solid rgba(23,56,56,0.07);border-radius:14px;padding:1.1rem;}
        .stat-val{font-family:'Plus Jakarta Sans',sans-serif;font-size:1.55rem;font-weight:800;color:#ff7f67;}
        .stat-label{font-size:0.68rem;color:#5f7774;text-transform:uppercase;letter-spacing:0.08em;margin-top:0.25rem;font-weight:700;}
        .plans{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:0.9rem;}
        .card{background:linear-gradient(145deg,#ffffff,#f2f8f7);border:1px solid rgba(23,56,56,0.08);border-radius:12px;padding:1.25rem;box-shadow:0 16px 34px rgba(23,56,56,0.05);}
        .card-title{font-family:'Plus Jakarta Sans',sans-serif;color:#173838;font-size:1rem;font-weight:800;margin-bottom:1rem;display:flex;align-items:center;justify-content:space-between;gap:0.75rem;}
        .pill{font-size:0.65rem;color:#ff7f67;background:rgba(255,127,103,0.08);border:1px solid rgba(255,127,103,0.16);border-radius:999px;padding:0.16rem 0.5rem;text-transform:uppercase;font-weight:800;}
        label{display:block;font-size:0.68rem;color:#2f625d;text-transform:uppercase;letter-spacing:0.06em;font-weight:700;margin-bottom:0.35rem;}
        input, textarea, select{width:100%;background:#f8fbfa;border:1px solid rgba(23,56,56,0.10);border-radius:9px;color:#173838;padding:0.65rem 0.78rem;font-size:0.84rem;outline:none;font-family:'Inter',sans-serif;margin-bottom:0.85rem;}
        textarea{resize:vertical;min-height:120px;line-height:1.45;}
        input:focus, textarea:focus, select:focus{border-color:rgba(255,127,103,0.32);}
        .row{display:grid;grid-template-columns:1fr 1fr;gap:0.7rem;}
        .checks{display:flex;gap:0.6rem;align-items:center;flex-wrap:wrap;margin-bottom:0.85rem;}
        .check{display:flex;align-items:center;gap:0.35rem;color:#6b7f70;font-size:0.78rem;}
        .check input{width:auto;margin:0;accent-color:#ff7f67;}
        .actions{display:flex;justify-content:flex-end;margin-top:1rem;}
        .btn{background:#ff7f67;color:#173838;border:none;border-radius:9px;padding:0.65rem 1.2rem;font-family:'Plus Jakarta Sans',sans-serif;font-weight:800;font-size:0.84rem;cursor:pointer;box-shadow:0 10px 22px rgba(255,127,103,0.22);}
        .btn:disabled{opacity:0.45;cursor:not-allowed;}
        .toolbar{display:flex;justify-content:space-between;gap:0.75rem;align-items:center;margin-bottom:1rem;flex-wrap:wrap;}
        .search{max-width:360px;margin:0;}
        .table-wrap{background:linear-gradient(145deg,#ffffff,#f2f8f7);border:1px solid rgba(23,56,56,0.07);border-radius:14px;overflow:auto;}
        table{width:100%;border-collapse:collapse;min-width:980px;}
        th{font-size:0.64rem;color:#819693;text-transform:uppercase;letter-spacing:0.1em;padding:0.75rem 0.85rem;text-align:left;border-bottom:1px solid rgba(23,56,56,0.07);background:rgba(143,200,193,0.12);}
        td{font-size:0.8rem;color:#5f7774;padding:0.8rem 0.85rem;border-bottom:1px solid rgba(23,56,56,0.06);}
        tr:last-child td{border-bottom:none;}
        .email{font-weight:700;color:#173838;}
        .muted{color:#819693;font-size:0.72rem;margin-top:0.15rem;}
        .status{font-size:0.68rem;font-weight:800;padding:0.18rem 0.55rem;border-radius:999px;text-transform:capitalize;}
        .empty{background:linear-gradient(145deg,#ffffff,#f2f8f7);border:1px solid rgba(23,56,56,0.07);border-radius:14px;padding:3rem 1.5rem;text-align:center;color:#5f7774;}
        @media(max-width:700px){.row{grid-template-columns:1fr;}.nav{padding:0 1rem;}.brand-name{font-size:0.98rem;}.brand-mark{width:27px;height:27px;}.user{display:none;}.wrap{padding:1.5rem 1rem 2rem;}}
      `}</style>

      <nav className="nav">
        <Link href="/" className="logo" aria-label="LeadMagnet Inc home">
          <span className="brand-mark" aria-hidden="true" />
          <span className="brand-name"><span className="lead">lead</span><span className="magnet">magnet</span> inc</span>
        </Link>
        <div className="nav-right">
          <span className="user">{user?.username}</span>
          <button className="back" type="button" onClick={logout}>Log out</button>
          <Link className="back" href="/dashboard">Dashboard</Link>
        </div>
      </nav>

      <div className="wrap">
        <div className="head">
          <div>
            <div className="eyebrow">Control Panel</div>
            <h1>Packages and subscribed clients</h1>
            <p className="sub">Edit public packages, update Stripe price IDs, and review subscribed customer records.</p>
          </div>
          <div className="tabs">
            <button className={`tab ${activeTab === "plans" ? "active" : ""}`} onClick={() => setActiveTab("plans")}>Packages</button>
            <button className={`tab ${activeTab === "subscribers" ? "active" : ""}`} onClick={() => setActiveTab("subscribers")}>Subscribers</button>
          </div>
        </div>

        {error && <div className="alert error">{error}</div>}
        {warning && <div className="alert warning">{warning}</div>}
        {success && <div className="alert success">{success}</div>}

        {loading ? (
          <div className="empty">Loading admin data...</div>
        ) : activeTab === "plans" ? (
          <>
            <div className="plans">
              {plans.map((plan, index) => (
                <div className="card" key={plan.plan_key}>
                  <div className="card-title">
                    <span>{plan.name || plan.plan_key}</span>
                    <span className="pill">{plan.plan_key}</span>
                  </div>
                  <label>Package name</label>
                  <input value={plan.name || ""} onChange={e => updatePlan(index, "name", e.target.value)} />
                  <div className="row">
                    <div>
                      <label>Price</label>
                      <input type="number" min="0" value={plan.price || 0} onChange={e => updatePlan(index, "price", e.target.value)} />
                    </div>
                    <div>
                      <label>Currency</label>
                      <input value={plan.currency || "EUR"} onChange={e => updatePlan(index, "currency", e.target.value)} />
                    </div>
                  </div>
                  <label>Billing period</label>
                  <input value={plan.period || "/ month"} onChange={e => updatePlan(index, "period", e.target.value)} />
                  <label>Description</label>
                  <input value={plan.description || ""} onChange={e => updatePlan(index, "description", e.target.value)} />
                  <label>Features, one per line</label>
                  <textarea value={(plan.features || []).join("\n")} onChange={e => updateFeatures(index, e.target.value)} />
                  <label>Stripe price ID</label>
                  <input placeholder="price_..." value={plan.stripe_price_id || ""} onChange={e => updatePlan(index, "stripe_price_id", e.target.value)} />
                  <div className="row">
                    <div>
                      <label>Sort order</label>
                      <input type="number" value={plan.sort_order || 0} onChange={e => updatePlan(index, "sort_order", e.target.value)} />
                    </div>
                    <div className="checks" style={{ alignSelf: "end" }}>
                      <label className="check"><input type="checkbox" checked={!!plan.popular} onChange={e => updatePlan(index, "popular", e.target.checked)} /> Popular</label>
                      <label className="check"><input type="checkbox" checked={plan.active !== false} onChange={e => updatePlan(index, "active", e.target.checked)} /> Active</label>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="actions">
              <button className="btn" onClick={savePlans} disabled={saving}>{saving ? "Saving..." : "Save packages"}</button>
            </div>
          </>
        ) : (
          <>
            <div className="stats">
              <div className="stat"><div className="stat-val">{stats.total}</div><div className="stat-label">Subscription rows</div></div>
              <div className="stat"><div className="stat-val">{stats.active}</div><div className="stat-label">Active or trialing</div></div>
              <div className="stat"><div className="stat-val">{stats.byPlan.agency || 0}</div><div className="stat-label">Agency clients</div></div>
              <div className="stat"><div className="stat-val">{stats.byPlan.scale || 0}</div><div className="stat-label">Scale clients</div></div>
            </div>
            <div className="toolbar">
              <input className="search" placeholder="Search subscribers..." value={search} onChange={e => setSearch(e.target.value)} />
              <button className="btn" onClick={loadAdminData}>Refresh</button>
            </div>
            {filteredSubscribers.length === 0 ? (
              <div className="empty">No subscribers found.</div>
            ) : (
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>Client</th>
                      <th>Plan</th>
                      <th>Status</th>
                      <th>Period End</th>
                      <th>Stripe</th>
                      <th>Profile</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSubscribers.map(sub => (
                      <tr key={sub.user_id}>
                        <td>
                          <div className="email">{sub.email || "No email"}</div>
                          <div className="muted">{sub.user_id}</div>
                        </td>
                        <td style={{ textTransform: "capitalize", color: "#173838", fontWeight: 700 }}>{sub.plan}</td>
                        <td><span className="status" style={{ color: statusColor(sub.status), background: `${statusColor(sub.status)}14`, border: `1px solid ${statusColor(sub.status)}30` }}>{sub.status}</span></td>
                        <td>{formatDate(sub.current_period_end)}</td>
                        <td>
                          <div>{sub.stripe_customer_id || "-"}</div>
                          <div className="muted">{sub.stripe_subscription_id || ""}</div>
                        </td>
                        <td>
                          <div>{sub.agency_name || "-"}</div>
                          <div className="muted">{sub.client_count ? `${sub.client_count} clients` : "No onboarding data"}{sub.onboarded ? " · onboarded" : ""}</div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
