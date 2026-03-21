"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BarChart3, Users, MousePointer, TrendingUp, Shield, RefreshCw } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export default function Dashboard() {
  const [overview, setOverview] = useState<any>(null);
  const [trends, setTrends] = useState<any[]>([]);
  const [pages, setPages] = useState<any[]>([]);
  const [buttons, setButtons] = useState<any[]>([]);
  const [features, setFeatures] = useState<any[]>([]);
  const [suspiciousIps, setSuspiciousIps] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [company, setCompany] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  function getToken() {
    return localStorage.getItem("token");
  }

  function authHeaders() {
    return { Authorization: `Bearer ${getToken()}` };
  }

  async function fetchAll() {
    setLoading(true);
    try {
      const [overviewRes, trendsRes, pagesRes, buttonsRes, featuresRes, ipsRes, eventsRes, companyRes] = await Promise.all([
        axios.get(`${API_URL}/analytics/overview`, { headers: authHeaders() }),
        axios.get(`${API_URL}/analytics/trends`, { headers: authHeaders() }),
        axios.get(`${API_URL}/analytics/pages`, { headers: authHeaders() }),
        axios.get(`${API_URL}/analytics/buttons`, { headers: authHeaders() }),
        axios.get(`${API_URL}/analytics/features`, { headers: authHeaders() }),
        axios.get(`${API_URL}/analytics/suspicious-ips`, { headers: authHeaders() }),
        axios.get(`${API_URL}/events`, { headers: authHeaders(), params: { limit: 10 } }),
        axios.get(`${API_URL}/company/me`, { headers: authHeaders() }),
      ]);
      setOverview(overviewRes.data);
      setTrends(trendsRes.data);
      setPages(pagesRes.data);
      setButtons(buttonsRes.data);
      setFeatures(featuresRes.data);
      setSuspiciousIps(ipsRes.data);
      setEvents(eventsRes.data);
      setCompany(companyRes.data);
    } catch (e : any) {
      if (e.response?.status === 401){
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { fetchAll(); }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-[#ff5c00] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500 text-sm">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  const statCards = [
    { label: "Total Events", value: overview?.total_events ?? 0, icon: <BarChart3 size={20} />, color: "bg-[#ff5c00]" },
    { label: "Page Visits", value: overview?.page_visits ?? 0, icon: <TrendingUp size={20} />, color: "bg-[#111]" },
    { label: "Sign Ups", value: overview?.signups ?? 0, icon: <Users size={20} />, color: "bg-[#111]" },
    { label: "Active Users", value: overview?.active_users ?? 0, icon: <MousePointer size={20} />, color: "bg-[#111]" },
  ];

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <motion.h1 initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-3xl font-black text-[#111]">
            Good morning, <span className="text-[#ff5c00]">{company?.name}</span> 👋
          </motion.h1>
          <p className="text-gray-500 text-sm mt-1">Here's what's happening with your product today.</p>
        </div>
        <button onClick={fetchAll} className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-xl text-sm font-medium hover:border-[#ff5c00] transition-colors">
          <RefreshCw size={14} /> Refresh
        </button>
      </div>

      {/* API KEY */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-[#111] rounded-2xl p-5 mb-8 flex items-center justify-between">
        <div>
          <p className="text-xs text-gray-500 mb-1">Your API Key</p>
          <p className="text-white font-mono text-sm">{company?.api_key}</p>
        </div>
        <button
          onClick={() => navigator.clipboard.writeText(company?.api_key)}
          className="bg-[#ff5c00] text-white px-4 py-2 rounded-lg text-xs font-semibold hover:bg-[#e05000] transition-colors"
        >
          Copy
        </button>
      </motion.div>

      {/* STAT CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {statCards.map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className={`${card.color} rounded-2xl p-5 text-white`}
          >
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs opacity-70">{card.label}</p>
              <div className="opacity-60">{card.icon}</div>
            </div>
            <p className="text-3xl font-black">{card.value.toLocaleString()}</p>
          </motion.div>
        ))}
      </div>

      {/* TRENDS CHART */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-white border border-gray-100 rounded-2xl p-6 mb-8">
        <h2 className="text-lg font-bold text-[#111] mb-6">Event Trends (Last 30 days)</h2>
        {trends.length > 0 ? (
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={trends}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" tick={{ fontSize: 11, fill: "#999" }} />
              <YAxis tick={{ fontSize: 11, fill: "#999" }} />
              <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid #f0f0f0" }} />
              <Line type="monotone" dataKey="count" stroke="#ff5c00" strokeWidth={2} dot={{ fill: "#ff5c00", r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-48 flex items-center justify-center text-gray-400 text-sm">No trend data yet — send some events!</div>
        )}
      </motion.div>

      {/* PAGES + BUTTONS + FEATURES */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="bg-white border border-gray-100 rounded-2xl p-6">
          <h2 className="text-sm font-bold text-[#111] mb-4">Top Pages</h2>
          {pages.length > 0 ? pages.map((p, i) => (
            <div key={i} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
              <span className="text-sm text-gray-600 truncate">{p.page_url}</span>
              <span className="text-sm font-bold text-[#ff5c00]">{p.visits}</span>
            </div>
          )) : <p className="text-gray-400 text-sm">No page visits yet</p>}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="bg-white border border-gray-100 rounded-2xl p-6">
          <h2 className="text-sm font-bold text-[#111] mb-4">Top Buttons</h2>
          {buttons.length > 0 ? buttons.map((b, i) => (
            <div key={i} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
              <span className="text-sm text-gray-600 truncate">{b.button_id}</span>
              <span className="text-sm font-bold text-[#ff5c00]">{b.clicks}</span>
            </div>
          )) : <p className="text-gray-400 text-sm">No button clicks yet</p>}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="bg-white border border-gray-100 rounded-2xl p-6">
          <h2 className="text-sm font-bold text-[#111] mb-4">Feature Usage</h2>
          {features.length > 0 ? features.map((f, i) => (
            <div key={i} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
              <span className="text-sm text-gray-600 truncate">{f.feature_name}</span>
              <span className="text-sm font-bold text-[#ff5c00]">{f.usage_count}</span>
            </div>
          )) : <p className="text-gray-400 text-sm">No feature usage yet</p>}
        </motion.div>
      </div>

      {/* SUSPICIOUS IPS + RECENT EVENTS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="bg-white border border-gray-100 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Shield size={16} className="text-red-500" />
            <h2 className="text-sm font-bold text-[#111]">Suspicious IPs</h2>
          </div>
          {suspiciousIps.length > 0 ? suspiciousIps.map((ip, i) => (
            <div key={i} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
              <span className="text-sm font-mono text-gray-600">{ip.ip_address}</span>
              <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full font-semibold">{ip.signup_count} signups</span>
            </div>
          )) : <p className="text-gray-400 text-sm">No suspicious activity detected ✅</p>}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} className="bg-white border border-gray-100 rounded-2xl p-6">
          <h2 className="text-sm font-bold text-[#111] mb-4">Recent Events</h2>
          {events.length > 0 ? events.slice(0, 6).map((e, i) => (
            <div key={i} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
              <div>
                <span className="text-xs bg-[#ff5c00]/10 text-[#ff5c00] px-2 py-0.5 rounded-full font-medium">{e.event_type}</span>
                <span className="text-xs text-gray-400 ml-2">{e.page_url || e.button_id || e.feature_name || "—"}</span>
              </div>
              <span className="text-xs text-gray-400">{new Date(e.timestamp).toLocaleTimeString()}</span>
            </div>
          )) : <p className="text-gray-400 text-sm">No events yet</p>}
        </motion.div>
      </div>

    </div>
  );
}