"use client";
import { useState, useEffect, useRef } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const COMPANY_SIZES = ["1-10", "11-50", "51-200", "201-500", "501-1000", "1000+"];

const PLATFORM_OPTIONS = ["LinkedIn", "Instagram", "Gmail", "Website"];

const SOURCE_TYPES = [
  { value: "manual_entry", label: "Manual Entry" },
  { value: "campaign_engagement", label: "Campaign Engagement" },
  { value: "csv_upload", label: "CSV Upload" },
  { value: "public_business_signal", label: "Public Signal" },
  { value: "crm_import", label: "CRM Import" },
  { value: "gmail_interaction", label: "Gmail Interaction" },
  { value: "existing_lead", label: "Existing Lead" },
  { value: "other", label: "Other" },
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
    import: (
      <svg {...common}>
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <path d="M7 10l5 5 5-5" />
        <path d="M12 15V3" />
      </svg>
    ),
    sync: (
      <svg {...common}>
        <path d="M21 12a9 9 0 0 1-15.5 6.3L3 16" />
        <path d="M3 12a9 9 0 0 1 15.5-6.3L21 8" />
        <path d="M3 16h5" />
        <path d="M21 8h-5" />
      </svg>
    ),
    score: (
      <svg {...common}>
        <path d="M12 2l2.6 6.4L21 9l-4.9 4.1L17.6 20 12 16.4 6.4 20l1.5-6.9L3 9l6.4-.6z" />
      </svg>
    ),
    target: (
      <svg {...common}>
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="12" cy="12" r="1" />
      </svg>
    ),
    credits: (
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
    check: (
      <svg {...common}>
        <path d="M20 6L9 17l-5-5" />
      </svg>
    ),
    save: (
      <svg {...common}>
        <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
        <path d="M17 21v-8H7v8" />
        <path d="M7 3v5h8" />
      </svg>
    ),
    close: (
      <svg {...common}>
        <path d="M18 6L6 18" />
        <path d="M6 6l12 12" />
      </svg>
    ),
  };

  return icons[name] || null;
}

export default function LeadRadar() {
  const [user, setUser] = useState(null);
  const [subscription, setSubscription] = useState(null);
  const [checkingAccess, setCheckingAccess] = useState(true);
  const [clients, setClients] = useState([]);
  const [selectedClientId, setSelectedClientId] = useState("");
  const [activeTab, setActiveTab] = useState("leads");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const [icp, setIcp] = useState(null);
  const [icpLoading, setIcpLoading] = useState(false);
  const [icpSaving, setIcpSaving] = useState(false);

  const [icpForm, setIcpForm] = useState({
    target_industries: [],
    target_locations: [],
    company_sizes: [],
    job_titles: [],
    keywords: [],
    competitors: [],
    excluded_industries: [],
    excluded_titles: [],
    target_platforms: [],
  });

  const [tagInputs, setTagInputs] = useState({
    target_industries: "",
    target_locations: "",
    job_titles: "",
    keywords: "",
    competitors: "",
    excluded_industries: "",
    excluded_titles: "",
  });

  const [credits, setCredits] = useState(null);

  const [leads, setLeads] = useState([]);
  const [leadsLoading, setLeadsLoading] = useState(false);
  const [scoring, setScoring] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [showAddLead, setShowAddLead] = useState(false);
  const [addingLead, setAddingLead] = useState(false);
  const [importing, setImporting] = useState(false);
  const [filterTemp, setFilterTemp] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");

  const csvRef = useRef(null);

  const [leadForm, setLeadForm] = useState({
    name: "",
    first_name: "",
    last_name: "",
    title: "",
    company: "",
    industry: "",
    location: "",
    email: "",
    website: "",
    linkedin_url: "",
    instagram_handle: "",
    source_type: "manual_entry",
  });

  useEffect(() => {
    document.title = "Lead Radar — LeadMagnet Inc";

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

      if (sub && sub.plan === "scale" && (sub.status === "active" || sub.status === "trialing")) {
        loadClients(data.user.id);
        loadCredits(data.user.id);
      }
    });
  }, []);

  const hasScale =
    subscription &&
    subscription.plan === "scale" &&
    (subscription.status === "active" || subscription.status === "trialing");

  const hasAgency =
    subscription &&
    (subscription.plan === "agency" || subscription.plan === "scale") &&
    (subscription.status === "active" || subscription.status === "trialing");

  const loadClients = async (uid) => {
    const { data } = await supabase
      .from("agency_clients")
      .select("id, name, company")
      .eq("agency_user_id", uid)
      .order("name");

    if (data) setClients(data);
  };

  const loadCredits = async (uid) => {
    try {
      const response = await fetch(`/api/lead-radar/credits?userId=${uid}`);
      const data = await response.json();

      if (data.credits) setCredits(data.credits);
    } catch {}
  };

  const loadIcp = async (cid) => {
    if (!user || !cid) return;

    setIcpLoading(true);

    try {
      const response = await fetch(`/api/lead-radar/icp?userId=${user.id}&clientId=${cid}`);
      const data = await response.json();

      if (data.icp) {
        setIcp(data.icp);
        setIcpForm({
          target_industries: data.icp.target_industries || [],
          target_locations: data.icp.target_locations || [],
          company_sizes: data.icp.company_sizes || [],
          job_titles: data.icp.job_titles || [],
          keywords: data.icp.keywords || [],
          competitors: data.icp.competitors || [],
          excluded_industries: data.icp.excluded_industries || [],
          excluded_titles: data.icp.excluded_titles || [],
          target_platforms: data.icp.target_platforms || [],
        });
      } else {
        setIcp(null);
        setIcpForm({
          target_industries: [],
          target_locations: [],
          company_sizes: [],
          job_titles: [],
          keywords: [],
          competitors: [],
          excluded_industries: [],
          excluded_titles: [],
          target_platforms: [],
        });
      }
    } catch {}

    setIcpLoading(false);
  };

  const loadLeads = async (cid) => {
    if (!user || !cid) return;

    setLeadsLoading(true);

    try {
      const response = await fetch(`/api/lead-radar/leads?userId=${user.id}&clientId=${cid}`);
      const data = await response.json();

      setLeads(data.leads || []);
    } catch {}

    setLeadsLoading(false);
  };

  useEffect(() => {
    if (selectedClientId && hasScale) {
      loadIcp(selectedClientId);
      loadLeads(selectedClientId);
    }
  }, [selectedClientId]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  const saveIcp = async () => {
    if (!user || !selectedClientId) return;

    setIcpSaving(true);

    try {
      const response = await fetch("/api/lead-radar/icp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, clientId: selectedClientId, ...icpForm }),
      });

      const data = await response.json();

      if (data.success) {
        setIcp(data.icp);
        setSuccess("ICP profile saved.");
      } else {
        setError(data.error || "Failed");
      }
    } catch (err) {
      setError(err.message);
    }

    setIcpSaving(false);

    setTimeout(() => {
      setSuccess("");
      setError("");
    }, 4000);
  };

  const addTag = (field, value) => {
    const clean = value.trim();

    if (!clean || icpForm[field].includes(clean)) return;

    setIcpForm((prev) => ({ ...prev, [field]: [...prev[field], clean] }));
    setTagInputs((prev) => ({ ...prev, [field]: "" }));
  };

  const removeTag = (field, index) => {
    setIcpForm((prev) => ({ ...prev, [field]: prev[field].filter((_, i) => i !== index) }));
  };

  const handleTagKeyDown = (field, event) => {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      addTag(field, tagInputs[field]);
    }
  };

  const toggleSize = (size) => {
    setIcpForm((prev) => ({
      ...prev,
      company_sizes: prev.company_sizes.includes(size)
        ? prev.company_sizes.filter((item) => item !== size)
        : [...prev.company_sizes, size],
    }));
  };

  const togglePlatform = (platform) => {
    setIcpForm((prev) => ({
      ...prev,
      target_platforms: prev.target_platforms.includes(platform)
        ? prev.target_platforms.filter((item) => item !== platform)
        : [...prev.target_platforms, platform],
    }));
  };

  const handleAddLead = async () => {
    if (!user || !selectedClientId) return;

    setAddingLead(true);

    try {
      const response = await fetch("/api/lead-radar/import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, clientId: selectedClientId, lead: leadForm }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess("Lead added.");
        setShowAddLead(false);
        setLeadForm({
          name: "",
          first_name: "",
          last_name: "",
          title: "",
          company: "",
          industry: "",
          location: "",
          email: "",
          website: "",
          linkedin_url: "",
          instagram_handle: "",
          source_type: "manual_entry",
        });

        loadLeads(selectedClientId);
        loadCredits(user.id);
      } else {
        setError(data.error || "Failed");
      }
    } catch (err) {
      setError(err.message);
    }

    setAddingLead(false);

    setTimeout(() => {
      setSuccess("");
      setError("");
    }, 4000);
  };

  const handleCSV = async (event) => {
    const file = event.target.files[0];

    if (!file || !user) return;

    setImporting(true);

    try {
      const text = await file.text();
      const lines = text.split("\n").filter((line) => line.trim());

      if (lines.length < 2) {
        setError("CSV must have a header and at least one row.");
        setImporting(false);
        return;
      }

      const headers = lines[0].split(",").map((header) => header.trim().toLowerCase().replace(/"/g, ""));
      const rows = [];

      for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(",").map((value) => value.trim().replace(/"/g, ""));
        const row = {};

        headers.forEach((header, index) => {
          if (values[index]) row[header] = values[index];
        });

        rows.push(row);
      }

      const response = await fetch("/api/lead-radar/import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, clientId: selectedClientId, leads: rows }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(`Imported ${data.imported} leads. ${data.skipped} skipped.`);
        loadLeads(selectedClientId);
        loadCredits(user.id);
      } else {
        setError(data.error || "Import failed");
      }
    } catch (err) {
      setError(err.message);
    }

    setImporting(false);

    if (csvRef.current) csvRef.current.value = "";

    setTimeout(() => {
      setSuccess("");
      setError("");
    }, 5000);
  };

  const handleScore = async () => {
    if (!user || !selectedClientId) return;

    setScoring(true);

    try {
      const response = await fetch("/api/lead-radar/score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, clientId: selectedClientId }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(`Scored ${data.scored} leads. ${data.creditsUsed} credits used.${data.warning ? " " + data.warning : ""}`);
        loadLeads(selectedClientId);
        loadCredits(user.id);
      } else {
        setError(data.error || "Scoring failed");
      }
    } catch (err) {
      setError(err.message);
    }

    setScoring(false);

    setTimeout(() => {
      setSuccess("");
      setError("");
    }, 5000);
  };

  const handleSync = async () => {
    if (!user || !selectedClientId) return;

    setSyncing(true);

    try {
      const response = await fetch("/api/lead-radar/sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, clientId: selectedClientId }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(`Synced ${data.synced} campaign leads. ${data.skipped || 0} already existed.`);
        loadLeads(selectedClientId);
      } else {
        setError(data.error || "Sync failed");
      }
    } catch (err) {
      setError(err.message);
    }

    setSyncing(false);

    setTimeout(() => {
      setSuccess("");
      setError("");
    }, 5000);
  };

  const updateStatus = async (leadId, status) => {
    try {
      const response = await fetch("/api/lead-radar/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, leadId, status }),
      });

      const data = await response.json();

      if (data.success) {
        setLeads((prev) => prev.map((lead) => (lead.id === leadId ? { ...lead, status } : lead)));
        setSuccess(`Lead ${status}.`);
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError(err.message);
    }

    setTimeout(() => {
      setSuccess("");
      setError("");
    }, 3000);
  };

  const getBadge = (temperature) => {
    if (temperature === "hot") {
      return { label: "Hot", bg: "rgba(239,68,68,0.08)", border: "rgba(239,68,68,0.20)", color: "#ef4444" };
    }

    if (temperature === "warm") {
      return { label: "Warm", bg: "rgba(245,158,11,0.10)", border: "rgba(245,158,11,0.24)", color: "#b45309" };
    }

    return { label: "Cold", bg: "rgba(59,130,246,0.08)", border: "rgba(59,130,246,0.22)", color: "#2563eb" };
  };

  const getStatusColor = (status) => {
    const map = {
      new: "#819693",
      approved: "#2f625d",
      in_sequence: "#ff7f67",
      saved: "#b45309",
      dismissed: "#6b7280",
      converted: "#2f625d",
      duplicate: "#ef4444",
    };

    return map[status] || "#819693";
  };

  const filteredLeads = leads.filter((lead) => {
    const score = lead.lead_scores?.[0];

    if (filterTemp !== "All" && score?.temperature !== filterTemp.toLowerCase()) return false;
    if (filterStatus !== "All" && lead.status !== filterStatus) return false;

    return true;
  });

  const totalLeads = leads.length;
  const hotCount = leads.filter((lead) => lead.lead_scores?.[0]?.temperature === "hot").length;
  const warmCount = leads.filter((lead) => lead.lead_scores?.[0]?.temperature === "warm").length;
  const coldCount = leads.filter((lead) => lead.lead_scores?.[0]?.temperature === "cold").length;
  const unscoredCount = leads.filter((lead) => !lead.lead_scores?.length).length;

  const creditsUsed = credits?.used_this_month || 0;
  const creditsLimit = credits?.monthly_limit || 2000;
  const creditsRemaining = Math.max(creditsLimit - creditsUsed, 0);
  const creditsPct = creditsLimit > 0 ? Math.min((creditsUsed / creditsLimit) * 100, 100) : 0;

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

        .client-select {
          width: 100%;
          max-width: 420px;
          background: #ffffff;
          border: 1px solid rgba(23,56,56,0.10);
          border-radius: 11px;
          padding: 0.72rem 1rem;
          color: #173838;
          font-size: 0.86rem;
          outline: none;
          font-family: 'Inter', sans-serif;
          margin-bottom: 1.5rem;
          font-weight: 700;
          box-shadow: 0 12px 24px rgba(23,56,56,0.04);
        }

        .tabs {
          display: flex;
          gap: 0.35rem;
          margin-bottom: 1.75rem;
          background: rgba(255,255,255,0.8);
          padding: 0.25rem;
          border-radius: 11px;
          width: fit-content;
          border: 1px solid rgba(23,56,56,0.08);
          box-shadow: 0 12px 24px rgba(23,56,56,0.04);
          flex-wrap: wrap;
        }

        .tab {
          background: transparent;
          border: none;
          color: #5f7774;
          font-size: 0.82rem;
          padding: 0.52rem 1.15rem;
          border-radius: 9px;
          cursor: pointer;
          font-weight: 800;
        }

        .tab.active {
          background: rgba(255,127,103,0.12);
          color: #ff7f67;
        }

        .section-card,
        .stat-card,
        .table-wrap,
        .empty-card,
        .access-card {
          background: linear-gradient(145deg,#ffffff,#f8fbfa);
          border: 1px solid rgba(23,56,56,0.08);
          box-shadow: 0 16px 34px rgba(23,56,56,0.05);
        }

        .section-card {
          border-radius: 18px;
          padding: 1.5rem;
          margin-bottom: 1rem;
        }

        .section-title {
          font-size: 1rem;
          font-weight: 900;
          color: #173838;
          margin-bottom: 1.25rem;
        }

        .section-sub {
          font-size: 0.84rem;
          color: #5f7774;
          margin-bottom: 1.5rem;
          font-family: 'Inter', sans-serif;
          line-height: 1.65;
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

        .form-help {
          font-size: 0.72rem;
          color: #819693;
          margin-bottom: 0.5rem;
          font-family: 'Inter', sans-serif;
        }

        .tag-wrap {
          display: flex;
          flex-wrap: wrap;
          gap: 0.35rem;
          background: #ffffff;
          border: 1px solid rgba(23,56,56,0.10);
          border-radius: 11px;
          padding: 0.58rem 0.75rem;
          margin-bottom: 1rem;
          min-height: 44px;
          align-items: center;
        }

        .tag {
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          background: rgba(143,200,193,0.18);
          border: 1px solid rgba(143,200,193,0.34);
          color: #2f625d;
          font-size: 0.72rem;
          font-weight: 800;
          padding: 0.22rem 0.55rem;
          border-radius: 7px;
          font-family: 'Inter', sans-serif;
        }

        .tag.danger {
          background: rgba(239,68,68,0.07);
          border-color: rgba(239,68,68,0.18);
          color: #ef4444;
        }

        .tag-remove {
          cursor: pointer;
          opacity: 0.7;
        }

        .tag-input {
          background: transparent;
          border: none;
          outline: none;
          color: #173838;
          font-size: 0.84rem;
          font-family: 'Inter', sans-serif;
          min-width: 140px;
          flex: 1;
        }

        .tag-input::placeholder {
          color: #819693;
        }

        .toggle-grid {
          display: flex;
          gap: 0.45rem;
          flex-wrap: wrap;
          margin-bottom: 1rem;
        }

        .toggle-option,
        .filter-btn {
          background: #ffffff;
          border: 1px solid rgba(23,56,56,0.10);
          color: #5f7774;
          font-size: 0.8rem;
          padding: 0.46rem 0.9rem;
          border-radius: 10px;
          cursor: pointer;
          font-family: 'Inter', sans-serif;
          font-weight: 800;
        }

        .toggle-option.active,
        .filter-btn.active {
          background: rgba(255,127,103,0.10);
          border-color: rgba(255,127,103,0.28);
          color: #ff7f67;
          font-weight: 900;
        }

        .btn {
          background: #ff7f67;
          color: #173838;
          font-weight: 900;
          font-size: 0.84rem;
          padding: 0.6rem 1.18rem;
          border-radius: 10px;
          border: none;
          cursor: pointer;
          box-shadow: 0 10px 22px rgba(255,127,103,0.24);
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.42rem;
        }

        .btn:disabled {
          opacity: 0.45;
          cursor: not-allowed;
        }

        .btn-soft {
          background: #ffffff;
          border: 1px solid rgba(23,56,56,0.10);
          color: #5f7774;
          box-shadow: none;
        }

        .btn-blue {
          background: rgba(59,130,246,0.08);
          border: 1px solid rgba(59,130,246,0.18);
          color: #2563eb;
          box-shadow: none;
        }

        .btn-green {
          background: rgba(143,200,193,0.18);
          border: 1px solid rgba(143,200,193,0.34);
          color: #2f625d;
          box-shadow: none;
        }

        .btn-purple {
          background: rgba(255,127,103,0.10);
          border: 1px solid rgba(255,127,103,0.24);
          color: #ff7f67;
          box-shadow: none;
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .divider {
          border: none;
          border-top: 1px solid rgba(23,56,56,0.08);
          margin: 1.25rem 0;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit,minmax(135px,1fr));
          gap: 0.9rem;
          margin-bottom: 1.5rem;
        }

        .stat-card {
          border-radius: 16px;
          padding: 1.05rem;
          text-align: center;
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
          margin: 0 auto 0.8rem;
        }

        .stat-value {
          font-size: 1.55rem;
          font-weight: 900;
          line-height: 1;
          letter-spacing: -0.04em;
        }

        .stat-label {
          font-size: 0.66rem;
          color: #819693;
          margin-top: 0.32rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          font-family: 'Inter', sans-serif;
          font-weight: 800;
        }

        .actions-row {
          display: flex;
          gap: 0.55rem;
          align-items: center;
          flex-wrap: wrap;
          margin-bottom: 1.25rem;
        }

        .filters-row {
          margin-left: auto;
          display: flex;
          gap: 0.35rem;
          flex-wrap: wrap;
        }

        .table-wrap {
          border-radius: 16px;
          overflow: hidden;
        }

        .lead-table {
          width: 100%;
          border-collapse: collapse;
        }

        .lead-table th {
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

        .lead-table td {
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

        .score-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.2rem;
          font-size: 0.7rem;
          font-weight: 900;
          padding: 0.18rem 0.55rem;
          border-radius: 100px;
          white-space: nowrap;
        }

        .status-badge {
          font-size: 0.7rem;
          font-weight: 800;
          padding: 0.18rem 0.55rem;
          border-radius: 100px;
          text-transform: capitalize;
          white-space: nowrap;
        }

        .action-mini {
          font-size: 0.7rem;
          padding: 0.32rem 0.5rem;
          border-radius: 8px;
          cursor: pointer;
          border: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        .credits-wrap {
          height: 9px;
          background: rgba(23,56,56,0.08);
          border-radius: 100px;
          overflow: hidden;
          margin-top: 0.5rem;
        }

        .credits-fill {
          height: 100%;
          border-radius: 100px;
        }

        .empty-card {
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
          line-height: 1.6;
          max-width: 420px;
          margin: 0 auto;
          font-family: 'Inter', sans-serif;
        }

        .disclaimer {
          font-size: 0.74rem;
          color: #819693;
          font-family: 'Inter', sans-serif;
          text-align: center;
          margin-top: 2rem;
          line-height: 1.55;
          max-width: 680px;
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
          max-width: 560px;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 28px 70px rgba(23,56,56,0.18);
        }

        .modal-title {
          font-size: 1.3rem;
          font-weight: 900;
          color: #173838;
          margin-bottom: 1.5rem;
        }

        .input,
        .select {
          width: 100%;
          background: #ffffff;
          border: 1px solid rgba(23,56,56,0.10);
          border-radius: 11px;
          color: #173838;
          font-size: 0.875rem;
          outline: none;
          font-family: 'Inter', sans-serif;
          padding: 0.72rem 0.9rem;
          margin-bottom: 0.85rem;
        }

        .modal-buttons {
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
        }

        .access-state {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: calc(100vh - 64px);
          padding: 2rem;
        }

        .access-card {
          border-radius: 24px;
          padding: 2.25rem;
          text-align: center;
          max-width: 540px;
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

          .filters-row {
            margin-left: 0;
          }
        }

        @media(max-width:768px) {
          .form-grid {
            grid-template-columns: 1fr;
          }

          .stats-grid {
            grid-template-columns: repeat(2,1fr);
          }

          .actions-row {
            flex-direction: column;
            align-items: flex-start;
          }
        }

        @media(max-width:600px) {
          .user-email {
            display: none;
          }

          .stats-grid {
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

          <a href="/agency" className="side-item">
            <span className="side-icon"><Icon name="client" /></span>
            Client Manager
          </a>

          <a href="/agency/lead-radar" className="side-item active">
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
              <div className="plan-name">Scale Feature</div>
              <div className="plan-sub">Lead discovery and scoring</div>
            </div>
          </div>
        </aside>

        {checkingAccess ? (
          <section className="content">
            <div className="access-state">
              <div className="access-card">
                <div className="access-icon"><Icon name="radar" size={24} /></div>
                <div className="access-title">Loading Lead Radar</div>
                <div className="access-sub">Checking your subscription and preparing your lead discovery workspace.</div>
              </div>
            </div>
          </section>
        ) : !hasAgency && !hasScale ? (
          <section className="content">
            <div className="access-state">
              <div className="access-card">
                <div className="access-icon"><Icon name="radar" size={24} /></div>
                <div className="access-title">Scale Plan Required</div>
                <div className="access-sub">Lead Radar is available for Scale subscribers.</div>
                <button className="btn" onClick={() => window.location.href = "/pricing"}>View Plans & Upgrade</button>
              </div>
            </div>
          </section>
        ) : hasAgency && !hasScale ? (
          <section className="content">
            <div className="access-state">
              <div className="access-card">
                <div className="access-icon"><Icon name="radar" size={24} /></div>
                <div className="access-title">Lead Radar</div>
                <div className="access-sub">
                  Discover potential leads, prioritize prospects by fit and intent, and turn campaign signals into qualified opportunities.
                </div>
                <button className="btn" onClick={() => window.location.href = "/pricing"}>Upgrade to Scale</button>
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
                  <span className="kicker-icon"><Icon name="radar" size={14} /></span>
                  Scale Workspace
                </div>
                <h1 className="page-title">Lead Radar</h1>
                <p className="page-sub">
                  Discover, score, and prioritize high-potential prospects for each client using ICP fit, campaign activity, and imported lead data.
                </p>
              </div>

              <select className="client-select" value={selectedClientId} onChange={(e) => setSelectedClientId(e.target.value)}>
                <option value="">Select a client...</option>
                {clients.map((client) => (
                  <option key={client.id} value={client.id}>
                    {client.name}{client.company ? ` — ${client.company}` : ""}
                  </option>
                ))}
              </select>

              {!selectedClientId ? (
                <div className="empty-card">
                  <span className="empty-icon"><Icon name="radar" size={24} /></span>
                  <div className="empty-title">Select a client to get started</div>
                  <div className="empty-sub">Choose a client above to build their ICP, import leads, sync campaign leads, and run scoring.</div>
                </div>
              ) : (
                <>
                  <div className="tabs">
                    <button className={`tab ${activeTab === "leads" ? "active" : ""}`} onClick={() => setActiveTab("leads")}>
                      Leads ({leads.length})
                    </button>
                    <button className={`tab ${activeTab === "icp" ? "active" : ""}`} onClick={() => setActiveTab("icp")}>
                      ICP Profile
                    </button>
                    <button className={`tab ${activeTab === "credits" ? "active" : ""}`} onClick={() => setActiveTab("credits")}>
                      Credits
                    </button>
                  </div>

                  {activeTab === "leads" && (
                    <>
                      <div className="stats-grid">
                        <div className="stat-card">
                          <div className="stat-icon"><Icon name="leads" /></div>
                          <div className="stat-value" style={{ color: "#ff7f67" }}>{totalLeads}</div>
                          <div className="stat-label">Total</div>
                        </div>

                        <div className="stat-card">
                          <div className="stat-icon"><Icon name="hot" /></div>
                          <div className="stat-value" style={{ color: "#ef4444" }}>{hotCount}</div>
                          <div className="stat-label">Hot</div>
                        </div>

                        <div className="stat-card">
                          <div className="stat-icon"><Icon name="warm" /></div>
                          <div className="stat-value" style={{ color: "#b45309" }}>{warmCount}</div>
                          <div className="stat-label">Warm</div>
                        </div>

                        <div className="stat-card">
                          <div className="stat-icon"><Icon name="cold" /></div>
                          <div className="stat-value" style={{ color: "#2563eb" }}>{coldCount}</div>
                          <div className="stat-label">Cold</div>
                        </div>

                        <div className="stat-card">
                          <div className="stat-icon"><Icon name="target" /></div>
                          <div className="stat-value" style={{ color: "#819693" }}>{unscoredCount}</div>
                          <div className="stat-label">Unscored</div>
                        </div>

                        <div className="stat-card">
                          <div className="stat-icon"><Icon name="credits" /></div>
                          <div className="stat-value" style={{ color: "#2f625d" }}>{creditsRemaining}</div>
                          <div className="stat-label">Credits Left</div>
                        </div>
                      </div>

                      <div className="actions-row">
                        <button className="btn" onClick={() => setShowAddLead(true)}>
                          <Icon name="plus" size={15} />
                          Add Lead
                        </button>

                        <label className="btn btn-blue" style={{ cursor: "pointer" }}>
                          <Icon name="import" size={15} />
                          {importing ? "Importing..." : "Import CSV"}
                          <input type="file" accept=".csv" ref={csvRef} onChange={handleCSV} style={{ display: "none" }} />
                        </label>

                        <button className="btn btn-green" onClick={handleSync} disabled={syncing}>
                          <Icon name="sync" size={15} />
                          {syncing ? "Syncing..." : "Sync Campaign Leads"}
                        </button>

                        <button className="btn btn-purple" onClick={handleScore} disabled={scoring || leads.length === 0}>
                          <Icon name="score" size={15} />
                          {scoring ? "Scoring..." : `Run Scoring (${leads.length})`}
                        </button>

                        <div className="filters-row">
                          {["All", "Hot", "Warm", "Cold"].map((item) => (
                            <button
                              key={item}
                              className={`filter-btn ${filterTemp === item ? "active" : ""}`}
                              onClick={() => setFilterTemp(item)}
                            >
                              {item}
                            </button>
                          ))}

                          {["All", "new", "approved", "saved", "dismissed"].map((item) => (
                            <button
                              key={item}
                              className={`filter-btn ${filterStatus === item ? "active" : ""}`}
                              onClick={() => setFilterStatus(item)}
                              style={{ textTransform: "capitalize" }}
                            >
                              {item === "All" ? "All Status" : item}
                            </button>
                          ))}
                        </div>
                      </div>

                      {leadsLoading ? (
                        <div style={{ textAlign: "center", padding: "2rem", color: "#819693" }}>Loading leads...</div>
                      ) : filteredLeads.length === 0 ? (
                        <div className="empty-card">
                          <span className="empty-icon"><Icon name="leads" size={24} /></span>
                          <div className="empty-title">{leads.length === 0 ? "No leads yet" : "No leads match filters"}</div>
                          <div className="empty-sub">
                            {leads.length === 0
                              ? "Add leads manually, import a CSV, sync campaign leads, or run Lead Radar scoring."
                              : "Try adjusting your filters."}
                          </div>
                        </div>
                      ) : (
                        <div className="table-wrap" style={{ overflowX: "auto" }}>
                          <table className="lead-table" style={{ minWidth: "900px" }}>
                            <thead>
                              <tr>
                                <th>Name</th>
                                <th>Company</th>
                                <th>Title</th>
                                <th>Source</th>
                                <th>Score</th>
                                <th>Status</th>
                                <th>Actions</th>
                              </tr>
                            </thead>

                            <tbody>
                              {filteredLeads.map((lead) => {
                                const score = lead.lead_scores?.[0];
                                const badge = getBadge(score?.temperature);

                                return (
                                  <tr key={lead.id}>
                                    <td className="lead-name">
                                      {lead.name || `${lead.first_name || ""} ${lead.last_name || ""}`.trim() || "Unknown"}
                                    </td>
                                    <td>{lead.company || "—"}</td>
                                    <td style={{ fontSize: "0.78rem" }}>{lead.title || "—"}</td>
                                    <td style={{ fontSize: "0.74rem", textTransform: "capitalize" }}>{(lead.source_type || "—").replace(/_/g, " ")}</td>
                                    <td>
                                      {score ? (
                                        <span className="score-badge" style={{ background: badge.bg, border: `1px solid ${badge.border}`, color: badge.color }}>
                                          {score.total_score} · {badge.label}
                                        </span>
                                      ) : (
                                        <span style={{ color: "#819693", fontSize: "0.76rem" }}>Unscored</span>
                                      )}
                                    </td>
                                    <td>
                                      <span
                                        className="status-badge"
                                        style={{
                                          background: `${getStatusColor(lead.status)}15`,
                                          border: `1px solid ${getStatusColor(lead.status)}30`,
                                          color: getStatusColor(lead.status),
                                        }}
                                      >
                                        {lead.status}
                                      </span>
                                    </td>
                                    <td style={{ display: "flex", gap: "0.28rem" }}>
                                      {lead.status !== "approved" && (
                                        <button
                                          className="action-mini"
                                          style={{ background: "rgba(143,200,193,0.18)", border: "1px solid rgba(143,200,193,0.34)", color: "#2f625d" }}
                                          onClick={() => updateStatus(lead.id, "approved")}
                                        >
                                          <Icon name="check" size={13} />
                                        </button>
                                      )}
                                      {lead.status !== "saved" && (
                                        <button
                                          className="action-mini"
                                          style={{ background: "rgba(245,158,11,0.10)", border: "1px solid rgba(245,158,11,0.24)", color: "#b45309" }}
                                          onClick={() => updateStatus(lead.id, "saved")}
                                        >
                                          <Icon name="save" size={13} />
                                        </button>
                                      )}
                                      {lead.status !== "dismissed" && (
                                        <button
                                          className="action-mini"
                                          style={{ background: "rgba(107,114,128,0.08)", border: "1px solid rgba(107,114,128,0.15)", color: "#6b7280" }}
                                          onClick={() => updateStatus(lead.id, "dismissed")}
                                        >
                                          <Icon name="close" size={13} />
                                        </button>
                                      )}
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

                  {activeTab === "icp" && (
                    <div className="section-card">
                      <div className="section-title">Ideal Customer Profile</div>
                      <p className="section-sub">
                        Define who the perfect lead looks like for this client. Lead Radar uses this to score every prospect.
                      </p>

                      {icpLoading ? (
                        <div style={{ textAlign: "center", padding: "2rem", color: "#819693" }}>Loading ICP...</div>
                      ) : (
                        <>
                          {[
                            { key: "target_industries", label: "Target Industries", help: "e.g. SaaS, Marketing, E-commerce" },
                            { key: "target_locations", label: "Target Locations", help: "e.g. Netherlands, Amsterdam, USA" },
                            { key: "job_titles", label: "Target Job Titles", help: "e.g. CEO, Marketing Director, Founder" },
                            { key: "keywords", label: "Keywords", help: "Topics that signal a good fit" },
                            { key: "competitors", label: "Competitors", help: "Companies whose customers might be a good fit" },
                          ].map((field) => (
                            <div key={field.key}>
                              <label className="form-label">{field.label}</label>
                              <div className="form-help">{field.help}</div>

                              <div className="tag-wrap">
                                {icpForm[field.key].map((tag, index) => (
                                  <span key={index} className="tag">
                                    {tag}
                                    <span className="tag-remove" onClick={() => removeTag(field.key, index)}>×</span>
                                  </span>
                                ))}

                                <input
                                  className="tag-input"
                                  placeholder="Type and press Enter..."
                                  value={tagInputs[field.key]}
                                  onChange={(e) => setTagInputs((prev) => ({ ...prev, [field.key]: e.target.value }))}
                                  onKeyDown={(e) => handleTagKeyDown(field.key, e)}
                                />
                              </div>
                            </div>
                          ))}

                          <div className="form-grid">
                            <div>
                              <label className="form-label">Company Sizes</label>
                              <div className="toggle-grid">
                                {COMPANY_SIZES.map((size) => (
                                  <button
                                    key={size}
                                    type="button"
                                    className={`toggle-option ${icpForm.company_sizes.includes(size) ? "active" : ""}`}
                                    onClick={() => toggleSize(size)}
                                  >
                                    {size}
                                  </button>
                                ))}
                              </div>
                            </div>

                            <div>
                              <label className="form-label">Platforms</label>
                              <div className="toggle-grid">
                                {PLATFORM_OPTIONS.map((platform) => (
                                  <button
                                    key={platform}
                                    type="button"
                                    className={`toggle-option ${icpForm.target_platforms.includes(platform) ? "active" : ""}`}
                                    onClick={() => togglePlatform(platform)}
                                  >
                                    {platform}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>

                          <hr className="divider" />

                          {[
                            { key: "excluded_industries", label: "Excluded Industries", help: "Industries to skip" },
                            { key: "excluded_titles", label: "Excluded Titles", help: "Job titles to ignore" },
                          ].map((field) => (
                            <div key={field.key}>
                              <label className="form-label">{field.label}</label>
                              <div className="form-help">{field.help}</div>

                              <div className="tag-wrap">
                                {icpForm[field.key].map((tag, index) => (
                                  <span key={index} className="tag danger">
                                    {tag}
                                    <span className="tag-remove" onClick={() => removeTag(field.key, index)}>×</span>
                                  </span>
                                ))}

                                <input
                                  className="tag-input"
                                  placeholder="Type and press Enter..."
                                  value={tagInputs[field.key]}
                                  onChange={(e) => setTagInputs((prev) => ({ ...prev, [field.key]: e.target.value }))}
                                  onKeyDown={(e) => handleTagKeyDown(field.key, e)}
                                />
                              </div>
                            </div>
                          ))}

                          <button className="btn" onClick={saveIcp} disabled={icpSaving}>
                            <Icon name="save" size={15} />
                            {icpSaving ? "Saving..." : icp ? "Update ICP Profile" : "Save ICP Profile"}
                          </button>
                        </>
                      )}
                    </div>
                  )}

                  {activeTab === "credits" && (
                    <>
                      <div className="stats-grid">
                        <div className="stat-card">
                          <div className="stat-icon"><Icon name="credits" /></div>
                          <div className="stat-value" style={{ color: "#2f625d" }}>{creditsRemaining}</div>
                          <div className="stat-label">Remaining</div>
                        </div>

                        <div className="stat-card">
                          <div className="stat-icon"><Icon name="score" /></div>
                          <div className="stat-value" style={{ color: "#ff7f67" }}>{creditsUsed}</div>
                          <div className="stat-label">Used</div>
                        </div>

                        <div className="stat-card">
                          <div className="stat-icon"><Icon name="target" /></div>
                          <div className="stat-value" style={{ color: "#2f625d" }}>{creditsLimit}</div>
                          <div className="stat-label">Monthly Limit</div>
                        </div>

                        <div className="stat-card">
                          <div className="stat-icon"><Icon name="sync" /></div>
                          <div className="stat-value" style={{ color: "#819693", fontSize: "1rem" }}>{credits?.reset_date || "—"}</div>
                          <div className="stat-label">Next Reset</div>
                        </div>
                      </div>

                      <div className="section-card">
                        <div className="section-title">Credit Usage</div>

                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem", color: "#5f7774", marginBottom: "0.45rem", fontFamily: "Inter,sans-serif", fontWeight: 700 }}>
                          <span>{creditsUsed} used</span>
                          <span>{creditsRemaining} remaining</span>
                        </div>

                        <div className="credits-wrap">
                          <div
                            className="credits-fill"
                            style={{
                              width: `${creditsPct}%`,
                              background: creditsPct > 90 ? "#ef4444" : creditsPct > 70 ? "#b45309" : "#2f625d",
                            }}
                          />
                        </div>

                        <div style={{ marginTop: "1.25rem", fontSize: "0.84rem", color: "#5f7774", lineHeight: 1.65, fontFamily: "Inter,sans-serif" }}>
                          Each lead scored uses 1 credit. AI recommendations use 1 additional credit. Credits reset on the 1st of each month.
                        </div>
                      </div>
                    </>
                  )}

                  <div className="disclaimer">
                    Lead Radar uses approved sources, existing campaign activity, uploaded data, and public business signals to identify potential leads.
                  </div>
                </>
              )}
            </div>
          </section>
        )}
      </div>

      {showAddLead && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-title">Add Lead Candidate</div>

            <div className="form-grid">
              <div>
                <label className="form-label">First Name</label>
                <input className="input" value={leadForm.first_name} onChange={(e) => setLeadForm((prev) => ({ ...prev, first_name: e.target.value }))} placeholder="John" />
              </div>

              <div>
                <label className="form-label">Last Name</label>
                <input className="input" value={leadForm.last_name} onChange={(e) => setLeadForm((prev) => ({ ...prev, last_name: e.target.value }))} placeholder="Smith" />
              </div>
            </div>

            <label className="form-label">Full Name</label>
            <input className="input" value={leadForm.name} onChange={(e) => setLeadForm((prev) => ({ ...prev, name: e.target.value }))} placeholder="Or enter full name" />

            <div className="form-grid">
              <div>
                <label className="form-label">Job Title</label>
                <input className="input" value={leadForm.title} onChange={(e) => setLeadForm((prev) => ({ ...prev, title: e.target.value }))} placeholder="CEO" />
              </div>

              <div>
                <label className="form-label">Company</label>
                <input className="input" value={leadForm.company} onChange={(e) => setLeadForm((prev) => ({ ...prev, company: e.target.value }))} placeholder="Acme Corp" />
              </div>
            </div>

            <div className="form-grid">
              <div>
                <label className="form-label">Industry</label>
                <input className="input" value={leadForm.industry} onChange={(e) => setLeadForm((prev) => ({ ...prev, industry: e.target.value }))} placeholder="SaaS" />
              </div>

              <div>
                <label className="form-label">Location</label>
                <input className="input" value={leadForm.location} onChange={(e) => setLeadForm((prev) => ({ ...prev, location: e.target.value }))} placeholder="Amsterdam, NL" />
              </div>
            </div>

            <label className="form-label">Email</label>
            <input className="input" type="email" value={leadForm.email} onChange={(e) => setLeadForm((prev) => ({ ...prev, email: e.target.value }))} placeholder="john@acme.com" />

            <div className="form-grid">
              <div>
                <label className="form-label">LinkedIn URL</label>
                <input className="input" value={leadForm.linkedin_url} onChange={(e) => setLeadForm((prev) => ({ ...prev, linkedin_url: e.target.value }))} placeholder="linkedin.com/in/..." />
              </div>

              <div>
                <label className="form-label">Website</label>
                <input className="input" value={leadForm.website} onChange={(e) => setLeadForm((prev) => ({ ...prev, website: e.target.value }))} placeholder="acme.com" />
              </div>
            </div>

            <label className="form-label">Source</label>
            <select className="select" value={leadForm.source_type} onChange={(e) => setLeadForm((prev) => ({ ...prev, source_type: e.target.value }))}>
              {SOURCE_TYPES.map((source) => (
                <option key={source.value} value={source.value}>{source.label}</option>
              ))}
            </select>

            <div className="modal-buttons">
              <button className="modal-cancel" onClick={() => setShowAddLead(false)}>Cancel</button>
              <button className="modal-submit" onClick={handleAddLead} disabled={addingLead || (!leadForm.name && !leadForm.first_name)}>
                {addingLead ? "Adding..." : "Add Lead"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}