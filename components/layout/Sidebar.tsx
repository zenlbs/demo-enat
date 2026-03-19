"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Trophy,
  Wand2,
  FileText,
  BarChart3,
  BrainCircuit,
  Settings,
  ChevronLeft,
  ChevronRight,
  Gift,
  GraduationCap,
  Radio,
  Search,
  Users,
  FileBarChart,
} from "lucide-react";
import { createContext, useContext, useState } from "react";

export const SidebarContext = createContext({ collapsed: false });

const navItems = [
  { href: "/", label: "Trang chủ", icon: Home },
  { href: "/challenges", label: "Thử thách", icon: Trophy },
  { href: "/creator-hub", label: "Creator Hub", icon: Wand2 },
  { href: "/content", label: "Nội dung", icon: FileText },
  { href: "/dashboard", label: "Hiệu suất", icon: BarChart3 },
  { href: "/insights", label: "AI Insights", icon: BrainCircuit },
  { href: "/social-listening", label: "Social Listening", icon: Radio },
  { href: "/keywords", label: "Từ khóa", icon: Search },
  { href: "/influencers", label: "Influencer Hub", icon: Users },
  { href: "/reports", label: "Báo cáo", icon: FileBarChart },
  { href: "/referral", label: "Mã giới thiệu", icon: Gift },
  { href: "/training", label: "Đào tạo", icon: GraduationCap },
  { href: "/admin", label: "Quản trị", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const sidebarWidth = collapsed ? 72 : 240;

  return (
    <SidebarContext.Provider value={{ collapsed }}>
      <motion.aside
        animate={{ width: sidebarWidth }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed left-0 top-0 h-screen bg-enat-sidebar flex flex-col z-50"
      >
        {/* Logo */}
        <div className="p-4 flex items-center gap-3 border-b border-white/10 min-h-[72px]">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-enat-gold to-enat-yellow flex items-center justify-center font-bold text-enat-green text-sm shrink-0">
            E
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="whitespace-nowrap"
              >
                <div className="text-white font-bold text-lg leading-tight">ENAT</div>
                <div className="text-white/50 text-xs">Creator Hub</div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Nav items */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto scrollbar-hide">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href));
            const Icon = item.icon;

            return (
              <Link key={item.href} href={item.href} title={collapsed ? item.label : undefined}>
                <div
                  className={`flex items-center gap-3 rounded-xl transition-all duration-200 relative ${
                    collapsed ? "px-0 py-2.5 justify-center" : "px-3 py-2.5"
                  } ${
                    isActive
                      ? "bg-enat-green text-white shadow-lg shadow-enat-green/30"
                      : "text-white/60 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-enat-gold rounded-r-full"
                    />
                  )}
                  <Icon size={20} className="shrink-0" />
                  {!collapsed && (
                    <span className="text-sm font-medium whitespace-nowrap">
                      {item.label}
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-4 border-t border-white/10 text-white/40 hover:text-white transition-colors flex items-center justify-center"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </motion.aside>

      {/* Spacer div to push content */}
      <motion.div
        animate={{ width: sidebarWidth }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="shrink-0"
      />
    </SidebarContext.Provider>
  );
}
