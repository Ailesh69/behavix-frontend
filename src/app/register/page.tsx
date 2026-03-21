"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { BarChart3, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export default function Register() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [plan, setPlan] = useState("free");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleRegister() {
    setLoading(true);
    setError("");
    try {
      await axios.post(`${API_URL}/auth/register`, { name, email, password });
      router.push("/login");
    } catch (e: any) {
      const detail = e.response?.data?.detail;
      setError(Array.isArray(detail) ? "Invalid input — check your details" : detail || "Registration failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f5f5f0] flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-2xl p-10 w-full max-w-md shadow-xl border border-gray-100"
      >
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 bg-[#ff5c00] rounded-lg flex items-center justify-center">
            <BarChart3 size={18} color="white" />
          </div>
          <span className="text-xl font-bold text-[#111]">Behavix</span>
        </div>

        <h1 className="text-3xl font-black text-[#111] mb-2">Get started</h1>
        <p className="text-gray-500 text-sm mb-8">Create your Behavix account</p>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl mb-6">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Company Name</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Acme Inc."
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#ff5c00] transition-colors"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@company.com"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#ff5c00] transition-colors"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Min 8 chars, 1 number, 1 special char"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#ff5c00] transition-colors"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Choose Plan</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: "free", name: "Free", price: "$0" },
                { id: "startup", name: "Startup", price: "$29/mo" },
                { id: "enterprise", name: "Enterprise", price: "Custom" },
              ].map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setPlan(p.id)}
                  className={`p-3 rounded-xl border-2 text-center transition-all ${
                    plan === p.id
                      ? "border-[#ff5c00] bg-[#ff5c00]/5"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <p className={`text-xs font-bold ${plan === p.id ? "text-[#ff5c00]" : "text-[#111]"}`}>{p.name}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{p.price}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={handleRegister}
          disabled={loading}
          className="w-full bg-[#ff5c00] text-white py-3 rounded-xl font-bold mt-6 hover:bg-[#e05000] transition-all hover:scale-105 flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {loading ? "Creating account..." : <>Create account <ArrowRight size={16} /></>}
        </button>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <a href="/login" className="text-[#ff5c00] font-semibold hover:underline">Log in</a>
        </p>
      </motion.div>
    </main>
  );
}