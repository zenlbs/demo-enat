"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Eye,
  Heart,
  ShoppingCart,
  DollarSign,
  TrendingUp,
  Calendar,
  Share2,
  MessageCircle,
  ShoppingBag,
  ArrowUpRight,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  dashboardMetrics,
  performanceData,
  platformBreakdown,
  activityFeed,
  contentItems,
} from "@/data/mock";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations";

/* ─── Animated Counter Hook ─── */
function useCountUp(target: number, duration = 1500, decimals = 0) {
  const [value, setValue] = useState(0);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    startRef.current = null;

    const animate = (timestamp: number) => {
      if (!startRef.current) startRef.current = timestamp;
      const elapsed = timestamp - startRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Number((eased * target).toFixed(decimals)));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [target, duration, decimals]);

  return value;
}

/* ─── KPI Card ─── */
function KPICard({
  icon: Icon,
  label,
  value,
  suffix,
  gradient,
  growth,
  delay,
}: {
  icon: React.ElementType;
  label: string;
  value: number;
  suffix?: string;
  gradient: string;
  growth: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      whileHover={{ y: -4, scale: 1.02 }}
      className="relative overflow-hidden rounded-2xl bg-white border border-zinc-100 shadow-sm hover:shadow-xl transition-shadow duration-300"
    >
      <div className="p-5">
        <div className="flex items-start justify-between mb-4">
          <div
            className={`w-12 h-12 rounded-xl ${gradient} flex items-center justify-center shadow-lg`}
          >
            <Icon size={22} className="text-white" />
          </div>
          <div className="flex items-center gap-1 text-xs font-semibold text-enat-green bg-enat-green/10 px-2 py-1 rounded-full">
            <TrendingUp size={12} />
            <span>{growth}</span>
          </div>
        </div>
        <p className="text-sm text-zinc-500 mb-1">{label}</p>
        <p className="text-2xl font-bold text-enat-dark">
          {value.toLocaleString("vi-VN")}
          {suffix && (
            <span className="text-base font-medium text-zinc-400 ml-1">
              {suffix}
            </span>
          )}
        </p>
      </div>
      {/* Decorative gradient strip */}
      <div
        className={`h-1 w-full ${gradient}`}
      />
    </motion.div>
  );
}

/* ─── Activity Icon Map ─── */
const activityIcons: Record<string, { icon: React.ElementType; color: string; bg: string }> = {
  view: { icon: Eye, color: "text-enat-green", bg: "bg-enat-green/10" },
  like: { icon: Heart, color: "text-pink-500", bg: "bg-pink-50" },
  share: { icon: Share2, color: "text-blue-500", bg: "bg-blue-50" },
  comment: { icon: MessageCircle, color: "text-amber-500", bg: "bg-amber-50" },
  conversion: { icon: ShoppingBag, color: "text-violet-500", bg: "bg-violet-50" },
};

/* ─── Custom Tooltip for Chart ─── */
function ChartTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; name: string }>; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white/95 backdrop-blur-lg rounded-xl border border-zinc-100 shadow-xl p-3 min-w-[160px]">
      <p className="text-xs font-semibold text-zinc-400 mb-2">{label}</p>
      {payload.map((entry, i) => (
        <div key={i} className="flex items-center justify-between gap-4 text-sm">
          <span className="text-zinc-600 capitalize">{entry.name === "views" ? "Lượt xem" : entry.name}</span>
          <span className="font-bold text-enat-dark">
            {entry.value.toLocaleString("vi-VN")}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ─── Custom Legend for Donut ─── */
function DonutLegend({ data }: { data: typeof platformBreakdown }) {
  return (
    <div className="space-y-3 mt-4">
      {data.map((item) => (
        <div key={item.name} className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-sm text-zinc-600">{item.name}</span>
          </div>
          <span className="text-sm font-bold text-enat-dark">{item.value}%</span>
        </div>
      ))}
    </div>
  );
}

/* ─── Platform badge color map ─── */
const platformBadge: Record<string, { bg: string; text: string }> = {
  instagram: { bg: "bg-gradient-to-r from-purple-500 to-pink-500", text: "text-white" },
  tiktok: { bg: "bg-enat-dark", text: "text-white" },
  facebook: { bg: "bg-[#1877F2]", text: "text-white" },
};

/* ═══════════════════════════════════════════════════════════
   DASHBOARD PAGE
   ═══════════════════════════════════════════════════════════ */
export default function DashboardPage() {
  const totalViews = useCountUp(245.8, 1500, 1);
  const engagementRate = useCountUp(7.8, 1500, 1);
  const conversions = useCountUp(1247, 1500);
  const commission = useCountUp(12.45, 1500, 2);

  const [dateRange, setDateRange] = useState("7d");

  const publishedContent = contentItems.filter((c) => c.status === "published");

  const formatPlatform = useCallback((p: string) => {
    return p.charAt(0).toUpperCase() + p.slice(1);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-enat-yellow-light/20 p-6 lg:p-8">
      {/* ─── Header ─── */}
      <motion.div {...fadeInUp} className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-enat-green to-enat-green-light flex items-center justify-center shadow-lg shadow-enat-green/20">
              <TrendingUp size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-enat-dark">Hiệu Suất</h1>
              <p className="text-sm text-zinc-400">
                Tổng quan hiệu suất chiến dịch của bạn
              </p>
            </div>
          </div>

          {/* Date range selector */}
          <div className="flex gap-1 bg-white rounded-xl p-1 shadow-sm border border-zinc-100">
            {[
              { label: "7 ngày", value: "7d" },
              { label: "30 ngày", value: "30d" },
              { label: "90 ngày", value: "90d" },
            ].map((d) => (
              <button
                key={d.value}
                onClick={() => setDateRange(d.value)}
                className={`relative px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  dateRange === d.value
                    ? "text-white"
                    : "text-zinc-500 hover:text-zinc-700"
                }`}
              >
                {dateRange === d.value && (
                  <motion.div
                    layoutId="dateRangeIndicator"
                    className="absolute inset-0 bg-enat-green rounded-lg"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{d.label}</span>
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ─── KPI Cards ─── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
        <KPICard
          icon={Eye}
          label="Tổng lượt xem"
          value={totalViews}
          suffix="K"
          gradient="bg-gradient-to-br from-enat-green to-enat-green-light"
          growth="↑ 12%"
          delay={0}
        />
        <KPICard
          icon={Heart}
          label="Tỷ lệ tương tác"
          value={engagementRate}
          suffix="%"
          gradient="bg-gradient-to-br from-pink-400 to-rose-500"
          growth="↑ 8.5%"
          delay={0.1}
        />
        <KPICard
          icon={ShoppingCart}
          label="Chuyển đổi"
          value={conversions}
          gradient="bg-gradient-to-br from-sky-400 to-blue-500"
          growth="↑ 15%"
          delay={0.2}
        />
        <KPICard
          icon={DollarSign}
          label="Hoa hồng"
          value={commission}
          suffix="M VNĐ"
          gradient="bg-gradient-to-br from-enat-gold to-amber-500"
          growth="↑ 22%"
          delay={0.3}
        />
      </div>

      {/* ─── Area Chart ─── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="bg-white rounded-2xl border border-zinc-100 shadow-sm p-6 mb-8"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-bold text-enat-dark">Lượt xem theo thời gian</h2>
            <p className="text-sm text-zinc-400 mt-0.5">
              Xu hướng tăng trưởng lượt xem trong 18 ngày gần nhất
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-enat-green font-semibold bg-enat-green/10 px-3 py-1.5 rounded-full">
            <TrendingUp size={14} />
            <span>+250%</span>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={320}>
          <AreaChart data={performanceData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="viewsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1A7340" stopOpacity={0.3} />
                <stop offset="50%" stopColor="#2A9B58" stopOpacity={0.1} />
                <stop offset="100%" stopColor="#1A7340" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#1A7340" />
                <stop offset="100%" stopColor="#2A9B58" />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#f0f0f0"
              vertical={false}
            />
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#a1a1aa" }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#a1a1aa" }}
              tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`}
              dx={-10}
            />
            <Tooltip content={<ChartTooltip />} />
            <Area
              type="monotone"
              dataKey="views"
              stroke="url(#lineGradient)"
              strokeWidth={3}
              fill="url(#viewsGradient)"
              dot={false}
              activeDot={{
                r: 6,
                strokeWidth: 3,
                stroke: "#fff",
                fill: "#1A7340",
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>

      {/* ─── Two Columns: Donut + Activity Feed ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Donut Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white rounded-2xl border border-zinc-100 shadow-sm p-6"
        >
          <h2 className="text-lg font-bold text-enat-dark mb-1">
            Phân bổ nền tảng
          </h2>
          <p className="text-sm text-zinc-400 mb-4">
            Tỷ lệ phân bổ nội dung trên các nền tảng
          </p>
          <div className="flex items-center gap-4">
            <div className="w-[200px] h-[200px] relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={platformBreakdown}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={4}
                    dataKey="value"
                    strokeWidth={0}
                  >
                    {platformBreakdown.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              {/* Center label */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-enat-dark">100%</span>
                <span className="text-xs text-zinc-400">Tổng</span>
              </div>
            </div>
            <div className="flex-1">
              <DonutLegend data={platformBreakdown} />
            </div>
          </div>
        </motion.div>

        {/* Activity Feed */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white rounded-2xl border border-zinc-100 shadow-sm p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold text-enat-dark">
                Hoạt động gần đây
              </h2>
              <p className="text-sm text-zinc-400 mt-0.5">
                Cập nhật real-time từ các kênh
              </p>
            </div>
            <div className="w-2 h-2 rounded-full bg-enat-green animate-pulse" />
          </div>
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="space-y-2"
          >
            {activityFeed.map((activity, index) => {
              const config = activityIcons[activity.type] || activityIcons.view;
              const IconComp = config.icon;
              return (
                <motion.div
                  key={activity.id}
                  variants={staggerItem}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  whileHover={{ x: 4 }}
                  className="flex items-start gap-3 p-3 rounded-xl hover:bg-zinc-50 transition-colors cursor-pointer group"
                >
                  <div
                    className={`w-9 h-9 rounded-xl ${config.bg} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}
                  >
                    <IconComp size={16} className={config.color} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-enat-dark leading-snug">
                      {activity.message}
                    </p>
                    <p className="text-xs text-zinc-400 mt-1">
                      {activity.time}
                    </p>
                  </div>
                  <ArrowUpRight
                    size={14}
                    className="text-zinc-300 shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>

      {/* ─── Content Performance Table ─── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="bg-white rounded-2xl border border-zinc-100 shadow-sm overflow-hidden"
      >
        <div className="p-6 pb-4">
          <h2 className="text-lg font-bold text-enat-dark">
            Hiệu suất nội dung
          </h2>
          <p className="text-sm text-zinc-400 mt-0.5">
            Thống kê chi tiết các nội dung đã xuất bản
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-t border-b border-zinc-100">
                <th className="text-left text-xs font-semibold text-zinc-400 uppercase tracking-wider px-6 py-3">
                  Nội dung
                </th>
                <th className="text-left text-xs font-semibold text-zinc-400 uppercase tracking-wider px-6 py-3">
                  Nền tảng
                </th>
                <th className="text-right text-xs font-semibold text-zinc-400 uppercase tracking-wider px-6 py-3">
                  <div className="flex items-center justify-end gap-1 cursor-pointer hover:text-zinc-600 transition-colors">
                    Lượt xem
                    <TrendingUp size={12} />
                  </div>
                </th>
                <th className="text-right text-xs font-semibold text-zinc-400 uppercase tracking-wider px-6 py-3">
                  <div className="flex items-center justify-end gap-1 cursor-pointer hover:text-zinc-600 transition-colors">
                    Lượt thích
                    <Heart size={12} />
                  </div>
                </th>
                <th className="text-right text-xs font-semibold text-zinc-400 uppercase tracking-wider px-6 py-3">
                  <div className="flex items-center justify-end gap-1 cursor-pointer hover:text-zinc-600 transition-colors">
                    Ngày đăng
                    <Calendar size={12} />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {publishedContent.map((item, index) => {
                const badge = platformBadge[item.platform] || platformBadge.facebook;
                return (
                  <motion.tr
                    key={item.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.5 + index * 0.08 }}
                    className={`group cursor-pointer transition-colors ${
                      index % 2 === 0 ? "bg-white" : "bg-zinc-50/50"
                    } hover:bg-enat-yellow-light/30`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 ring-2 ring-zinc-100">
                          <img
                            src={item.thumbnail}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                        <span className="text-sm font-medium text-enat-dark line-clamp-1 group-hover:text-enat-green transition-colors">
                          {item.title}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`${badge.bg} ${badge.text} text-xs font-semibold px-3 py-1 rounded-full`}
                      >
                        {formatPlatform(item.platform)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-sm font-semibold text-enat-dark">
                        {item.views.toLocaleString("vi-VN")}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-sm font-semibold text-enat-dark">
                        {item.likes.toLocaleString("vi-VN")}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-sm text-zinc-500">{item.date}</span>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
