"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

function getSupabase() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return null;
  }

  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    document.title = "Log In — LeadMagnet";
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const supabase = getSupabase();
    if (!supabase) {
      setError("Login is not connected yet. Add the Supabase keys in .env.local to enable account login.");
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      window.location.href = "/dashboard";
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
        .title{font-family:'Plus Jakarta Sans',sans-serif;font-size:1.625rem;font-weight:800;color:#173838;margin-bottom:0.4rem;letter-spacing:-0.03em;}
        .subtitle{font-size:0.875rem;color:#5f7774;margin-bottom:2rem;font-weight:400;line-height:1.5;}
        .label{display:block;font-size:0.775rem;font-weight:600;color:#2f625d;margin-bottom:0.4rem;letter-spacing:0.02em;}
        .input{width:100%;background:#f8fbfa;border:1px solid rgba(23,56,56,0.11);border-radius:10px;padding:0.75rem 1rem;color:#173838;font-size:0.875rem;outline:none;transition:border-color 0.15s;margin-bottom:1rem;font-family:'Inter',sans-serif;}
        .input:focus{border-color:rgba(255,127,103,0.4);}
        .input::placeholder{color:#819693;}
        .forgot{display:block;text-align:right;font-size:0.775rem;color:#ff7f67;text-decoration:none;margin-top:-0.5rem;margin-bottom:1.25rem;font-weight:600;}
        .forgot:hover{color:#ec6f5b;}
        .btn{width:100%;background:#ff7f67;color:#173838;font-family:'Inter',sans-serif;font-weight:700;font-size:0.925rem;padding:0.875rem;border-radius:11px;border:none;cursor:pointer;transition:all 0.15s;letter-spacing:-0.01em;box-shadow:0 10px 22px rgba(255,127,103,0.24);}
        .btn:hover{background:#ec6f5b;transform:translateY(-1px);}
        .btn:disabled{opacity:0.5;cursor:not-allowed;transform:none;}
        .error{background:rgba(239,68,68,0.08);border:1px solid rgba(239,68,68,0.2);color:#f87171;font-size:0.835rem;padding:0.75rem 1rem;border-radius:10px;margin-bottom:1rem;line-height:1.5;}
        .divider{border:none;border-top:1px solid rgba(23,56,56,0.09);margin:1.5rem 0;}
        .signup-link{text-align:center;font-size:0.835rem;color:#819693;}
        .signup-link a{color:#ff7f67;text-decoration:none;font-weight:600;}
        .signup-link a:hover{color:#ec6f5b;}
      `}</style>

      <div className="card">
        <Link href="/" className="logo" aria-label="LeadMagnet Inc home">
          <span className="brand-mark" aria-hidden="true" />
          <span className="brand-name"><span className="lead">lead</span><span className="magnet">magnet</span> inc</span>
        </Link>
        <h1 className="title">Welcome back</h1>
        <p className="subtitle">Log in to your LeadMagnet account to manage your campaigns and leads.</p>

        {error && <div className="error">⚠ {error}</div>}

        <form onSubmit={handleLogin}>
          <label className="label">Email address</label>
          <input className="input" type="email" placeholder="you@agency.com" value={email} onChange={e => setEmail(e.target.value)} required />
          <label className="label">Password</label>
          <input className="input" type="password" placeholder="Your password" value={password} onChange={e => setPassword(e.target.value)} required />
          <a href="/forgot-password" className="forgot">Forgot password?</a>
          <button className="btn" type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Log In →"}
          </button>
        </form>

        <hr className="divider" />
        <div className="signup-link">
          Don&apos;t have an account? <a href="/signup">Start free trial →</a>
        </div>
      </div>
    </main>
  );
}
