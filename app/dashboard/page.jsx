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
    campaigns: (
      <svg {...common}>
        <path d="M4 4h16v16H4z" />
        <path d="M8 8h8" />
        <path d="M8 12h8" />
        <path d="M8 16h5" />
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
    hot: (
      <svg {...common}>
        <path d="M13 3s1 3-2 5c-2 1.5-3 3-3 5a5 5 0 0 0 10 0c0-3-2-5-5-10z" />
      </svg>
    ),
    warm: (
      <svg {...common}>
        <circle cx="12" cy="12" r="5" />
        <path d="M12 1v2" />
        <path d="M12 21v2" />
        <path d="M4.22 4.22l1.42 1.42" />
        <path d="M18.36 18.36l1.42 1.42" />
        <path d="M1 12h2" />
        <path d="M21 12h2" />
      </svg>
    ),
    cold: (
      <svg {...common}>
        <path d="M12 2v20" />
        <path d="M17 5l-5 5-5-5" />
        <path d="M17 19l-5-5-5 5" />
        <path d="M2 12h20" />
      </svg>
    ),
    external: (
      <svg {...common}>
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
        <path d="M15 3h6v6" />
        <path d="M10 14L21 3" />
      </svg>
    ),
    archive: (
      <svg {...common}>
        <rect x="3" y="4" width="18" height="5" rx="1" />
        <path d="M5 9v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V9" />
        <path d="M10 13h4" />
      </svg>
    ),
  };

  return icons[name] || null;
}

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [campaigns, setCampaigns] = useState([]);
  const [leads, setLeads] = useState([]);
  const [allLeads, setAllLeads] = useState([]);
  const [agencyClients, setAgencyClients] = useState([]);
  const [leadSearch, setLeadSearch] = useState("");
  const [scoreFilter, setScoreFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("campaigns");
  const [showNewCampaign, setShowNewCampaign] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [postUrl, setPostUrl] = useState("");
  const [dmMessage, setDmMessage] = useState("");
  const [campaignPlatform, setCampaignPlatform] = useState("linkedin");
  const [selectedClientId, setSelectedClientId] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [analyticsRange, setAnalyticsRange] = useState("7d");

  useEffect(() => {
    document.title = "Dashboard — LeadMagnet Inc";

    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
        window.location.href = "/login";
        return;
      }

      setUser(data.user);
      loadCampaigns(data.user.id);
      loadAllLeads(data.user.id);
      loadAgencyClients(data.user.id);
    });
  }, []);

  const loadCampaigns = async (userId) => {
    const { data } = await supabase
      .from("campaigns")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (data) setCampaigns(data);
  };

  const loadLeads = async (campaignId) => {
    const { data } = await supabase
      .from("leads")
      .select("*")
      .eq("campaign_id", campaignId)
      .order("created_at", { ascending: false });

    if (data) setLeads(data);
  };

  const loadAllLeads = async (userId) => {
    const { data } = await supabase
      .from("leads")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (data) setAllLeads(data);
  };

  const loadAgencyClients = async (userId) => {
    const { data } = await supabase
      .from("agency_clients")
      .select("*")
      .eq("agency_user_id", userId)
      .order("name", { ascending: true });

    if (data) setAgencyClients(data);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  const handleCreateCampaign = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/automation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "scrape_post",
          postUrl,
          dmMessage,
          userId: user.id,
          platform: campaignPlatform,
        }),
      });

      const data = await response.json();

      if (data.success) {
        const insertData = {
          user_id: user.id,
          post_url: postUrl,
          dm_message: dmMessage,
          status: "Active",
          container_id: data.containerId,
          platform: campaignPlatform,
        };

        if (selectedClientId) insertData.client_id = selectedClientId;

        const { data: campaign } = await supabase
          .from("campaigns")
          .insert(insertData)
          .select()
          .single();

        if (campaign) setCampaigns((prev) => [campaign, ...prev]);

        setPostUrl("");
        setDmMessage("");
        setShowNewCampaign(false);
        setSelectedClientId("");
        setSuccess(`${campaignPlatform === "linkedin" ? "LinkedIn" : "Instagram"} campaign started successfully.`);

        setTimeout(() => setSuccess(""), 5000);
      } else {
        setError("Failed: " + (data.error || "Unknown error"));
      }
    } catch (err) {
      setError("Error: " + err.message);
    }

    setLoading(false);
  };

  const handleViewLeads = (campaign) => {
    setSelectedCampaign((prev) => (prev?.id === campaign.id ? null : campaign));
    loadLeads(campaign.id);
  };

  const exportLeadsCSV = () => {
    const headers = ["Name", "Headline", "Company", "Location", "Email", "Score", "Score Reason", "Client", "LinkedIn", "Collected"];

    const rows = allLeads.map((lead) => {
      const client = agencyClients.find((item) => item.id === lead.client_id);

      return [
        lead.name,
        lead.headline,
        lead.company,
        lead.location,
        lead.email,
        lead.lead_score || "—",
        lead.lead_score_reason || "—",
        client?.name || "—",
        lead.linkedin_url,
        new Date(lead.created_at).toLocaleDateString(),
      ];
    });

    const csv = [headers, ...rows].map((row) => row.map((value) => `"${value || ""}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");

    anchor.href = url;
    anchor.download = "leads.csv";
    anchor.click();
  };

  const archiveLead = async (id) => {
    await supabase.from("leads").delete().eq("id", id);
    setAllLeads((prev) => prev.filter((lead) => lead.id !== id));
  };

  const getDailyLeads = () => {
    const days = analyticsRange === "7d" ? 7 : analyticsRange === "14d" ? 14 : 30;
    const result = [];

    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);

      const count = allLeads.filter((lead) => new Date(lead.created_at).toDateString() === date.toDateString()).length;

      result.push({
        date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        count,
      });
    }

    return result;
  };

  const getLeadsInRange = (days) => {
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - days);

    return allLeads.filter((lead) => new Date(lead.created_at) >= cutoff).length;
  };

  const getCampaignName = (campaign, index) => {
    const platform = campaign.platform === "instagram" ? "Instagram" : "LinkedIn";

    try {
      const url = new URL(campaign.post_url);
      const parts = url.pathname.split("/").filter(Boolean);

      if (campaign.platform === "instagram" && parts.length >= 2) {
        return `${platform} Campaign — Post ${parts[1]?.slice(0, 8)}`;
      }

      if (parts.length >= 2) {
        const slug = parts[1]?.split("-").slice(0, 5).join(" ");

        if (slug && slug.length > 3) {
          return slug.charAt(0).toUpperCase() + slug.slice(1);
        }
      }
    } catch {}

    return `${platform} Campaign #${index + 1}`;
  };

  const getClientName = (clientId) => {
    if (!clientId) return null;

    const client = agencyClients.find((item) => item.id === clientId);

    return client?.name || null;
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

  const getGreeting = () => {
    const hour = new Date().getHours();

    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";

    return "Good evening";
  };

  const getUserName = () => {
    if (!user?.email) return "";

    return user.email
      .split("@")[0]
      .replace(/[._]/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const getScoreBadge = (score) => {
    if (score === "hot") {
      return { label: "Hot", bg: "rgba(239,68,68,0.08)", border: "rgba(239,68,68,0.18)", color: "#ef4444" };
    }

    if (score === "warm") {
      return { label: "Warm", bg: "rgba(245,158,11,0.10)", border: "rgba(245,158,11,0.24)", color: "#b45309" };
    }

    if (score === "cold") {
      return { label: "Cold", bg: "rgba(59,130,246,0.08)", border: "rgba(59,130,246,0.22)", color: "#2563eb" };
    }

    return { label: "N/A", bg: "rgba(23,56,56,0.04)", border: "rgba(23,56,56,0.08)", color: "#819693" };
  };

  const hotCount = allLeads.filter((lead) => lead.lead_score === "hot").length;
  const warmCount = allLeads.filter((lead) => lead.lead_score === "warm").length;
  const coldCount = allLeads.filter((lead) => lead.lead_score === "cold").length;
  const totalLeads = allLeads.length;

  const filteredLeads = allLeads.filter((lead) => {
    if (scoreFilter !== "all" && lead.lead_score !== scoreFilter) return false;

    if (!leadSearch) return true;

    const search = leadSearch.toLowerCase();

    return (
      lead.name?.toLowerCase().includes(search) ||
      lead.headline?.toLowerCase().includes(search) ||
      lead.company?.toLowerCase().includes(search) ||
      lead.location?.toLowerCase().includes(search)
    );
  });

  const dailyLeads = getDailyLeads();
  const maxCount = Math.max(...dailyLeads.map((day) => day.count), 1);

  const platformBtn = (id) => ({
    type: "button",
    onClick: () => setCampaignPlatform(id),
    className: `platform-choice ${campaignPlatform === id ? "active" : ""}`,
  });

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
        }

        .nav-item {
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
          border: none;
          text-align: left;
        }

        .nav-item:hover {
          background: rgba(255,127,103,0.07);
          color: #173838;
        }

        .nav-item.active {
          background: rgba(255,127,103,0.12);
          color: #ff7f67;
          font-weight: 800;
        }

        .nav-item.active::before {
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

        .nav-icon {
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

        .nav-item.active .nav-icon {
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
          padding: 2.6rem 3rem 3.5rem;
          width: 100%;
        }

        .content-inner {
          width: 100%;
          max-width: 1180px;
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

        .welcome-section,
        .page-header {
          margin-bottom: 1.75rem;
        }

        .welcome-greeting,
        .page-title {
          font-size: 1.9rem;
          font-weight: 900;
          color: #173838;
          letter-spacing: -0.045em;
          margin-bottom: 0.4rem;
        }

        .welcome-sub,
        .page-sub {
          font-size: 0.9rem;
          color: #5f7774;
          line-height: 1.6;
          font-family: 'Inter', sans-serif;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(150px, 1fr));
          gap: 0.9rem;
          margin-bottom: 2rem;
        }

        .stat-card,
        .campaign-card,
        .empty-state,
        .table-wrap,
        .chart-card,
        .analytics-card {
          background: linear-gradient(145deg,#ffffff,#f8fbfa);
          border: 1px solid rgba(23,56,56,0.08);
          box-shadow: 0 16px 34px rgba(23,56,56,0.05);
        }

        .stat-card {
          border-radius: 16px;
          padding: 1.2rem 1.25rem;
        }

        .stat-icon-wrap {
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

        .stat-val {
          font-size: 1.75rem;
          font-weight: 900;
          color: #ff7f67;
          letter-spacing: -0.04em;
          line-height: 1;
        }

        .stat-lbl {
          font-size: 0.68rem;
          color: #819693;
          margin-top: 0.35rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          font-family: 'Inter', sans-serif;
          font-weight: 800;
        }

        .section-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.125rem;
          gap: 1rem;
        }

        .section-title {
          font-size: 1.02rem;
          font-weight: 900;
          color: #173838;
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

        .btn-primary:disabled {
          opacity: 0.45;
          cursor: not-allowed;
          transform: none;
        }

        .btn-outline,
        .btn-danger {
          background: #ffffff;
          border: 1px solid rgba(23,56,56,0.10);
          color: #5f7774;
          font-family: 'Inter', sans-serif;
          font-weight: 700;
          font-size: 0.8rem;
          padding: 0.48rem 0.88rem;
          border-radius: 8px;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          text-decoration: none;
        }

        .btn-outline:hover {
          border-color: rgba(255,127,103,0.28);
          color: #ff7f67;
          background: rgba(255,127,103,0.05);
        }

        .btn-danger {
          border-color: rgba(239,68,68,0.16);
          color: #ef4444;
        }

        .campaign-card {
          border-radius: 16px;
          padding: 1.25rem;
          margin-bottom: 0.75rem;
        }

        .campaign-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 1rem;
        }

        .campaign-info {
          flex: 1;
          min-width: 0;
        }

        .campaign-header-row {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          margin-bottom: 0.5rem;
          flex-wrap: wrap;
        }

        .platform-icon {
          width: 34px;
          height: 34px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          background: rgba(143,200,193,0.16);
          border: 1px solid rgba(143,200,193,0.30);
          color: #2f625d;
        }

        .campaign-name {
          font-size: 0.98rem;
          font-weight: 900;
          color: #173838;
        }

        .client-tag {
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.68rem;
          font-weight: 800;
          padding: 0.15rem 0.55rem;
          border-radius: 100px;
          background: rgba(255,127,103,0.08);
          border: 1px solid rgba(255,127,103,0.18);
          color: #ff7f67;
          font-family: 'Inter', sans-serif;
          white-space: nowrap;
          margin-left: 0.4rem;
        }

        .campaign-dm-preview {
          font-size: 0.78rem;
          color: #819693;
          font-style: italic;
          margin-top: 0.4rem;
          line-height: 1.45;
          font-family: 'Inter', sans-serif;
        }

        .campaign-right {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          flex-shrink: 0;
        }

        .campaign-metric {
          text-align: center;
        }

        .campaign-metric-val {
          font-size: 1.15rem;
          font-weight: 900;
          color: #173838;
          display: block;
        }

        .campaign-metric-lbl {
          font-size: 0.62rem;
          color: #819693;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-weight: 800;
          font-family: 'Inter', sans-serif;
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

        .campaign-footer {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-top: 1rem;
          padding-top: 0.875rem;
          border-top: 1px solid rgba(23,56,56,0.08);
        }

        .campaign-date {
          font-size: 0.72rem;
          color: #819693;
          margin-left: auto;
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

        .empty-sub,
        .no-leads {
          font-size: 0.86rem;
          color: #5f7774;
          margin-bottom: 1.75rem;
          line-height: 1.6;
          font-family: 'Inter', sans-serif;
        }

        .no-leads {
          margin-top: 1rem;
          margin-bottom: 0;
          padding: 1rem;
          background: rgba(23,56,56,0.03);
          border-radius: 12px;
        }

        .table-wrap {
          border-radius: 16px;
          overflow: hidden;
        }

        .leads-table {
          width: 100%;
          border-collapse: collapse;
        }

        .leads-table th {
          font-size: 0.66rem;
          color: #819693;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          padding: 0.78rem 0.85rem;
          text-align: left;
          border-bottom: 1px solid rgba(23,56,56,0.08);
          font-weight: 900;
          background: rgba(23,56,56,0.025);
          font-family: 'Inter', sans-serif;
        }

        .leads-table td {
          font-size: 0.82rem;
          color: #5f7774;
          padding: 0.78rem 0.85rem;
          border-bottom: 1px solid rgba(23,56,56,0.06);
          font-family: 'Inter', sans-serif;
        }

        .lead-name {
          font-weight: 900;
          color: #173838;
        }

        .lead-sub {
          font-size: 0.7rem;
          color: #819693;
          margin-top: 0.2rem;
        }

        .score-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          font-size: 0.72rem;
          font-weight: 900;
          padding: 0.2rem 0.6rem;
          border-radius: 100px;
          white-space: nowrap;
        }

        .score-badge-tooltip {
          position: relative;
        }

        .score-tooltip {
          display: none;
          position: absolute;
          bottom: calc(100% + 6px);
          left: 50%;
          transform: translateX(-50%);
          background: #ffffff;
          border: 1px solid rgba(23,56,56,0.10);
          border-radius: 8px;
          padding: 0.5rem 0.7rem;
          font-size: 0.72rem;
          color: #5f7774;
          font-weight: 500;
          white-space: normal;
          width: 220px;
          text-align: center;
          z-index: 20;
          box-shadow: 0 12px 26px rgba(23,56,56,0.12);
          line-height: 1.4;
        }

        .score-badge-tooltip:hover .score-tooltip {
          display: block;
        }

        .search-row {
          display: flex;
          gap: 0.75rem;
          margin-bottom: 1rem;
        }

        .search-input,
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
        }

        .search-input:focus,
        .form-input:focus,
        .form-select:focus,
        .form-textarea:focus {
          border-color: rgba(255,127,103,0.38);
        }

        .search-input::placeholder,
        .form-input::placeholder,
        .form-textarea::placeholder {
          color: #819693;
        }

        .filter-row {
          margin-bottom: 1.25rem;
        }

        .score-filters {
          display: flex;
          gap: 0.35rem;
          flex-wrap: wrap;
        }

        .score-filter-btn {
          background: #ffffff;
          border: 1px solid rgba(23,56,56,0.08);
          color: #819693;
          font-size: 0.78rem;
          padding: 0.42rem 0.88rem;
          border-radius: 100px;
          cursor: pointer;
          font-weight: 800;
          display: flex;
          align-items: center;
          gap: 0.3rem;
        }

        .score-filter-btn.active {
          background: rgba(255,127,103,0.10);
          border-color: rgba(255,127,103,0.25);
          color: #ff7f67;
        }

        .filter-count {
          font-size: 0.65rem;
          opacity: 0.75;
        }

        .analytics-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(140px, 1fr));
          gap: 0.9rem;
          margin-bottom: 1rem;
        }

        .analytics-card {
          border-radius: 16px;
          padding: 1.2rem;
        }

        .analytics-val {
          font-size: 1.65rem;
          font-weight: 900;
          color: #ff7f67;
          letter-spacing: -0.04em;
        }

        .analytics-lbl {
          font-size: 0.78rem;
          font-weight: 900;
          color: #173838;
          margin-top: 0.3rem;
        }

        .analytics-sub {
          font-size: 0.72rem;
          color: #819693;
          margin-top: 0.2rem;
          font-family: 'Inter', sans-serif;
        }

        .range-tabs {
          display: flex;
          gap: 0.35rem;
          margin-bottom: 1rem;
          background: rgba(255,255,255,0.8);
          padding: 0.25rem;
          border-radius: 11px;
          border: 1px solid rgba(23,56,56,0.08);
          width: fit-content;
        }

        .range-tab {
          background: transparent;
          border: none;
          color: #5f7774;
          font-size: 0.82rem;
          padding: 0.52rem 1.15rem;
          border-radius: 9px;
          cursor: pointer;
          font-weight: 800;
        }

        .range-tab.active {
          background: rgba(255,127,103,0.12);
          color: #ff7f67;
        }

        .chart-card {
          border-radius: 16px;
          padding: 1.25rem;
          margin-bottom: 1rem;
        }

        .chart-title {
          font-size: 0.98rem;
          font-weight: 900;
          color: #173838;
          margin-bottom: 1.25rem;
        }

        .bar-chart {
          display: flex;
          align-items: end;
          gap: 0.65rem;
          height: 170px;
        }

        .bar-wrap {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: end;
          height: 100%;
        }

        .bar-val {
          font-size: 0.7rem;
          color: #5f7774;
          height: 18px;
          font-weight: 800;
        }

        .bar {
          width: 100%;
          max-width: 34px;
          background: linear-gradient(180deg,#ff7f67,#8fc8c1);
          border-radius: 7px 7px 0 0;
        }

        .bar-label {
          font-size: 0.65rem;
          color: #819693;
          margin-top: 0.45rem;
          white-space: nowrap;
          font-family: 'Inter', sans-serif;
        }

        .location-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 0.75rem;
        }

        .location-name {
          width: 140px;
          font-size: 0.8rem;
          color: #173838;
          font-weight: 800;
        }

        .location-bar-wrap {
          flex: 1;
          height: 8px;
          background: rgba(23,56,56,0.08);
          border-radius: 100px;
          overflow: hidden;
        }

        .location-bar {
          height: 100%;
          background: linear-gradient(90deg,#ff7f67,#8fc8c1);
          border-radius: 100px;
        }

        .location-count {
          width: 34px;
          text-align: right;
          font-size: 0.78rem;
          font-weight: 900;
          color: #173838;
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

        .form-select,
        .form-input,
        .form-textarea {
          margin-bottom: 1rem;
        }

        .form-textarea {
          resize: vertical;
          min-height: 120px;
        }

        .platform-row {
          display: flex;
          gap: 0.75rem;
          margin-bottom: 1rem;
        }

        .platform-choice {
          flex: 1;
          padding: 0.75rem;
          border-radius: 10px;
          border: 1px solid rgba(23,56,56,0.10);
          background: #ffffff;
          color: #5f7774;
          cursor: pointer;
          font-family: 'Inter', sans-serif;
          font-weight: 800;
          font-size: 0.875rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          transition: all 0.15s;
        }

        .platform-choice.active {
          background: rgba(255,127,103,0.10);
          border-color: rgba(255,127,103,0.28);
          color: #ff7f67;
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
          .stats-grid,
          .analytics-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media(max-width:900px) {
          .sidebar {
            display: none;
          }

          .content {
            padding: 2rem 1.25rem 2.5rem;
          }

          .campaign-top,
          .campaign-right {
            flex-direction: column;
            align-items: flex-start;
          }

          .search-row {
            flex-direction: column;
          }
        }

        @media(max-width:650px) {
          .user-email {
            display: none;
          }

          .stats-grid,
          .analytics-grid {
            grid-template-columns: 1fr;
          }

          .platform-row,
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

          <button className={`nav-item ${activeTab === "campaigns" ? "active" : ""}`} onClick={() => setActiveTab("campaigns")}>
            <span className="nav-icon"><Icon name="campaigns" /></span>
            Campaigns
          </button>

          <button className={`nav-item ${activeTab === "leads" ? "active" : ""}`} onClick={() => setActiveTab("leads")}>
            <span className="nav-icon"><Icon name="leads" /></span>
            All Leads
          </button>

          <button className={`nav-item ${activeTab === "analytics" ? "active" : ""}`} onClick={() => setActiveTab("analytics")}>
            <span className="nav-icon"><Icon name="analytics" /></span>
            Analytics
          </button>

          <div className="sidebar-section">Platforms</div>

          <a href="/linkedin" className="nav-item">
            <span className="nav-icon"><Icon name="linkedin" /></span>
            LinkedIn
          </a>

          <a href="/instagram" className="nav-item">
            <span className="nav-icon"><Icon name="instagram" /></span>
            Instagram
          </a>

          <a href="/gmail" className="nav-item">
            <span className="nav-icon"><Icon name="gmail" /></span>
            Gmail
          </a>

          <div className="sidebar-section">Agency</div>

          <a href="/agency" className="nav-item">
            <span className="nav-icon"><Icon name="client" /></span>
            Client Manager
          </a>

          <a href="/agency/lead-radar" className="nav-item">
            <span className="nav-icon"><Icon name="radar" /></span>
            Lead Radar
          </a>

          <div className="sidebar-section">Account</div>

          <button className="nav-item" onClick={() => window.location.href = "/settings"}>
            <span className="nav-icon"><Icon name="settings" /></span>
            Settings
          </button>

          <button className="nav-item" onClick={() => window.location.href = "/pricing"}>
            <span className="nav-icon"><Icon name="billing" /></span>
            Billing
          </button>

          <button className="nav-item" onClick={() => window.location.href = "/contact"}>
            <span className="nav-icon"><Icon name="support" /></span>
            Support
          </button>

          <div className="sidebar-footer">
            <div className="plan-pill">
              <div className="plan-name">Free Trial</div>
              <div className="plan-sub">7 days remaining</div>
            </div>
          </div>
        </aside>

        <section className="content">
          <div className="content-inner">
            {success && <div className="success-bar">{success}</div>}
            {error && <div className="error-bar">{error}</div>}

            {activeTab === "campaigns" && (
              <>
                <div className="welcome-section">
                  <h1 className="welcome-greeting">{getGreeting()}, {getUserName()}</h1>
                  <p className="welcome-sub">Here&apos;s what&apos;s happening with your lead generation today.</p>
                </div>

                <div className="stats-grid">
                  <div className="stat-card">
                    <div className="stat-icon-wrap"><Icon name="campaigns" /></div>
                    <div className="stat-val">{campaigns.length}</div>
                    <div className="stat-lbl">Campaigns</div>
                  </div>

                  <div className="stat-card">
                    <div className="stat-icon-wrap"><Icon name="leads" /></div>
                    <div className="stat-val">{totalLeads}</div>
                    <div className="stat-lbl">Total Leads</div>
                  </div>

                  <div className="stat-card">
                    <div className="stat-icon-wrap"><Icon name="hot" /></div>
                    <div className="stat-val">{hotCount}</div>
                    <div className="stat-lbl">Hot Leads</div>
                  </div>

                  <div className="stat-card">
                    <div className="stat-icon-wrap"><Icon name="analytics" /></div>
                    <div className="stat-val">7</div>
                    <div className="stat-lbl">Trial Days</div>
                  </div>
                </div>

                <div className="section-header">
                  <span className="section-title">Your Campaigns</span>
                  <button className="btn-primary" onClick={() => setShowNewCampaign(true)}>+ New Campaign</button>
                </div>

                {campaigns.length === 0 ? (
                  <div className="empty-state">
                    <span className="empty-icon"><Icon name="plus" size={24} /></span>
                    <div className="empty-title">Launch your first campaign</div>
                    <div className="empty-sub">Start automating your LinkedIn or Instagram lead magnet flow in under 2 minutes.</div>
                    <button className="btn-primary" onClick={() => setShowNewCampaign(true)}>Create Campaign</button>
                  </div>
                ) : (
                  campaigns.map((campaign, index) => (
                    <div className="campaign-card" key={campaign.id}>
                      <div className="campaign-top">
                        <div className="campaign-info">
                          <div className="campaign-header-row">
                            <div className="platform-icon">
                              <Icon name={campaign.platform === "instagram" ? "instagram" : "linkedin"} />
                            </div>

                            <div>
                              <div className="campaign-name">
                                {getCampaignName(campaign, index)}
                                {getClientName(campaign.client_id) && (
                                  <span className="client-tag">{getClientName(campaign.client_id)}</span>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="campaign-dm-preview">
                            &ldquo;{campaign.dm_message?.slice(0, 80)}{campaign.dm_message?.length > 80 ? "..." : ""}&rdquo;
                          </div>
                        </div>

                        <div className="campaign-right">
                          <div className="campaign-metric">
                            <span className="campaign-metric-val">{campaign.leads_count || 0}</span>
                            <span className="campaign-metric-lbl">Leads</span>
                          </div>

                          <div className="campaign-metric">
                            <span className="campaign-metric-val">{campaign.dms_sent || 0}</span>
                            <span className="campaign-metric-lbl">DMs</span>
                          </div>

                          <span className={`status-pill ${campaign.status === "Paused" ? "status-paused" : "status-active"}`}>
                            {campaign.status}
                          </span>
                        </div>
                      </div>

                      <div className="campaign-footer">
                        <button className="btn-outline" onClick={() => handleViewLeads(campaign)}>
                          {selectedCampaign?.id === campaign.id ? "Hide leads" : "View leads"}
                        </button>

                        <span className="campaign-date">{getTimeAgo(campaign.created_at)}</span>
                      </div>

                      {selectedCampaign?.id === campaign.id && (
                        leads.length === 0 ? (
                          <div className="no-leads">No leads collected yet — automation is running.</div>
                        ) : (
                          <div className="table-wrap" style={{ marginTop: "1rem" }}>
                            <table className="leads-table">
                              <thead>
                                <tr>
                                  <th>Name</th>
                                  <th>Headline</th>
                                  <th>Score</th>
                                  <th>LinkedIn</th>
                                  <th>Collected</th>
                                </tr>
                              </thead>

                              <tbody>
                                {leads.map((lead) => {
                                  const badge = getScoreBadge(lead.lead_score);

                                  return (
                                    <tr key={lead.id}>
                                      <td className="lead-name">{lead.name}</td>

                                      <td style={{ fontSize: "0.775rem", color: "#5f7774", maxWidth: "220px" }}>
                                        {lead.headline?.slice(0, 55)}
                                        {lead.headline?.length > 55 ? "..." : ""}
                                      </td>

                                      <td>
                                        <div className="score-badge-tooltip">
                                          <span className="score-badge" style={{ background: badge.bg, border: `1px solid ${badge.border}`, color: badge.color }}>
                                            {badge.label}
                                          </span>
                                          {lead.lead_score_reason && <div className="score-tooltip">{lead.lead_score_reason}</div>}
                                        </div>
                                      </td>

                                      <td>
                                        {lead.linkedin_url ? (
                                          <a href={lead.linkedin_url} target="_blank" rel="noreferrer" style={{ color: "#ff7f67", fontSize: "0.775rem", fontWeight: 800 }}>
                                            View
                                          </a>
                                        ) : "—"}
                                      </td>

                                      <td style={{ fontSize: "0.7rem", color: "#819693" }}>{getTimeAgo(lead.created_at)}</td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          </div>
                        )
                      )}
                    </div>
                  ))
                )}
              </>
            )}

            {activeTab === "leads" && (
              <>
                <div className="page-header">
                  <h1 className="page-title">All Leads</h1>
                  <p className="page-sub">Every contact collected across all your campaigns.</p>
                </div>

                <div className="search-row">
                  <input
                    className="search-input"
                    placeholder="Search by name, headline, company or location..."
                    value={leadSearch}
                    onChange={(e) => setLeadSearch(e.target.value)}
                  />
                  <button className="btn-primary" onClick={exportLeadsCSV}>Export CSV</button>
                </div>

                <div className="filter-row">
                  <div className="score-filters">
                    {[
                      { id: "all", label: "All", count: totalLeads },
                      { id: "hot", label: "Hot", count: hotCount },
                      { id: "warm", label: "Warm", count: warmCount },
                      { id: "cold", label: "Cold", count: coldCount },
                    ].map((filter) => (
                      <button
                        key={filter.id}
                        className={`score-filter-btn ${scoreFilter === filter.id ? "active" : ""}`}
                        onClick={() => setScoreFilter(filter.id)}
                      >
                        {filter.label} <span className="filter-count">{filter.count}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {filteredLeads.length === 0 ? (
                  <div className="empty-state">
                    <span className="empty-icon"><Icon name="leads" size={24} /></span>
                    <div className="empty-title">{scoreFilter !== "all" ? `No ${scoreFilter} leads yet` : "No leads yet"}</div>
                    <div className="empty-sub">{scoreFilter !== "all" ? "Try a different filter or wait for more leads." : "Create a campaign to start collecting leads."}</div>
                  </div>
                ) : (
                  <div className="table-wrap" style={{ overflowX: "auto" }}>
                    <table className="leads-table" style={{ minWidth: "950px" }}>
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Headline</th>
                          <th>Company</th>
                          <th>Score</th>
                          <th>Client</th>
                          <th>Location</th>
                          <th>LinkedIn</th>
                          <th>Collected</th>
                          <th>Actions</th>
                        </tr>
                      </thead>

                      <tbody>
                        {filteredLeads.map((lead) => {
                          const badge = getScoreBadge(lead.lead_score);
                          const clientName = getClientName(lead.client_id);

                          return (
                            <tr key={lead.id}>
                              <td>
                                <div className="lead-name">{lead.name}</div>
                                {lead.email && <div className="lead-sub">{lead.email}</div>}
                              </td>

                              <td style={{ maxWidth: "180px", fontSize: "0.775rem", color: "#5f7774" }}>
                                {lead.headline?.slice(0, 50)}
                                {lead.headline?.length > 50 ? "..." : ""}
                              </td>

                              <td style={{ fontSize: "0.82rem", color: "#5f7774" }}>{lead.company || "—"}</td>

                              <td>
                                <div className="score-badge-tooltip">
                                  <span className="score-badge" style={{ background: badge.bg, border: `1px solid ${badge.border}`, color: badge.color }}>
                                    {badge.label}
                                  </span>
                                  {lead.lead_score_reason && <div className="score-tooltip">{lead.lead_score_reason}</div>}
                                </div>
                              </td>

                              <td>{clientName ? <span className="client-tag">{clientName}</span> : <span style={{ color: "#819693" }}>—</span>}</td>

                              <td style={{ fontSize: "0.82rem", color: "#5f7774" }}>{lead.location || "—"}</td>

                              <td>
                                {lead.linkedin_url ? (
                                  <a href={lead.linkedin_url} target="_blank" rel="noreferrer" style={{ color: "#ff7f67", fontSize: "0.775rem", fontWeight: 800 }}>
                                    View
                                  </a>
                                ) : "—"}
                              </td>

                              <td style={{ fontSize: "0.7rem", color: "#819693", whiteSpace: "nowrap" }}>{getTimeAgo(lead.created_at)}</td>

                              <td>
                                <div style={{ display: "flex", gap: "0.375rem" }}>
                                  {lead.linkedin_url && (
                                    <button className="btn-outline" style={{ fontSize: "0.72rem", padding: "0.25rem 0.55rem" }} onClick={() => window.open(lead.linkedin_url, "_blank")}>
                                      DM
                                    </button>
                                  )}
                                  <button className="btn-danger" onClick={() => archiveLead(lead.id)}>
                                    <Icon name="archive" size={13} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </>
            )}

            {activeTab === "analytics" && (
              <>
                <div className="page-header">
                  <h1 className="page-title">Analytics</h1>
                  <p className="page-sub">Track your lead generation performance over time.</p>
                </div>

                <div className="range-tabs">
                  {["7d", "14d", "30d"].map((range) => (
                    <button
                      key={range}
                      className={`range-tab ${analyticsRange === range ? "active" : ""}`}
                      onClick={() => setAnalyticsRange(range)}
                    >
                      {range === "7d" ? "7 days" : range === "14d" ? "14 days" : "30 days"}
                    </button>
                  ))}
                </div>

                <div className="analytics-grid">
                  <div className="analytics-card">
                    <div className="analytics-val">{getLeadsInRange(analyticsRange === "7d" ? 7 : analyticsRange === "14d" ? 14 : 30)}</div>
                    <div className="analytics-lbl">New Leads</div>
                    <div className="analytics-sub">in selected period</div>
                  </div>

                  <div className="analytics-card">
                    <div className="analytics-val" style={{ color: "#ef4444" }}>{hotCount}</div>
                    <div className="analytics-lbl">Hot Leads</div>
                    <div className="analytics-sub">high priority</div>
                  </div>

                  <div className="analytics-card">
                    <div className="analytics-val" style={{ color: "#b45309" }}>{warmCount}</div>
                    <div className="analytics-lbl">Warm Leads</div>
                    <div className="analytics-sub">worth following up</div>
                  </div>

                  <div className="analytics-card">
                    <div className="analytics-val" style={{ color: "#2563eb" }}>{coldCount}</div>
                    <div className="analytics-lbl">Cold Leads</div>
                    <div className="analytics-sub">low priority</div>
                  </div>
                </div>

                <div className="chart-card">
                  <div className="chart-title">Daily New Leads</div>

                  <div className="bar-chart">
                    {dailyLeads.map((day, index) => (
                      <div className="bar-wrap" key={index}>
                        <div className="bar-val">{day.count > 0 ? day.count : ""}</div>
                        <div className="bar" style={{ height: `${Math.max((day.count / maxCount) * 110, 4)}px` }} title={`${day.date}: ${day.count}`} />
                        <div className="bar-label">{day.date}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="chart-card">
                  <div className="chart-title">Leads by Location</div>

                  {allLeads.length === 0 ? (
                    <div style={{ color: "#819693", fontSize: "0.82rem" }}>No data yet</div>
                  ) : (
                    (() => {
                      const locationCounts = {};

                      allLeads.forEach((lead) => {
                        const location = lead.location || "Unknown";
                        locationCounts[location] = (locationCounts[location] || 0) + 1;
                      });

                      return Object.entries(locationCounts)
                        .sort((a, b) => b[1] - a[1])
                        .map(([location, count]) => (
                          <div key={location} className="location-row">
                            <div className="location-name">{location}</div>
                            <div className="location-bar-wrap">
                              <div className="location-bar" style={{ width: `${(count / allLeads.length) * 100}%` }} />
                            </div>
                            <div className="location-count">{count}</div>
                          </div>
                        ));
                    })()
                  )}
                </div>
              </>
            )}
          </div>
        </section>
      </div>

      {showNewCampaign && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-title">New Campaign</div>
            <div className="modal-sub">Choose your platform, assign a client, and write the message your leads will receive.</div>

            <form onSubmit={handleCreateCampaign}>
              <label className="form-label">Platform</label>

              <div className="platform-row">
                <button {...platformBtn("linkedin")}>
                  <Icon name="linkedin" size={16} />
                  LinkedIn
                </button>

                <button {...platformBtn("instagram")}>
                  <Icon name="instagram" size={16} />
                  Instagram
                </button>
              </div>

              <label className="form-label">Assign to Client <span style={{ opacity: 0.55, textTransform: "none", fontWeight: 600 }}>(optional)</span></label>

              <select className="form-select" value={selectedClientId} onChange={(e) => setSelectedClientId(e.target.value)}>
                <option value="">No client assigned</option>
                {agencyClients.map((client) => (
                  <option key={client.id} value={client.id}>
                    {client.name}{client.company ? ` — ${client.company}` : ""}
                  </option>
                ))}
              </select>

              <label className="form-label">Post URL</label>

              <input
                className="form-input"
                placeholder={campaignPlatform === "linkedin" ? "https://www.linkedin.com/posts/..." : "https://www.instagram.com/p/..."}
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
                <button type="button" className="modal-cancel" onClick={() => setShowNewCampaign(false)}>
                  Cancel
                </button>

                <button type="submit" className="modal-submit" disabled={loading}>
                  {loading ? "Starting..." : "Start Campaign"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}