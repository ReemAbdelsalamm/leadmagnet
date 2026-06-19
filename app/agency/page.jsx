"use client";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const TIERS = ["VIP", "Standard", "Trial", "Inactive"];

const TIER_COLORS = {
  VIP: { bg: "rgba(245,158,11,0.10)", border: "rgba(245,158,11,0.24)", color: "#b45309" },
  Standard: { bg: "rgba(143,200,193,0.18)", border: "rgba(143,200,193,0.34)", color: "#2f625d" },
  Trial: { bg: "rgba(59,130,246,0.08)", border: "rgba(59,130,246,0.22)", color: "#2563eb" },
  Inactive: { bg: "rgba(23,56,56,0.04)", border: "rgba(23,56,56,0.10)", color: "#819693" },
};

const PLATFORMS = ["LinkedIn", "Instagram", "Gmail"];

const REPORT_FREQUENCIES = [
  { value: "weekly", label: "Weekly" },
  { value: "monthly", label: "Monthly" },
  { value: "quarterly", label: "Quarterly" },
];

function Icon({ name, size = 18 }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };

  const icons = {
    dashboard: (
      <svg {...common}>
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
      </svg>
    ),
    leads: (
      <svg {...common}>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    analytics: (
      <svg {...common}>
        <path d="M3 3v18h18" />
        <path d="M7 14l3-3 3 2 5-6" />
      </svg>
    ),
    linkedin: (
      <svg {...common}>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
    instagram: (
      <svg {...common}>
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" />
      </svg>
    ),
    gmail: (
      <svg {...common}>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3 7l9 6 9-6" />
      </svg>
    ),
    client: (
      <svg {...common}>
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="M7 8h10" />
        <path d="M7 12h6" />
        <path d="M7 16h8" />
      </svg>
    ),
    radar: (
      <svg {...common}>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 12l6-3" />
        <path d="M12 3v3" />
        <path d="M21 12h-3" />
        <path d="M12 21v-3" />
        <path d="M3 12h3" />
      </svg>
    ),
    settings: (
      <svg {...common}>
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06A1.7 1.7 0 0 0 15 19.4a1.7 1.7 0 0 0-1 .6 1.7 1.7 0 0 0-.4 1.1V21a2 2 0 1 1-4 0v-.09A1.7 1.7 0 0 0 8.6 19.4a1.7 1.7 0 0 0-1.88.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-.6-1 1.7 1.7 0 0 0-1.1-.4H3a2 2 0 1 1 0-4h.09A1.7 1.7 0 0 0 4.6 8.6a1.7 1.7 0 0 0-.34-1.88l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-.6 1.7 1.7 0 0 0 .4-1.1V3a2 2 0 1 1 4 0v.09A1.7 1.7 0 0 0 15.4 4.6a1.7 1.7 0 0 0 1.88-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.7 1.7 0 0 0 19.4 9c.2.4.5.8.9 1 .3.2.7.3 1.1.3H21a2 2 0 1 1 0 4h-.09a1.7 1.7 0 0 0-1.51.7z" />
      </svg>
    ),
    billing: (
      <svg {...common}>
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <path d="M2 10h20" />
      </svg>
    ),
    support: (
      <svg {...common}>
        <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
      </svg>
    ),
    plus: (
      <svg {...common}>
        <path d="M12 5v14" />
        <path d="M5 12h14" />
      </svg>
    ),
    users: (
      <svg {...common}>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    revenue: (
      <svg {...common}>
        <path d="M12 1v22" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7H14a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
    hot: (
      <svg {...common}>
        <path d="M13 3s1 3-2 5c-2 1.5-3 3-3 5a5 5 0 0 0 10 0c0-3-2-5-5-10z" />
      </svg>
    ),
    health: (
      <svg {...common}>
        <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
      </svg>
    ),
    report: (
      <svg {...common}>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <path d="M14 2v6h6" />
        <path d="M8 13h8" />
        <path d="M8 17h6" />
      </svg>
    ),
    link: (
      <svg {...common}>
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </svg>
    ),
    edit: (
      <svg {...common}>
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z" />
      </svg>
    ),
    trash: (
      <svg {...common}>
        <path d="M3 6h18" />
        <path d="M8 6V4h8v2" />
        <path d="M19 6l-1 14H6L5 6" />
        <path d="M10 11v5" />
        <path d="M14 11v5" />
      </svg>
    ),
  };

  return icons[name] || null;
}

export default function Agency() {
  const [user, setUser] = useState(null);
  const [subscription, setSubscription] = useState(null);
  const [checkingAccess, setCheckingAccess] = useState(true);
  const [clients, setClients] = useState([]);
  const [activeView, setActiveView] = useState("clients");
  const [expandedClient, setExpandedClient] = useState(null);
  const [showAddClient, setShowAddClient] = useState(false);
  const [showEditClient, setShowEditClient] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [filterTier, setFilterTier] = useState("All");
  const [sortBy, setSortBy] = useState("created_at");
  const [loading, setLoading] = useState(false);
  const [sendingReport, setSendingReport] = useState(null);
  const [onboardingClient, setOnboardingClient] = useState(null);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    tier: "Standard",
    platforms: [],
    mrr: "",
    notes: "",
    health_score: 75,
    auto_report: false,
    report_frequency: "monthly",
  });

  useEffect(() => {
    document.title = "Client Manager — LeadMagnet Inc";

    supabase.auth.getUser().then(async ({ data }) => {
      if (!data.user) {
        window.location.href = "/login";
        return;
      }

      setUser(data.user);

      const { data: sub } = await supabase
        .from("subscriptions")
        .select("plan, status")
        .eq("user_id", data.user.id)
        .maybeSingle();

      setSubscription(sub);
      setCheckingAccess(false);

      if (
        sub &&
        (sub.plan === "agency" || sub.plan === "scale") &&
        (sub.status === "active" || sub.status === "trialing")
      ) {
        loadClients(data.user.id);
      }
    });
  }, []);

  const hasAccess =
    subscription &&
    (subscription.plan === "agency" || subscription.plan === "scale") &&
    (subscription.status === "active" || subscription.status === "trialing");

  const loadClients = async (userId) => {
    const { data: clientsData } = await supabase
      .from("agency_clients")
      .select("*")
      .eq("agency_user_id", userId)
      .order("created_at", { ascending: false });

    if (!clientsData) return;

    const enriched = await Promise.all(
      clientsData.map(async (client) => {
        const { count: campaignsCount } = await supabase
          .from("campaigns")
          .select("*", { count: "exact", head: true })
          .eq("client_id", client.id);

        const { data: clientLeads } = await supabase
          .from("leads")
          .select("lead_score")
          .eq("client_id", client.id);

        const leadsCount = clientLeads?.length || 0;
        const hotLeads = clientLeads?.filter((lead) => lead.lead_score === "hot").length || 0;
        const warmLeads = clientLeads?.filter((lead) => lead.lead_score === "warm").length || 0;
        const coldLeads = clientLeads?.filter((lead) => lead.lead_score === "cold").length || 0;

        return {
          ...client,
          campaigns_count: campaignsCount || 0,
          leads_count: leadsCount,
          hot_leads: hotLeads,
          warm_leads: warmLeads,
          cold_leads: coldLeads,
        };
      })
    );

    setClients(enriched);
  };

  const resetForm = () => {
    setForm({
      name: "",
      email: "",
      company: "",
      phone: "",
      tier: "Standard",
      platforms: [],
      mrr: "",
      notes: "",
      health_score: 75,
      auto_report: false,
      report_frequency: "monthly",
    });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (showEditClient && selectedClient) {
        const { error: dbError } = await supabase
          .from("agency_clients")
          .update({ ...form, mrr: parseFloat(form.mrr) || 0 })
          .eq("id", selectedClient.id);

        if (dbError) throw dbError;
        setSuccess("Client updated.");
      } else {
        const { data: client, error: dbError } = await supabase
          .from("agency_clients")
          .insert({
            agency_user_id: user.id,
            ...form,
            mrr: parseFloat(form.mrr) || 0,
            status: "Active",
            portal_token: crypto.randomUUID(),
          })
          .select()
          .single();

        if (dbError) throw dbError;

        if (client) {
          setClients((prev) => [
            {
              ...client,
              campaigns_count: 0,
              leads_count: 0,
              hot_leads: 0,
              warm_leads: 0,
              cold_leads: 0,
            },
            ...prev,
          ]);
        }

        setSuccess("Client added.");
      }

      setShowAddClient(false);
      setShowEditClient(false);
      resetForm();

      if (user) loadClients(user.id);

      setTimeout(() => setSuccess(""), 4000);
    } catch (err) {
      setError("Error: " + err.message);
    }

    setLoading(false);
  };

  const handleSendReport = async (client, e) => {
    e.stopPropagation();
    setSendingReport(client.id);

    try {
      const res = await fetch("/api/send-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clientId: client.id, userId: user.id }),
      });

      const data = await res.json();

      if (data.success) {
        setSuccess(`Report sent to ${client.email}.`);

        setClients((prev) =>
          prev.map((item) =>
            item.id === client.id ? { ...item, last_report_sent: new Date().toISOString() } : item
          )
        );
      } else {
        setError("Failed: " + (data.error || "Unknown error"));
      }
    } catch (err) {
      setError("Error: " + err.message);
    }

    setSendingReport(null);

    setTimeout(() => {
      setSuccess("");
      setError("");
    }, 5000);
  };

  const handleOnboard = async (client, e) => {
    e.stopPropagation();
    setOnboardingClient(client.id);

    try {
      const res = await fetch("/api/onboard-client", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clientId: client.id, userId: user.id }),
      });

      const data = await res.json();

      if (data.success) {
        setSuccess(`${client.name} onboarded.`);
        if (user) loadClients(user.id);
      } else {
        setError("Onboarding failed: " + (data.error || "Unknown error"));
      }
    } catch (err) {
      setError("Error: " + err.message);
    }

    setOnboardingClient(null);

    setTimeout(() => {
      setSuccess("");
      setError("");
    }, 5000);
  };

  const copyPortalLink = (client, e) => {
    e.stopPropagation();

    if (!client.portal_token) {
      setError("No portal token — edit and re-save this client.");
      setTimeout(() => setError(""), 3000);
      return;
    }

    navigator.clipboard.writeText(`https://leadmagnetinc.com/portal/${client.portal_token}`);
    setSuccess(`Portal link copied for ${client.name}.`);

    setTimeout(() => setSuccess(""), 3000);
  };

  const openEdit = (client, e) => {
    e.stopPropagation();

    setForm({
      name: client.name || "",
      email: client.email || "",
      company: client.company || "",
      phone: client.phone || "",
      tier: client.tier || "Standard",
      platforms: client.platforms || [],
      mrr: client.mrr || "",
      notes: client.notes || "",
      health_score: client.health_score || 75,
      auto_report: client.auto_report || false,
      report_frequency: client.report_frequency || "monthly",
    });

    setSelectedClient(client);
    setShowEditClient(true);
  };

  const deleteClient = async (id, e) => {
    e.stopPropagation();

    if (!confirm("Delete this client? This cannot be undone.")) return;

    await supabase.from("agency_clients").delete().eq("id", id);
    setClients((prev) => prev.filter((client) => client.id !== id));
  };

  const togglePlatform = (platform) => {
    setForm((prev) => ({
      ...prev,
      platforms: prev.platforms.includes(platform)
        ? prev.platforms.filter((item) => item !== platform)
        : [...prev.platforms, platform],
    }));
  };

  const getHealthColor = (score) => {
    if (score >= 75) return "#2f625d";
    if (score >= 40) return "#b45309";
    return "#ef4444";
  };

  const filteredClients = clients
    .filter((client) => filterTier === "All" || client.tier === filterTier)
    .sort((a, b) => {
      if (sortBy === "mrr") return (b.mrr || 0) - (a.mrr || 0);
      if (sortBy === "leads") return (b.leads_count || 0) - (a.leads_count || 0);
      if (sortBy === "health") return (b.health_score || 0) - (a.health_score || 0);
      if (sortBy === "hot") return (b.hot_leads || 0) - (a.hot_leads || 0);

      return new Date(b.created_at) - new Date(a.created_at);
    });

  const totalMRR = clients.reduce((total, client) => total + (client.mrr || 0), 0);
  const totalLeads = clients.reduce((total, client) => total + (client.leads_count || 0), 0);
  const totalHot = clients.reduce((total, client) => total + (client.hot_leads || 0), 0);
  const activeClients = clients.filter((client) => client.tier !== "Inactive").length;

  const mrrByTier = {};
  const clientsByTier = {};

  TIERS.forEach((tier) => {
    mrrByTier[tier] = 0;
    clientsByTier[tier] = 0;
  });

  clients.forEach((client) => {
    const tier = client.tier || "Standard";
    mrrByTier[tier] += client.mrr || 0;
    clientsByTier[tier]++;
  });

  const maxClientMRR = Math.max(...clients.map((client) => client.mrr || 0), 1);
  const avgMRR = clients.length > 0 ? Math.round(totalMRR / clients.length) : 0;
  const annualRevenue = totalMRR * 12;
  const atRiskClients = clients.filter(
    (client) => client.health_score < 40 || (client.leads_count === 0 && client.campaigns_count === 0)
  );
  const atRiskMRR = atRiskClients.reduce((total, client) => total + (client.mrr || 0), 0);

  return (
    <main className="page-shell">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');

        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        .page-shell {
          min-height: 100vh;
          background: #FBF3E3;
          font-family: 'Plus Jakarta Sans', 'Inter', sans-serif;
          color: #173838;
          display: flex;
          flex-direction: column;
        }

        .nav {
          background: rgba(255,255,255,0.9);
          backdrop-filter: blur(18px);
          border-bottom: 1px solid rgba(23,56,56,0.08);
          padding: 0 1.75rem;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: sticky;
          top: 0;
          z-index: 50;
          box-shadow: 0 10px 30px rgba(23,56,56,0.04);
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 0.62rem;
          text-decoration: none;
          flex-shrink: 0;
        }

        .brand-mark {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: conic-gradient(from -12deg,#ff7f67 0 44%,transparent 44% 51%,#8fc8c1 51% 86%,transparent 86% 100%);
          position: relative;
          flex: 0 0 auto;
        }

        .brand-mark:after {
          content: "";
          position: absolute;
          inset: 8px;
          border-radius: 50%;
          background: #ffffff;
        }

        .brand-name {
          font-size: 1.06rem;
          font-weight: 900;
          letter-spacing: -0.035em;
          color: #173838;
          line-height: 1;
        }

        .brand-name .lead {
          color: #ff7f67;
        }

        .brand-name .magnet {
          color: #8fc8c1;
        }

        .nav-right {
          display: flex;
          align-items: center;
          gap: 0.65rem;
        }

        .nav-link {
          color: #5f7774;
          text-decoration: none;
          font-family: 'Inter', sans-serif;
          font-size: 0.82rem;
          font-weight: 700;
          padding: 0.48rem 0.85rem;
          border-radius: 9px;
          border: 1px solid transparent;
          transition: all 0.15s;
          white-space: nowrap;
        }

        .nav-link:hover {
          color: #ff7f67;
          background: rgba(255,127,103,0.08);
          border-color: rgba(255,127,103,0.18);
        }

        .nav-link.active {
          color: #ff7f67;
          background: rgba(255,127,103,0.10);
          border-color: rgba(255,127,103,0.22);
        }

        .user-pill {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: #ffffff;
          border: 1px solid rgba(23,56,56,0.08);
          border-radius: 100px;
          padding: 0.3rem 0.85rem 0.3rem 0.3rem;
          box-shadow: 0 10px 24px rgba(23,56,56,0.04);
        }

        .user-avatar {
          width: 30px;
          height: 30px;
          background: linear-gradient(135deg,#ff7f67,#ec6f5b);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.72rem;
          font-weight: 800;
          color: #ffffff;
        }

        .user-email {
          font-size: 0.78rem;
          color: #5f7774;
          font-weight: 600;
          font-family: 'Inter', sans-serif;
        }

        .logout-btn {
          background: transparent;
          border: 1px solid rgba(23,56,56,0.10);
          color: #5f7774;
          font-size: 0.78rem;
          padding: 0.44rem 0.9rem;
          border-radius: 9px;
          cursor: pointer;
          font-family: 'Inter', sans-serif;
          font-weight: 600;
        }

        .layout {
          display: flex;
          flex: 1;
          min-height: calc(100vh - 64px);
        }

        .sidebar {
          width: 230px;
          background: rgba(255,255,255,0.78);
          border-right: 1px solid rgba(23,56,56,0.08);
          padding: 1.5rem 0.75rem;
          display: flex;
          flex-direction: column;
          gap: 1px;
          position: sticky;
          top: 64px;
          height: calc(100vh - 64px);
          overflow-y: auto;
          backdrop-filter: blur(18px);
          flex-shrink: 0;
        }

        .sidebar-section {
          font-size: 0.62rem;
          font-weight: 800;
          color: #819693;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          padding: 1rem 0.75rem 0.4rem;
        }

        .side-item {
          display: flex;
          align-items: center;
          gap: 0.62rem;
          padding: 0.6rem 0.75rem;
          border-radius: 10px;
          color: #5f7774;
          text-decoration: none;
          font-family: 'Inter', sans-serif;
          font-weight: 600;
          font-size: 0.84rem;
          position: relative;
        }

        .side-item:hover {
          background: rgba(255,127,103,0.07);
          color: #173838;
        }

        .side-item.active {
          background: rgba(255,127,103,0.12);
          color: #ff7f67;
          font-weight: 800;
        }

        .side-item.active::before {
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 3px;
          height: 20px;
          background: #ff7f67;
          border-radius: 0 4px 4px 0;
        }

        .side-icon {
          width: 28px;
          height: 28px;
          border-radius: 8px;
          background: rgba(23,56,56,0.035);
          border: 1px solid rgba(23,56,56,0.08);
          color: #5f7774;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .side-item.active .side-icon {
          background: rgba(255,127,103,0.12);
          border-color: rgba(255,127,103,0.22);
          color: #ff7f67;
        }

        .sidebar-footer {
          margin-top: auto;
          padding-top: 1rem;
          border-top: 1px solid rgba(23,56,56,0.08);
        }

        .plan-pill {
          background: linear-gradient(145deg,#ffffff,#f8fbfa);
          border: 1px solid rgba(255,127,103,0.20);
          border-radius: 13px;
          padding: 0.8rem 0.9rem;
          margin-top: 0.5rem;
        }

        .plan-name {
          font-size: 0.8rem;
          font-weight: 800;
          color: #ff7f67;
        }

        .plan-sub {
          font-size: 0.68rem;
          color: #819693;
          margin-top: 3px;
          font-family: 'Inter', sans-serif;
        }

        .content {
          flex: 1;
          padding: 2.6rem 3rem 3.5rem;
          width: 100%;
        }

        .content-inner {
          width: 100%;
          max-width: 1180px;
        }

        .page-header {
          margin-bottom: 1.45rem;
        }

        .page-kicker {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          color: #ff7f67;
          font-size: 0.72rem;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          margin-bottom: 0.75rem;
        }

        .kicker-icon {
          width: 26px;
          height: 26px;
          border-radius: 8px;
          background: rgba(255,127,103,0.10);
          border: 1px solid rgba(255,127,103,0.22);
          color: #ff7f67;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        .page-title {
          font-size: 1.9rem;
          font-weight: 900;
          color: #173838;
          letter-spacing: -0.045em;
          margin-bottom: 0.4rem;
        }

        .page-sub {
          font-size: 0.9rem;
          color: #5f7774;
          line-height: 1.6;
          font-family: 'Inter', sans-serif;
        }

        .success-bar {
          background: rgba(143,200,193,0.18);
          border: 1px solid rgba(143,200,193,0.38);
          color: #2f625d;
          font-size: 0.84rem;
          padding: 0.8rem 1rem;
          border-radius: 12px;
          margin-bottom: 1.5rem;
          font-family: 'Inter', sans-serif;
          font-weight: 600;
        }

        .error-bar {
          background: rgba(239,68,68,0.07);
          border: 1px solid rgba(239,68,68,0.18);
          color: #ef4444;
          font-size: 0.84rem;
          padding: 0.8rem 1rem;
          border-radius: 12px;
          margin-bottom: 1.5rem;
          font-family: 'Inter', sans-serif;
          font-weight: 600;
        }

        .top-actions {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.75rem;
          flex-wrap: wrap;
          gap: 0.75rem;
        }

        .view-toggle {
          display: flex;
          gap: 0.35rem;
          background: rgba(255,255,255,0.8);
          padding: 0.25rem;
          border-radius: 11px;
          border: 1px solid rgba(23,56,56,0.08);
        }

        .view-btn {
          background: transparent;
          border: none;
          color: #5f7774;
          font-size: 0.82rem;
          padding: 0.52rem 1.15rem;
          border-radius: 9px;
          cursor: pointer;
          font-weight: 800;
        }

        .view-btn.active {
          background: rgba(255,127,103,0.12);
          color: #ff7f67;
        }

        .radar-btn {
          background: rgba(143,200,193,0.18);
          border: 1px solid rgba(143,200,193,0.34);
          color: #2f625d;
          font-weight: 900;
          font-size: 0.82rem;
          padding: 0.58rem 1.1rem;
          border-radius: 10px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.45rem;
        }

        .stats-row,
        .rev-stats {
          display: grid;
          grid-template-columns: repeat(5, minmax(150px, 1fr));
          gap: 0.9rem;
          margin-bottom: 2rem;
        }

        .rev-stats {
          grid-template-columns: repeat(4, minmax(160px, 1fr));
        }

        .stat-card,
        .client-card,
        .empty-state,
        .rev-card,
        .rev-section {
          background: linear-gradient(145deg,#ffffff,#f8fbfa);
          border: 1px solid rgba(23,56,56,0.08);
          box-shadow: 0 16px 34px rgba(23,56,56,0.05);
        }

        .stat-card,
        .rev-card {
          border-radius: 16px;
          padding: 1.2rem 1.25rem;
        }

        .stat-icon {
          width: 38px;
          height: 38px;
          border-radius: 12px;
          background: rgba(255,127,103,0.10);
          border: 1px solid rgba(255,127,103,0.22);
          color: #ff7f67;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 0.85rem;
        }

        .stat-val,
        .rev-val {
          font-size: 1.75rem;
          font-weight: 900;
          color: #ff7f67;
          letter-spacing: -0.04em;
          line-height: 1;
        }

        .stat-lbl,
        .rev-lbl {
          font-size: 0.68rem;
          color: #819693;
          margin-top: 0.35rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          font-family: 'Inter', sans-serif;
          font-weight: 800;
        }

        .rev-sub {
          font-size: 0.72rem;
          color: #819693;
          margin-top: 0.25rem;
          font-family: 'Inter', sans-serif;
        }

        .controls {
          display: flex;
          gap: 0.5rem;
          align-items: center;
          flex-wrap: wrap;
          margin-bottom: 1.5rem;
        }

        .filter-btn {
          background: #ffffff;
          border: 1px solid rgba(23,56,56,0.08);
          color: #819693;
          font-size: 0.78rem;
          padding: 0.42rem 0.88rem;
          border-radius: 100px;
          cursor: pointer;
          font-weight: 800;
        }

        .filter-btn.active {
          background: rgba(255,127,103,0.10);
          border-color: rgba(255,127,103,0.25);
          color: #ff7f67;
        }

        .sort-select {
          background: #ffffff;
          border: 1px solid rgba(23,56,56,0.10);
          color: #5f7774;
          font-size: 0.78rem;
          padding: 0.45rem 0.85rem;
          border-radius: 9px;
          outline: none;
          font-weight: 700;
        }

        .add-btn {
          background: #ff7f67;
          color: #173838;
          font-weight: 900;
          font-size: 0.84rem;
          padding: 0.6rem 1.18rem;
          border-radius: 10px;
          border: none;
          cursor: pointer;
          margin-left: auto;
          box-shadow: 0 10px 22px rgba(255,127,103,0.24);
        }

        .client-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
          gap: 1rem;
        }

        .client-card {
          border-radius: 18px;
          padding: 1.5rem;
          position: relative;
          cursor: pointer;
        }

        .mrr-badge {
          position: absolute;
          top: 1.25rem;
          right: 1.25rem;
          font-size: 0.84rem;
          font-weight: 900;
          color: #ff7f67;
        }

        .card-top {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1rem;
          padding-right: 3rem;
        }

        .client-avatar,
        .rev-client-avatar,
        .risk-avatar {
          background: rgba(255,127,103,0.10);
          border: 1px solid rgba(255,127,103,0.20);
          color: #ff7f67;
          font-weight: 900;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .client-avatar {
          width: 42px;
          height: 42px;
          border-radius: 12px;
          font-size: 0.98rem;
        }

        .client-name {
          font-size: 0.98rem;
          font-weight: 900;
          color: #173838;
        }

        .client-company,
        .client-email-row,
        .health-lbl,
        .score-lbl,
        .last-report,
        .rev-client-tier,
        .tier-clients,
        .risk-reason {
          color: #819693;
          font-family: 'Inter', sans-serif;
        }

        .client-company {
          font-size: 0.76rem;
        }

        .tier-badge {
          font-size: 0.66rem;
          font-weight: 900;
          padding: 0.18rem 0.56rem;
          border-radius: 100px;
          flex-shrink: 0;
        }

        .client-email-row {
          font-size: 0.74rem;
          margin-bottom: 1rem;
        }

        .health-wrap {
          margin-bottom: 1rem;
        }

        .health-top {
          display: flex;
          justify-content: space-between;
          font-size: 0.72rem;
          margin-bottom: 0.35rem;
          font-family: 'Inter', sans-serif;
        }

        .health-bar,
        .rev-client-bar-wrap,
        .tier-bar-wrap {
          background: rgba(23,56,56,0.06);
          border-radius: 100px;
          overflow: hidden;
        }

        .health-bar {
          height: 5px;
        }

        .health-fill {
          height: 100%;
          border-radius: 100px;
        }

        .score-row {
          display: grid;
          grid-template-columns: repeat(4,1fr);
          gap: 0.55rem;
          margin-bottom: 1rem;
        }

        .score-box {
          background: #ffffff;
          border: 1px solid rgba(23,56,56,0.08);
          border-radius: 10px;
          padding: 0.58rem 0.4rem;
          text-align: center;
        }

        .score-val {
          font-size: 1.02rem;
          font-weight: 900;
          line-height: 1;
          color: #173838;
        }

        .score-lbl {
          font-size: 0.58rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-top: 0.24rem;
          font-weight: 800;
        }

        .platforms-row,
        .auto-row {
          display: flex;
          gap: 0.35rem;
          flex-wrap: wrap;
        }

        .platforms-row {
          margin-bottom: 0.75rem;
        }

        .auto-row {
          margin-bottom: 0.5rem;
        }

        .platform-tag,
        .auto-tag {
          font-family: 'Inter', sans-serif;
          font-weight: 800;
          border-radius: 7px;
        }

        .platform-tag {
          font-size: 0.66rem;
          padding: 0.16rem 0.46rem;
          background: rgba(143,200,193,0.16);
          border: 1px solid rgba(143,200,193,0.30);
          color: #2f625d;
        }

        .auto-tag {
          font-size: 0.65rem;
          padding: 0.16rem 0.5rem;
          background: rgba(255,127,103,0.08);
          border: 1px solid rgba(255,127,103,0.18);
          color: #ff7f67;
        }

        .last-report {
          font-size: 0.66rem;
          margin-bottom: 0.5rem;
        }

        .card-actions {
          display: flex;
          gap: 0.38rem;
          margin-top: 0.9rem;
          padding-top: 0.9rem;
          border-top: 1px solid rgba(23,56,56,0.08);
        }

        .act-btn {
          flex: 1;
          font-size: 0.7rem;
          padding: 0.45rem;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 800;
          border: 1px solid rgba(23,56,56,0.10);
          background: #ffffff;
          color: #5f7774;
          display: inline-flex;
          justify-content: center;
          align-items: center;
          gap: 0.25rem;
        }

        .act-del {
          color: #ef4444;
          border-color: rgba(239,68,68,0.18);
          flex: 0.45;
        }

        .expanded-section {
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid rgba(23,56,56,0.08);
        }

        .expanded-title {
          font-size: 0.84rem;
          font-weight: 900;
          color: #173838;
          margin-bottom: 0.75rem;
        }

        .notes-box {
          background: #ffffff;
          border: 1px solid rgba(23,56,56,0.08);
          border-radius: 10px;
          padding: 0.72rem 0.8rem;
          font-size: 0.8rem;
          color: #5f7774;
          line-height: 1.55;
          font-family: 'Inter', sans-serif;
        }

        .empty-state {
          border-radius: 18px;
          padding: 3.5rem 2rem;
          text-align: center;
        }

        .empty-icon {
          width: 56px;
          height: 56px;
          border-radius: 16px;
          background: rgba(255,127,103,0.10);
          border: 1px solid rgba(255,127,103,0.22);
          color: #ff7f67;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1rem;
        }

        .empty-title {
          font-size: 1.08rem;
          font-weight: 900;
          color: #173838;
          margin-bottom: 0.45rem;
        }

        .empty-sub {
          font-size: 0.86rem;
          color: #5f7774;
          margin-bottom: 1.75rem;
          line-height: 1.6;
          font-family: 'Inter', sans-serif;
        }

        .rev-section {
          border-radius: 16px;
          padding: 1.5rem;
          margin-bottom: 1rem;
        }

        .rev-section-title {
          font-size: 0.98rem;
          font-weight: 900;
          color: #173838;
          margin-bottom: 1.25rem;
        }

        .rev-client-row,
        .tier-row,
        .risk-card {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 0;
          border-bottom: 1px solid rgba(23,56,56,0.08);
        }

        .rev-client-avatar,
        .risk-avatar {
          width: 34px;
          height: 34px;
          border-radius: 10px;
          font-size: 0.82rem;
        }

        .rev-client-info {
          flex: 1;
          min-width: 0;
        }

        .rev-client-name,
        .risk-name,
        .tier-name {
          font-size: 0.86rem;
          font-weight: 900;
          color: #173838;
        }

        .rev-client-bar-wrap,
        .tier-bar-wrap {
          flex: 2;
          height: 7px;
        }

        .rev-client-bar {
          height: 100%;
          border-radius: 100px;
          background: linear-gradient(90deg,#ff7f67,#8fc8c1);
        }

        .rev-client-mrr,
        .tier-mrr,
        .risk-mrr {
          font-size: 0.86rem;
          font-weight: 900;
          color: #173838;
          min-width: 74px;
          text-align: right;
        }

        .tier-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }

        .tier-name {
          width: 92px;
        }

        .tier-clients {
          width: 90px;
          font-size: 0.75rem;
        }

        .tier-bar {
          height: 100%;
          border-radius: 100px;
        }

        .risk-card {
          background: rgba(239,68,68,0.05);
          border: 1px solid rgba(239,68,68,0.12);
          border-radius: 14px;
          padding: 0.9rem 1rem;
          margin-bottom: 0.6rem;
          justify-content: space-between;
        }

        .risk-info {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .access-state {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: calc(100vh - 64px);
          padding: 2rem;
        }

        .access-card {
          background: linear-gradient(145deg,#ffffff,#f8fbfa);
          border: 1px solid rgba(23,56,56,0.08);
          box-shadow: 0 18px 40px rgba(23,56,56,0.06);
          border-radius: 24px;
          padding: 2.25rem;
          text-align: center;
          max-width: 500px;
        }

        .access-icon {
          width: 56px;
          height: 56px;
          border-radius: 16px;
          background: rgba(255,127,103,0.10);
          border: 1px solid rgba(255,127,103,0.22);
          color: #ff7f67;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1rem;
        }

        .access-title {
          font-size: 1.5rem;
          font-weight: 900;
          color: #173838;
          margin-bottom: 0.55rem;
        }

        .access-sub {
          font-size: 0.9rem;
          color: #5f7774;
          line-height: 1.65;
          margin-bottom: 2rem;
          font-family: 'Inter', sans-serif;
        }

        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(23,56,56,0.28);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 100;
          padding: 1rem;
          backdrop-filter: blur(8px);
        }

        .modal {
          background: #ffffff;
          border: 1px solid rgba(23,56,56,0.10);
          border-radius: 22px;
          padding: 2rem;
          width: 100%;
          max-width: 560px;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 28px 70px rgba(23,56,56,0.18);
        }

        .modal-title {
          font-size: 1.3rem;
          font-weight: 900;
          color: #173838;
          margin-bottom: 0.28rem;
        }

        .modal-sub {
          font-size: 0.84rem;
          color: #5f7774;
          margin-bottom: 1.75rem;
          line-height: 1.6;
          font-family: 'Inter', sans-serif;
        }

        .form-label {
          display: block;
          font-size: 0.74rem;
          font-weight: 900;
          color: #2f625d;
          margin-bottom: 0.4rem;
          text-transform: uppercase;
          font-family: 'Inter', sans-serif;
          letter-spacing: 0.04em;
        }

        .form-input,
        .form-select,
        .form-textarea {
          width: 100%;
          background: #ffffff;
          border: 1px solid rgba(23,56,56,0.10);
          border-radius: 11px;
          color: #173838;
          font-size: 0.875rem;
          outline: none;
          font-family: 'Inter', sans-serif;
          padding: 0.75rem 1rem;
          margin-bottom: 1rem;
        }

        .form-textarea {
          resize: vertical;
          min-height: 90px;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.75rem;
        }

        .divider {
          border: none;
          border-top: 1px solid rgba(23,56,56,0.08);
          margin: 1rem 0;
        }

        .platforms-select,
        .freq-grid {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 1rem;
          flex-wrap: wrap;
        }

        .platform-toggle,
        .freq-btn {
          background: #ffffff;
          border: 1px solid rgba(23,56,56,0.10);
          color: #5f7774;
          font-size: 0.8rem;
          padding: 0.52rem 0.9rem;
          border-radius: 10px;
          cursor: pointer;
          font-family: 'Inter', sans-serif;
          font-weight: 800;
        }

        .platform-toggle.selected,
        .freq-btn.selected {
          background: rgba(255,127,103,0.10);
          border-color: rgba(255,127,103,0.28);
          color: #ff7f67;
          font-weight: 900;
        }

        .health-input {
          width: 100%;
          accent-color: #ff7f67;
          margin-bottom: 1rem;
        }

        .toggle-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #f8fbfa;
          border: 1px solid rgba(23,56,56,0.08);
          border-radius: 12px;
          padding: 0.8rem 1rem;
          margin-bottom: 1rem;
        }

        .toggle-label {
          font-size: 0.84rem;
          color: #173838;
          font-family: 'Inter', sans-serif;
          font-weight: 800;
        }

        .toggle-sub {
          font-size: 0.72rem;
          color: #819693;
          margin-top: 2px;
          font-family: 'Inter', sans-serif;
        }

        .toggle-switch {
          width: 42px;
          height: 24px;
          background: rgba(23,56,56,0.12);
          border-radius: 100px;
          position: relative;
          cursor: pointer;
          border: none;
        }

        .toggle-switch.on {
          background: #ff7f67;
        }

        .toggle-knob {
          width: 18px;
          height: 18px;
          background: #ffffff;
          border-radius: 50%;
          position: absolute;
          top: 3px;
          left: 3px;
        }

        .toggle-switch.on .toggle-knob {
          left: 21px;
        }

        .modal-btns {
          display: flex;
          gap: 0.75rem;
          margin-top: 0.5rem;
        }

        .modal-cancel {
          flex: 1;
          background: #ffffff;
          border: 1px solid rgba(23,56,56,0.10);
          color: #5f7774;
          font-weight: 800;
          font-size: 0.875rem;
          padding: 0.75rem;
          border-radius: 10px;
          cursor: pointer;
        }

        .modal-submit {
          flex: 2;
          background: #ff7f67;
          color: #173838;
          font-weight: 900;
          font-size: 0.875rem;
          padding: 0.75rem;
          border-radius: 10px;
          border: none;
          cursor: pointer;
          box-shadow: 0 10px 22px rgba(255,127,103,0.24);
        }

        @media(max-width:1100px) {
          .nav-link {
            display: none;
          }

          .stats-row {
            grid-template-columns: repeat(2,1fr);
          }

          .rev-stats {
            grid-template-columns: repeat(2,1fr);
          }
        }

        @media(max-width:900px) {
          .sidebar {
            display: none;
          }

          .content {
            padding: 2rem 1.25rem 2.5rem;
          }

          .client-grid {
            grid-template-columns: 1fr;
          }
        }

        @media(max-width:600px) {
          .user-email {
            display: none;
          }

          .form-row {
            grid-template-columns: 1fr;
          }

          .stats-row,
          .rev-stats {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <nav className="nav">
        <a href="/" className="logo">
          <span className="brand-mark" />
          <span className="brand-name">
            <span className="lead">lead</span><span className="magnet">magnet</span> inc
          </span>
        </a>

        <div className="nav-right">
          <a href="/dashboard" className="nav-link">Dashboard</a>
          <a href="/linkedin" className="nav-link">LinkedIn</a>
          <a href="/instagram" className="nav-link">Instagram</a>
          <a href="/gmail" className="nav-link">Gmail</a>

          <div className="user-pill">
            <div className="user-avatar">{user?.email?.charAt(0).toUpperCase()}</div>
            <span className="user-email">{user?.email}</span>
          </div>

          <button className="logout-btn" onClick={handleLogout}>Sign out</button>
        </div>
      </nav>

      <div className="layout">
        <aside className="sidebar">
          <div className="sidebar-section">Main</div>

          <a href="/dashboard" className="side-item">
            <span className="side-icon"><Icon name="dashboard" /></span>
            Dashboard
          </a>

          <a href="/dashboard" className="side-item">
            <span className="side-icon"><Icon name="leads" /></span>
            All Leads
          </a>

          <a href="/dashboard" className="side-item">
            <span className="side-icon"><Icon name="analytics" /></span>
            Analytics
          </a>

          <div className="sidebar-section">Platforms</div>

          <a href="/linkedin" className="side-item">
            <span className="side-icon"><Icon name="linkedin" /></span>
            LinkedIn
          </a>

          <a href="/instagram" className="side-item">
            <span className="side-icon"><Icon name="instagram" /></span>
            Instagram
          </a>

          <a href="/gmail" className="side-item">
            <span className="side-icon"><Icon name="gmail" /></span>
            Gmail
          </a>

          <div className="sidebar-section">Agency</div>

          <a href="/agency" className="side-item active">
            <span className="side-icon"><Icon name="client" /></span>
            Client Manager
          </a>

          <a href="/agency/lead-radar" className="side-item">
            <span className="side-icon"><Icon name="radar" /></span>
            Lead Radar
          </a>

          <div className="sidebar-section">Account</div>

          <a href="/dashboard" className="side-item">
            <span className="side-icon"><Icon name="settings" /></span>
            Settings
          </a>

          <a href="/pricing" className="side-item">
            <span className="side-icon"><Icon name="billing" /></span>
            Billing
          </a>

          <a href="/contact" className="side-item">
            <span className="side-icon"><Icon name="support" /></span>
            Support
          </a>

          <div className="sidebar-footer">
            <div className="plan-pill">
              <div className="plan-name">Free Trial</div>
              <div className="plan-sub">7 days remaining</div>
            </div>
          </div>
        </aside>

        {checkingAccess ? (
          <section className="content">
            <div className="access-state">
              <div className="access-card">
                <div className="access-icon"><Icon name="client" size={24} /></div>
                <div className="access-title">Loading Client Manager</div>
                <div className="access-sub">Checking your subscription and preparing your agency workspace.</div>
              </div>
            </div>
          </section>
        ) : !hasAccess ? (
          <section className="content">
            <div className="access-state">
              <div className="access-card">
                <div className="access-icon"><Icon name="client" size={24} /></div>
                <div className="access-title">Agency Plan Required</div>
                <div className="access-sub">
                  The Client Manager is available for Agency and Scale plans. Upgrade to manage clients, reports, portals, and revenue.
                </div>
                <button className="add-btn" style={{ marginLeft: 0 }} onClick={() => window.location.href = "/pricing"}>
                  View Plans & Upgrade
                </button>
              </div>
            </div>
          </section>
        ) : (
          <section className="content">
            <div className="content-inner">
              {success && <div className="success-bar">{success}</div>}
              {error && <div className="error-bar">{error}</div>}

              <div className="page-header">
                <div className="page-kicker">
                  <span className="kicker-icon"><Icon name="client" size={14} /></span>
                  Agency Workspace
                </div>
                <h1 className="page-title">Client Manager</h1>
                <p className="page-sub">
                  Manage clients, track leads, monitor revenue, send reports, and keep every client workspace organised.
                </p>
              </div>

              <div className="top-actions">
                <div className="view-toggle">
                  <button className={`view-btn ${activeView === "clients" ? "active" : ""}`} onClick={() => setActiveView("clients")}>
                    Clients
                  </button>
                  <button className={`view-btn ${activeView === "revenue" ? "active" : ""}`} onClick={() => setActiveView("revenue")}>
                    Revenue
                  </button>
                </div>

                <button className="radar-btn" onClick={() => window.location.href = "/agency/lead-radar"}>
                  <Icon name="radar" size={15} />
                  Lead Radar
                </button>
              </div>

              {activeView === "clients" && (
                <>
                  <div className="stats-row">
                    <div className="stat-card">
                      <div className="stat-icon"><Icon name="users" /></div>
                      <div className="stat-val">{clients.length}</div>
                      <div className="stat-lbl">Total Clients</div>
                    </div>

                    <div className="stat-card">
                      <div className="stat-icon"><Icon name="client" /></div>
                      <div className="stat-val">{activeClients}</div>
                      <div className="stat-lbl">Active</div>
                    </div>

                    <div className="stat-card">
                      <div className="stat-icon"><Icon name="hot" /></div>
                      <div className="stat-val" style={{ color: "#ef4444" }}>{totalHot}</div>
                      <div className="stat-lbl">Hot Leads</div>
                    </div>

                    <div className="stat-card">
                      <div className="stat-icon"><Icon name="revenue" /></div>
                      <div className="stat-val">€{totalMRR.toLocaleString()}</div>
                      <div className="stat-lbl">Total MRR</div>
                    </div>

                    <div className="stat-card">
                      <div className="stat-icon"><Icon name="leads" /></div>
                      <div className="stat-val">{totalLeads}</div>
                      <div className="stat-lbl">Total Leads</div>
                    </div>
                  </div>

                  <div className="controls">
                    {["All", ...TIERS].map((tier) => (
                      <button
                        key={tier}
                        className={`filter-btn ${filterTier === tier ? "active" : ""}`}
                        onClick={() => setFilterTier(tier)}
                      >
                        {tier}
                      </button>
                    ))}

                    <select className="sort-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                      <option value="created_at">Sort: Recent</option>
                      <option value="mrr">Sort: MRR</option>
                      <option value="leads">Sort: Leads</option>
                      <option value="hot">Sort: Hot Leads</option>
                      <option value="health">Sort: Health</option>
                    </select>

                    <button className="add-btn" onClick={() => setShowAddClient(true)}>+ Add Client</button>
                  </div>

                  {filteredClients.length === 0 ? (
                    <div className="empty-state">
                      <span className="empty-icon"><Icon name="plus" size={24} /></span>
                      <div className="empty-title">No clients yet</div>
                      <div className="empty-sub">Add your first client to start managing campaigns, reports, and lead routing.</div>
                      <button className="add-btn" onClick={() => setShowAddClient(true)} style={{ marginLeft: 0 }}>Add Client</button>
                    </div>
                  ) : (
                    <div className="client-grid">
                      {filteredClients.map((client) => {
                        const tier = client.tier || "Standard";
                        const tierStyle = TIER_COLORS[tier] || TIER_COLORS.Standard;
                        const health = client.health_score || 75;
                        const isExpanded = expandedClient === client.id;

                        return (
                          <div className="client-card" key={client.id} onClick={() => setExpandedClient(isExpanded ? null : client.id)}>
                            {client.mrr > 0 && <div className="mrr-badge">€{client.mrr}/mo</div>}

                            <div className="card-top">
                              <div className="client-avatar">{client.name?.charAt(0).toUpperCase()}</div>

                              <div>
                                <div className="client-name">{client.name}</div>
                                {client.company && <div className="client-company">{client.company}</div>}
                              </div>

                              <div className="tier-badge" style={{ background: tierStyle.bg, border: `1px solid ${tierStyle.border}`, color: tierStyle.color }}>
                                {tier}
                              </div>
                            </div>

                            <div className="client-email-row">{client.email}</div>

                            <div className="health-wrap">
                              <div className="health-top">
                                <span className="health-lbl">Client Health</span>
                                <span style={{ color: getHealthColor(health), fontWeight: 800 }}>{health}/100</span>
                              </div>
                              <div className="health-bar">
                                <div className="health-fill" style={{ width: `${health}%`, background: getHealthColor(health) }} />
                              </div>
                            </div>

                            <div className="score-row">
                              <div className="score-box">
                                <div className="score-val">{client.leads_count || 0}</div>
                                <div className="score-lbl">Leads</div>
                              </div>

                              <div className="score-box">
                                <div className="score-val" style={{ color: "#ef4444" }}>{client.hot_leads || 0}</div>
                                <div className="score-lbl">Hot</div>
                              </div>

                              <div className="score-box">
                                <div className="score-val" style={{ color: "#b45309" }}>{client.warm_leads || 0}</div>
                                <div className="score-lbl">Warm</div>
                              </div>

                              <div className="score-box">
                                <div className="score-val" style={{ color: "#2563eb" }}>{client.cold_leads || 0}</div>
                                <div className="score-lbl">Cold</div>
                              </div>
                            </div>

                            {client.platforms?.length > 0 && (
                              <div className="platforms-row">
                                {client.platforms.map((platform) => (
                                  <span key={platform} className="platform-tag">{platform}</span>
                                ))}
                                <span className="platform-tag">{client.campaigns_count || 0} campaigns</span>
                              </div>
                            )}

                            <div className="auto-row">
                              {client.auto_report && <span className="auto-tag">Auto-report: {client.report_frequency || "monthly"}</span>}
                              {client.campaigns_count > 0 && <span className="auto-tag">Lead routing active</span>}
                            </div>

                            {client.last_report_sent && (
                              <div className="last-report">Last report: {new Date(client.last_report_sent).toLocaleDateString()}</div>
                            )}

                            <div className="card-actions">
                              <button className="act-btn" onClick={(e) => handleOnboard(client, e)} disabled={onboardingClient === client.id}>
                                <Icon name="plus" size={13} />
                                {onboardingClient === client.id ? "Setting up" : "Onboard"}
                              </button>
                              <button className="act-btn" onClick={(e) => copyPortalLink(client, e)}>
                                <Icon name="link" size={13} />
                                Portal
                              </button>
                              <button className="act-btn" onClick={(e) => handleSendReport(client, e)} disabled={sendingReport === client.id}>
                                <Icon name="report" size={13} />
                                {sendingReport === client.id ? "Sending" : "Report"}
                              </button>
                              <button className="act-btn" onClick={(e) => openEdit(client, e)}>
                                <Icon name="edit" size={13} />
                                Edit
                              </button>
                              <button className="act-btn act-del" onClick={(e) => deleteClient(client.id, e)}>
                                <Icon name="trash" size={13} />
                              </button>
                            </div>

                            {isExpanded && client.notes && (
                              <div className="expanded-section">
                                <div className="expanded-title">Notes</div>
                                <div className="notes-box">{client.notes}</div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </>
              )}

              {activeView === "revenue" && (
                <>
                  <div className="rev-stats">
                    <div className="rev-card">
                      <div className="rev-val">€{totalMRR.toLocaleString()}</div>
                      <div className="rev-lbl">Monthly Revenue</div>
                      <div className="rev-sub">across {clients.length} clients</div>
                    </div>

                    <div className="rev-card">
                      <div className="rev-val">€{annualRevenue.toLocaleString()}</div>
                      <div className="rev-lbl">Annual Forecast</div>
                      <div className="rev-sub">projected at current MRR</div>
                    </div>

                    <div className="rev-card">
                      <div className="rev-val">€{avgMRR}</div>
                      <div className="rev-lbl">Avg per Client</div>
                      <div className="rev-sub">{clients.length} total clients</div>
                    </div>

                    <div className="rev-card">
                      <div className="rev-val" style={{ color: atRiskMRR > 0 ? "#ef4444" : "#ff7f67" }}>€{atRiskMRR.toLocaleString()}</div>
                      <div className="rev-lbl">At-Risk MRR</div>
                      <div className="rev-sub">{atRiskClients.length} clients flagged</div>
                    </div>
                  </div>

                  <div className="rev-section">
                    <div className="rev-section-title">Revenue by Client</div>

                    {clients.length === 0 ? (
                      <div style={{ color: "#819693", fontSize: "0.84rem" }}>No clients yet</div>
                    ) : (
                      [...clients].sort((a, b) => (b.mrr || 0) - (a.mrr || 0)).map((client) => (
                        <div className="rev-client-row" key={client.id}>
                          <div className="rev-client-avatar">{client.name?.charAt(0).toUpperCase()}</div>

                          <div className="rev-client-info">
                            <div className="rev-client-name">{client.name}</div>
                            <div className="rev-client-tier">{client.tier || "Standard"} · {client.leads_count || 0} leads</div>
                          </div>

                          <div className="rev-client-bar-wrap">
                            <div className="rev-client-bar" style={{ width: `${((client.mrr || 0) / maxClientMRR) * 100}%` }} />
                          </div>

                          <div className="rev-client-mrr">€{(client.mrr || 0).toLocaleString()}</div>
                        </div>
                      ))
                    )}
                  </div>

                  <div className="rev-section">
                    <div className="rev-section-title">Revenue by Tier</div>

                    {TIERS.map((tier) => {
                      const tierStyle = TIER_COLORS[tier];

                      return (
                        <div className="tier-row" key={tier}>
                          <div className="tier-dot" style={{ background: tierStyle.color }} />
                          <div className="tier-name">{tier}</div>
                          <div className="tier-clients">{clientsByTier[tier]} clients</div>

                          <div className="tier-bar-wrap">
                            <div
                              className="tier-bar"
                              style={{
                                width: totalMRR > 0 ? `${(mrrByTier[tier] / totalMRR) * 100}%` : "0%",
                                background: tierStyle.color,
                              }}
                            />
                          </div>

                          <div className="tier-mrr">€{mrrByTier[tier].toLocaleString()}</div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="rev-section">
                    <div className="rev-section-title">At-Risk Clients</div>

                    {atRiskClients.length === 0 ? (
                      <div style={{ color: "#2f625d", fontSize: "0.84rem", fontFamily: "Inter,sans-serif", fontWeight: 700 }}>
                        All clients are healthy — no churn risk detected.
                      </div>
                    ) : (
                      atRiskClients.map((client) => (
                        <div className="risk-card" key={client.id}>
                          <div className="risk-info">
                            <div className="risk-avatar">{client.name?.charAt(0).toUpperCase()}</div>
                            <div>
                              <div className="risk-name">{client.name}</div>
                              <div className="risk-reason">{client.health_score < 40 ? `Health: ${client.health_score}/100` : "No leads or campaigns"}</div>
                            </div>
                          </div>

                          <div className="risk-mrr">€{(client.mrr || 0).toLocaleString()}/mo</div>
                        </div>
                      ))
                    )}
                  </div>
                </>
              )}
            </div>
          </section>
        )}
      </div>

      {(showAddClient || showEditClient) && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-title">{showEditClient ? "Edit Client" : "Add New Client"}</div>
            <div className="modal-sub">Fill in client details, set their tier, and configure automation.</div>

            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div>
                  <label className="form-label">Client Name</label>
                  <input
                    className="form-input"
                    placeholder="John Smith"
                    value={form.name}
                    onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                    required
                  />
                </div>

                <div>
                  <label className="form-label">Company</label>
                  <input
                    className="form-input"
                    placeholder="Acme Corp"
                    value={form.company}
                    onChange={(e) => setForm((prev) => ({ ...prev, company: e.target.value }))}
                  />
                </div>
              </div>

              <div className="form-row">
                <div>
                  <label className="form-label">Email</label>
                  <input
                    className="form-input"
                    type="email"
                    placeholder="client@company.com"
                    value={form.email}
                    onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                    required
                  />
                </div>

                <div>
                  <label className="form-label">Phone</label>
                  <input
                    className="form-input"
                    placeholder="+31 6 12345678"
                    value={form.phone}
                    onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))}
                  />
                </div>
              </div>

              <hr className="divider" />

              <div className="form-row">
                <div>
                  <label className="form-label">Client Tier</label>
                  <select
                    className="form-select"
                    value={form.tier}
                    onChange={(e) => setForm((prev) => ({ ...prev, tier: e.target.value }))}
                  >
                    {TIERS.map((tier) => (
                      <option key={tier} value={tier}>{tier}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="form-label">Monthly Revenue (€)</label>
                  <input
                    className="form-input"
                    type="number"
                    placeholder="0"
                    value={form.mrr}
                    onChange={(e) => setForm((prev) => ({ ...prev, mrr: e.target.value }))}
                  />
                </div>
              </div>

              <label className="form-label">Platforms</label>

              <div className="platforms-select">
                {PLATFORMS.map((platform) => (
                  <button
                    key={platform}
                    type="button"
                    className={`platform-toggle ${form.platforms.includes(platform) ? "selected" : ""}`}
                    onClick={() => togglePlatform(platform)}
                  >
                    {platform}
                  </button>
                ))}
              </div>

              <label className="form-label">Health Score: {form.health_score}/100</label>

              <input
                type="range"
                min="0"
                max="100"
                value={form.health_score}
                onChange={(e) => setForm((prev) => ({ ...prev, health_score: parseInt(e.target.value) }))}
                className="health-input"
              />

              <hr className="divider" />

              <div className="toggle-row">
                <div>
                  <div className="toggle-label">Auto-send performance reports</div>
                  <div className="toggle-sub">Automatically email reports to this client</div>
                </div>

                <button
                  type="button"
                  className={`toggle-switch ${form.auto_report ? "on" : ""}`}
                  onClick={() => setForm((prev) => ({ ...prev, auto_report: !prev.auto_report }))}
                >
                  <div className="toggle-knob" />
                </button>
              </div>

              {form.auto_report && (
                <>
                  <label className="form-label">Report Frequency</label>

                  <div className="freq-grid">
                    {REPORT_FREQUENCIES.map((frequency) => (
                      <button
                        key={frequency.value}
                        type="button"
                        className={`freq-btn ${form.report_frequency === frequency.value ? "selected" : ""}`}
                        onClick={() => setForm((prev) => ({ ...prev, report_frequency: frequency.value }))}
                      >
                        {frequency.label}
                      </button>
                    ))}
                  </div>
                </>
              )}

              <label className="form-label">Notes</label>

              <textarea
                className="form-textarea"
                placeholder="Notes about this client..."
                value={form.notes}
                onChange={(e) => setForm((prev) => ({ ...prev, notes: e.target.value }))}
              />

              <div className="modal-btns">
                <button
                  type="button"
                  className="modal-cancel"
                  onClick={() => {
                    setShowAddClient(false);
                    setShowEditClient(false);
                    resetForm();
                  }}
                >
                  Cancel
                </button>

                <button type="submit" className="modal-submit" disabled={loading}>
                  {loading ? "Saving..." : showEditClient ? "Save Changes" : "Add Client"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}