"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    document.title = "Reset Password — LeadMagnet Inc";
  }, []);

  const handleReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const redirectTo =
      typeof window !== "undefined"
        ? `${window.location.origin}/reset-password`
        : "https://leadmagnetinc.com/reset-password";

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo,
    });

    if (error) {
      setError(error.message);
    } else {
      setSent(true);
    }

    setLoading(false);
  };

  return (
    <main className="page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');

        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        .page {
          min-height: 100vh;
          background: #FBF3E3;
          font-family: 'Plus Jakarta Sans', 'Inter', sans-serif;
          color: #173838;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
        }

        .card {
          width: 100%;
          max-width: 460px;
          background: linear-gradient(145deg,#ffffff,#f8fbfa);
          border: 1px solid rgba(23,56,56,0.08);
          box-shadow: 0 24px 60px rgba(23,56,56,0.10);
          border-radius: 24px;
          padding: 2.2rem;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 0.62rem;
          text-decoration: none;
          margin-bottom: 2rem;
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

        .kicker {
          display: inline-flex;
          align-items: center;
          color: #ff7f67;
          font-size: 0.72rem;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          margin-bottom: 0.75rem;
        }

        .title {
          font-size: 1.85rem;
          font-weight: 900;
          letter-spacing: -0.05em;
          color: #173838;
          margin-bottom: 0.55rem;
        }

        .subtitle {
          color: #5f7774;
          font-size: 0.92rem;
          line-height: 1.65;
          margin-bottom: 1.6rem;
          font-family: 'Inter', sans-serif;
        }

        .label {
          display: block;
          font-size: 0.74rem;
          font-weight: 900;
          color: #2f625d;
          margin-bottom: 0.45rem;
          text-transform: uppercase;
          font-family: 'Inter', sans-serif;
          letter-spacing: 0.04em;
        }

        .input {
          width: 100%;
          background: #ffffff;
          border: 1px solid rgba(23,56,56,0.10);
          border-radius: 12px;
          color: #173838;
          font-size: 0.9rem;
          outline: none;
          font-family: 'Inter', sans-serif;
          padding: 0.85rem 1rem;
          margin-bottom: 1rem;
        }

        .input:focus {
          border-color: rgba(255,127,103,0.42);
          box-shadow: 0 0 0 4px rgba(255,127,103,0.08);
        }

        .input::placeholder {
          color: #819693;
        }

        .btn {
          width: 100%;
          background: #ff7f67;
          color: #173838;
          font-weight: 900;
          font-size: 0.92rem;
          padding: 0.9rem;
          border-radius: 12px;
          border: none;
          cursor: pointer;
          box-shadow: 0 12px 24px rgba(255,127,103,0.24);
          transition: all 0.15s;
        }

        .btn:hover {
          background: #ec6f5b;
          transform: translateY(-1px);
        }

        .btn:disabled {
          opacity: 0.45;
          cursor: not-allowed;
          transform: none;
        }

        .divider {
          height: 1px;
          background: rgba(23,56,56,0.08);
          margin: 1.6rem 0 1.25rem;
        }

        .bottom {
          text-align: center;
          color: #819693;
          font-size: 0.86rem;
          font-family: 'Inter', sans-serif;
        }

        .bottom a {
          color: #ff7f67;
          text-decoration: none;
          font-weight: 900;
        }

        .error {
          background: rgba(239,68,68,0.07);
          border: 1px solid rgba(239,68,68,0.18);
          color: #ef4444;
          font-size: 0.84rem;
          padding: 0.8rem 1rem;
          border-radius: 12px;
          margin-bottom: 1rem;
          font-family: 'Inter', sans-serif;
          font-weight: 600;
          line-height: 1.5;
        }

        .success {
          background: rgba(143,200,193,0.18);
          border: 1px solid rgba(143,200,193,0.38);
          color: #2f625d;
          font-size: 0.88rem;
          padding: 1rem;
          border-radius: 14px;
          margin-bottom: 1.25rem;
          font-family: 'Inter', sans-serif;
          font-weight: 700;
          line-height: 1.55;
        }

        @media(max-width:520px) {
          .page {
            padding: 1rem;
          }

          .card {
            padding: 1.65rem;
            border-radius: 20px;
          }

          .title {
            font-size: 1.55rem;
          }
        }
      `}</style>

      <section className="card">
        <Link href="/" className="logo">
          <span className="brand-mark" />
          <span className="brand-name">
            <span className="lead">lead</span>
            <span className="magnet">magnet</span> inc
          </span>
        </Link>

        <div className="kicker">Password Recovery</div>

        <h1 className="title">Reset your password</h1>

        <p className="subtitle">
          Enter your email address and we will send you a secure link to reset your password.
        </p>

        {sent ? (
          <>
            <div className="success">
              Reset link sent. Check your inbox at <strong>{email}</strong> and follow the instructions.
            </div>

            <Link href="/login">
              <button className="btn">Back to Login</button>
            </Link>
          </>
        ) : (
          <form onSubmit={handleReset}>
            {error && <div className="error">{error}</div>}

            <label className="label">Email Address</label>

            <input
              className="input"
              type="email"
              placeholder="you@agency.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <button className="btn" type="submit" disabled={loading}>
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>
        )}

        <div className="divider" />

        <div className="bottom">
          Remember your password? <Link href="/login">Log in</Link>
        </div>
      </section>
    </main>
  );
}