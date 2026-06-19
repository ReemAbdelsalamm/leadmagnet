"use client";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const FREQUENCIES = [
  { value: "hourly", label: "Every hour" },
  { value: "daily", label: "Every day" },
  { value: "weekly", label: "Every week" },
  { value: "monthly", label: "Every 30 days" },
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
    calendar: (
      <svg {...common}>
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path d="M16 2v4" />
        <path d="M8 2v4" />
        <path d="M3 10h18" />
      </svg>
    ),
    personalize: (
      <svg {...common}>
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
    tracking: (
      <svg {...common}>
        <path d="M3 3v18h18" />
        <path d="M7 15l3-3 3 2 5-7" />
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

export default function Gmail() {
  const [user, setUser] = useState(null);
  const [connected, setConnected] = useState(false);
  const [gmailUser, setGmailUser] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [sequences, setSequences] = useState([]);
  const [showNewSequence, setShowNewSequence] = useState(false);
  const [seqName, setSeqName] = useState("");
  const [seqFrequency, setSeqFrequency] = useState("daily");
  const [seqEmails, setSeqEmails] = useState([{ day: 1, subject: "", body: "" }]);

  useEffect(() => {
    document.title = "Gmail — LeadMagnet Inc";

    supabase.auth.getUser().then(async ({ data }) => {
      if (!data.user) {
        window.location.href = "/login";
        return;
      }

      setUser(data.user);

      const params = new URLSearchParams(window.location.search);

      if (params.get("connected") === "true") {
        await supabase.from("gmail_accounts").upsert(
          {
            user_id: data.user.id,
            email: data.user.email,
          },
          { onConflict: "user_id" }
        );

        setConnected(true);
        setGmailUser(data.user.email);
        setSuccess("Gmail connected successfully.");
        window.history.replaceState({}, "", "/gmail");
      } else {
        checkConnection(data.user.id);
      }

      loadSequences(data.user.id);
    });
  }, []);

  const checkConnection = async (userId) => {
    const { data } = await supabase
      .from("gmail_accounts")
      .select("*")
      .eq("user_id", userId)
      .maybeSingle();

    if (data) {
      setConnected(true);
      setGmailUser(data.email);
    }
  };

  const loadSequences = async (userId) => {
    const { data } = await supabase
      .from("email_sequences")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (data) setSequences(data);
  };

  const handleConnect = () => {
    window.location.href = "https://leadmagnetinc.com/api/auth/google";
  };

  const handleDisconnect = async () => {
    if (!user) return;

    await supabase.from("gmail_accounts").delete().eq("user_id", user.id);
    setConnected(false);
    setGmailUser("");
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  const handleCreateSequence = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { data: seq, error: seqError } = await supabase
        .from("email_sequences")
        .insert({
          user_id: user.id,
          name: seqName,
          emails: seqEmails,
          status: "Active",
          send_frequency: seqFrequency,
        })
        .select()
        .single();

      if (seqError) throw seqError;
      if (seq) setSequences((prev) => [seq, ...prev]);

      setSeqName("");
      setSeqFrequency("daily");
      setSeqEmails([{ day: 1, subject: "", body: "" }]);
      setShowNewSequence(false);
      setSuccess("Email sequence created.");

      setTimeout(() => setSuccess(""), 5000);
    } catch (err) {
      setError("Error: " + err.message);
    }

    setLoading(false);
  };

  const addEmail = () => {
    const lastDay = seqEmails[seqEmails.length - 1]?.day || 0;
    setSeqEmails((prev) => [...prev, { day: lastDay + 7, subject: "", body: "" }]);
  };

  const updateEmail = (index, field, value) => {
    setSeqEmails((prev) =>
      prev.map((email, i) => (i === index ? { ...email, [field]: value } : email))
    );
  };

  const removeEmail = (index) => {
    setSeqEmails((prev) => prev.filter((_, i) => i !== index));
  };

  const deleteSequence = async (id) => {
    await supabase.from("email_sequences").delete().eq("id", id);
    setSequences((prev) => prev.filter((s) => s.id !== id));
  };

  const getFrequencyLabel = (val) => FREQUENCIES.find((f) => f.value === val)?.label || val;

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
        .seq-card,
        .empty-state,
        .tip-card {
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

        .gmail-badge {
          background: rgba(234,67,53,0.08);
          border: 1px solid rgba(234,67,53,0.18);
          color: #EA4335;
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

        .google-btn {
          width: 100%;
          background: #ffffff;
          color: #173838;
          font-weight: 900;
          font-size: 0.94rem;
          padding: 0.95rem;
          border-radius: 13px;
          border: 1px solid rgba(23,56,56,0.12);
          cursor: pointer;
          transition: all 0.15s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          box-shadow: 0 12px 24px rgba(23,56,56,0.05);
        }

        .google-btn:hover {
          transform: translateY(-1px);
          border-color: rgba(255,127,103,0.30);
          box-shadow: 0 16px 28px rgba(23,56,56,0.08);
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

        .disconnect-btn,
        .btn-danger,
        .modal-cancel {
          background: #ffffff;
          border: 1px solid rgba(23,56,56,0.10);
          color: #5f7774;
          font-size: 0.8rem;
          padding: 0.48rem 0.88rem;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 700;
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
        }

        .disconnect-btn,
        .btn-danger {
          border-color: rgba(239,68,68,0.16);
          color: #ef4444;
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

        .seq-card {
          border-radius: 16px;
          padding: 1.25rem;
          margin-bottom: 0.75rem;
        }

        .seq-name {
          font-size: 0.98rem;
          font-weight: 900;
          color: #173838;
          margin-bottom: 0.3rem;
        }

        .seq-info {
          font-size: 0.8rem;
          color: #5f7774;
          font-family: 'Inter', sans-serif;
        }

        .seq-freq {
          display: inline-block;
          background: rgba(143,200,193,0.18);
          border: 1px solid rgba(143,200,193,0.34);
          color: #2f625d;
          font-size: 0.7rem;
          padding: 0.16rem 0.5rem;
          border-radius: 7px;
          margin-left: 0.5rem;
          font-weight: 800;
        }

        .seq-steps {
          display: flex;
          gap: 0.5rem;
          margin-top: 0.85rem;
          flex-wrap: wrap;
        }

        .seq-step {
          background: #ffffff;
          border: 1px solid rgba(23,56,56,0.08);
          border-radius: 8px;
          padding: 0.34rem 0.65rem;
          font-size: 0.73rem;
          color: #5f7774;
          font-weight: 700;
        }

        .status-pill {
          font-size: 0.72rem;
          padding: 0.22rem 0.62rem;
          border-radius: 100px;
          font-weight: 900;
          background: rgba(143,200,193,0.18);
          border: 1px solid rgba(143,200,193,0.34);
          color: #2f625d;
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

        .tip-card {
          border-radius: 16px;
          padding: 1.2rem 1.3rem;
          margin-top: 1.5rem;
        }

        .tip-title {
          font-size: 0.86rem;
          font-weight: 900;
          color: #173838;
          margin-bottom: 0.35rem;
        }

        .tip-text {
          font-size: 0.82rem;
          color: #5f7774;
          line-height: 1.65;
          font-family: 'Inter', sans-serif;
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
          min-height: 110px;
        }

        .freq-grid {
          display: grid;
          grid-template-columns: repeat(2,1fr);
          gap: 0.55rem;
          margin-bottom: 1rem;
        }

        .freq-btn {
          background: #ffffff;
          border: 1px solid rgba(23,56,56,0.10);
          color: #5f7774;
          font-size: 0.8rem;
          padding: 0.7rem;
          border-radius: 10px;
          cursor: pointer;
          font-family: 'Inter', sans-serif;
          transition: all 0.15s;
          text-align: center;
          font-weight: 800;
        }

        .freq-btn.selected {
          background: rgba(255,127,103,0.10);
          border-color: rgba(255,127,103,0.28);
          color: #ff7f67;
          font-weight: 900;
        }

        .modal-divider {
          border: none;
          border-top: 1px solid rgba(23,56,56,0.08);
          margin: 1.25rem 0;
        }

        .var-tags {
          display: flex;
          gap: 0.375rem;
          flex-wrap: wrap;
          margin-bottom: 0.625rem;
        }

        .var-tag {
          background: rgba(255,127,103,0.08);
          border: 1px solid rgba(255,127,103,0.18);
          color: #ff7f67;
          font-size: 0.72rem;
          padding: 0.22rem 0.56rem;
          border-radius: 7px;
          cursor: pointer;
          font-family: 'Inter', sans-serif;
          font-weight: 800;
        }

        .email-block {
          background: #f8fbfa;
          border: 1px solid rgba(23,56,56,0.08);
          border-radius: 14px;
          padding: 1rem;
          margin-bottom: 1rem;
          position: relative;
        }

        .email-block-title {
          font-size: 0.78rem;
          font-weight: 900;
          color: #ff7f67;
          margin-bottom: 0.875rem;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }

        .remove-email-btn {
          position: absolute;
          top: 0.8rem;
          right: 0.8rem;
          background: transparent;
          border: none;
          color: #819693;
          cursor: pointer;
        }

        .add-email-btn {
          width: 100%;
          background: #ffffff;
          border: 1px dashed rgba(255,127,103,0.32);
          color: #ff7f67;
          font-size: 0.84rem;
          padding: 0.75rem;
          border-radius: 11px;
          cursor: pointer;
          font-family: 'Inter', sans-serif;
          font-weight: 800;
          margin-bottom: 1rem;
        }

        .modal-btns {
          display: flex;
          gap: 0.75rem;
          margin-top: 0.5rem;
        }

        .modal-cancel {
          flex: 1;
          justify-content: center;
          padding: 0.75rem;
          border-radius: 10px;
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

          .connect-top,
          .connected-bar {
            flex-direction: column;
            align-items: flex-start;
          }

          .freq-grid {
            grid-template-columns: 1fr;
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
          <a href="/instagram" className="nav-link">Instagram</a>
          <a href="/gmail" className="nav-link active">Gmail</a>

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

          <a href="/gmail" className="side-item active">
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
                <span className="kicker-icon"><Icon name="gmail" size={14} /></span>
                Platform Setup
              </div>
              <h1 className="page-title">Gmail Automation</h1>
              <p className="page-sub">
                Connect Gmail, create follow-up sequences, and send personalised emails directly from your own inbox.
              </p>
            </div>

            {!connected ? (
              <div className="connect-card">
                <div className="connect-top">
                  <div>
                    <div className="connect-title">Connect Gmail</div>
                    <p className="connect-sub">
                      Connect your Gmail account to send automated follow-up emails to your leads directly from your own inbox.
                    </p>
                  </div>

                  <div className="gmail-badge">Google OAuth</div>
                </div>

                <div className="feature-grid">
                  <div className="feature-card">
                    <div className="feature-icon"><Icon name="calendar" /></div>
                    <div className="feature-title">Scheduled Sequences</div>
                    <div className="feature-desc">Send emails on day 1, 7, 14, and 30 automatically.</div>
                  </div>

                  <div className="feature-card">
                    <div className="feature-icon"><Icon name="personalize" /></div>
                    <div className="feature-title">Personalised</div>
                    <div className="feature-desc">Use [Name], [Company], and [Link] inside every email.</div>
                  </div>

                  <div className="feature-card">
                    <div className="feature-icon"><Icon name="tracking" /></div>
                    <div className="feature-title">Track Follow-up</div>
                    <div className="feature-desc">Keep your email sequence activity organised in one place.</div>
                  </div>
                </div>

                <button className="google-btn" onClick={handleConnect}>
                  <Icon name="gmail" />
                  Connect with Google
                </button>

                <div className="security-note">
                  <span className="security-icon"><Icon name="shield" size={14} /></span>
                  We only request permission to send emails on your behalf. Your password is never stored.
                </div>
              </div>
            ) : (
              <>
                <div className="connected-bar">
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <div className="connected-dot"></div>
                    <div className="connected-text">Gmail connected — {gmailUser}</div>
                  </div>

                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <button className="btn-primary" onClick={() => setShowNewSequence(true)}>+ New Sequence</button>
                    <button className="disconnect-btn" onClick={handleDisconnect}>Disconnect</button>
                  </div>
                </div>

                <div className="section-header">
                  <div className="section-title">Email Sequences</div>
                </div>

                {sequences.length === 0 ? (
                  <div className="empty-state">
                    <span className="empty-icon"><Icon name="plus" size={24} /></span>
                    <div className="empty-title">Create your first email sequence</div>
                    <div className="empty-sub">Set up automatic follow-up emails that send to leads on your schedule.</div>
                    <button className="btn-primary" onClick={() => setShowNewSequence(true)}>Create Sequence</button>
                  </div>
                ) : (
                  sequences.map((s) => (
                    <div className="seq-card" key={s.id}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem", flexWrap: "wrap", marginBottom: "0.35rem" }}>
                        <div className="seq-name">
                          {s.name}
                          <span className="seq-freq">{getFrequencyLabel(s.send_frequency)}</span>
                        </div>

                        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                          <div className="status-pill">{s.status}</div>
                          <button className="btn-danger" onClick={() => deleteSequence(s.id)}>
                            <Icon name="trash" size={14} />
                            Delete
                          </button>
                        </div>
                      </div>

                      <div className="seq-info">{s.emails?.length || 0} emails in sequence</div>

                      <div className="seq-steps">
                        {s.emails?.map((email, i) => (
                          <div className="seq-step" key={i}>
                            Day {email.day} — {email.subject?.slice(0, 25)}...
                          </div>
                        ))}
                      </div>
                    </div>
                  ))
                )}

                <div className="tip-card">
                  <div className="tip-title">How email sequences work</div>
                  <div className="tip-text">
                    Set up once and reuse across lead campaigns. Day 1 can send immediately when a lead is captured, while later emails continue the follow-up flow.
                  </div>
                </div>
              </>
            )}
          </div>
        </section>
      </div>

      {showNewSequence && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-title">New Email Sequence</div>
            <div className="modal-sub">Set up automatic follow-up emails that send to leads on your schedule.</div>

            <form onSubmit={handleCreateSequence}>
              <label className="form-label">Sequence Name</label>
              <input
                className="form-input"
                placeholder="e.g. 30-day follow-up sequence"
                value={seqName}
                onChange={(e) => setSeqName(e.target.value)}
                required
              />

              <label className="form-label">Send Frequency</label>
              <div className="freq-grid">
                {FREQUENCIES.map((f) => (
                  <button
                    key={f.value}
                    type="button"
                    className={`freq-btn ${seqFrequency === f.value ? "selected" : ""}`}
                    onClick={() => setSeqFrequency(f.value)}
                  >
                    {f.label}
                  </button>
                ))}
              </div>

              <hr className="modal-divider" />

              {seqEmails.map((email, index) => (
                <div className="email-block" key={index}>
                  <div className="email-block-title">Email {index + 1} · Day {email.day}</div>

                  {index > 0 && (
                    <button type="button" className="remove-email-btn" onClick={() => removeEmail(index)}>
                      <Icon name="trash" size={14} />
                    </button>
                  )}

                  <label className="form-label">Send on Day</label>
                  <input
                    className="form-input"
                    type="number"
                    min="1"
                    value={email.day}
                    onChange={(e) => updateEmail(index, "day", parseInt(e.target.value))}
                    required
                  />

                  <label className="form-label">Subject Line</label>
                  <input
                    className="form-input"
                    placeholder="e.g. Quick follow-up, [Name]"
                    value={email.subject}
                    onChange={(e) => updateEmail(index, "subject", e.target.value)}
                    required
                  />

                  <label className="form-label">Email Body</label>
                  <div className="var-tags">
                    {["[Name]", "[Company]", "[Link]"].map((tag) => (
                      <span key={tag} className="var-tag" onClick={() => updateEmail(index, "body", email.body + tag)}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  <textarea
                    className="form-textarea"
                    placeholder={`Hey [Name],\n\nJust checking in.\n\n[Your Name]`}
                    value={email.body}
                    onChange={(e) => updateEmail(index, "body", e.target.value)}
                    required
                  />
                </div>
              ))}

              <button type="button" className="add-email-btn" onClick={addEmail}>
                + Add another email
              </button>

              <div className="modal-btns">
                <button type="button" className="modal-cancel" onClick={() => setShowNewSequence(false)}>
                  Cancel
                </button>

                <button type="submit" className="modal-submit" disabled={loading}>
                  {loading ? "Saving..." : "Create Sequence →"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}