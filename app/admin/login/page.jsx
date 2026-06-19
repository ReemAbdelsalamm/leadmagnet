"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    document.title = "Admin Login - LeadMagnet";
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Could not log in");
      }

      window.location.href = "/admin";
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <main style={{ minHeight: "100vh", background: "linear-gradient(180deg,#f8fbfa 0%,#edf7f5 100%)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Inter', sans-serif", padding: "1rem" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Plus+Jakarta+Sans:wght@700;800&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        .card{background:#ffffff;border:1px solid rgba(23,56,56,0.10);border-radius:14px;padding:2.5rem;width:100%;max-width:430px;box-shadow:0 24px 70px rgba(23,56,56,0.12);}
        .logo{display:flex;align-items:center;justify-content:center;gap:0.65rem;margin-bottom:2rem;text-decoration:none;}
        .brand-mark{width:34px;height:34px;border-radius:50%;background:conic-gradient(from -12deg,#ff7f67 0 44%,transparent 44% 51%,#8fc8c1 51% 86%,transparent 86% 100%);position:relative;flex:0 0 auto;}
        .brand-mark:after{content:"";position:absolute;inset:9px;border-radius:50%;background:#ffffff;}
        .brand-name{font-family:'Plus Jakarta Sans',sans-serif;font-size:1.18rem;font-weight:900;letter-spacing:-0.035em;color:#173838;line-height:1;}
        .brand-name .lead{color:#ff7f67;}
        .brand-name .magnet{color:#8fc8c1;}
        .title{font-family:'Plus Jakarta Sans',sans-serif;font-size:1.55rem;font-weight:800;color:#173838;margin-bottom:0.4rem;letter-spacing:-0.03em;}
        .subtitle{font-size:0.875rem;color:#5f7774;margin-bottom:2rem;font-weight:400;line-height:1.5;}
        .label{display:block;font-size:0.775rem;font-weight:600;color:#2f625d;margin-bottom:0.4rem;letter-spacing:0.02em;}
        .input{width:100%;background:#f8fbfa;border:1px solid rgba(23,56,56,0.11);border-radius:10px;padding:0.75rem 1rem;color:#173838;font-size:0.875rem;outline:none;transition:border-color 0.15s;margin-bottom:1rem;font-family:'Inter',sans-serif;}
        .input:focus{border-color:rgba(255,127,103,0.4);}
        .input::placeholder{color:#819693;}
        .btn{width:100%;background:#ff7f67;color:#173838;font-family:'Inter',sans-serif;font-weight:700;font-size:0.925rem;padding:0.875rem;border-radius:11px;border:none;cursor:pointer;transition:all 0.15s;letter-spacing:-0.01em;box-shadow:0 10px 22px rgba(255,127,103,0.24);}
        .btn:hover{background:#ec6f5b;transform:translateY(-1px);}
        .btn:disabled{opacity:0.5;cursor:not-allowed;transform:none;}
        .error{background:rgba(239,68,68,0.08);border:1px solid rgba(239,68,68,0.2);color:#f87171;font-size:0.835rem;padding:0.75rem 1rem;border-radius:10px;margin-bottom:1rem;line-height:1.5;}
        .back{text-align:center;font-size:0.82rem;color:#819693;margin-top:1.25rem;}
        .back a{color:#ff7f67;text-decoration:none;font-weight:600;}
      `}</style>

      <div className="card">
        <Link href="/" className="logo" aria-label="LeadMagnet Inc home">l
          <span className="brand-mark" aria-hidden="true" />
          <span className="brand-name"><span className="lead">lead</span><span className="magnet">magnet</span> inc</span>
        </Link>
        <h1 className="title">Admin login</h1>
        <p className="subtitle">Use the single admin account to edit packages and review subscribed clients.</p>

        {error && <div className="error">{error}</div>}

        <form onSubmit={handleLogin}>
          <label className="label">Admin username</label>
          <input className="input" type="text" placeholder="admin@leadmagnetinc.com" value={username} onChange={e => setUsername(e.target.value)} required />
          <label className="label">Admin password</label>
          <input className="input" type="password" placeholder="Admin password" value={password} onChange={e => setPassword(e.target.value)} required />
          <button className="btn" type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Log in"}
          </button>
        </form>

        <div className="back"><Link href="/">Back to website</Link></div>
      </div>
    </main>
  );
}
