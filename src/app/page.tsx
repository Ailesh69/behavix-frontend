"use client";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { BarChart3, ArrowRight, Check, Menu, X, Zap, Brain, Shield, Globe } from "lucide-react";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#f5f5f0] overflow-x-hidden font-sans">

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#f5f5f0]/90 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-8 py-5 flex items-center justify-between">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="flex items-center gap-2">
            <div className="w-7 h-7 bg-[#ff5c00] rounded-md flex items-center justify-center">
              <BarChart3 size={16} color="white" />
            </div>
            <span className="text-lg font-bold text-[#111]">Behavix</span>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.1 }} className="hidden md:flex items-center gap-10">
            <a href="#features" className="text-sm text-gray-500 hover:text-[#111] transition-colors">Solutions</a>
            <a href="#how-it-works" className="text-sm text-gray-500 hover:text-[#111] transition-colors">How it works</a>
            <a href="#pricing" className="text-sm text-gray-500 hover:text-[#111] transition-colors">Pricing</a>
            <a href="#" className="text-sm text-gray-500 hover:text-[#111] transition-colors">Contacts</a>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }} className="hidden md:flex items-center gap-4">
            <button className="text-sm text-gray-500 hover:text-[#111] transition-colors">Log in</button>
            <button className="bg-[#ff5c00] text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#e05000] transition-all hover:scale-105">
              Get Started
            </button>
          </motion.div>

          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
        {menuOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="md:hidden px-8 py-4 flex flex-col gap-4 border-t border-gray-200">
            <a href="#features" className="text-gray-600 text-sm">Solutions</a>
            <a href="#how-it-works" className="text-gray-600 text-sm">How it works</a>
            <a href="#pricing" className="text-gray-600 text-sm">Pricing</a>
            <button className="bg-[#ff5c00] text-white px-4 py-2 rounded-lg text-sm font-semibold w-full">Get Started</button>
          </motion.div>
        )}
      </nav>

      {/* HERO */}
      <section className="min-h-screen flex flex-col justify-between pt-24 px-8 max-w-7xl mx-auto">
        <div className="flex-1 flex flex-col justify-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="flex items-center gap-2 mb-8">
            <span className="w-2 h-2 bg-[#ff5c00] rounded-full animate-pulse"></span>
            <span className="text-sm text-gray-500 font-medium">AI-Powered User Analytics</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="text-[12vw] md:text-[10vw] font-black text-[#111] leading-none tracking-tighter uppercase mb-8"
          >
            KNOW YOUR<br />
            <span className="text-[#ff5c00]">USERS.</span><br />
            WIN FASTER.
          </motion.h1>

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="text-gray-500 text-lg max-w-md leading-relaxed"
            >
              We track every click, visit, and signup in your product — then use AI to tell you exactly what to do next.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="flex gap-3"
            >
              <button className="bg-[#ff5c00] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#e05000] transition-all hover:scale-105 flex items-center gap-2">
                Get Started <ArrowRight size={18} />
              </button>
              <button className="border border-gray-300 text-gray-600 px-8 py-4 rounded-xl font-medium hover:border-gray-500 transition-all">
                View Demo
              </button>
            </motion.div>
          </div>
        </div>

        {/* BOTTOM CARDS */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-12 mt-16"
        >
          <div className="bg-[#ff5c00] rounded-2xl p-6 text-white">
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 size={18} />
              <span className="text-sm font-medium opacity-80">Live Analytics</span>
            </div>
            <p className="text-2xl font-black mb-1">124.5K</p>
            <p className="text-sm opacity-70">Events tracked today</p>
            <div className="mt-4 flex items-end gap-0.5 h-12">
              {[40,65,45,80,55,90,70,85,60,95,75,100,65,88,72].map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ duration: 0.5, delay: 0.8 + i * 0.03 }}
                  className="flex-1 bg-white/40 rounded-sm"
                />
              ))}
            </div>
          </div>

          <div className="bg-[#111] rounded-2xl p-6 text-white">
            <div className="flex items-center gap-2 mb-4">
              <Brain size={18} className="text-[#ff5c00]" />
              <span className="text-sm font-medium text-gray-400">AI Insight</span>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed">
              "Your checkout page has <span className="text-[#ff5c00] font-bold">60% drop-off</span>. Simplify the form to increase conversions by an estimated 23%."
            </p>
            <div className="mt-4 flex items-center gap-2">
              <div className="w-6 h-6 bg-[#ff5c00] rounded-full flex items-center justify-center">
                <Brain size={12} />
              </div>
              <span className="text-xs text-gray-500">Powered by Groq LLaMA 3.3</span>
            </div>
          </div>

          <div className="bg-white border border-gray-100 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <Shield size={18} className="text-[#ff5c00]" />
              <span className="text-sm font-medium text-gray-500">Security Alert</span>
            </div>
            <p className="text-2xl font-black text-[#111] mb-1">3 IPs</p>
            <p className="text-sm text-gray-500 mb-4">Flagged for suspicious signups</p>
            <button className="text-xs text-[#ff5c00] font-semibold flex items-center gap-1 hover:gap-2 transition-all">
              View details <ArrowRight size={12} />
            </button>
          </div>
        </motion.div>
      </section>

      {/* STATS BAR */}
      <section className="bg-[#111] py-12 px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: "10M+", label: "Events tracked" },
            { value: "500+", label: "Companies" },
            { value: "99.9%", label: "Uptime" },
            { value: "<200ms", label: "API response" },
          ].map((s, i) => {
            const ref = useRef(null);
            const inView = useInView(ref, { once: true });
            return (
              <motion.div key={i} ref={ref} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: i * 0.1 }} className="text-center">
                <p className="text-3xl font-black text-white mb-1">{s.value}</p>
                <p className="text-sm text-gray-500">{s.label}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-24 px-8 max-w-7xl mx-auto">
        {(() => {
          const ref = useRef(null);
          const inView = useInView(ref, { once: true, margin: "-100px" });
          return (
            <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} className="mb-16">
              <p className="text-sm text-[#ff5c00] font-semibold mb-4 uppercase tracking-wider">• Features</p>
              <h2 className="text-5xl md:text-7xl font-black text-[#111] leading-none tracking-tight uppercase">
                BUILT FOR<br />
                <span className="text-[#ff5c00]">BUILDERS</span>
              </h2>
            </motion.div>
          );
        })()}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { icon: <Zap size={20} />, title: "Real-time Event Tracking", desc: "Track page visits, button clicks, signups, and feature usage with a single API call. No complex setup required.", big: true },
            { icon: <Brain size={20} />, title: "AI-Powered Insights", desc: "Groq LLaMA 3.3 analyzes your data and tells you exactly what's working and what needs fixing.", big: false },
            { icon: <Shield size={20} />, title: "Fraud Detection", desc: "Automatically detect suspicious signup patterns and multiple accounts from the same IP.", big: false },
            { icon: <Globe size={20} />, title: "Multi-tenant Architecture", desc: "Each company gets isolated data and API key. Your data never mixes with others.", big: false },
          ].map((f, i) => {
            const ref = useRef(null);
            const inView = useInView(ref, { once: true, margin: "-50px" });
            return (
              <motion.div
                key={i}
                ref={ref}
                initial={{ opacity: 0, y: 40, scale: 0.97 }}
                animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className={`rounded-2xl p-8 hover:-translate-y-1 transition-all cursor-pointer group ${i === 0 ? "bg-[#ff5c00] text-white md:col-span-2" : "bg-white border border-gray-100 hover:shadow-xl"}`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-6 ${i === 0 ? "bg-white/20" : "bg-[#ff5c00]/10 text-[#ff5c00] group-hover:bg-[#ff5c00] group-hover:text-white transition-all"}`}>
                  {f.icon}
                </div>
                <h3 className={`text-xl font-bold mb-3 ${i === 0 ? "text-white" : "text-[#111]"}`}>{f.title}</h3>
                <p className={`leading-relaxed ${i === 0 ? "text-orange-100" : "text-gray-500"}`}>{f.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-24 px-8 bg-[#111]">
        <div className="max-w-7xl mx-auto">
          {(() => {
            const ref = useRef(null);
            const inView = useInView(ref, { once: true, margin: "-100px" });
            return (
              <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} className="mb-16">
                <p className="text-sm text-[#ff5c00] font-semibold mb-4 uppercase tracking-wider">• How it works</p>
                <h2 className="text-5xl md:text-7xl font-black text-white leading-none tracking-tight uppercase">
                  UP AND RUNNING<br />
                  <span className="text-[#ff5c00]">IN 5 MINUTES</span>
                </h2>
              </motion.div>
            );
          })()}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { step: "01", title: "Register & Get API Key", desc: "Create your Behavix account and receive a unique API key instantly." },
              { step: "02", title: "Send Events", desc: "Add a single fetch call to your app. Send events whenever users do something." },
              { step: "03", title: "Get AI Insights", desc: "Log in and let AI tell you exactly what your users love, hate, and want more of." },
            ].map((s, i) => {
              const ref = useRef(null);
              const inView = useInView(ref, { once: true, margin: "-50px" });
              return (
                <motion.div
                  key={i}
                  ref={ref}
                  initial={{ opacity: 0, y: 40 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                  className="bg-[#1a1a1a] rounded-2xl p-8 hover:bg-[#222] transition-all hover:-translate-y-1"
                >
                  <p className="text-6xl font-black text-[#ff5c00] opacity-50 mb-6">{s.step}</p>
                  <h3 className="text-xl font-bold text-white mb-3">{s.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{s.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-24 px-8 max-w-7xl mx-auto">
        {(() => {
          const ref = useRef(null);
          const inView = useInView(ref, { once: true, margin: "-100px" });
          return (
            <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} className="mb-16">
              <p className="text-sm text-[#ff5c00] font-semibold mb-4 uppercase tracking-wider">• Pricing</p>
              <h2 className="text-5xl md:text-7xl font-black text-[#111] leading-none tracking-tight uppercase">
                SIMPLE<br />
                <span className="text-[#ff5c00]">HONEST PRICING</span>
              </h2>
            </motion.div>
          );
        })()}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: "Free", price: "$0", period: "forever", features: ["10,000 events/month", "7-day retention", "Basic analytics", "1 project"], cta: "Get started", highlighted: false },
            { name: "Startup", price: "$29", period: "per month", features: ["1M events/month", "90-day retention", "AI insights", "5 projects", "Fraud detection"], cta: "Start free trial", highlighted: true },
            { name: "Enterprise", price: "Custom", period: "contact us", features: ["Unlimited events", "1-year retention", "Priority AI insights", "Unlimited projects", "Dedicated support"], cta: "Contact us", highlighted: false },
          ].map((p, i) => {
            const ref = useRef(null);
            const inView = useInView(ref, { once: true, margin: "-50px" });
            return (
              <motion.div
                key={i}
                ref={ref}
                initial={{ opacity: 0, y: 40, scale: 0.97 }}
                animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className={`rounded-2xl p-8 hover:-translate-y-2 transition-all ${p.highlighted ? "bg-[#ff5c00] text-white shadow-2xl scale-105" : "bg-white border border-gray-100 hover:shadow-xl"}`}
              >
                <h3 className={`text-lg font-bold mb-1 ${p.highlighted ? "text-white" : "text-[#111]"}`}>{p.name}</h3>
                <div className="flex items-end gap-1 mb-6">
                  <span className={`text-5xl font-black ${p.highlighted ? "text-white" : "text-[#111]"}`}>{p.price}</span>
                  <span className={`text-sm mb-2 ${p.highlighted ? "text-orange-200" : "text-gray-400"}`}>/{p.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {p.features.map((f, j) => (
                    <li key={j} className={`flex items-center gap-2 text-sm ${p.highlighted ? "text-orange-100" : "text-gray-600"}`}>
                      <Check size={14} className={p.highlighted ? "text-white" : "text-[#ff5c00]"} />
                      {f}
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-3 rounded-xl font-bold text-sm transition-all hover:scale-105 ${p.highlighted ? "bg-white text-[#ff5c00] hover:bg-orange-50" : "bg-[#111] text-white hover:bg-[#333]"}`}>
                  {p.cta}
                </button>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-8 bg-[#ff5c00]">
        {(() => {
          const ref = useRef(null);
          const inView = useInView(ref, { once: true, margin: "-100px" });
          return (
            <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} className="max-w-4xl mx-auto text-center">
              <h2 className="text-5xl md:text-7xl font-black text-white leading-none tracking-tight uppercase mb-8">
                READY TO KNOW<br />YOUR USERS?
              </h2>
              <button className="bg-white text-[#ff5c00] px-10 py-4 rounded-xl font-black text-lg hover:bg-orange-50 transition-all hover:scale-105 flex items-center gap-2 mx-auto">
                Get started for free <ArrowRight size={20} />
              </button>
            </motion.div>
          );
        })()}
      </section>

      {/* FOOTER */}
      <footer className="py-10 px-8 bg-[#111]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-[#ff5c00] rounded-md flex items-center justify-center">
              <BarChart3 size={14} color="white" />
            </div>
            <span className="font-bold text-white">Behavix</span>
          </div>
          <p className="text-gray-500 text-sm">© 2026 Behavix. Built by Ailesh Sharma.</p>
          <div className="flex gap-6 text-sm text-gray-500">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </footer>

    </main>
  );
}