"use client";
import { useState, useEffect } from "react";

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
    mail: (
      <svg {...common}>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3 7l9 6 9-6" />
      </svg>
    ),
    clock: (
      <svg {...common}>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 3" />
      </svg>
    ),
    shield: (
      <svg {...common}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    check: (
      <svg {...common}>
        <path d="M20 6L9 17l-5-5" />
      </svg>
    ),
  };

  return icons[name] || null;
}

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    document.title = "Support — LeadMagnet Inc";
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success) {
        setSent(true);
      } else {
        setError("Something went wrong. Please email us directly at support@leadmagnetinc.com");
      }
    } catch {
      setError("Something went wrong. Please email us directly at support@leadmagnetinc.com");
    }

    setLoading(false);
  };

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
          box-shadow: 0 12px 24px rgba(23,56,56,0.04);
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
          padding: 3rem 3rem 3.5rem;
          width: 100%;
          display: flex;
          justify-content: center;
        }

        .content-inner {
          width: 100%;
          max-width: 900px;
        }

        .page-header {
          margin-bottom: 1.9rem;
          text-align: center;
        }

        .page-kicker {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.45rem;
          color: #ff7f67;
          font-size: 0.72rem;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          margin-bottom: 0.8rem;
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
          margin-bottom: 0.45rem;
        }

        .page-sub {
          font-size: 0.92rem;
          color: #5f7774;
          line-height: 1.65;
          max-width: 620px;
          margin: 0 auto;
          font-family: 'Inter', sans-serif;
        }

        .support-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .support-card,
        .form-card,
        .success-card {
          background: linear-gradient(145deg,#ffffff,#f8fbfa);
          border: 1px solid rgba(23,56,56,0.08);
          box-shadow: 0 18px 40px rgba(23,56,56,0.06);
        }

        .support-card {
          border-radius: 18px;
          padding: 1.35rem;
        }

        .support-icon {
          width: 38px;
          height: 38px;
          border-radius: 12px;
          background: rgba(143,200,193,0.16);
          border: 1px solid rgba(143,200,193,0.30);
          color: #2f625d;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 0.72rem;
        }

        .support-title {
          font-size: 0.95rem;
          font-weight: 900;
          color: #173838;
          margin-bottom: 0.32rem;
        }

        .support-text {
          font-size: 0.82rem;
          color: #5f7774;
          line-height: 1.55;
          font-family: 'Inter', sans-serif;
        }

        .support-text a {
          color: #ff7f67;
          text-decoration: none;
          font-weight: 800;
        }

        .form-card {
          border-radius: 24px;
          padding: 2rem;
        }

        .form-title {
          font-size: 1.15rem;
          font-weight: 900;
          color: #173838;
          margin-bottom: 0.4rem;
          letter-spacing: -0.03em;
        }

        .form-sub {
          font-size: 0.84rem;
          color: #5f7774;
          margin-bottom: 1.5rem;
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
          transition: border-color 0.15s;
          padding: 0.75rem 1rem;
          margin-bottom: 1rem;
        }

        .form-input:focus,
        .form-select:focus,
        .form-textarea:focus {
          border-color: rgba(255,127,103,0.38);
        }

        .form-input::placeholder,
        .form-textarea::placeholder {
          color: #819693;
        }

        .form-textarea {
          resize: vertical;
          min-height: 140px;
        }

        .btn {
          width: 100%;
          background: #ff7f67;
          color: #173838;
          font-weight: 900;
          font-size: 0.9rem;
          padding: 0.9rem;
          border-radius: 12px;
          border: none;
          cursor: pointer;
          box-shadow: 0 10px 22px rgba(255,127,103,0.24);
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

        .success-card {
          border-radius: 24px;
          padding: 2.5rem 2rem;
          text-align: center;
        }

        .success-icon {
          width: 56px;
          height: 56px;
          border-radius: 16px;
          background: rgba(143,200,193,0.18);
          border: 1px solid rgba(143,200,193,0.34);
          color: #2f625d;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1rem;
        }

        .success-title {
          font-size: 1.3rem;
          font-weight: 900;
          color: #173838;
          margin-bottom: 0.55rem;
          letter-spacing: -0.03em;
        }

        .success-text {
          font-size: 0.9rem;
          color: #5f7774;
          line-height: 1.65;
          max-width: 460px;
          margin: 0 auto;
          font-family: 'Inter', sans-serif;
        }

        .success-text strong {
          color: #173838;
        }

        .help-note {
          margin-top: 1.5rem;
          background: rgba(143,200,193,0.14);
          border: 1px solid rgba(143,200,193,0.30);
          color: #2f625d;
          border-radius: 16px;
          padding: 1rem 1.1rem;
          font-size: 0.82rem;
          line-height: 1.6;
          font-family: 'Inter', sans-serif;
        }

        .help-note strong {
          font-weight: 900;
        }

        @media(max-width:1100px) {
          .nav-link {
            display: none;
          }
        }

        @media(max-width:900px) {
          .sidebar {
            display: none;
          }

          .content {
            padding: 2rem 1.25rem 2.5rem;
          }

          .content-inner {
            max-width: 760px;
          }
        }

        @media(max-width:650px) {
          .nav {
            padding: 0 1rem;
          }

          .brand-name {
            font-size: 0.95rem;
          }

          .support-grid {
            grid-template-columns: 1fr;
          }

          .form-card {
            padding: 1.5rem;
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

          <a href="/agency" className="side-item">
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

          <a href="/contact" className="side-item active">
            <span className="side-icon"><Icon name="support" /></span>
            Support
          </a>

          <div className="sidebar-footer">
            <div className="plan-pill">
              <div className="plan-name">Support</div>
              <div className="plan-sub">Usually within 24 hours</div>
            </div>
          </div>
        </aside>

        <section className="content">
          <div className="content-inner">
            <div className="page-header">
              <div className="page-kicker">
                <span className="kicker-icon"><Icon name="support" size={14} /></span>
                Support
              </div>
              <h1 className="page-title">How can we help?</h1>
              <p className="page-sub">
                Send us a message and we will get back to you within 24 hours. For urgent issues, email us directly.
              </p>
            </div>

            <div className="support-grid">
              <div className="support-card">
                <div className="support-icon"><Icon name="mail" /></div>
                <div className="support-title">Email Support</div>
                <div className="support-text">
                  <a href="mailto:support@leadmagnetinc.com">support@leadmagnetinc.com</a>
                </div>
              </div>

              <div className="support-card">
                <div className="support-icon"><Icon name="clock" /></div>
                <div className="support-title">Response Time</div>
                <div className="support-text">Within 24 hours on business days</div>
              </div>
            </div>

            {sent ? (
              <div className="success-card">
                <div className="success-icon"><Icon name="check" size={24} /></div>
                <div className="success-title">Message sent</div>
                <div className="success-text">
                  Thanks for reaching out. We will get back to you at <strong>{form.email}</strong> within 24 hours.
                </div>
              </div>
            ) : (
              <div className="form-card">
                <div className="form-title">Send a support request</div>
                <div className="form-sub">
                  Tell us what happened and include any relevant page, account, or integration details.
                </div>

                <form onSubmit={handleSubmit}>
                  {error && <div className="error">{error}</div>}

                  <label className="form-label">Your Name</label>
                  <input
                    className="form-input"
                    placeholder="John Smith"
                    value={form.name}
                    onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                    required
                  />

                  <label className="form-label">Email Address</label>
                  <input
                    className="form-input"
                    type="email"
                    placeholder="you@agency.com"
                    value={form.email}
                    onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                    required
                  />

                  <label className="form-label">Subject</label>
                  <select
                    className="form-select"
                    value={form.subject}
                    onChange={(e) => setForm((prev) => ({ ...prev, subject: e.target.value }))}
                    required
                  >
                    <option value="">Select a topic...</option>
                    <option value="Technical issue">Technical issue</option>
                    <option value="Billing question">Billing question</option>
                    <option value="LinkedIn / Instagram connection">LinkedIn / Instagram connection</option>
                    <option value="Gmail sequences">Gmail sequences</option>
                    <option value="Feature request">Feature request</option>
                    <option value="Account question">Account question</option>
                    <option value="Other">Other</option>
                  </select>

                  <label className="form-label">Message</label>
                  <textarea
                    className="form-textarea"
                    placeholder="Describe your issue or question in detail..."
                    value={form.message}
                    onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
                    required
                  />

                  <button className="btn" type="submit" disabled={loading}>
                    {loading ? "Sending..." : "Send Message →"}
                  </button>
                </form>
              </div>
            )}

            <div className="help-note">
              <strong>Tip:</strong> for integration issues, include the page you were on, the platform you were connecting, and any error message you saw.
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}