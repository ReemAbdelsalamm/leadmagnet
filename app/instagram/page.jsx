"use client";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

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
    message: (
      <svg {...common}>
        <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
      </svg>
    ),
    capture: (
      <svg {...common}>
        <path d="M3 3v18h18" />
        <path d="M7 15l3-3 3 2 5-7" />
      </svg>
    ),
    flow: (
      <svg {...common}>
        <circle cx="6" cy="6" r="3" />
        <circle cx="18" cy="6" r="3" />
        <circle cx="12" cy="18" r="3" />
        <path d="M8.5 7.5l2.5 7" />
        <path d="M15.5 7.5l-2.5 7" />
      </svg>
    ),
    shield: (
      <svg {...common}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    plus: (
      <svg {...common}>
        <path d="M12 5v14" />
        <path d="M5 12h14" />
      </svg>
    ),
    external: (
      <svg {...common}>
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
        <path d="M15 3h6v6" />
        <path d="M10 14L21 3" />
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

export default function Instagram() {
  const [user, setUser] = useState(null);
  const [connected, setConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [campaigns, setCampaigns] = useState([]);
  const [showNewPost, setShowNewPost] = useState(false);
  const [postUrl, setPostUrl] = useState("");
  const [dmMessage, setDmMessage] = useState("");

  useEffect(() => {
    document.title = "Instagram — LeadMagnet Inc";

    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
        window.location.href = "/login";
        return;
      }

      setUser(data.user);
      checkConnection(data.user.id);
      loadCampaigns(data.user.id);
    });

    const params = new URLSearchParams(window.location.search);

    if (params.get("connected") === "true") {
      setConnected(true);
      setSuccess("Instagram connected successfully!");
      window.history.replaceState({}, "", "/instagram");
    }

    if (params.get("error")) {
      setError("Connection failed: " + params.get("error"));
      window.history.replaceState({}, "", "/instagram");
    }
  }, []);

  const checkConnection = async (userId) => {
    const { data } = await supabase
      .from("instagram_accounts")
      .select("*")
      .eq("user_id", userId)
      .maybeSingle();

    if (data) setConnected(true);
  };

  const loadCampaigns = async (userId) => {
    const { data } = await supabase
      .from("instagram_campaigns")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (data) setCampaigns(data);
  };

  const handleConnect = () => {
    window.location.href = "/api/auth/instagram";
  };

  const handleDisconnect = async () => {
    if (!user) return;

    await supabase.from("instagram_accounts").delete().eq("user_id", user.id);
    setConnected(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  const handleAddPost = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { data: campaign } = await supabase
        .from("instagram_campaigns")
        .insert({
          user_id: user.id,
          post_url: postUrl,
          dm_message: dmMessage,
          status: "Active",
        })
        .select()
        .single();

      if (campaign) setCampaigns((prev) => [campaign, ...prev]);

      setPostUrl("");
      setDmMessage("");
      setShowNewPost(false);
      setSuccess("Instagram campaign started successfully.");

      setTimeout(() => setSuccess(""), 5000);
    } catch (err) {
      setError("Error: " + err.message);
    }

    setLoading(false);
  };

  const toggleCampaign = async (campaign) => {
    const newStatus = campaign.status === "Active" ? "Paused" : "Active";

    await supabase
      .from("instagram_campaigns")
      .update({ status: newStatus })
      .eq("id", campaign.id);

    setCampaigns((prev) =>
      prev.map((item) => (item.id === campaign.id ? { ...item, status: newStatus } : item))
    );
  };

  const deleteCampaign = async (id) => {
    await supabase.from("instagram_campaigns").delete().eq("id", id);
    setCampaigns((prev) => prev.filter((item) => item.id !== id));
  };

  const getTimeAgo = (dateStr) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const days = Math.floor(diff / 86400000);

    if (days === 0) return "Today";
    if (days === 1) return "Yesterday";
    if (days < 7) return `${days} days ago`;
    if (days < 30) return `${Math.floor(days / 7)}w ago`;

    return `${Math.floor(days / 30)}mo ago`;
  };

  const getCampaignName = (campaign, index) => {
    try {
      const url = new URL(campaign.post_url);
      const parts = url.pathname.split("/").filter(Boolean);

      if (parts.length >= 2) return `Instagram Campaign — Post ${parts[1]?.slice(0, 8)}`;
    } catch {}

    return `Instagram Campaign #${index + 1}`;
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
          transition: all 0.15s;
          white-space: nowrap;
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
          margin-top: 0.125rem;
        }

        .side-item {
          display: flex;
          align-items: center;
          gap: 0.62rem;
          padding: 0.6rem 0.75rem;
          border-radius: 10px;
          cursor: pointer;
          font-size: 0.84rem;
          color: #5f7774;
          transition: all 0.15s;
          background: transparent;
          width: 100%;
          font-family: 'Inter', sans-serif;
          font-weight: 600;
          position: relative;
          text-decoration: none;
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

        .connect-card,
        .campaign-card,
        .empty-state {
          background: linear-gradient(145deg,#ffffff,#f8fbfa);
          border: 1px solid rgba(23,56,56,0.08);
          box-shadow: 0 18px 40px rgba(23,56,56,0.06);
        }

        .connect-card {
          border-radius: 24px;
          padding: 2.35rem;
          width: 100%;
          margin: 0 auto;
        }

        .connect-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 1rem;
          margin-bottom: 1.85rem;
        }

        .connect-title {
          font-size: 1.58rem;
          font-weight: 900;
          color: #173838;
          letter-spacing: -0.04em;
          margin-bottom: 0.5rem;
        }

        .connect-sub {
          font-size: 0.92rem;
          color: #5f7774;
          line-height: 1.65;
          max-width: 560px;
          font-family: 'Inter', sans-serif;
        }

        .instagram-badge {
          background: rgba(228,64,95,0.08);
          border: 1px solid rgba(228,64,95,0.18);
          color: #e4405f;
          border-radius: 999px;
          padding: 0.34rem 0.78rem;
          font-size: 0.72rem;
          font-weight: 900;
          white-space: nowrap;
        }

        .feature-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 1rem;
          margin-bottom: 1.9rem;
        }

        .feature-card {
          background: #ffffff;
          border: 1px solid rgba(23,56,56,0.08);
          border-radius: 16px;
          padding: 1.2rem;
          min-height: 142px;
          box-shadow: 0 10px 24px rgba(23,56,56,0.04);
        }

        .feature-icon {
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

        .feature-title {
          font-size: 0.9rem;
          font-weight: 900;
          color: #173838;
          margin-bottom: 0.3rem;
        }

        .feature-desc {
          font-size: 0.78rem;
          color: #5f7774;
          line-height: 1.48;
          font-family: 'Inter', sans-serif;
        }

        .instagram-btn {
          width: 100%;
          background: linear-gradient(135deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888);
          color: #ffffff;
          font-weight: 900;
          font-size: 0.94rem;
          padding: 0.95rem;
          border-radius: 13px;
          border: none;
          cursor: pointer;
          transition: all 0.15s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          box-shadow: 0 12px 24px rgba(220,39,67,0.18);
        }

        .instagram-btn:hover {
          opacity: 0.92;
          transform: translateY(-1px);
          box-shadow: 0 16px 28px rgba(220,39,67,0.24);
        }

        .security-note {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.78rem;
          color: #819693;
          margin-top: 1rem;
          justify-content: center;
          font-family: 'Inter', sans-serif;
        }

        .security-icon {
          color: #2f625d;
          display: inline-flex;
        }

        .connected-bar {
          background: rgba(143,200,193,0.18);
          border: 1px solid rgba(143,200,193,0.38);
          border-radius: 14px;
          padding: 1rem 1.25rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.75rem;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .connected-dot {
          width: 9px;
          height: 9px;
          background: #8fc8c1;
          border-radius: 50%;
        }

        .connected-text {
          font-size: 0.875rem;
          color: #2f625d;
          font-weight: 800;
          font-family: 'Inter', sans-serif;
        }

        .btn-primary {
          background: #ff7f67;
          color: #173838;
          font-weight: 900;
          font-size: 0.84rem;
          padding: 0.6rem 1.18rem;
          border-radius: 10px;
          border: none;
          cursor: pointer;
          box-shadow: 0 10px 22px rgba(255,127,103,0.24);
          transition: all 0.15s;
        }

        .btn-primary:hover {
          background: #ec6f5b;
          transform: translateY(-1px);
        }

        .disconnect-btn {
          background: #ffffff;
          border: 1px solid rgba(239,68,68,0.16);
          color: #ef4444;
          font-size: 0.8rem;
          padding: 0.48rem 0.88rem;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 700;
        }

        .section-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.125rem;
        }

        .section-title {
          font-size: 1.02rem;
          font-weight: 900;
          color: #173838;
        }

        .campaign-card {
          border-radius: 16px;
          padding: 1.25rem;
          margin-bottom: 0.75rem;
        }

        .campaign-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 1rem;
        }

        .campaign-name {
          font-size: 0.98rem;
          font-weight: 900;
          color: #173838;
          margin-bottom: 0.35rem;
        }

        .campaign-url {
          font-size: 0.78rem;
          color: #5f7774;
          line-height: 1.5;
          word-break: break-all;
          font-family: 'Inter', sans-serif;
          margin-bottom: 0.55rem;
        }

        .campaign-preview {
          font-size: 0.78rem;
          color: #819693;
          font-style: italic;
          font-family: 'Inter', sans-serif;
          line-height: 1.45;
        }

        .status-pill {
          font-size: 0.68rem;
          padding: 0.24rem 0.72rem;
          border-radius: 100px;
          font-weight: 900;
          white-space: nowrap;
        }

        .status-active {
          background: rgba(143,200,193,0.18);
          border: 1px solid rgba(143,200,193,0.34);
          color: #2f625d;
        }

        .status-paused {
          background: rgba(245,158,11,0.10);
          border: 1px solid rgba(245,158,11,0.24);
          color: #b45309;
        }

        .campaign-actions {
          display: flex;
          gap: 0.45rem;
          margin-top: 1rem;
          padding-top: 0.9rem;
          border-top: 1px solid rgba(23,56,56,0.08);
          flex-wrap: wrap;
        }

        .btn-outline {
          background: #ffffff;
          border: 1px solid rgba(23,56,56,0.10);
          color: #5f7774;
          font-family: 'Inter', sans-serif;
          font-weight: 700;
          font-size: 0.8rem;
          padding: 0.48rem 0.88rem;
          border-radius: 8px;
          cursor: pointer;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
        }

        .btn-outline:hover {
          border-color: rgba(255,127,103,0.28);
          color: #ff7f67;
          background: rgba(255,127,103,0.05);
        }

        .btn-danger {
          background: #ffffff;
          border: 1px solid rgba(239,68,68,0.16);
          color: #ef4444;
          font-size: 0.8rem;
          padding: 0.48rem 0.88rem;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 700;
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
        }

        .empty-state {
          border-radius: 18px;
          padding: 4rem 2rem;
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
          font-size: 1.12rem;
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
          max-width: 420px;
          margin-left: auto;
          margin-right: auto;
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
          max-width: 540px;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 28px 70px rgba(23,56,56,0.18);
        }

        .modal-title {
          font-size: 1.3rem;
          font-weight: 900;
          color: #173838;
          margin-bottom: 0.28rem;
          letter-spacing: -0.03em;
        }

        .modal-sub {
          font-size: 0.84rem;
          color: #5f7774;
          margin-bottom: 1.75rem;
          font-family: 'Inter', sans-serif;
          line-height: 1.6;
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
        .form-textarea:focus {
          border-color: rgba(255,127,103,0.38);
        }

        .form-input::placeholder,
        .form-textarea::placeholder {
          color: #819693;
        }

        .form-textarea {
          resize: vertical;
          min-height: 120px;
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

        .modal-submit:disabled {
          opacity: 0.45;
          cursor: not-allowed;
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
          .user-email {
            display: none;
          }

          .feature-grid {
            grid-template-columns: 1fr;
          }

          .connect-card {
            padding: 1.5rem;
          }

          .connect-top {
            flex-direction: column;
          }

          .modal-btns {
            flex-direction: column;
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
          <a href="/instagram" className="nav-link active">Instagram</a>
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

          <a href="/instagram" className="side-item active">
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

        <section className="content">
          <div className="content-inner">
            {success && <div className="success-bar">✓ {success}</div>}
            {error && <div className="error-bar">⚠ {error}</div>}

            <div className="page-header">
              <div className="page-kicker">
                <span className="kicker-icon"><Icon name="instagram" size={14} /></span>
                Platform Setup
              </div>
              <h1 className="page-title">Instagram Automation</h1>
              <p className="page-sub">
                Connect Instagram, automate post engagement, and turn interested audiences into organised lead pipelines.
              </p>
            </div>

            {!connected ? (
              <div className="connect-card">
                <div className="connect-top">
                  <div>
                    <div className="connect-title">Connect Instagram</div>
                    <p className="connect-sub">
                      Connect your Instagram account to prepare automation campaigns and capture interested prospects from your content.
                    </p>
                  </div>

                  <div className="instagram-badge">Meta OAuth</div>
                </div>

                <div className="feature-grid">
                  <div className="feature-card">
                    <div className="feature-icon"><Icon name="message" /></div>
                    <div className="feature-title">Auto-DM</div>
                    <div className="feature-desc">Automatically message prospects who engage with your Instagram posts.</div>
                  </div>

                  <div className="feature-card">
                    <div className="feature-icon"><Icon name="capture" /></div>
                    <div className="feature-title">Lead Capture</div>
                    <div className="feature-desc">Capture qualified prospects and keep them organised in your dashboard.</div>
                  </div>

                  <div className="feature-card">
                    <div className="feature-icon"><Icon name="flow" /></div>
                    <div className="feature-title">Campaign Flow</div>
                    <div className="feature-desc">Turn content engagement into a structured follow-up pipeline.</div>
                  </div>
                </div>

                <button className="instagram-btn" onClick={handleConnect}>
                  <Icon name="instagram" />
                  Connect with Instagram
                </button>

                <div className="security-note">
                  <span className="security-icon"><Icon name="shield" size={14} /></span>
                  We redirect you to Meta to approve access. Your password is never stored.
                </div>
              </div>
            ) : (
              <>
                <div className="connected-bar">
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <div className="connected-dot"></div>
                    <div className="connected-text">Instagram connected</div>
                  </div>

                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <button className="btn-primary" onClick={() => setShowNewPost(true)}>+ New Campaign</button>
                    <button className="disconnect-btn" onClick={handleDisconnect}>Disconnect</button>
                  </div>
                </div>

                <div className="section-header">
                  <div className="section-title">Instagram Campaigns</div>
                </div>

                {campaigns.length === 0 ? (
                  <div className="empty-state">
                    <span className="empty-icon"><Icon name="plus" size={24} /></span>
                    <div className="empty-title">Create your first Instagram campaign</div>
                    <div className="empty-sub">
                      Paste an Instagram post URL and create an automated follow-up message for people who engage with it.
                    </div>
                    <button className="btn-primary" onClick={() => setShowNewPost(true)}>Create Campaign</button>
                  </div>
                ) : (
                  campaigns.map((campaign, index) => (
                    <div className="campaign-card" key={campaign.id}>
                      <div className="campaign-top">
                        <div>
                          <div className="campaign-name">{getCampaignName(campaign, index)}</div>
                          <div className="campaign-url">{campaign.post_url}</div>
                          <div className="campaign-preview">&quot;{campaign.dm_message?.slice(0, 110)}...&quot;</div>
                        </div>

                        <span className={`status-pill ${campaign.status === "Active" ? "status-active" : "status-paused"}`}>
                          {campaign.status}
                        </span>
                      </div>

                      <div className="campaign-actions">
                        <a href={campaign.post_url} target="_blank" rel="noreferrer" className="btn-outline">
                          <Icon name="external" size={14} />
                          Open Post
                        </a>

                        <button className="btn-outline" onClick={() => toggleCampaign(campaign)}>
                          {campaign.status === "Active" ? "Pause" : "Resume"}
                        </button>

                        <button className="btn-danger" onClick={() => deleteCampaign(campaign.id)}>
                          <Icon name="trash" size={14} />
                          Delete
                        </button>

                        <div style={{ marginLeft: "auto", fontSize: "0.72rem", color: "#819693", fontFamily: "Inter,sans-serif", alignSelf: "center" }}>
                          {getTimeAgo(campaign.created_at)}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </>
            )}
          </div>
        </section>
      </div>

      {showNewPost && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-title">Create Instagram Campaign</div>
            <div className="modal-sub">
              Paste an Instagram post URL and write the message that will be sent to prospects.
            </div>

            <form onSubmit={handleAddPost}>
              <label className="form-label">Instagram Post URL</label>
              <input
                className="form-input"
                placeholder="https://www.instagram.com/p/..."
                value={postUrl}
                onChange={(e) => setPostUrl(e.target.value)}
                required
              />

              <label className="form-label">Message Template</label>

              <textarea
                className="form-textarea"
                placeholder={`Hey [Name],\n\nThanks for engaging with our post. Would love to share more details.\n\n[Link]`}
                value={dmMessage}
                onChange={(e) => setDmMessage(e.target.value)}
                required
              />

              <div className="modal-btns">
                <button type="button" className="modal-cancel" onClick={() => setShowNewPost(false)}>Cancel</button>
                <button type="submit" className="modal-submit" disabled={loading}>
                  {loading ? "Starting..." : "Start Campaign →"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}