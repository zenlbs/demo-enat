"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  Search,
  ChevronDown,
  Star,
  TrendingUp,
  CheckCircle2,
  Clock,
  Eye,
  Heart,
  BarChart3,
  Filter,
  ExternalLink,
  Calendar,
  Package,
  ArrowUpRight,
} from "lucide-react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { fadeInUp, staggerContainer } from "@/lib/animations";

/* ═══════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════ */

type Platform = "Facebook" | "Instagram" | "TikTok";
type Tier = "Mega" | "Macro" | "Micro" | "Nano";
type Status = "Đang hợp tác" | "Đã hợp tác" | "Tiềm năng";

interface Influencer {
  id: number;
  name: string;
  handle: string;
  initials: string;
  avatarBg: string;
  platforms: Platform[];
  followers: string;
  followersRaw: number;
  engagement: string;
  tier: Tier;
  status: Status;
  radarScores: {
    engagement: number;
    reach: number;
    contentQuality: number;
    brandFit: number;
    roi: number;
  };
}

const influencers: Influencer[] = [
  {
    id: 1,
    name: "Nguyễn Thúy An",
    handle: "@thuyan.beauty",
    initials: "TA",
    avatarBg: "bg-gradient-to-br from-pink-400 to-rose-500",
    platforms: ["Instagram", "TikTok"],
    followers: "1.2M",
    followersRaw: 1200000,
    engagement: "6.8%",
    tier: "Mega",
    status: "Đang hợp tác",
    radarScores: { engagement: 88, reach: 95, contentQuality: 85, brandFit: 90, roi: 82 },
  },
  {
    id: 2,
    name: "Trần Minh Châu",
    handle: "@minhchau.skin",
    initials: "MC",
    avatarBg: "bg-gradient-to-br from-sky-400 to-blue-500",
    platforms: ["Instagram", "Facebook"],
    followers: "450K",
    followersRaw: 450000,
    engagement: "8.4%",
    tier: "Macro",
    status: "Đang hợp tác",
    radarScores: { engagement: 92, reach: 78, contentQuality: 88, brandFit: 85, roi: 79 },
  },
  {
    id: 3,
    name: "Lê Hồng Nhung",
    handle: "@nhung.skincare",
    initials: "HN",
    avatarBg: "bg-gradient-to-br from-violet-400 to-purple-500",
    platforms: ["TikTok"],
    followers: "89K",
    followersRaw: 89000,
    engagement: "11.2%",
    tier: "Micro",
    status: "Đã hợp tác",
    radarScores: { engagement: 95, reach: 55, contentQuality: 80, brandFit: 78, roi: 72 },
  },
  {
    id: 4,
    name: "Phạm Quỳnh Anh",
    handle: "@quynhanh.glow",
    initials: "QA",
    avatarBg: "bg-gradient-to-br from-amber-400 to-orange-500",
    platforms: ["Instagram", "TikTok", "Facebook"],
    followers: "2.1M",
    followersRaw: 2100000,
    engagement: "5.3%",
    tier: "Mega",
    status: "Đang hợp tác",
    radarScores: { engagement: 78, reach: 98, contentQuality: 92, brandFit: 95, roi: 90 },
  },
  {
    id: 5,
    name: "Vũ Thanh Hà",
    handle: "@thanhha.beauty",
    initials: "TH",
    avatarBg: "bg-gradient-to-br from-emerald-400 to-teal-500",
    platforms: ["TikTok", "Facebook"],
    followers: "56K",
    followersRaw: 56000,
    engagement: "13.7%",
    tier: "Micro",
    status: "Tiềm năng",
    radarScores: { engagement: 97, reach: 42, contentQuality: 75, brandFit: 70, roi: 65 },
  },
  {
    id: 6,
    name: "Đặng Thùy Linh",
    handle: "@thuylinh.care",
    initials: "TL",
    avatarBg: "bg-gradient-to-br from-fuchsia-400 to-pink-500",
    platforms: ["Instagram", "Facebook"],
    followers: "320K",
    followersRaw: 320000,
    engagement: "9.1%",
    tier: "Macro",
    status: "Đã hợp tác",
    radarScores: { engagement: 90, reach: 72, contentQuality: 87, brandFit: 82, roi: 76 },
  },
];

interface WorkEntry {
  id: number;
  campaign: string;
  date: string;
  type: string;
  views: string;
  likes: string;
  reach: string;
  roi: string;
  note: string;
}

const workHistory: WorkEntry[] = [
  {
    id: 1,
    campaign: "ENAT Serum Vitamin C Launch",
    date: "Tháng 1, 2026",
    type: "Video TikTok + Reels",
    views: "2.4M",
    likes: "185K",
    reach: "3.1M",
    roi: "5.8x",
    note: "Chiến dịch ra mắt sản phẩm mới đạt hiệu suất vượt mục tiêu 40%",
  },
  {
    id: 2,
    campaign: "Tết Rạng Rỡ 2025",
    date: "Tháng 12, 2025",
    type: "Story + Post Instagram",
    views: "890K",
    likes: "72K",
    reach: "1.2M",
    roi: "4.2x",
    note: "Series nội dung Tết với bộ quà tặng giới hạn, sold-out sau 3 ngày",
  },
  {
    id: 3,
    campaign: "30 Ngày Da Sáng Khỏe",
    date: "Tháng 10, 2025",
    type: "Challenge TikTok",
    views: "5.6M",
    likes: "410K",
    reach: "7.2M",
    roi: "6.1x",
    note: "Chiến dịch viral với hashtag #ENATskincare đạt 8M lượt sử dụng",
  },
  {
    id: 4,
    campaign: "Back to School Glow",
    date: "Tháng 8, 2025",
    type: "YouTube Vlog + IG Post",
    views: "620K",
    likes: "48K",
    reach: "850K",
    roi: "3.5x",
    note: "Nhắm đến đối tượng sinh viên 18–24 tuổi, tăng nhận diện thương hiệu",
  },
  {
    id: 5,
    campaign: "ENAT x Summer Skincare",
    date: "Tháng 6, 2025",
    type: "Facebook Live + Reels",
    views: "1.1M",
    likes: "93K",
    reach: "1.6M",
    roi: "4.7x",
    note: "Live stream 2 tiếng thu hút 45K người xem đồng thời, doanh số tăng 3x",
  },
];

/* ═══════════════════════════════════════════════════════════
   HELPERS & SMALL COMPONENTS
   ═══════════════════════════════════════════════════════════ */

const platformConfig: Record<Platform, { label: string; color: string; dot: string }> = {
  Facebook: { label: "FB", color: "bg-[#1877F2]", dot: "bg-[#1877F2]" },
  Instagram: { label: "IG", color: "bg-gradient-to-br from-purple-500 to-pink-500", dot: "bg-pink-500" },
  TikTok: { label: "TT", color: "bg-[#010101]", dot: "bg-[#010101]" },
};

const tierConfig: Record<Tier, { bg: string; text: string; border: string }> = {
  Mega: { bg: "bg-enat-gold/15", text: "text-amber-700", border: "border-enat-gold/40" },
  Macro: { bg: "bg-enat-green/10", text: "text-enat-green", border: "border-enat-green/30" },
  Micro: { bg: "bg-sky-50", text: "text-sky-600", border: "border-sky-200" },
  Nano: { bg: "bg-zinc-100", text: "text-zinc-500", border: "border-zinc-200" },
};

const statusConfig: Record<Status, { bg: string; text: string; dot: string }> = {
  "Đang hợp tác": { bg: "bg-enat-green/10", text: "text-enat-green", dot: "bg-enat-green" },
  "Đã hợp tác": { bg: "bg-zinc-100", text: "text-zinc-500", dot: "bg-zinc-400" },
  "Tiềm năng": { bg: "bg-enat-gold/15", text: "text-amber-700", dot: "bg-enat-gold" },
};

const radarColors = ["#1A7340", "#F5C518", "#E84B2A"];

function PlatformDot({ platform }: { platform: Platform }) {
  const cfg = platformConfig[platform];
  return (
    <span
      className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full text-white ${cfg.color}`}
    >
      {cfg.label}
    </span>
  );
}

function TierBadge({ tier }: { tier: Tier }) {
  const cfg = tierConfig[tier];
  return (
    <span
      className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-0.5 rounded-full border ${cfg.bg} ${cfg.text} ${cfg.border}`}
    >
      <Star size={10} className="fill-current" />
      {tier}
    </span>
  );
}

function StatusBadge({ status }: { status: Status }) {
  const cfg = statusConfig[status];
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${cfg.bg} ${cfg.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      {status}
    </span>
  );
}

/* ─── KPI Card ─── */
function KPICard({
  icon: Icon,
  label,
  value,
  gradient,
  delay,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  gradient: string;
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
          <div className={`w-12 h-12 rounded-xl ${gradient} flex items-center justify-center shadow-lg`}>
            <Icon size={22} className="text-white" />
          </div>
          <ArrowUpRight size={16} className="text-zinc-300 mt-1" />
        </div>
        <p className="text-sm text-zinc-500 mb-1">{label}</p>
        <p className="text-2xl font-bold text-enat-dark">{value}</p>
      </div>
      <div className={`h-1 w-full ${gradient}`} />
    </motion.div>
  );
}

/* ─── Influencer Card ─── */
function InfluencerCard({
  influencer,
  delay,
  onSelect,
  isSelected,
}: {
  influencer: Influencer;
  delay: number;
  onSelect: (id: number) => void;
  isSelected: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12, scale: 0.97 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ y: -6, scale: 1.01 }}
      className={`relative bg-white rounded-2xl border shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer group ${
        isSelected ? "border-enat-green ring-2 ring-enat-green/20" : "border-zinc-100"
      }`}
    >
      {/* Selected indicator */}
      {isSelected && (
        <div className="absolute top-3 right-3 z-10">
          <CheckCircle2 size={18} className="text-enat-green fill-enat-green/10" />
        </div>
      )}

      {/* Card Header */}
      <div className="p-5 pb-4">
        <div className="flex items-start gap-3 mb-4">
          {/* Avatar */}
          <div
            className={`w-14 h-14 rounded-2xl ${influencer.avatarBg} flex items-center justify-center text-white font-bold text-lg shadow-lg shrink-0 group-hover:scale-105 transition-transform duration-300`}
          >
            {influencer.initials}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-enat-dark text-base leading-tight truncate group-hover:text-enat-green transition-colors">
              {influencer.name}
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5">{influencer.handle}</p>
            {/* Platforms */}
            <div className="flex flex-wrap gap-1 mt-2">
              {influencer.platforms.map((p) => (
                <PlatformDot key={p} platform={p} />
              ))}
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-zinc-50 rounded-xl p-3">
            <p className="text-xs text-zinc-400 mb-0.5">Người theo dõi</p>
            <p className="text-lg font-bold text-enat-dark">{influencer.followers}</p>
          </div>
          <div className="bg-zinc-50 rounded-xl p-3">
            <p className="text-xs text-zinc-400 mb-0.5">Tương tác</p>
            <p className="text-lg font-bold text-enat-green">{influencer.engagement}</p>
          </div>
        </div>

        {/* Badges row */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <TierBadge tier={influencer.tier} />
          <StatusBadge status={influencer.status} />
        </div>
      </div>

      {/* Card Footer */}
      <div className="px-5 py-3 border-t border-zinc-50 flex items-center justify-between bg-zinc-50/50">
        <button
          onClick={() => onSelect(influencer.id)}
          className="text-xs font-semibold text-enat-green hover:text-enat-green/80 transition-colors flex items-center gap-1"
        >
          <Eye size={12} />
          Xem hồ sơ
        </button>
        <ExternalLink size={13} className="text-zinc-300 group-hover:text-zinc-400 transition-colors" />
      </div>
    </motion.div>
  );
}

/* ─── Timeline Entry ─── */
function TimelineEntry({
  entry,
  index,
  isLast,
}: {
  entry: WorkEntry;
  index: number;
  isLast: boolean;
}) {
  const dotColors = [
    "bg-enat-green",
    "bg-enat-gold",
    "bg-sky-500",
    "bg-violet-500",
    "bg-pink-500",
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: 0.1 + index * 0.1 }}
      className="flex gap-4"
    >
      {/* Timeline spine */}
      <div className="flex flex-col items-center">
        <div className={`w-3.5 h-3.5 rounded-full ${dotColors[index % dotColors.length]} ring-4 ring-white shadow-md shrink-0 mt-1`} />
        {!isLast && <div className="w-0.5 bg-zinc-100 flex-1 mt-1.5" />}
      </div>

      {/* Content */}
      <div className={`pb-8 flex-1 ${isLast ? "pb-0" : ""}`}>
        <div className="bg-white border border-zinc-100 rounded-2xl p-4 hover:shadow-md hover:border-enat-green/20 transition-all duration-200 group">
          {/* Header */}
          <div className="flex items-start justify-between gap-3 mb-3">
            <div>
              <h4 className="font-bold text-enat-dark text-sm group-hover:text-enat-green transition-colors">
                {entry.campaign}
              </h4>
              <div className="flex items-center gap-1.5 mt-1">
                <Calendar size={11} className="text-zinc-400" />
                <span className="text-xs text-zinc-400">{entry.date}</span>
                <span className="w-1 h-1 rounded-full bg-zinc-200" />
                <Package size={11} className="text-zinc-400" />
                <span className="text-xs text-zinc-400">{entry.type}</span>
              </div>
            </div>
            <span className="text-sm font-bold text-enat-green bg-enat-green/10 px-2.5 py-1 rounded-xl shrink-0">
              ROI {entry.roi}
            </span>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-3 gap-2 mb-3">
            {[
              { icon: Eye, label: "Lượt xem", value: entry.views },
              { icon: Heart, label: "Lượt thích", value: entry.likes },
              { icon: BarChart3, label: "Tiếp cận", value: entry.reach },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="bg-zinc-50 rounded-xl p-2.5 text-center">
                <Icon size={13} className="text-zinc-400 mx-auto mb-1" />
                <p className="text-xs text-zinc-400">{label}</p>
                <p className="text-sm font-bold text-enat-dark">{value}</p>
              </div>
            ))}
          </div>

          {/* Note */}
          <p className="text-xs text-zinc-500 leading-relaxed border-t border-zinc-50 pt-3">
            {entry.note}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Radar Chart Custom Tooltip ─── */
function RadarTooltip({ active, payload }: { active?: boolean; payload?: Array<{ name: string; value: number; color: string }> }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white/95 backdrop-blur rounded-xl border border-zinc-100 shadow-xl p-3">
      {payload.map((entry, i) => (
        <div key={i} className="flex items-center gap-2 text-xs">
          <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: entry.color }} />
          <span className="text-zinc-600">{entry.name}</span>
          <span className="font-bold text-enat-dark ml-1">{entry.value}</span>
        </div>
      ))}
    </div>
  );
}

/* ─── Select Dropdown ─── */
function SelectDropdown({
  value,
  onChange,
  options,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
  placeholder: string;
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none bg-white border border-zinc-200 text-sm text-enat-dark rounded-xl px-4 py-2.5 pr-9 focus:outline-none focus:ring-2 focus:ring-enat-green/20 focus:border-enat-green/40 transition-all cursor-pointer"
      >
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════════ */

export default function InfluencersPage() {
  const [search, setSearch] = useState("");
  const [tierFilter, setTierFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [platformFilter, setPlatformFilter] = useState<"" | Platform>("");
  const [selectedId, setSelectedId] = useState<number | null>(1);
  const [compareIds, setCompareIds] = useState<number[]>([1, 2, 4]);
  const timelineRef = useRef<HTMLDivElement>(null);

  /* filtered list */
  const filtered = influencers.filter((inf) => {
    const matchSearch =
      !search ||
      inf.name.toLowerCase().includes(search.toLowerCase()) ||
      inf.handle.toLowerCase().includes(search.toLowerCase());
    const matchTier = !tierFilter || inf.tier === tierFilter;
    const matchStatus = !statusFilter || inf.status === statusFilter;
    const matchPlatform = !platformFilter || inf.platforms.includes(platformFilter as Platform);
    return matchSearch && matchTier && matchStatus && matchPlatform;
  });

  const selectedInfluencer = influencers.find((i) => i.id === selectedId) ?? influencers[0];

  /* Radar data — build from compareIds */
  const radarKeys = ["engagement", "reach", "contentQuality", "brandFit", "roi"] as const;
  const radarLabels: Record<(typeof radarKeys)[number], string> = {
    engagement: "Tương tác",
    reach: "Tiếp cận",
    contentQuality: "Chất lượng ND",
    brandFit: "Phù hợp thương hiệu",
    roi: "ROI",
  };

  const radarData = radarKeys.map((key) => {
    const row: Record<string, number | string> = { subject: radarLabels[key] };
    compareIds.forEach((cid) => {
      const inf = influencers.find((i) => i.id === cid);
      if (inf) row[inf.name] = inf.radarScores[key];
    });
    return row;
  });

  const compareInfluencers = compareIds
    .map((cid) => influencers.find((i) => i.id === cid))
    .filter(Boolean) as Influencer[];

  function toggleCompare(id: number) {
    setCompareIds((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : prev.length < 3
        ? [...prev, id]
        : prev
    );
  }

  /* scroll timeline into view when selectedId changes */
  useEffect(() => {
    if (selectedId && timelineRef.current) {
      timelineRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [selectedId]);

  const kpis = [
    {
      icon: Users,
      label: "Tổng Influencer",
      value: "247",
      gradient: "bg-gradient-to-br from-enat-green to-emerald-500",
      delay: 0,
    },
    {
      icon: CheckCircle2,
      label: "Đang hợp tác",
      value: "38",
      gradient: "bg-gradient-to-br from-sky-400 to-blue-500",
      delay: 0.08,
    },
    {
      icon: TrendingUp,
      label: "Chiến dịch hoàn thành",
      value: "156",
      gradient: "bg-gradient-to-br from-violet-500 to-purple-600",
      delay: 0.16,
    },
    {
      icon: Star,
      label: "ROI trung bình",
      value: "4.2x",
      gradient: "bg-gradient-to-br from-enat-gold to-amber-500",
      delay: 0.24,
    },
  ];

  return (
    <div className="p-8 space-y-8 min-h-screen bg-gradient-to-br from-zinc-50 via-white to-enat-yellow/10">

      {/* ─── Header ─── */}
      <motion.div {...fadeInUp}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-enat-green to-emerald-500 flex items-center justify-center shadow-lg shadow-enat-green/20">
            <Users size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-enat-dark">Influencer Hub</h1>
            <p className="text-sm text-zinc-400">Quản lý influencer & lịch sử hợp tác</p>
          </div>
        </div>
      </motion.div>

      {/* ─── Summary KPIs ─── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {kpis.map((kpi) => (
          <KPICard key={kpi.label} {...kpi} />
        ))}
      </div>

      {/* ─── Filter Bar ─── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-white rounded-2xl border border-zinc-100 shadow-sm p-4"
      >
        <div className="flex flex-wrap gap-3 items-center">
          {/* Search */}
          <div className="relative flex-1 min-w-[200px]">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tìm influencer..."
              className="w-full bg-zinc-50 border border-zinc-200 text-sm text-enat-dark rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-enat-green/20 focus:border-enat-green/40 transition-all"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter size={14} className="text-zinc-400" />
          </div>

          {/* Tier filter */}
          <SelectDropdown
            value={tierFilter}
            onChange={setTierFilter}
            options={["Mega", "Macro", "Micro", "Nano"]}
            placeholder="Tất cả tier"
          />

          {/* Status filter */}
          <SelectDropdown
            value={statusFilter}
            onChange={setStatusFilter}
            options={["Đang hợp tác", "Đã hợp tác", "Tiềm năng"]}
            placeholder="Tất cả trạng thái"
          />

          {/* Platform filter buttons */}
          <div className="flex items-center gap-1 bg-zinc-50 rounded-xl p-1 border border-zinc-100">
            {([
              { label: "Tất cả", value: "" },
              { label: "Facebook", value: "Facebook" },
              { label: "Instagram", value: "Instagram" },
              { label: "TikTok", value: "TikTok" },
            ] as { label: string; value: "" | Platform }[]).map((btn) => (
              <button
                key={btn.label}
                onClick={() => setPlatformFilter(btn.value)}
                className={`relative px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  platformFilter === btn.value
                    ? "text-white"
                    : "text-zinc-500 hover:text-zinc-700"
                }`}
              >
                {platformFilter === btn.value && (
                  <motion.div
                    layoutId="platformIndicator"
                    className="absolute inset-0 bg-enat-green rounded-lg"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{btn.label}</span>
              </button>
            ))}
          </div>

          {/* Result count */}
          <span className="text-xs text-zinc-400 ml-auto">
            {filtered.length} influencer
          </span>
        </div>
      </motion.div>

      {/* ─── Influencer Card Grid ─── */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-enat-dark">Danh Sách Influencer</h2>
          <p className="text-xs text-zinc-400">
            Chọn để so sánh (tối đa 3) — click "Xem hồ sơ" để xem lịch sử
          </p>
        </div>

        <AnimatePresence mode="popLayout">
          {filtered.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-3 text-center py-16 text-zinc-400 text-sm bg-white rounded-2xl border border-zinc-100"
            >
              Không tìm thấy influencer phù hợp với bộ lọc
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              {filtered.map((inf, idx) => (
                <div key={inf.id} className="relative">
                  <InfluencerCard
                    influencer={inf}
                    delay={idx * 0.07}
                    onSelect={(id) => setSelectedId(id)}
                    isSelected={selectedId === inf.id}
                  />
                  {/* Compare checkbox */}
                  <button
                    onClick={() => toggleCompare(inf.id)}
                    className={`absolute top-3 left-3 w-6 h-6 rounded-lg border-2 flex items-center justify-center text-xs font-bold transition-all z-10 ${
                      compareIds.includes(inf.id)
                        ? "bg-enat-gold border-enat-gold text-white"
                        : "bg-white border-zinc-200 text-zinc-300 hover:border-enat-gold"
                    }`}
                    title="Thêm vào so sánh"
                  >
                    {compareIds.includes(inf.id) ? "✓" : "+"}
                  </button>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ─── Two-column: Timeline + Radar ─── */}
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">

        {/* ─── Work History Timeline ─── */}
        <motion.div
          ref={timelineRef}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="xl:col-span-3 bg-white rounded-2xl border border-zinc-100 shadow-sm overflow-hidden"
        >
          <div className="px-6 py-5 border-b border-zinc-50">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-enat-dark">Lịch Sử Hợp Tác</h2>
                <p className="text-sm text-zinc-400 mt-0.5">
                  Chiến dịch của{" "}
                  <span className="font-semibold text-enat-green">
                    {selectedInfluencer.name}
                  </span>
                </p>
              </div>
              <div className={`w-10 h-10 rounded-xl ${selectedInfluencer.avatarBg} flex items-center justify-center text-white font-bold text-sm shadow-md`}>
                {selectedInfluencer.initials}
              </div>
            </div>
          </div>

          <div className="p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedInfluencer.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {workHistory.map((entry, idx) => (
                  <TimelineEntry
                    key={entry.id}
                    entry={entry}
                    index={idx}
                    isLast={idx === workHistory.length - 1}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* ─── Radar Comparison ─── */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="xl:col-span-2 bg-white rounded-2xl border border-zinc-100 shadow-sm overflow-hidden"
        >
          <div className="px-6 py-5 border-b border-zinc-50">
            <h2 className="text-lg font-bold text-enat-dark">So Sánh Influencer</h2>
            <p className="text-sm text-zinc-400 mt-0.5">
              Chọn tối đa 3 influencer để so sánh
            </p>
          </div>

          <div className="p-4">
            {/* Legend chips */}
            <div className="flex flex-wrap gap-2 mb-4">
              {compareInfluencers.map((inf, i) => (
                <span
                  key={inf.id}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border"
                  style={{
                    borderColor: radarColors[i] + "60",
                    backgroundColor: radarColors[i] + "15",
                    color: radarColors[i],
                  }}
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: radarColors[i] }}
                  />
                  {inf.name.split(" ").pop()}
                </span>
              ))}
              {compareInfluencers.length === 0 && (
                <p className="text-xs text-zinc-400">Chưa chọn influencer nào để so sánh</p>
              )}
            </div>

            {compareInfluencers.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={radarData} margin={{ top: 10, right: 20, bottom: 10, left: 20 }}>
                  <PolarGrid stroke="#f0f0f0" />
                  <PolarAngleAxis
                    dataKey="subject"
                    tick={{ fontSize: 10, fill: "#71717a" }}
                  />
                  {compareInfluencers.map((inf, i) => (
                    <Radar
                      key={inf.id}
                      name={inf.name}
                      dataKey={inf.name}
                      stroke={radarColors[i]}
                      fill={radarColors[i]}
                      fillOpacity={0.12}
                      strokeWidth={2}
                    />
                  ))}
                  <Tooltip content={<RadarTooltip />} />
                  <Legend
                    iconType="circle"
                    iconSize={8}
                    wrapperStyle={{ fontSize: "11px", paddingTop: "8px" }}
                    formatter={(value) => {
                      const parts = (value as string).split(" ");
                      return parts[parts.length - 1];
                    }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[300px] flex items-center justify-center text-zinc-300 text-sm">
                Chọn influencer từ danh sách để so sánh
              </div>
            )}

            {/* Attribute explanation */}
            <div className="mt-2 grid grid-cols-1 gap-1.5">
              {(Object.entries(radarLabels) as [keyof typeof radarLabels, string][]).map(([key, label]) => (
                <div key={key} className="flex items-center justify-between text-xs">
                  <span className="text-zinc-400">{label}</span>
                  <div className="flex gap-1.5">
                    {compareInfluencers.map((inf, i) => (
                      <span
                        key={inf.id}
                        className="font-bold w-7 text-center rounded-md py-0.5"
                        style={{
                          color: radarColors[i],
                          backgroundColor: radarColors[i] + "15",
                        }}
                      >
                        {inf.radarScores[key]}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick stats for selected compare influencers */}
          {compareInfluencers.length > 0 && (
            <div className="px-4 pb-4">
              <div className="bg-enat-yellow/30 rounded-xl p-3 mt-2">
                <p className="text-xs font-semibold text-amber-700 mb-2 flex items-center gap-1">
                  <Clock size={11} />
                  Tổng số chiến dịch đã hợp tác
                </p>
                <div className="flex gap-2 flex-wrap">
                  {compareInfluencers.map((inf, i) => (
                    <span
                      key={inf.id}
                      className="text-xs px-2.5 py-1 rounded-lg font-semibold"
                      style={{
                        color: radarColors[i],
                        backgroundColor: radarColors[i] + "15",
                      }}
                    >
                      {inf.name.split(" ").pop()}: {[7, 4, 9, 5, 3, 6][inf.id - 1] ?? 5} chiến dịch
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
