"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const DEFAULT_PLANS = [
  {
    name: "Starter",
    planKey: "starter",
    display_price: "€49",
    period: "/ month",
    description: "For consultants and small agencies starting with lead automation.",
    features: [
      "1 workspace",
      "5 active campaigns",
      "LinkedIn automation",
      "Leads dashboard",
      "CSV export",
      "Basic analytics",
      "Email support",
    ],
    popular: false,
  },
  {
    name: "Pro",
    planKey: "pro",
    display_price: "€99",
    period: "/ month",
    description: "For growing agencies using multiple platforms and follow-ups.",
    features: [
      "5 client workspaces",
      "25 active campaigns",
      "Everything in Starter",
      "Instagram automation",
      "Gmail sequences",
      "Advanced analytics",
      "Priority support",
    ],
    popular: true,
  },
  {
    name: "Agency",
    planKey: "agency",
    display_price: "€199",
    period: "/ month",
    description: "For full-scale agencies managing clients, reports, and growth.",
    features: [
      "15 client workspaces",
      "75 active campaigns",
      "Everything in Pro",
      "Agency client manager",
      "Automated client reports",
      "White-label dashboard",
      "Dedicated account manager",
    ],
    popular: false,
  },
  {
    name: "Scale",
    planKey: "scale",
    display_price: "€399",
    period: "/ month",
    description: "For agencies scaling lead intelligence and prospect discovery.",
    features: [
      "Everything in Agency",
      "Lead Radar",
      "ICP profiles",
      "Lead scoring",
      "Priority automation",
      "Advanced client reporting",
      "Scale support",
    ],
    popular: false,
  },
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
    check: (
      <svg {...common}>
        <path d="M20 6L9 17l-5-5" />
      </svg>
    ),
    arrow: (
      <svg {...common}>
        <path d="M5 12h14" />
        <path d="M13 5l7 7-7 7" />
      </svg>
    ),
    shield: (
      <svg {...common}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  };

  return icons[name] || null;
}

export default function Pricing() {
  const router = useRouter();
  const [loading, setLoading] = useState(null);
  const [user, setUser] = useState(null);
  const [plans, setPlans] = useState(DEFAULT_PLANS);

  useEffect(() => {
    document.title = "Pricing — LeadMagnet Inc";

    supabase.auth.getUser().then(({ data }) => {
      if (data.user) setUser(data.user);
    });

    fetch("/api/plans")
      .then((res) => res.json())
      .then((data) => {
        if (data.plans?.length) {
          setPlans(
            data.plans.map((plan) => ({
              name: plan.name,
              planKey: plan.plan_key,
              display_price: plan.display_price,
              period: plan.period,
              description: plan.description,
              features: plan.features || [],
              popular: plan.popular,
            }))
          );
        }
      })
      .catch(() => {});
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  const handleSubscribe = async (planKey, planName) => {
    setLoading(planName);

    try {
      if (!user) {
        router.push("/signup");
        return;
      }

      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          plan: planKey,
          userId: user.id,
          email: user.email,
        }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.assign(data.url);
      } else {
        alert("Something went wrong: " + (data.error || "Please try again."));
      }
    } catch (error) {
      alert("Error: " + error.message);
    }

    setLoading(null);
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

        .nav-right,
        .nav-links {
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

        .nav-cta {
          background: #ff7f67;
          color: #173838;
          font-weight: 900;
          font-size: 0.82rem;
          padding: 0.58rem 1rem;
          border-radius: 9px;
          text-decoration: none;
          box-shadow: 0 10px 22px rgba(255,127,103,0.22);
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

        .logout-btn:hover {
          border-color: rgba(255,127,103,0.32);
          color: #ff7f67;
          background: rgba(255,127,103,0.08);
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

        .plan-name-small {
          font-size: 0.8rem;
          font-weight: 800;
          color: #ff7f67;
        }

        .plan-sub-small {
          font-size: 0.68rem;
          color: #819693;
          margin-top: 3px;
          font-family: 'Inter', sans-serif;
        }

        .content {
          flex: 1;
          padding: 3rem 3rem 3.5rem;
          width: 100%;
        }

        .content-inner {
          width: 100%;
          max-width: 1180px;
          margin: 0 auto;
        }

        .hero {
          text-align: center;
          margin-bottom: 2.5rem;
        }

        .section-tag {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.45rem;
          color: #ff7f67;
          font-size: 0.72rem;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          margin-bottom: 0.9rem;
        }

        .tag-icon {
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

        .hero-title {
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 900;
          color: #173838;
          letter-spacing: -0.06em;
          margin-bottom: 0.8rem;
          line-height: 1.05;
        }

        .hero-sub {
          color: #5f7774;
          font-size: 0.95rem;
          line-height: 1.65;
          max-width: 680px;
          margin: 0 auto;
          font-family: 'Inter', sans-serif;
        }

        .trial-note {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(255,127,103,0.08);
          border: 1px solid rgba(255,127,103,0.18);
          color: #ff7f67;
          font-size: 0.78rem;
          font-weight: 800;
          padding: 0.48rem 1rem;
          border-radius: 100px;
          margin-top: 1.5rem;
          font-family: 'Inter', sans-serif;
        }

        .plans {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .plan {
          background: linear-gradient(145deg,#ffffff,#f8fbfa);
          border: 1px solid rgba(23,56,56,0.08);
          box-shadow: 0 18px 40px rgba(23,56,56,0.06);
          border-radius: 22px;
          padding: 1.65rem;
          position: relative;
          transition: all 0.15s;
        }

        .plan:hover {
          transform: translateY(-2px);
          box-shadow: 0 22px 50px rgba(23,56,56,0.08);
        }

        .pop-badge {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: rgba(255,127,103,0.08);
          border: 1px solid rgba(255,127,103,0.18);
          color: #ff7f67;
          border-radius: 100px;
          padding: 0.22rem 0.62rem;
          font-size: 0.66rem;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }

        .plan-name {
          font-size: 1.05rem;
          font-weight: 900;
          color: #173838;
          margin-bottom: 0.4rem;
          padding-right: 6.5rem;
        }

        .plan-price-wrap {
          display: flex;
          align-items: baseline;
          gap: 0.25rem;
          margin-bottom: 0.5rem;
        }

        .plan-price {
          font-size: 2.25rem;
          font-weight: 900;
          color: #ff7f67;
          letter-spacing: -0.05em;
        }

        .plan-period {
          font-size: 0.78rem;
          color: #819693;
          font-weight: 700;
          font-family: 'Inter', sans-serif;
        }

        .plan-desc {
          font-size: 0.82rem;
          color: #5f7774;
          line-height: 1.55;
          font-family: 'Inter', sans-serif;
          margin-bottom: 1.25rem;
          min-height: 58px;
        }

        .plan-divider {
          border: none;
          border-top: 1px solid rgba(23,56,56,0.08);
          margin-bottom: 1.25rem;
        }

        .features {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
          margin-bottom: 1.5rem;
        }

        .features li {
          font-size: 0.82rem;
          color: #5f7774;
          display: flex;
          align-items: center;
          gap: 0.55rem;
          font-family: 'Inter', sans-serif;
          font-weight: 700;
        }

        .check-icon {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: rgba(143,200,193,0.18);
          color: #2f625d;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .btn {
          width: 100%;
          background: #ffffff;
          border: 1px solid rgba(23,56,56,0.10);
          color: #5f7774;
          font-weight: 900;
          font-size: 0.86rem;
          padding: 0.78rem;
          border-radius: 11px;
          cursor: pointer;
          transition: all 0.15s;
          font-family: 'Inter', sans-serif;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.45rem;
        }

        .btn:hover {
          color: #ff7f67;
          border-color: rgba(255,127,103,0.28);
          background: rgba(255,127,103,0.06);
        }

        .btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .guarantee {
          text-align: center;
          color: #819693;
          font-size: 0.84rem;
          line-height: 1.7;
          font-family: 'Inter', sans-serif;
          margin-bottom: 1rem;
        }

        .guarantee-card {
          background: rgba(255,255,255,0.7);
          border: 1px solid rgba(23,56,56,0.08);
          border-radius: 18px;
          padding: 1.2rem 1.4rem;
          display: inline-flex;
          align-items: center;
          gap: 0.8rem;
          text-align: left;
        }

        .guarantee-icon {
          width: 38px;
          height: 38px;
          border-radius: 12px;
          background: rgba(143,200,193,0.16);
          border: 1px solid rgba(143,200,193,0.30);
          color: #2f625d;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .guarantee strong {
          color: #173838;
        }

        .guarantee a {
          color: #ff7f67;
          font-weight: 800;
          text-decoration: none;
        }

        .public-content {
          max-width: 1180px;
          margin: 0 auto;
          padding: 5rem 1.5rem 4rem;
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
        }

        @media(max-width:700px) {
          .nav {
            padding: 0 1rem;
          }

          .brand-name {
            font-size: 0.95rem;
          }

          .user-email {
            display: none;
          }

          .guarantee-card {
            flex-direction: column;
            text-align: center;
          }

          .public-content {
            padding-top: 3.5rem;
          }
        }
      `}</style>

      <nav className="nav">
        <Link href="/" className="logo" aria-label="LeadMagnet Inc home">
          <span className="brand-mark" aria-hidden="true" />
          <span className="brand-name">
            <span className="lead">lead</span>
            <span className="magnet">magnet</span> inc
          </span>
        </Link>

        {user ? (
          <div className="nav-right">
            <div className="user-pill">
              <div className="user-avatar">{user?.email?.charAt(0).toUpperCase()}</div>
              <span className="user-email">{user?.email}</span>
            </div>

            <button className="logout-btn" onClick={handleLogout}>Sign out</button>
          </div>
        ) : (
          <div className="nav-links">
            <Link href="/#features" className="nav-link">Features</Link>
            <Link href="/#faq" className="nav-link">FAQ</Link>
            <Link href="/login" className="nav-link">Log in</Link>
            <Link href="/signup" className="nav-cta">Start Free Trial</Link>
          </div>
        )}
      </nav>

      {user ? (
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

            <a href="/settings" className="side-item">
              <span className="side-icon"><Icon name="settings" /></span>
              Settings
            </a>

            <a href="/pricing" className="side-item active">
              <span className="side-icon"><Icon name="billing" /></span>
              Billing
            </a>

            <a href="/contact" className="side-item">
              <span className="side-icon"><Icon name="support" /></span>
              Support
            </a>

            <div className="sidebar-footer">
              <div className="plan-pill">
                <div className="plan-name-small">Billing</div>
                <div className="plan-sub-small">Plans and subscription</div>
              </div>
            </div>
          </aside>

          <section className="content">
            <PricingContent
              plans={plans}
              loading={loading}
              handleSubscribe={handleSubscribe}
              user={user}
            />
          </section>
        </div>
      ) : (
        <section className="public-content">
          <PricingContent
            plans={plans}
            loading={loading}
            handleSubscribe={handleSubscribe}
            user={user}
          />
        </section>
      )}
    </main>
  );
}

function PricingContent({ plans, loading, handleSubscribe, user }) {
  return (
    <div className="content-inner">
      <section className="hero">
        <div className="section-tag">
          <span className="tag-icon"><Icon name="billing" size={14} /></span>
          {user ? "Billing" : "Pricing"}
        </div>

        <h1 className="hero-title">
          {user ? "Manage your plan" : "Simple pricing for automated lead capture"}
        </h1>

        <p className="hero-sub">
          Start free for 7 days. Choose the plan that matches your workflow, then scale into client management and Lead Radar when you need more power.
        </p>

        <div className="trial-note">
          Every plan includes a 7-day free trial
        </div>
      </section>

      <section className="plans">
        {plans.map((plan) => (
          <div className="plan" key={plan.name}>
            {plan.popular && <div className="pop-badge">Most Popular</div>}

            <div className="plan-name">{plan.name}</div>

            <div className="plan-price-wrap">
              <div className="plan-price">{plan.display_price}</div>
              <div className="plan-period">{plan.period}</div>
            </div>

            <div className="plan-desc">{plan.description}</div>

            <hr className="plan-divider" />

            <ul className="features">
              {plan.features.map((feature) => (
                <li key={feature}>
                  <span className="check-icon"><Icon name="check" size={12} /></span>
                  {feature}
                </li>
              ))}
            </ul>

            <button
              className="btn"
              onClick={() => handleSubscribe(plan.planKey, plan.name)}
              disabled={loading === plan.name}
            >
              {loading === plan.name ? "Redirecting..." : `Start ${plan.name} Trial`}
              {loading !== plan.name && <Icon name="arrow" size={15} />}
            </button>
          </div>
        ))}
      </section>

      <section className="guarantee">
        <div className="guarantee-card">
          <span className="guarantee-icon"><Icon name="shield" /></span>
          <div>
            <strong>Secure payments by Stripe.</strong> Your payment information is never stored on our servers.
            <br />
            Questions? Email us at <a href="mailto:support@leadmagnetinc.com">support@leadmagnetinc.com</a>
          </div>
        </div>
      </section>
    </div>
  );
}