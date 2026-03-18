"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
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
} from "lucide-react";
import { useState } from "react";

const navItems = [
  { href: "/", label: "Trang chủ", icon: Home },
  { href: "/challenges", label: "Thử thách", icon: Trophy },
  { href: "/creator-hub", label: "Creator Hub", icon: Wand2 },
  { href: "/content", label: "Nội dung", icon: FileText },
  { href: "/dashboard", label: "Hiệu suất", icon: BarChart3 },
  { href: "/insights", label: "AI Insights", icon: BrainCircuit },
  { href: "/referral", label: "Mã giới thiệu", icon: Gift },
  { href: "/training", label: "Đào tạo", icon: GraduationCap },
  { href: "/admin", label: "Quản trị", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <motion.aside
      animate={{ width: collapsed ? 72 : 240 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed left-0 top-0 h-screen bg-enat-sidebar flex flex-col z-50"
    >
      {/* Logo */}
      <div className="p-4 flex items-center gap-3 border-b border-white/10">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-enat-gold to-enat-yellow flex items-center justify-center font-bold text-enat-green text-sm shrink-0">
          E
        </div>
        {!collapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="text-white font-bold text-lg">ENAT</div>
            <div className="text-white/50 text-xs">Creator Hub</div>
            <div className="text-white/30 text-[10px] mt-0.5">Cộng đồng sáng tạo</div>
          </motion.div>
        )}
      </div>

      {/* Nav items */}
      <nav className="flex-1 p-3 space-y-1">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/" && pathname.startsWith(item.href));
          const Icon = item.icon;

          return (
            <Link key={item.href} href={item.href}>
              <motion.div
                whileHover={{ x: 4 }}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative ${
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
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-sm font-medium"
                  >
                    {item.label}
                  </motion.span>
                )}
              </motion.div>
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
  );
}
