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
    <main style={{ minHeight: "100vh", background: "#080c09", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Inter', sans-serif", padding: "1rem" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Plus+Jakarta+Sans:wght@700;800&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        .card{background:#0f1a11;border:1px solid rgba(255,255,255,0.07);border-radius:18px;padding:2.5rem;width:100%;max-width:420px;}
        .logo{font-family:'Plus Jakarta Sans',sans-serif;font-size:1.08rem;font-weight:800;color:#22c97a;margin-bottom:2rem;display:block;text-decoration:none;letter-spacing:-0.02em;}
        .title{font-family:'Plus Jakarta Sans',sans-serif;font-size:1.55rem;font-weight:800;color:#f0f7f2;margin-bottom:0.4rem;letter-spacing:-0.03em;}
        .subtitle{font-size:0.875rem;color:#3d5240;margin-bottom:2rem;font-weight:400;line-height:1.5;}
        .label{display:block;font-size:0.775rem;font-weight:600;color:#4d6b54;margin-bottom:0.4rem;letter-spacing:0.02em;}
        .input{width:100%;background:#080c09;border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:0.75rem 1rem;color:#e2ede7;font-size:0.875rem;outline:none;transition:border-color 0.15s;margin-bottom:1rem;font-family:'Inter',sans-serif;}
        .input:focus{border-color:rgba(34,201,122,0.4);}
        .input::placeholder{color:#2a3d2e;}
        .btn{width:100%;background:#22c97a;color:#071209;font-family:'Inter',sans-serif;font-weight:700;font-size:0.925rem;padding:0.875rem;border-radius:11px;border:none;cursor:pointer;transition:all 0.15s;letter-spacing:-0.01em;}
        .btn:hover{background:#1db36c;transform:translateY(-1px);}
        .btn:disabled{opacity:0.5;cursor:not-allowed;transform:none;}
        .error{background:rgba(239,68,68,0.08);border:1px solid rgba(239,68,68,0.2);color:#f87171;font-size:0.835rem;padding:0.75rem 1rem;border-radius:10px;margin-bottom:1rem;line-height:1.5;}
        .back{text-align:center;font-size:0.82rem;color:#2a3d2e;margin-top:1.25rem;}
        .back a{color:#22c97a;text-decoration:none;font-weight:600;}
      `}</style>

      <div className="card">
        <Link href="/" className="logo">LeadMagnet Admin</Link>
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
