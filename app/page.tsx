"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    { q: "Do I need a credit card to start the trial?", a: "No. Your 7-day free trial starts immediately with just your email. No payment info required. At the end of the trial, you choose to subscribe or walk away — no strings attached." },
    { q: "Is this allowed by LinkedIn?", a: "LeadMagnet is designed to support responsible lead organisation and follow-up workflows. Users are responsible for complying with LinkedIn's terms of service and for avoiding spam or unauthorised automation. We recommend conservative outreach limits and quality-first campaigns. Always review LinkedIn's guidelines before running campaigns." },
    { q: "What is a lead magnet exactly?", a: "A lead magnet is a free resource you offer in exchange for attention — a PDF guide, template, checklist, or video. You post about it on LinkedIn or Instagram and offer to send it to anyone who engages. LeadMagnet helps you organise and follow up with those engaged prospects from one dashboard." },
    { q: "How many DMs can I send per day?", a: "We recommend conservative limits and quality-first outreach. LeadMagnet is not designed for mass spam campaigns. Start with small volumes, monitor engagement quality, and scale responsibly. Your account safety is your responsibility." },
    { q: "Can I connect multiple client accounts?", a: "Yes. Pro and Agency plans are built for agencies managing multiple clients. Each client has a separate workspace, campaigns, and leads — fully isolated from each other." },
    { q: "Which platforms does LeadMagnet support?", a: "LeadMagnet supports LinkedIn, Instagram, and Gmail. Connect Gmail via secure Google OAuth. Add LinkedIn and Instagram campaign sources through guided setup. Instagram automation is currently in beta." },
    { q: "Does LeadMagnet replace a CRM?", a: "No. LeadMagnet helps you capture and organise leads from social campaigns, then export or follow up via Gmail. You can use it alongside your existing CRM." },
    { q: "How does Gmail integration work?", a: "We use Google OAuth — you connect your Gmail account securely via Google's official login. Your password is never stored. We only request permission to send emails on your behalf for follow-up sequences." },
  ];

  const features = [
    { icon: "🔗", title: "Campaign Manager", desc: "Create LinkedIn and Instagram campaigns in one click. Set your post URL and follow-up message — LeadMagnet organises engaged prospects into your dashboard automatically." },
    { icon: "📧", title: "Gmail Sequences", desc: "Connect Gmail securely via Google OAuth. Send automated follow-up emails on day 1, 7, 14, and 30 — personalised with [Name] and [Company]. No password stored." },
    { icon: "📊", title: "Leads Dashboard", desc: "All your prospects in one place. Search, filter, export to CSV, and archive leads. See name, company, headline, location and more at a glance." },
    { icon: "📈", title: "Analytics", desc: "Daily leads chart, location breakdown, and campaign performance. Know exactly which campaigns are driving the most qualified prospects." },
    { icon: "🏢", title: "Agency Client Manager", desc: "Manage multiple clients from one dashboard. Add clients, track their campaigns, set tiers, and send automated performance reports via Gmail." },
    { icon: "📋", title: "Performance Reports", desc: "Send branded performance reports directly to clients via Gmail — automatically. Include leads, campaigns, health score, and monthly progress." },
  ];

  const defaultPlans = [
    {
      name: "Starter",
      price: "€49",
      period: "/ month",
      desc: "For consultants & small agencies",
      features: ["1 workspace", "5 active campaigns", "LinkedIn automation", "Leads dashboard", "CSV export", "Basic analytics", "Email support"],
      popular: false,
      cta: "Start Free Trial",
    },
    {
      name: "Pro",
      price: "€99",
      period: "/ month",
      desc: "For growing agencies",
      features: ["5 client workspaces", "25 active campaigns", "Everything in Starter", "Instagram automation", "Gmail sequences", "Advanced analytics", "Priority support"],
      popular: true,
      cta: "Start Free Trial",
    },
    {
      name: "Agency",
      price: "€199",
      period: "/ month",
      desc: "For full-scale agencies",
      features: ["15 client workspaces", "75 active campaigns", "Everything in Pro", "Agency client manager", "Automated client reports", "White-label dashboard", "Dedicated account manager"],
      popular: false,
      cta: "Start Free Trial",
    },
  ];

  const [plans, setPlans] = useState(defaultPlans);

  useEffect(() => {
    fetch("/api/plans")
      .then(res => res.json())
      .then(data => {
        if (data.plans?.length) {
          setPlans(data.plans.map((plan) => ({
            name: plan.name,
            price: plan.display_price,
            period: plan.period,
            desc: plan.description,
            features: plan.features || [],
            popular: plan.popular,
            cta: "Start Free Trial",
          })));
        }
      })
      .catch(() => {});
  }, []);

  const stats = [
    { n: "< 10min", l: "Setup time" },
    { n: "3", l: "Platforms supported" },
    { n: "7-day", l: "Free trial" },
    { n: "100%", l: "No credit card needed" },
  ];

  const howItWorks = [
    { step: "01", title: "Connect your platforms", desc: "Connect Gmail via secure Google OAuth. Add LinkedIn and Instagram campaign sources through guided setup." },
    { step: "02", title: "Create a campaign", desc: "Add your post URL and follow-up message. Set which platform to track engagement on." },
    { step: "03", title: "Leads are captured automatically", desc: "Engaged prospects from your campaigns appear in your leads dashboard — organised and ready." },
    { step: "04", title: "Follow up with Gmail sequences", desc: "Set up automated follow-up emails that send on day 1, 7, 14, and 30 — personalised for each lead." },
    { step: "05", title: "Report results to clients", desc: "Send branded performance reports directly to clients via Gmail — weekly, monthly, or on demand." },
  ];

  return (
    <main style={{ fontFamily: "'Inter', sans-serif", background: "#f8fbfa", color: "#173838", minHeight: "100vh", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Plus+Jakarta+Sans:wght@600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        :root {
          --coral: #ff7f67; --coral-dark: #ec6f5b; --coral-dim: rgba(255,127,103,0.1); --coral-border: rgba(255,127,103,0.24);
          --mint: #8fc8c1; --mint-soft: #edf7f5; --ink: #173838; --muted: #5f7774;
          --green: var(--coral); --green-dim: var(--coral-dim); --green-border: var(--coral-border);
          --bg: #f8fbfa; --bg2: #ffffff; --bg3: #ffffff; --border: rgba(23,56,56,0.10);
        }
        html { scroll-behavior: smooth; }
        .nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; display: flex; align-items: center; justify-content: space-between; padding: 0 2rem; height: 68px; background: rgba(255,255,255,0.86); backdrop-filter: blur(18px); border-bottom: 1px solid var(--border); box-shadow: 0 10px 30px rgba(23,56,56,0.04); }
        .brand-lockup { display:flex;align-items:center;gap:0.62rem;text-decoration:none; }
        .brand-mark { width:30px;height:30px;border-radius:50%;background:conic-gradient(from -12deg,#ff7f67 0 44%,transparent 44% 51%,#8fc8c1 51% 86%,transparent 86% 100%);position:relative;flex:0 0 auto; }
        .brand-mark:after { content:"";position:absolute;inset:8px;border-radius:50%;background:#ffffff; }
        .brand-name { font-family:'Plus Jakarta Sans',sans-serif;font-size:1.06rem;font-weight:900;letter-spacing:-0.035em;color:#173838;line-height:1; }
        .brand-name .lead { color:#ff7f67; }
        .brand-name .magnet { color:#8fc8c1; }
        .nav-links { display: flex; gap: 1.75rem; list-style: none; }
        .nav-links a { color: #5f7774; text-decoration: none; font-size: 0.875rem; font-weight: 500; transition: color 0.15s; }
        .nav-links a:hover { color: #486b68; }

        .nav-actions {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .nav-login {
          color: #2f625d;
          text-decoration: none;
          font-size: 0.855rem;
          font-weight: 700;
          padding: 0.5rem 0.9rem;
          border-radius: 9px;
          transition: all 0.15s;
        }

        .nav-login:hover {
          color: #ff7f67;
          background: rgba(255,127,103,0.08);
        }

        .nav-cta { background: var(--coral); color: #173838; font-family: 'Inter', sans-serif; font-weight: 700; padding: 0.58rem 1.15rem; border-radius: 9px; text-decoration: none; font-size: 0.855rem; transition: all 0.15s; box-shadow: 0 8px 18px rgba(255,127,103,0.24); }
        .nav-cta:hover { background: var(--coral-dark); transform: translateY(-1px); }
        .hero { min-height: 94vh; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 8rem 1.5rem 5rem; position: relative; overflow: hidden; background: linear-gradient(180deg,#f8fbfa 0%,#edf7f5 100%); }
        .hero-glow,.hero-glow2,.cta-glow { display:none; }
        .badge { display: inline-flex; align-items: center; gap: 8px; background: #ffffff; border: 1px solid rgba(143,200,193,0.38); color: #2f625d; font-size: 0.72rem; font-weight: 700; padding: 0.42rem 0.95rem; border-radius: 100px; margin-bottom: 1.6rem; letter-spacing: 0.06em; text-transform: uppercase; box-shadow: 0 10px 26px rgba(23,56,56,0.06); }
        .badge-dot { width: 5px; height: 5px; background: var(--green); border-radius: 50%; animation: pulse 2s infinite; }
        @keyframes pulse { 0%,100% { opacity:1; box-shadow: 0 0 0 0 rgba(255,127,103,0.4); } 50% { opacity:0.6; box-shadow: 0 0 0 4px rgba(255,127,103,0); } }
        @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        .hero-title { font-family: 'Plus Jakarta Sans', sans-serif; font-size: clamp(2.6rem, 6.5vw, 5rem); font-weight: 800; line-height: 1.06; letter-spacing: -0.04em; color: #173838; max-width: 900px; margin-bottom: 1.5rem; animation: fadeUp 0.6s 0.1s both; }
        .hero-title em { font-style: normal; color: var(--green); }
        .hero-sub { font-size: 1.05rem; color: #5f7774; max-width: 560px; margin-bottom: 2.5rem; font-weight: 400; line-height: 1.65; animation: fadeUp 0.6s 0.2s both; }
        .btn-row { display: flex; gap: 0.875rem; justify-content: center; flex-wrap: wrap; animation: fadeUp 0.6s 0.3s both; }
        .btn-primary { background: var(--coral); color: #173838; font-family: 'Inter', sans-serif; font-weight: 700; padding: 0.86rem 1.85rem; border-radius: 10px; text-decoration: none; font-size: 0.925rem; transition: all 0.15s; box-shadow: 0 14px 26px rgba(255,127,103,0.25); }
        .btn-primary:hover { background: #ec6f5b; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(255,127,103,0.2); }
        .btn-secondary { background: #ffffff; color: #486b68; border: 1px solid rgba(23,56,56,0.14); font-family: 'Inter', sans-serif; font-weight: 600; padding: 0.86rem 1.75rem; border-radius: 10px; text-decoration: none; font-size: 0.925rem; transition: all 0.15s; }
        .btn-secondary:hover { border-color: rgba(23,56,56,0.22); color: #173838; }
        .hero-note { font-size: 0.775rem; color: #819693; margin-top: 1.125rem; animation: fadeUp 0.6s 0.4s both; }
        .stats-bar { display: flex; justify-content: center; flex-wrap: wrap; border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); background: var(--bg2); }
        .stat-item { flex: 1; min-width: 150px; max-width: 240px; padding: 1.625rem 1.5rem; text-align: center; border-right: 1px solid var(--border); }
        .stat-item:last-child { border-right: none; }
        .stat-n { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1.875rem; font-weight: 800; color: var(--green); letter-spacing: -0.03em; }
        .stat-l { font-size: 0.72rem; color: #819693; margin-top: 0.25rem; text-transform: uppercase; letter-spacing: 0.08em; font-weight: 500; }
        section { padding: 5.5rem 1.5rem; }
        .container { max-width: 1080px; margin: 0 auto; }
        .section-tag { display: inline-block; font-size: 0.7rem; font-weight: 600; color: var(--green); text-transform: uppercase; letter-spacing: 0.12em; margin-bottom: 0.875rem; }
        .section-title { font-family: 'Plus Jakarta Sans', sans-serif; font-size: clamp(1.75rem, 3.5vw, 2.5rem); font-weight: 800; letter-spacing: -0.03em; color: #173838; margin-bottom: 0.875rem; line-height: 1.1; }
        .section-sub { color: #5f7774; font-size: 1rem; max-width: 520px; font-weight: 400; line-height: 1.6; }
        .features-grid { display: grid; grid-template-columns: repeat(auto-fit,minmax(280px,1fr)); gap: 1.25rem; margin-top: 2.75rem; }
        .feature-card { background: var(--bg3); border: 1px solid var(--border); border-radius: 12px; padding: 1.625rem; transition: all 0.15s; box-shadow: 0 16px 34px rgba(23,56,56,0.05); }
        .feature-card:hover { border-color: var(--green-border); transform: translateY(-2px); }
        .f-icon-wrap { width: 40px; height: 40px; border-radius: 10px; background: var(--green-dim); border: 1px solid var(--green-border); display: flex; align-items: center; justify-content: center; font-size: 1.1rem; margin-bottom: 1rem; }
        .f-title { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 0.935rem; font-weight: 700; color: #173838; margin-bottom: 0.4rem; }
        .f-desc { color: #627a77; font-size: 0.845rem; line-height: 1.6; }
        .how-it-works { background: var(--bg2); border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); }
        .steps-list { display: flex; flex-direction: column; margin-top: 2.75rem; }
        .step-item { display: flex; gap: 2rem; align-items: flex-start; padding: 1.5rem 0; border-bottom: 1px solid var(--border); }
        .step-item:last-child { border-bottom: none; }
        .step-num { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 0.75rem; font-weight: 800; color: var(--green); background: var(--green-dim); border: 1px solid var(--green-border); border-radius: 8px; padding: 0.3rem 0.6rem; flex-shrink: 0; }
        .step-title { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1rem; font-weight: 700; color: #173838; margin-bottom: 0.375rem; }
        .step-desc { font-size: 0.875rem; color: #627a77; line-height: 1.6; }
        .compliance-box { background: rgba(251,191,36,0.04); border: 1px solid rgba(251,191,36,0.15); border-radius: 14px; padding: 1.5rem; margin-top: 3rem; }
        .compliance-title { font-size: 0.835rem; font-weight: 600; color: #fbbf24; margin-bottom: 0.5rem; }
        .compliance-text { font-size: 0.815rem; color: #92752a; line-height: 1.65; }
        .pricing-surface { background: var(--bg2); border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); }
        .pricing-grid { display: grid; grid-template-columns: repeat(auto-fit,minmax(280px,1fr)); gap: 1.25rem; margin-top: 2.75rem; }
        .plan-card { background: var(--bg3); border: 1px solid var(--border); border-radius: 12px; padding: 1.875rem; position: relative; box-shadow: 0 16px 34px rgba(23,56,56,0.05); }
        .plan-card.popular { border-color: rgba(255,127,103,0.35); background: linear-gradient(135deg, rgba(255,127,103,0.04) 0%, var(--bg3) 60%); }
        .pop-label { position: absolute; top: 1.125rem; right: 1.125rem; background: rgba(255,127,103,0.1); border: 1px solid rgba(255,127,103,0.25); color: var(--green); font-size: 0.67rem; font-weight: 700; padding: 0.2rem 0.65rem; border-radius: 100px; text-transform: uppercase; letter-spacing: 0.08em; }
        .plan-name { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 0.925rem; font-weight: 700; color: #486b68; margin-bottom: 0.625rem; }
        .plan-price-wrap { display: flex; align-items: baseline; gap: 0.25rem; margin-bottom: 0.375rem; }
        .plan-price { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 2.375rem; font-weight: 800; color: #173838; letter-spacing: -0.04em; }
        .plan-period { font-size: 0.875rem; color: #819693; }
        .plan-desc { font-size: 0.8rem; color: #819693; margin-bottom: 1.5rem; }
        .plan-divider { border: none; border-top: 1px solid var(--border); margin-bottom: 1.25rem; }
        .plan-features { list-style: none; display: flex; flex-direction: column; gap: 0.55rem; margin-bottom: 1.875rem; }
        .plan-features li { font-size: 0.845rem; color: #5f7774; display: flex; align-items: center; gap: 0.55rem; }
        .plan-features li::before { content: '✓'; color: var(--green); font-weight: 700; font-size: 0.8rem; flex-shrink: 0; }
        .plan-btn { display: block; text-align: center; font-family: 'Inter', sans-serif; font-weight: 600; font-size: 0.875rem; padding: 0.75rem; border-radius: 10px; cursor: pointer; border: 1px solid rgba(23,56,56,0.14); background: transparent; color: #486b68; width: 100%; transition: all 0.15s; }
        .plan-btn:hover { border-color: rgba(23,56,56,0.22); color: #173838; }
        .plan-card.popular .plan-btn { background: var(--green); color: #173838; border-color: var(--green); }
        .plan-card.popular .plan-btn:hover { background: #ec6f5b; }
        .faq-list { display: flex; flex-direction: column; margin-top: 2.75rem; }
        .faq-item { border-bottom: 1px solid var(--border); }
        .faq-q { width: 100%; text-align: left; background: none; border: none; cursor: pointer; color: #486b68; font-family: 'Inter', sans-serif; font-size: 0.935rem; font-weight: 500; padding: 1.25rem 0; display: flex; justify-content: space-between; align-items: center; gap: 1rem; transition: color 0.15s; }
        .faq-q:hover { color: #173838; }
        .faq-icon { color: #819693; font-size: 1.1rem; transition: transform 0.2s; flex-shrink: 0; }
        .faq-icon.open { transform: rotate(45deg); color: var(--green); }
        .faq-a-wrap { overflow: hidden; max-height: 0; transition: max-height 0.3s ease; }
        .faq-a-wrap.open { max-height: 400px; }
        .faq-a { font-size: 0.875rem; color: #627a77; padding-bottom: 1.25rem; line-height: 1.7; max-width: 720px; }
        .cta-surface { background: var(--bg2); border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); text-align: center; padding: 6rem 1.5rem; position: relative; overflow: hidden; }
        .cta-title { font-family: 'Plus Jakarta Sans', sans-serif; font-size: clamp(1.875rem, 4.5vw, 3.25rem); font-weight: 800; color: #173838; letter-spacing: -0.04em; margin-bottom: 0.875rem; line-height: 1.1; }
        .cta-sub { color: #5f7774; font-size: 1rem; margin-bottom: 2.25rem; max-width: 480px; margin-left: auto; margin-right: auto; line-height: 1.6; }
        .cta-note { font-size: 0.755rem; color: #819693; margin-top: 1rem; }
        footer { border-top: 1px solid var(--border); padding: 1.75rem 2rem; display: flex; justify-content: space-between; align-items: center; font-size: 0.8rem; color: #819693; flex-wrap: wrap; gap: 1rem; background: var(--bg2); }
        .footer-logo .brand-mark { width:26px;height:26px; }
        .footer-logo .brand-mark:after { inset:7px; }
        .footer-logo .brand-name { font-size:0.98rem; }
        .footer-links { display: flex; gap: 1.5rem; flex-wrap: wrap; }
        .footer-links a { color: #819693; text-decoration: none; font-weight: 500; transition: color 0.15s; }
        .footer-links a:hover { color: #2f625d; }
        .disclaimer { font-size: 0.72rem; color: #9aa9a6; text-align: center; padding: 1rem 2rem; background: var(--bg2); border-top: 1px solid var(--border); line-height: 1.6; }
        @media(max-width:700px){
          .nav{padding:0 1rem;}
          .brand-name{font-size:0.98rem;}
          .brand-mark{width:27px;height:27px;}
          .nav-links{display:none;}
          .nav-login{padding:0.45rem 0.55rem;font-size:0.8rem;}
          .nav-cta{padding:0.5rem 0.75rem;font-size:0.8rem;}
          .nav-actions{gap:0.35rem;}
          .hero{padding-top:6.5rem;}
          .stat-item{border-right:none;border-bottom:1px solid var(--border);}
          .step-item{gap:1rem;}
          .footer-links{width:100%;}
          .pricing-grid{grid-template-columns:1fr;}
        }
      `}</style>

      <nav className="nav">
        <Link className="brand-lockup" href="/" aria-label="LeadMagnet Inc home">
          <span className="brand-mark" aria-hidden="true" />
          <span className="brand-name"><span className="lead">lead</span><span className="magnet">magnet</span> inc</span>
        </Link>

        <ul className="nav-links">
          <li><a href="#features">Features</a></li>
          <li><a href="#how-it-works">How it works</a></li>
          <li><a href="#pricing">Pricing</a></li>
          <li><a href="#faq">FAQ</a></li>
        </ul>

        <div className="nav-actions">
          <Link href="/login" className="nav-login">Login</Link>
          <Link href="/signup" className="nav-cta">Start Free Trial</Link>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-glow" />
        <div className="hero-glow2" />
        <div className="badge"><span className="badge-dot" />Built for Marketing Agencies</div>
        <h1 className="hero-title">Turn social engagement into<br /><em>qualified leads</em></h1>
        <p className="hero-sub">LeadMagnet helps agencies capture engaged prospects from LinkedIn and Instagram campaigns, organise them in one dashboard, and automate responsible Gmail follow-ups.</p>
        <div className="btn-row">
          <a href="/signup" className="btn-primary">Start Free Trial →</a>
          <a href="#how-it-works" className="btn-secondary">See how it works</a>
        </div>
        <p className="hero-note">No credit card required · 7-day free trial · Built for agencies managing multiple clients</p>
      </section>

      <div className="stats-bar">
        {stats.map(s => (
          <div className="stat-item" key={s.l}>
            <div className="stat-n">{s.n}</div>
            <div className="stat-l">{s.l}</div>
          </div>
        ))}
      </div>

      <section id="features">
        <div className="container">
          <div className="section-tag">Features</div>
          <h2 className="section-title">Everything your agency needs<br />to scale lead generation</h2>
          <p className="section-sub">From campaign management to Gmail sequences — one platform handles your entire outreach pipeline.</p>
          <div className="features-grid">
            {features.map(f => (
              <div className="feature-card" key={f.title}>
                <div className="f-icon-wrap">{f.icon}</div>
                <div className="f-title">{f.title}</div>
                <div className="f-desc">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="how-it-works">
        <div className="container">
          <div className="section-tag">How it works</div>
          <h2 className="section-title">How agencies use LeadMagnet</h2>
          <p className="section-sub">A simple 5-step workflow that turns social engagement into organised, followed-up leads.</p>
          <div className="steps-list">
            {howItWorks.map(s => (
              <div className="step-item" key={s.step}>
                <div className="step-num">{s.step}</div>
                <div>
                  <div className="step-title">{s.title}</div>
                  <div className="step-desc">{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="compliance-box">
            <div className="compliance-title">⚠️ Responsible Use Notice</div>
            <div className="compliance-text">Users are responsible for ensuring their campaigns comply with LinkedIn&apos;s, Instagram&apos;s, Gmail&apos;s, and applicable privacy regulations. LeadMagnet is designed to support responsible outreach workflows — not spam or unauthorised activity. Always review the terms of service of each platform before running campaigns. LeadMagnet Inc. is not affiliated with, endorsed by, or officially connected to LinkedIn, Instagram, Google, or Gmail.</div>
          </div>
        </div>
      </section>

      <section id="pricing" className="pricing-surface">
        <div className="container">
          <div className="section-tag">Pricing</div>
          <h2 className="section-title">Simple, transparent pricing</h2>
          <p className="section-sub">Start free for 7 days. No credit card required. Scale as your agency grows.</p>
          <div className="pricing-grid">
            {plans.map(p => (
              <div className={`plan-card${p.popular ? " popular" : ""}`} key={p.name}>
                {p.popular && <div className="pop-label">Most Popular</div>}
                <div className="plan-name">{p.name}</div>
                <div className="plan-price-wrap">
                  <div className="plan-price">{p.price}</div>
                  <div className="plan-period">{p.period}</div>
                </div>
                <div className="plan-desc">{p.desc}</div>
                <hr className="plan-divider" />
                <ul className="plan-features">
                  {p.features.map(f => <li key={f}>{f}</li>)}
                </ul>
                <button className="plan-btn" onClick={() => window.location.href = "/signup"}>{p.cta}</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="faq">
        <div className="container">
          <div className="section-tag">FAQ</div>
          <h2 className="section-title">Common questions</h2>
          <div className="faq-list">
            {faqs.map((f, i) => (
              <div className="faq-item" key={i}>
                <button className="faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)} aria-expanded={openFaq === i}>
                  {f.q}
                  <span className={`faq-icon${openFaq === i ? " open" : ""}`}>+</span>
                </button>
                <div className={`faq-a-wrap${openFaq === i ? " open" : ""}`}>
                  <div className="faq-a">{f.a}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="cta-surface">
        <div className="cta-glow" />
        <div className="container">
          <h2 className="cta-title">Start turning campaign engagement<br />into qualified leads today</h2>
          <p className="cta-sub">Join agencies across Europe capturing qualified prospects from LinkedIn and Instagram — and following up responsibly via Gmail.</p>
          <div className="btn-row">
            <a href="/signup" className="btn-primary">Start Your Free 7-Day Trial →</a>
          </div>
          <p className="cta-note">No credit card · Cancel anytime · Set up in under 10 minutes</p>
        </div>
      </div>

      <footer>
        <div className="footer-logo brand-lockup">
          <span className="brand-mark" aria-hidden="true" />
          <span className="brand-name"><span className="lead">lead</span><span className="magnet">magnet</span> inc</span>
        </div>
        <div className="footer-links">
          <a href="#features">Features</a>
          <a href="#pricing">Pricing</a>
          <a href="#faq">FAQ</a>
          <a href="/contact">Contact</a>
          <a href="/privacy">Privacy</a>
          <a href="/terms">Terms</a>
        </div>
        <div>© 2026 LeadMagnet Inc. All rights reserved.</div>
      </footer>

      <div className="disclaimer">
        LeadMagnet is not affiliated with, endorsed by, or officially connected to LinkedIn, Instagram, Google, or Gmail. All trademarks belong to their respective owners.
      </div>
    </main>
  );
}