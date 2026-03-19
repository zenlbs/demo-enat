"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Plus,
  Download,
  TrendingUp,
  TrendingDown,
  Bell,
  AlertTriangle,
  Info,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations";

/* ─── Mock Data ─── */
const keywords = [
  {
    id: 1,
    name: "ENAT 400",
    volume: 14200,
    trend: 12,
    mentions: 3240,
    sentiment: 82,
  },
  {
    id: 2,
    name: "Vitamin E làm đẹp",
    volume: 8900,
    trend: 28,
    mentions: 1890,
    sentiment: 79,
  },
  {
    id: 3,
    name: "Chống oxy hóa da",
    volume: 6400,
    trend: 15,
    mentions: 1456,
    sentiment: 85,
  },
  {
    id: 4,
    name: "Dưỡng da Vitamin E",
    volume: 5100,
    trend: 8,
    mentions: 987,
    sentiment: 76,
  },
  {
    id: 5,
    name: "Serum Vitamin E",
    volume: 4800,
    trend: -3,
    mentions: 756,
    sentiment: 71,
  },
  {
    id: 6,
    name: "ENAT review",
    volume: 3200,
    trend: 45,
    mentions: 2100,
    sentiment: 88,
  },
  {
    id: 7,
    name: "Kem dưỡng da ban đêm",
    volume: 7300,
    trend: 5,
    mentions: 543,
    sentiment: 74,
  },
];

const months = [
  "T1", "T2", "T3", "T4", "T5", "T6",
  "T7", "T8", "T9", "T10", "T11", "T12",
];

const volumeTrendData = months.map((month, i) => ({
  month,
  "ENAT 400":        Math.round(11000 + Math.sin(i * 0.5) * 2000 + i * 250),
  "Vitamin E làm đẹp": Math.round(6500 + Math.cos(i * 0.4) * 1200 + i * 200),
  "Chống oxy hóa da":  Math.round(4800 + Math.sin(i * 0.6) * 900  + i * 140),
}));

const wordCloudItems = [
  { text: "ENAT 400",             size: 32, sentiment: "positive", weight: 14200 },
  { text: "Vitamin E làm đẹp",    size: 26, sentiment: "positive", weight: 8900  },
  { text: "Kem dưỡng da ban đêm", size: 24, sentiment: "neutral",  weight: 7300  },
  { text: "Chống oxy hóa da",     size: 22, sentiment: "positive", weight: 6400  },
  { text: "Dưỡng da Vitamin E",   size: 20, sentiment: "neutral",  weight: 5100  },
  { text: "Serum Vitamin E",      size: 19, sentiment: "neutral",  weight: 4800  },
  { text: "ENAT review",          size: 18, sentiment: "positive", weight: 3200  },
  { text: "Vitamin E capsule",    size: 16, sentiment: "positive", weight: 2800  },
  { text: "Dưỡng ẩm da khô",     size: 15, sentiment: "positive", weight: 2400  },
  { text: "Chăm sóc da mặt",     size: 15, sentiment: "neutral",  weight: 2200  },
  { text: "ENAT có tốt không",   size: 14, sentiment: "neutral",  weight: 1900  },
  { text: "Làm đẹp tự nhiên",    size: 14, sentiment: "positive", weight: 1700  },
  { text: "Da sáng mịn",         size: 13, sentiment: "positive", weight: 1500  },
  { text: "Collagen vitamin",     size: 13, sentiment: "neutral",  weight: 1300  },
  { text: "Review mỹ phẩm",      size: 12, sentiment: "neutral",  weight: 1100  },
  { text: "Serum chống lão hóa", size: 12, sentiment: "positive", weight: 1000  },
  { text: "Phản ứng phụ",        size: 11, sentiment: "negative", weight: 420   },
  { text: "Giả mạo ENAT",        size: 10, sentiment: "negative", weight: 310   },
  { text: "Hàng nhái",           size: 10, sentiment: "negative", weight: 280   },
  { text: "Dị ứng da",           size: 10, sentiment: "negative", weight: 210   },
];

const alerts = [
  {
    id: 1,
    message: "Từ khóa 'ENAT review' tăng 45% — xu hướng tích cực",
    type: "positive",
    icon: TrendingUp,
    badge: "Tích cực",
    badgeBg: "bg-enat-green/10",
    badgeText: "text-enat-green",
    badgeDot: "bg-enat-green",
    border: "border-l-enat-green",
    iconBg: "bg-enat-green/10",
    iconColor: "text-enat-green",
  },
  {
    id: 2,
    message: "Từ khóa mới phát hiện: 'ENAT 400 có tốt không'",
    type: "info",
    icon: Info,
    badge: "Mới phát hiện",
    badgeBg: "bg-blue-50",
    badgeText: "text-blue-600",
    badgeDot: "bg-blue-500",
    border: "border-l-blue-400",
    iconBg: "bg-blue-50",
    iconColor: "text-blue-500",
  },
  {
    id: 3,
    message: "'Serum Vitamin E' giảm 3% — cần theo dõi",
    type: "warning",
    icon: AlertTriangle,
    badge: "Cần theo dõi",
    badgeBg: "bg-orange-50",
    badgeText: "text-orange-600",
    badgeDot: "bg-orange-400",
    border: "border-l-orange-400",
    iconBg: "bg-orange-50",
    iconColor: "text-orange-500",
  },
];

const DATE_RANGES = ["7 ngày", "30 ngày", "90 ngày"] as const;

/* ─── Trend Sparkline ─── */
function TrendBadge({ value }: { value: number }) {
  const positive = value >= 0;
  const Icon = positive ? TrendingUp : TrendingDown;
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${
        positive
          ? "bg-enat-green/10 text-enat-green"
          : "bg-enat-red/10 text-enat-red"
      }`}
    >
      <Icon size={11} />
      {positive ? "+" : ""}
      {value}%
    </span>
  );
}

/* ─── Sentiment Bar ─── */
function SentimentBar({ value }: { value: number }) {
  const color =
    value >= 80 ? "bg-enat-green" : value >= 70 ? "bg-enat-gold" : "bg-enat-red";
  return (
    <div className="flex items-center gap-2">
      <div className="w-20 h-1.5 bg-zinc-100 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={`h-full rounded-full ${color}`}
        />
      </div>
      <span className="text-xs font-medium text-zinc-600">{value}%</span>
    </div>
  );
}

/* ─── Word Cloud Item ─── */
function WordCloudWord({
  item,
  delay,
}: {
  item: (typeof wordCloudItems)[0];
  delay: number;
}) {
  const colorMap: Record<string, string> = {
    positive: "text-enat-green hover:text-enat-green",
    neutral: "text-zinc-500 hover:text-zinc-700",
    negative: "text-enat-red hover:text-enat-red",
  };
  const bgMap: Record<string, string> = {
    positive: "hover:bg-enat-green/5",
    neutral: "hover:bg-zinc-100",
    negative: "hover:bg-enat-red/5",
  };

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ scale: 1.12 }}
      className={`inline-block cursor-default px-2 py-1 rounded-lg transition-colors duration-200 font-semibold ${colorMap[item.sentiment]} ${bgMap[item.sentiment]}`}
      style={{ fontSize: item.size }}
      title={`${item.text} — ${item.weight.toLocaleString("vi-VN")} lượt/tháng`}
    >
      {item.text}
    </motion.span>
  );
}

/* ─── Custom Tooltip for Recharts ─── */
function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-zinc-100 rounded-xl shadow-xl p-3 text-xs min-w-[170px]">
      <p className="font-semibold text-zinc-500 mb-2">{label}</p>
      {payload.map((entry) => (
        <div key={entry.name} className="flex items-center justify-between gap-4 mb-1">
          <div className="flex items-center gap-1.5">
            <span
              className="w-2 h-2 rounded-full inline-block"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-zinc-600">{entry.name}</span>
          </div>
          <span className="font-bold text-enat-dark">
            {entry.value.toLocaleString("vi-VN")}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   KEYWORDS PAGE
   ═══════════════════════════════════════════════════════════ */
export default function KeywordsPage() {
  const [activeRange, setActiveRange] = useState<string>("30 ngày");

  return (
    <div className="p-8 space-y-8">
      {/* ─── Header ─── */}
      <motion.div {...fadeInUp} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-enat-green to-emerald-500 flex items-center justify-center shadow-lg shadow-enat-green/20">
            <Search size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-enat-green">Theo Dõi Từ Khóa</h1>
            <p className="text-sm text-zinc-400">Giám sát xu hướng tìm kiếm & đề cập thương hiệu</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center gap-3 flex-wrap">
          {/* Date Range */}
          <div className="flex items-center bg-zinc-100 rounded-xl p-1 gap-0.5">
            {DATE_RANGES.map((r) => (
              <button
                key={r}
                onClick={() => setActiveRange(r)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                  activeRange === r
                    ? "bg-white text-enat-dark shadow-sm"
                    : "text-zinc-400 hover:text-zinc-600"
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 px-4 py-2 border border-zinc-200 rounded-xl text-sm font-semibold text-zinc-600 bg-white hover:border-zinc-300 hover:shadow-sm transition-all"
          >
            <Download size={15} />
            Xuất báo cáo
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white bg-enat-green hover:bg-enat-green/90 shadow-md shadow-enat-green/20 transition-all"
          >
            <Plus size={15} />
            Thêm từ khóa
          </motion.button>
        </div>
      </motion.div>

      {/* ─── Tracked Keywords Table ─── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-white rounded-2xl border border-zinc-100 shadow-sm overflow-hidden"
      >
        <div className="px-6 py-4 border-b border-zinc-100 flex items-center justify-between">
          <h2 className="text-base font-bold text-enat-dark">Từ khóa đang theo dõi</h2>
          <span className="text-xs text-zinc-400 bg-zinc-100 px-2.5 py-1 rounded-full font-medium">
            {keywords.length} từ khóa
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-zinc-50 text-zinc-400 text-xs uppercase tracking-wider">
                <th className="text-left px-6 py-3 font-semibold">Từ khóa</th>
                <th className="text-right px-4 py-3 font-semibold">Lượt tìm kiếm</th>
                <th className="text-center px-4 py-3 font-semibold">Xu hướng</th>
                <th className="text-right px-4 py-3 font-semibold">Đề cập</th>
                <th className="text-left px-4 py-3 font-semibold">Sentiment</th>
                <th className="text-center px-6 py-3 font-semibold">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-50">
              {keywords.map((kw, i) => (
                <motion.tr
                  key={kw.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.06 }}
                  className="hover:bg-enat-yellow/30 transition-colors duration-150 group"
                >
                  <td className="px-6 py-4">
                    <span className="font-semibold text-enat-dark group-hover:text-enat-green transition-colors">
                      {kw.name}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <span className="font-medium text-zinc-700">
                      {kw.volume.toLocaleString("vi-VN")}
                    </span>
                    <span className="text-zinc-400 ml-1 text-xs">/tháng</span>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <TrendBadge value={kw.trend} />
                  </td>
                  <td className="px-4 py-4 text-right">
                    <span className="font-medium text-zinc-700">
                      {kw.mentions.toLocaleString("vi-VN")}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <SentimentBar value={kw.sentiment} />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button className="text-xs text-zinc-400 hover:text-enat-green font-medium transition-colors px-2 py-1 rounded-lg hover:bg-enat-green/5">
                      Chi tiết
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* ─── Volume Trend Chart + Alerts side by side ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Line Chart */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-2 bg-white rounded-2xl border border-zinc-100 shadow-sm p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-base font-bold text-enat-dark">Xu hướng lượng tìm kiếm</h2>
              <p className="text-xs text-zinc-400 mt-0.5">Top 3 từ khóa — 12 tháng gần nhất</p>
            </div>
            <div className="w-8 h-8 rounded-lg bg-enat-green/10 flex items-center justify-center">
              <TrendingUp size={16} className="text-enat-green" />
            </div>
          </div>

          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={volumeTrendData} margin={{ top: 4, right: 8, bottom: 0, left: -10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f4f4f4" />
              <XAxis
                dataKey="month"
                tick={{ fill: "#a1a1aa", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "#a1a1aa", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v: number) =>
                  v >= 1000 ? `${(v / 1000).toFixed(0)}K` : String(v)
                }
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                iconType="circle"
                iconSize={8}
                wrapperStyle={{ fontSize: 12, paddingTop: 12 }}
              />
              <Line
                type="monotone"
                dataKey="ENAT 400"
                stroke="#1A7340"
                strokeWidth={2.5}
                dot={false}
                activeDot={{ r: 5, fill: "#1A7340" }}
              />
              <Line
                type="monotone"
                dataKey="Vitamin E làm đẹp"
                stroke="#F5C518"
                strokeWidth={2.5}
                dot={false}
                activeDot={{ r: 5, fill: "#F5C518" }}
              />
              <Line
                type="monotone"
                dataKey="Chống oxy hóa da"
                stroke="#3b82f6"
                strokeWidth={2.5}
                dot={false}
                activeDot={{ r: 5, fill: "#3b82f6" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Keyword Alerts */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col gap-4"
        >
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 rounded-lg bg-enat-gold/20 flex items-center justify-center">
              <Bell size={16} className="text-enat-gold" />
            </div>
            <h2 className="text-base font-bold text-enat-dark">Cảnh báo từ khóa</h2>
          </div>

          {alerts.map((alert, i) => {
            const Icon = alert.icon;
            return (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                whileHover={{ scale: 1.02, x: 2 }}
                className={`bg-white rounded-xl border border-zinc-100 border-l-4 ${alert.border} shadow-sm p-4 cursor-default hover:shadow-md transition-all duration-200`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-lg ${alert.iconBg} flex items-center justify-center shrink-0 mt-0.5`}>
                    <Icon size={15} className={alert.iconColor} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-zinc-700 leading-snug">{alert.message}</p>
                    <div className={`mt-2 inline-flex items-center gap-1.5 ${alert.badgeBg} px-2 py-0.5 rounded-full`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${alert.badgeDot}`} />
                      <span className={`text-xs font-semibold ${alert.badgeText}`}>
                        {alert.badge}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}

          {/* Summary mini-card */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.65 }}
            className="bg-enat-yellow rounded-xl border border-enat-gold/20 p-4 mt-auto"
          >
            <p className="text-xs font-semibold text-enat-dark/70 uppercase tracking-wider mb-2">
              Tổng quan tuần này
            </p>
            <div className="flex items-center justify-between">
              <div className="text-center">
                <p className="text-xl font-bold text-enat-green">7</p>
                <p className="text-xs text-zinc-500">Từ khóa theo dõi</p>
              </div>
              <div className="w-px h-8 bg-enat-gold/30" />
              <div className="text-center">
                <p className="text-xl font-bold text-enat-green">+18%</p>
                <p className="text-xs text-zinc-500">Tăng trưởng TB</p>
              </div>
              <div className="w-px h-8 bg-enat-gold/30" />
              <div className="text-center">
                <p className="text-xl font-bold text-enat-green">11K</p>
                <p className="text-xs text-zinc-500">Đề cập tổng</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* ─── Word Cloud ─── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.35 }}
        className="bg-white rounded-2xl border border-zinc-100 shadow-sm p-6"
      >
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-base font-bold text-enat-dark">Bản đồ từ khóa</h2>
            <p className="text-xs text-zinc-400 mt-0.5">
              Kích thước thể hiện lượng tìm kiếm — màu sắc thể hiện sentiment
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs text-zinc-500">
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-enat-green inline-block" />
              Tích cực
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-zinc-400 inline-block" />
              Trung tính
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-enat-red inline-block" />
              Tiêu cực
            </span>
          </div>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="flex flex-wrap gap-x-4 gap-y-3 items-center justify-center min-h-[180px] bg-zinc-50/50 rounded-xl px-6 py-8 border border-zinc-100"
        >
          {wordCloudItems
            .slice()
            .sort(() => Math.random() - 0.5)
            .map((item, i) => (
              <motion.div key={item.text} variants={staggerItem}>
                <WordCloudWord item={item} delay={i * 0.04} />
              </motion.div>
            ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
