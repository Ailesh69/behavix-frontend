"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Key, RefreshCw, Copy, Check } from "lucide-react";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export default function SettingsPage() {
  const [company, setCompany] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [regenerating, setRegenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  function getToken() {
    return localStorage.getItem("token");
  }

  async function fetchCompany() {
    try {
      const res = await axios.get(`${API_URL}/company/me`, {
        headers: { Authorization: `Bearer ${getToken()}` }
      });
      setCompany(res.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  async function regenerateKey() {
    setRegenerating(true);
    try {
      const res = await axios.post(`${API_URL}/company/regenerate-key`, {}, {
        headers: { Authorization: `Bearer ${getToken()}` }
      });
      setCompany(res.data);
    } catch (e) {
      console.error(e);
    } finally {
      setRegenerating(false);
    }
  }

  function copyKey() {
    navigator.clipboard.writeText(company?.api_key);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  useEffect(() => { fetchCompany(); }, []);

  if (loading) return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-8 h-8 border-4 border-[#ff5c00] border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="p-6 md:p-10 max-w-3xl mx-auto">
      <div className="mb-10">
        <h1 className="text-3xl font-black text-[#111]">Settings</h1>
        <p className="text-gray-500 text-sm mt-1">Manage your company and API key.</p>
      </div>

      {/* COMPANY INFO */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white border border-gray-100 rounded-2xl p-6 mb-6">
        <h2 className="font-bold text-[#111] mb-4">Company Info</h2>
        <div className="space-y-3">
          <div>
            <p className="text-xs text-gray-500 mb-1">Company Name</p>
            <p className="text-sm font-medium text-[#111]">{company?.name}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Email</p>
            <p className="text-sm font-medium text-[#111]">{company?.email}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Member since</p>
            <p className="text-sm font-medium text-[#111]">{new Date(company?.created_at).toLocaleDateString()}</p>
          </div>
        </div>
      </motion.div>

      {/* API KEY */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white border border-gray-100 rounded-2xl p-6 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Key size={16} className="text-[#ff5c00]" />
          <h2 className="font-bold text-[#111]">API Key</h2>
        </div>
        <p className="text-xs text-gray-500 mb-3">Use this key to send events to Behavix from your product.</p>
        <div className="bg-[#111] rounded-xl p-4 flex items-center justify-between gap-4 mb-4">
          <p className="text-white font-mono text-xs break-all">{company?.api_key}</p>
          <button onClick={copyKey} className="shrink-0 bg-[#ff5c00] text-white px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 hover:bg-[#e05000] transition-colors">
            {copied ? <><Check size={12} /> Copied!</> : <><Copy size={12} /> Copy</>}
          </button>
        </div>
        <button
          onClick={regenerateKey}
          disabled={regenerating}
          className="flex items-center gap-2 text-sm text-red-500 hover:text-red-600 font-medium transition-colors disabled:opacity-50"
        >
          <RefreshCw size={14} className={regenerating ? "animate-spin" : ""} />
          {regenerating ? "Regenerating..." : "Regenerate API Key"}
        </button>
        <p className="text-xs text-gray-400 mt-2">⚠️ Regenerating will invalidate your old key immediately.</p>
      </motion.div>


        {/* CURRENT PLAN */}
<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="bg-white border border-gray-100 rounded-2xl p-6 mb-6">
  <h2 className="font-bold text-[#111] mb-4">Current Plan</h2>

  <div className="flex items-center justify-between p-4 bg-[#f5f5f0] rounded-xl mb-4">
    <div>
      <p className="text-xs text-gray-500 mb-1">Active Plan</p>
      <p className="text-lg font-black text-[#111]">Free</p>
      <p className="text-xs text-gray-500 mt-1">10,000 events/month · 7-day retention</p>
    </div>
    <span className="bg-green-100 text-green-600 text-xs font-semibold px-3 py-1 rounded-full">Active</span>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
    <div className="border border-[#ff5c00] rounded-xl p-4 relative">
      <span className="absolute -top-2 left-4 bg-[#ff5c00] text-white text-xs font-bold px-2 py-0.5 rounded-full">Popular</span>
      <h3 className="font-bold text-[#111] mb-1">Startup</h3>
      <p className="text-2xl font-black text-[#111] mb-1">$29<span className="text-sm text-gray-400 font-normal">/mo</span></p>
      <p className="text-xs text-gray-500 mb-3">1M events · 90-day retention · AI insights</p>
      <button className="w-full bg-[#ff5c00] text-white py-2 rounded-lg text-sm font-bold hover:bg-[#e05000] transition-colors">
        Upgrade to Startup
      </button>
    </div>

    <div className="border border-gray-200 rounded-xl p-4">
      <h3 className="font-bold text-[#111] mb-1">Enterprise</h3>
      <p className="text-2xl font-black text-[#111] mb-1">Custom</p>
      <p className="text-xs text-gray-500 mb-3">Unlimited events · 1-year retention · Priority support</p>
      <button className="w-full bg-[#111] text-white py-2 rounded-lg text-sm font-bold hover:bg-[#333] transition-colors">
        Contact Us
      </button>
    </div>
  </div>
</motion.div>

      {/* INTEGRATION EXAMPLE */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-[#111] rounded-2xl p-6">
        <h2 className="font-bold text-white mb-4">Quick Integration</h2>
        <p className="text-gray-400 text-xs mb-3">Add this to your frontend to start tracking events:</p>
        <pre className="text-green-400 text-xs leading-relaxed overflow-x-auto">{`fetch("${API_URL}/events", {
  method: "POST",
  headers: {
    "X-API-Key": "${company?.api_key}",
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    event_type: "page_visit",
    page_url: window.location.pathname,
    user_id: "user_123"
  })
})`}</pre>
      </motion.div>
    </div>
  );
}