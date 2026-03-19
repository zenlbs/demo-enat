"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  Radio,
  TrendingUp,
  TrendingDown,
  MessageSquare,
  Volume2,
  Star,
  Share2,
  AlertTriangle,
  Info,
  Bell,
  ChevronUp,
  ChevronDown,
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
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations";

/* ─── Animated Counter Hook ─── */
function useCountUp(target: number, duration = 1600, decimals = 0) {
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

/* ─── Mock Data ─── */

// Buzz volume — 30 days
const generateBuzzData = () => {
  const days = [
    "01/03", "02/03", "03/03", "04/03", "05/03", "06/03", "07/03",
    "08/03", "09/03", "10/03", "11/03", "12/03", "13/03", "14/03",
    "15/03", "16/03", "17/03", "18/03", "19/03", "20/03", "21/03",
    "22/03", "23/03", "24/03", "25/03", "26/03", "27/03", "28/03",
    "29/03", "30/03",
  ];
  const base = [
    320, 285, 410, 390, 450, 520, 480, 610, 580, 720,
    680, 750, 820, 780, 1240, 920, 870, 940, 1080, 1020,
    1150, 1320, 1480, 1380, 1620, 1780, 1650, 1920, 1850, 2100,
  ];
  return days.map((date, i) => ({ date, volume: base[i], spike: base[i] > 1400 }));
};

const buzzData = generateBuzzData();

// Platform breakdown
const platformData = [
  { name: "TikTok", value: 42, color: "#1A1A1A" },
  { name: "Instagram", value: 28, color: "#E84B2A" },
  { name: "Facebook", value: 20, color: "#1A7340" },
  { name: "Zalo", value: 10, color: "#F5C518" },
];

// Competitors
const competitors = [
  { name: "ENAT 400", sov: 34, mentions: 12800, positive: 78, color: "#1A7340", highlight: true },
  { name: "DHC Vitamin E", sov: 22, mentions: 8200, positive: 72, color: "#E84B2A", highlight: false },
  { name: "Blackmores", sov: 18, mentions: 6700, positive: 81, color: "#3B82F6", highlight: false },
  { name: "Nature Made", sov: 14, mentions: 5300, positive: 69, color: "#8B5CF6", highlight: false },
];

// Trending topics
const trendingTopics = [
  { tag: "#ENAT400", count: 5840, trending: "up", delta: "+34%" },
  { tag: "#VitaminE", count: 4210, trending: "up", delta: "+18%" },
  { tag: "#LàmDaKhỏe", count: 3670, trending: "up", delta: "+27%" },
  { tag: "#SkincareRoutine", count: 2940, trending: "up", delta: "+12%" },
  { tag: "#ChốngOxyHóa", count: 2180, trending: "up", delta: "+9%" },
  { tag: "#DưỡngDa", count: 1850, trending: "down", delta: "-5%" },
  { tag: "#GiảmGốcTựDo", count: 1320, trending: "down", delta: "-3%" },
];

// Alerts
const alerts = [
  {
    id: 1,
    message: "Đột biến đề cập ENAT 400 trên TikTok (+340%)",
    priority: "high",
    platform: "TikTok",
    time: "2 phút trước",
    icon: AlertTriangle,
  },
  {
    id: 2,
    message: "Hashtag #LàmDaKhỏe trending top 5 trên Instagram",
    priority: "medium",
    platform: "Instagram",
    time: "15 phút trước",
    icon: Star,
  },
  {
    id: 3,
    message: "Đối thủ DHC ra mắt sản phẩm mới — theo dõi phản ứng thị trường",
    priority: "info",
    platform: "Thị trường",
    time: "1 giờ trước",
    icon: Info,
  },
  {
    id: 4,
    message: "Sentiment tiêu cực tăng 5% trên Facebook — cần xử lý ngay",
    priority: "warning",
    platform: "Facebook",
    time: "2 giờ trước",
    icon: Bell,
  },
  {
    id: 5,
    message: "ENAT 400 được đề xuất trong top review skincare tuần này",
    priority: "medium",
    platform: "YouTube",
    time: "3 giờ trước",
    icon: Star,
  },
];

/* ─── Alert priority config ─── */
const alertConfig: Record<string, { bg: string; border: string; badge: string; badgeText: string; label: string }> = {
  high: {
    bg: "bg-red-50/80",
    border: "border-l-enat-red",
    badge: "bg-enat-red/10",
    badgeText: "text-enat-red",
    label: "Khẩn cấp",
  },
  medium: {
    bg: "bg-amber-50/80",
    border: "border-l-enat-gold",
    badge: "bg-enat-gold/20",
    badgeText: "text-amber-700",
    label: "Trung bình",
  },
  info: {
    bg: "bg-blue-50/80",
    border: "border-l-blue-400",
    badge: "bg-blue-100",
    badgeText: "text-blue-700",
    label: "Thông tin",
  },
  warning: {
    bg: "bg-orange-50/80",
    border: "border-l-orange-400",
    badge: "bg-orange-100",
    badgeText: "text-orange-700",
    label: "Cảnh báo",
  },
};

/* ─── Custom Tooltip for Area Chart ─── */
function BuzzTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white/95 backdrop-blur-lg rounded-xl border border-zinc-100 shadow-xl p-3 min-w-[160px]">
      <p className="text-xs font-semibold text-zinc-400 mb-1">{label}</p>
      <p className="text-base font-bold text-enat-green">
        {payload[0].value.toLocaleString("vi-VN")}
        <span className="text-xs font-normal text-zinc-400 ml-1">đề cập</span>
      </p>
    </div>
  );
}

/* ─── Custom Dot for Spike ─── */
function SpikeDot(props: { cx?: number; cy?: number; payload?: { spike?: boolean } }) {
  const { cx = 0, cy = 0, payload } = props;
  if (!payload?.spike) return null;
  return (
    <circle
      cx={cx}
      cy={cy}
      r={5}
      fill="#E84B2A"
      stroke="#fff"
      strokeWidth={2}
    />
  );
}

/* ─── KPI Card ─── */
function KPICard({
  icon: Icon,
  label,
  displayValue,
  sub,
  gradient,
  trend,
  trendUp,
  delay,
}: {
  icon: React.ElementType;
  label: string;
  displayValue: string;
  sub: string;
  gradient: string;
  trend: string;
  trendUp: boolean;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      whileHover={{ y: -4, scale: 1.02 }}
      className="relative overflow-hidden rounded-2xl bg-white/80 backdrop-blur border border-white shadow-sm hover:shadow-xl transition-all duration-300"
    >
      {/* Glass shimmer */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-transparent to-transparent pointer-events-none" />
      <div className="p-5 relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div
            className={`w-12 h-12 rounded-xl ${gradient} flex items-center justify-center shadow-lg`}
          >
            <Icon size={22} className="text-white" />
          </div>
          <div
            className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${
              trendUp
                ? "text-enat-green bg-enat-green/10"
                : "text-enat-red bg-enat-red/10"
            }`}
          >
            {trendUp ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
            <span>{trend}</span>
          </div>
        </div>
        <p className="text-sm text-zinc-500 mb-1">{label}</p>
        <p className="text-2xl font-bold text-enat-dark">{displayValue}</p>
        <p className="text-xs text-zinc-400 mt-1">{sub}</p>
      </div>
      <div className={`h-1 w-full ${gradient}`} />
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════
   SOCIAL LISTENING PAGE
   ═══════════════════════════════════════════════════════════ */
export default function SocialListeningPage() {
  const totalMentions = useCountUp(12847, 1600);
  const buzzVolume = useCountUp(23, 1400);
  const sentimentScore = useCountUp(78, 1500);
  const shareOfVoice = useCountUp(34, 1400);

  const [activePlatform, setActivePlatform] = useState<string | null>(null);

  return (
    <div className="p-8 space-y-8">
      {/* ─── Header ─── */}
      <motion.div {...fadeInUp}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-enat-green to-emerald-500 flex items-center justify-center shadow-lg shadow-enat-green/20">
            <Radio size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-enat-green">Social Listening</h1>
            <p className="text-sm text-zinc-400">
              Theo dõi thương hiệu & phân tích xu hướng mạng xã hội theo thời gian thực
            </p>
          </div>
        </div>
      </motion.div>

      {/* ─── Section 1: Overview KPIs ─── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        <KPICard
          icon={MessageSquare}
          label="Tổng đề cập"
          displayValue={totalMentions.toLocaleString("vi-VN")}
          sub="30 ngày gần nhất"
          gradient="bg-gradient-to-br from-enat-green to-emerald-500"
          trend="+18%"
          trendUp={true}
          delay={0}
        />
        <KPICard
          icon={Volume2}
          label="Buzz Volume"
          displayValue={`+${buzzVolume}%`}
          sub="So với tháng trước"
          gradient="bg-gradient-to-br from-blue-500 to-sky-400"
          trend="+23%"
          trendUp={true}
          delay={0.1}
        />
        <KPICard
          icon={Star}
          label="Sentiment Score"
          displayValue={`${sentimentScore}%`}
          sub="Tích cực"
          gradient="bg-gradient-to-br from-enat-gold to-amber-500"
          trend="+5%"
          trendUp={true}
          delay={0.2}
        />
        <KPICard
          icon={Share2}
          label="Share of Voice"
          displayValue={`${shareOfVoice}%`}
          sub="Trong ngành Vitamin E"
          gradient="bg-gradient-to-br from-violet-500 to-purple-600"
          trend="+3%"
          trendUp={true}
          delay={0.3}
        />
      </div>

      {/* ─── Section 2: Trending Topics ─── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="bg-white/80 backdrop-blur rounded-2xl border border-white shadow-sm p-6"
      >
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-lg font-bold text-enat-dark">Chủ đề Đang Trending</h2>
            <p className="text-sm text-zinc-400 mt-0.5">
              Các hashtag & từ khóa nổi bật liên quan đến ENAT
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-enat-red bg-enat-red/10 px-3 py-1.5 rounded-full animate-pulse">
            <span className="w-1.5 h-1.5 rounded-full bg-enat-red inline-block" />
            LIVE
          </div>
        </div>

        {/* Horizontal scrolling pills */}
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {trendingTopics.map((topic, i) => (
            <motion.div
              key={topic.tag}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.07 }}
              whileHover={{ scale: 1.05, y: -2 }}
              className={`flex-shrink-0 flex items-center gap-2.5 px-4 py-2.5 rounded-2xl border cursor-pointer transition-all duration-200 ${
                topic.trending === "up"
                  ? "bg-enat-green/5 border-enat-green/20 hover:bg-enat-green/10 hover:border-enat-green/40"
                  : "bg-enat-red/5 border-enat-red/20 hover:bg-enat-red/10 hover:border-enat-red/40"
              }`}
            >
              <span
                className={`text-sm font-semibold ${
                  topic.trending === "up" ? "text-enat-green" : "text-enat-red"
                }`}
              >
                {topic.tag}
              </span>
              <span className="text-xs text-zinc-400">
                {topic.count.toLocaleString("vi-VN")}
              </span>
              <div
                className={`flex items-center gap-0.5 text-xs font-bold ${
                  topic.trending === "up" ? "text-enat-green" : "text-enat-red"
                }`}
              >
                {topic.trending === "up" ? (
                  <TrendingUp size={12} />
                ) : (
                  <TrendingDown size={12} />
                )}
                <span>{topic.delta}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ─── Section 3: Competitor Analysis ─── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.35 }}
        className="bg-white/80 backdrop-blur rounded-2xl border border-white shadow-sm p-6"
      >
        <div className="mb-5">
          <h2 className="text-lg font-bold text-enat-dark">Phân tích Đối thủ Cạnh tranh</h2>
          <p className="text-sm text-zinc-400 mt-0.5">
            So sánh Share of Voice, đề cập và cảm xúc thương hiệu
          </p>
        </div>

        <div className="space-y-4">
          {competitors.map((comp, i) => (
            <motion.div
              key={comp.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
              whileHover={{ x: 4 }}
              className={`flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 cursor-pointer ${
                comp.highlight
                  ? "bg-enat-green/5 border-enat-green/30 ring-1 ring-enat-green/20"
                  : "bg-zinc-50/60 border-zinc-100 hover:bg-zinc-100/60"
              }`}
            >
              {/* Brand name */}
              <div className="w-32 shrink-0">
                <div className="flex items-center gap-2">
                  <div
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: comp.color }}
                  />
                  <span
                    className={`text-sm font-semibold ${
                      comp.highlight ? "text-enat-green" : "text-enat-dark"
                    }`}
                  >
                    {comp.name}
                  </span>
                  {comp.highlight && (
                    <span className="text-[10px] font-bold text-enat-green bg-enat-green/10 px-1.5 py-0.5 rounded-full">
                      Chúng ta
                    </span>
                  )}
                </div>
              </div>

              {/* SOV Bar */}
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-zinc-400">SOV</span>
                  <span
                    className="text-xs font-bold"
                    style={{ color: comp.color }}
                  >
                    {comp.sov}%
                  </span>
                </div>
                <div className="h-2 bg-zinc-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(comp.sov / 40) * 100}%` }}
                    transition={{ duration: 1.2, delay: 0.3 + i * 0.1, ease: "easeOut" }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: comp.color }}
                  />
                </div>
              </div>

              {/* Mentions */}
              <div className="w-24 text-right shrink-0">
                <p className="text-sm font-bold text-enat-dark">
                  {(comp.mentions / 1000).toFixed(1)}K
                </p>
                <p className="text-xs text-zinc-400">đề cập</p>
              </div>

              {/* Sentiment */}
              <div className="w-20 shrink-0">
                <div
                  className="text-xs font-semibold px-2.5 py-1 rounded-full text-center"
                  style={{
                    backgroundColor: `${comp.color}18`,
                    color: comp.color,
                  }}
                >
                  {comp.positive}% 😊
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ─── Section 4 & 6: Buzz Volume + Platform Breakdown ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Buzz Volume Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="lg:col-span-2 bg-white/80 backdrop-blur rounded-2xl border border-white shadow-sm p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-enat-dark">
                Biến động Buzz Volume
              </h2>
              <p className="text-sm text-zinc-400 mt-0.5">
                Lượng đề cập theo ngày trong 30 ngày qua
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 text-xs text-zinc-400">
                <span className="w-2 h-2 rounded-full bg-enat-red inline-block" />
                Đột biến
              </div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-enat-green bg-enat-green/10 px-3 py-1.5 rounded-full">
                <TrendingUp size={12} />
                +23%
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart
              data={buzzData}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="buzzGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1A7340" stopOpacity={0.35} />
                  <stop offset="60%" stopColor="#2A9B58" stopOpacity={0.1} />
                  <stop offset="100%" stopColor="#1A7340" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="buzzLineGradient" x1="0" y1="0" x2="1" y2="0">
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
                tick={{ fontSize: 11, fill: "#a1a1aa" }}
                dy={8}
                interval={4}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: "#a1a1aa" }}
                tickFormatter={(v) =>
                  v >= 1000 ? `${(v / 1000).toFixed(1)}K` : String(v)
                }
                dx={-8}
              />
              <Tooltip content={<BuzzTooltip />} />
              <Area
                type="monotone"
                dataKey="volume"
                stroke="url(#buzzLineGradient)"
                strokeWidth={2.5}
                fill="url(#buzzGradient)"
                dot={<SpikeDot />}
                activeDot={{
                  r: 6,
                  strokeWidth: 2,
                  stroke: "#fff",
                  fill: "#1A7340",
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Platform Breakdown Pie */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="bg-white/80 backdrop-blur rounded-2xl border border-white shadow-sm p-6"
        >
          <h2 className="text-lg font-bold text-enat-dark mb-1">
            Phân bổ Nền tảng
          </h2>
          <p className="text-sm text-zinc-400 mb-4">
            Đề cập theo kênh mạng xã hội
          </p>

          <div className="relative w-[180px] h-[180px] mx-auto mb-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={platformData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={82}
                  paddingAngle={3}
                  dataKey="value"
                  strokeWidth={0}
                  onMouseEnter={(_, index) =>
                    setActivePlatform(platformData[index].name)
                  }
                  onMouseLeave={() => setActivePlatform(null)}
                >
                  {platformData.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={entry.color}
                      opacity={
                        activePlatform === null || activePlatform === entry.name
                          ? 1
                          : 0.4
                      }
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-xl font-bold text-enat-dark">
                {activePlatform
                  ? platformData.find((p) => p.name === activePlatform)?.value +
                    "%"
                  : "12.8K"}
              </span>
              <span className="text-xs text-zinc-400">
                {activePlatform ?? "đề cập"}
              </span>
            </div>
          </div>

          {/* Legend */}
          <div className="space-y-2.5">
            {platformData.map((item) => (
              <div
                key={item.name}
                className="flex items-center justify-between cursor-pointer group"
                onMouseEnter={() => setActivePlatform(item.name)}
                onMouseLeave={() => setActivePlatform(null)}
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full transition-transform group-hover:scale-125"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm text-zinc-600 group-hover:text-enat-dark transition-colors">
                    {item.name}
                  </span>
                </div>
                <span className="text-sm font-bold text-enat-dark">
                  {item.value}%
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ─── Section 5: Real-time Alert Feed ─── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="bg-white/80 backdrop-blur rounded-2xl border border-white shadow-sm p-6"
      >
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-lg font-bold text-enat-dark">
              Cảnh báo Thời gian Thực
            </h2>
            <p className="text-sm text-zinc-400 mt-0.5">
              Theo dõi tự động — cập nhật mỗi 5 phút
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-enat-red animate-ping absolute" />
            <span className="w-2 h-2 rounded-full bg-enat-red relative" />
            <span className="text-xs text-zinc-400 ml-2">Live</span>
          </div>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="space-y-3 max-h-[340px] overflow-y-auto pr-1"
        >
          {alerts.map((alert, index) => {
            const config = alertConfig[alert.priority];
            const AlertIcon = alert.icon;
            return (
              <motion.div
                key={alert.id}
                variants={staggerItem}
                transition={{ duration: 0.35, delay: index * 0.08 }}
                whileHover={{ x: 4, scale: 1.005 }}
                className={`flex items-start gap-3 p-4 rounded-xl border-l-4 ${config.bg} ${config.border} cursor-pointer transition-all duration-200`}
              >
                <div
                  className={`w-9 h-9 rounded-xl ${config.badge} flex items-center justify-center shrink-0 mt-0.5`}
                >
                  <AlertIcon size={16} className={config.badgeText} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-enat-dark leading-snug">
                    {alert.message}
                  </p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span
                      className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${config.badge} ${config.badgeText}`}
                    >
                      {config.label}
                    </span>
                    <span className="text-xs text-zinc-400">{alert.platform}</span>
                    <span className="text-xs text-zinc-300">·</span>
                    <span className="text-xs text-zinc-400">{alert.time}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </div>
  );
}
