"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { BarChart3, LayoutDashboard, Brain, Settings, LogOut, Menu, X } from "lucide-react";
import { motion } from "framer-motion";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
  const token = localStorage.getItem("token");
  if (!token) {
    router.push("/login");
    return;
  }
  // Check if token is expired
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    if (payload.exp * 1000 < Date.now()) {
      localStorage.removeItem("token");
      router.push("/login");
    }
  } catch {
    localStorage.removeItem("token");
    router.push("/login");
  }
}, []);

  function handleLogout() {
    localStorage.removeItem("token");
    router.push("/login");
  }

  const navItems = [
    { icon: <LayoutDashboard size={16} />, label: "Overview", href: "/dashboard" },
    { icon: <Brain size={16} />, label: "AI Insights", href: "/dashboard/insights" },
    { icon: <Settings size={16} />, label: "Settings", href: "/dashboard/settings" },
  ];

  return (
    <div className="min-h-screen bg-[#f5f5f0]">
      {/* TOP NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#111] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          {/* LOGO */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-[#ff5c00] rounded-md flex items-center justify-center">
              <BarChart3 size={16} color="white" />
            </div>
            <span className="font-bold text-white text-base">Behavix</span>
          </div>

          {/* NAV ITEMS */}
          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item, i) => {
              const isActive = pathname === item.href;
              return (
                <motion.a
                  key={i}
                  href={item.href}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center gap-2 rounded-xl font-medium transition-all ${
                    isActive
                      ? "bg-[#ff5c00] text-white shadow-lg shadow-orange-500/30 px-6 py-3 text-base"
                      : "text-gray-400 hover:text-white hover:bg-white/10 px-6 py-3 text-base"
                  }`}
                >
                  {item.icon}
                  {item.label}
                </motion.a>
              );
            })}
          </div>

          {/* LOGOUT */}
          <div className="hidden md:flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-gray-400 hover:text-red-400 hover:bg-red-400/10 transition-all"
            >
              <LogOut size={16} />
              Logout
            </motion.button>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* MOBILE MENU */}
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="md:hidden px-6 py-4 flex flex-col gap-2 border-t border-white/10"
          >
            {navItems.map((item, i) => (

               <a key={i}
                href={item.href}
                className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-white/10 transition-all"
              >
                {item.icon}
                {item.label}
              </a>
            ))}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-red-400/10 transition-all"
            >
              <LogOut size={16} />
              Logout
            </button>
          </motion.div>
        )}
      </nav>

      {/* MAIN CONTENT */}
      <main className="pt-16">
        {children}
      </main>
    </div>
  );
}