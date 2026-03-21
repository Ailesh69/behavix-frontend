"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Brain, RefreshCw, Sparkles } from "lucide-react";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export default function InsightsPage() {
  const [insights, setInsights] = useState<string>("");
  const [summary, setSummary] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  function getToken() {
    return localStorage.getItem("token");
  }

  async function fetchInsights() {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/insights/`, {
        headers: { Authorization: `Bearer ${getToken()}` }
      });
      setInsights(res.data.insights);
      setSummary(res.data.data_summary);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-black text-[#111]">AI <span className="text-[#ff5c00]">Insights</span></h1>
          <p className="text-gray-500 text-sm mt-1">Let AI analyze your data and tell you what to do next.</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={fetchInsights}
          disabled={loading}
          className="flex items-center gap-2 bg-[#ff5c00] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#e05000] transition-colors disabled:opacity-50"
        >
          {loading ? <RefreshCw size={16} className="animate-spin" /> : <Sparkles size={16} />}
          {loading ? "Analyzing..." : "Generate Insights"}
        </motion.button>
      </div>

      {/* DATA SUMMARY */}
      {summary && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          {[
            { label: "Total Events", value: summary.total_events },
            { label: "Sign Ups", value: summary.signups },
            { label: "Top Pages", value: summary.top_pages.length },
            { label: "Suspicious IPs", value: summary.suspicious_ips },
          ].map((s, i) => (
            <div key={i} className={`rounded-2xl p-5 ${i === 0 ? "bg-[#ff5c00] text-white" : "bg-white border border-gray-100"}`}>
              <p className={`text-xs mb-1 ${i === 0 ? "text-orange-200" : "text-gray-500"}`}>{s.label}</p>
              <p className={`text-3xl font-black ${i === 0 ? "text-white" : "text-[#111]"}`}>{s.value}</p>
            </div>
          ))}
        </motion.div>
      )}

      {/* INSIGHTS */}
      {insights ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-gray-100 rounded-2xl p-8"
        >
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-[#ff5c00]/10 rounded-lg flex items-center justify-center">
              <Brain size={16} className="text-[#ff5c00]" />
            </div>
            <h2 className="font-bold text-[#111]">Groq LLaMA 3.3 Analysis</h2>
          </div>
          <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed whitespace-pre-wrap">
            {insights}
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white border border-gray-100 rounded-2xl p-16 text-center"
        >
          <div className="w-16 h-16 bg-[#ff5c00]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Brain size={32} className="text-[#ff5c00]" />
          </div>
          <h3 className="text-lg font-bold text-[#111] mb-2">No insights yet</h3>
          <p className="text-gray-500 text-sm">Click "Generate Insights" to let AI analyze your data!</p>
        </motion.div>
      )}
    </div>
  );
}