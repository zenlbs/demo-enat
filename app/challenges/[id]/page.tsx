"use client";

import { use, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Trophy,
  Clock,
  Users,
  Gift,
  CheckCircle2,
  Medal,
  Eye,
  Heart,
  Share2,
  Star,
  Link2,
  Sparkles,
  Clipboard,
  ExternalLink,
} from "lucide-react";
import { challenges, leaderboard } from "@/data/mock";
import { scaleIn } from "@/lib/animations";

type Tab = "info" | "leaderboard" | "submit";

const tabs: { label: string; value: Tab }[] = [
  { label: "Thông tin", value: "info" },
  { label: "Bảng xếp hạng", value: "leaderboard" },
  { label: "Tham gia", value: "submit" },
];

const platformColors: Record<string, string> = {
  facebook: "bg-[#1877F2]",
  instagram: "bg-[#E4405F]",
  tiktok: "bg-enat-dark",
};

const platformLabels: Record<string, string> = {
  facebook: "Facebook",
  instagram: "Instagram",
  tiktok: "TikTok",
};

function getDaysRemaining(deadline: string): number {
  const now = new Date();
  const end = new Date(deadline);
  const diff = end.getTime() - now.getTime();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

function getHoursRemaining(deadline: string): number {
  const now = new Date();
  const end = new Date(deadline);
  const diff = end.getTime() - now.getTime();
  return Math.max(0, Math.floor((diff / (1000 * 60 * 60)) % 24));
}

function formatNumber(n: number): string {
  if (n >= 1000) return (n / 1000).toFixed(1) + "K";
  return n.toString();
}

function detectPlatform(url: string): string | null {
  if (url.includes("facebook.com") || url.includes("fb.")) return "facebook";
  if (url.includes("instagram.com")) return "instagram";
  if (url.includes("tiktok.com")) return "tiktok";
  return null;
}

export default function ChallengeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [activeTab, setActiveTab] = useState<Tab>("info");
  const [linkInput, setLinkInput] = useState("");
  const [pastedLink, setPastedLink] = useState<string | null>(null);

  const challenge = challenges.find((c) => c.id === id);

  if (!challenge) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50">
        <div className="text-center">
          <Trophy size={48} className="text-zinc-300 mx-auto mb-4" />
          <p className="text-zinc-500 text-lg mb-4">Không tìm thấy thử thách</p>
          <Link
            href="/challenges"
            className="text-enat-green hover:underline font-medium"
          >
            Quay lại danh sách
          </Link>
        </div>
      </div>
    );
  }

  const days = getDaysRemaining(challenge.deadline);
  const hours = getHoursRemaining(challenge.deadline);
  const progress = (challenge.participants / challenge.maxParticipants) * 100;
  const detectedPlatform = pastedLink ? detectPlatform(pastedLink) : null;

  const handlePaste = () => {
    if (linkInput.trim()) {
      setPastedLink(linkInput.trim());
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 to-white">
      {/* Hero Banner */}
      <div className="relative h-72 md:h-80 overflow-hidden">
        <Image
          src={challenge.coverImage}
          alt={challenge.title}
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />

        {/* Back button */}
        <div className="absolute top-4 left-4 z-10">
          <Link href="/challenges">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 bg-white/10 backdrop-blur-md text-white px-4 py-2 rounded-xl hover:bg-white/20 transition-colors"
            >
              <ArrowLeft size={18} />
              <span className="text-sm font-medium">Quay lại</span>
            </motion.div>
          </Link>
        </div>

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" as const }}
          >
            {/* Platform badges */}
            <div className="flex gap-2 mb-3">
              {challenge.platform.map((p) => (
                <span
                  key={p}
                  className={`${platformColors[p]} text-white text-xs font-medium px-3 py-1 rounded-full`}
                >
                  {platformLabels[p]}
                </span>
              ))}
            </div>

            <h1 className="text-2xl md:text-3xl font-bold text-white mb-3">
              {challenge.title}
            </h1>

            {/* Stats row */}
            <div className="flex flex-wrap items-center gap-4 md:gap-6">
              <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm rounded-full px-4 py-2">
                <Gift size={16} className="text-enat-gold" />
                <span className="text-enat-gold font-bold text-sm">
                  {challenge.prize}
                </span>
              </div>

              <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm rounded-full px-4 py-2">
                <Clock size={16} className="text-white/80" />
                <span className="text-white font-medium text-sm">
                  {challenge.status === "ended"
                    ? "Đã kết thúc"
                    : `${days} ngày ${hours} giờ`}
                </span>
              </div>

              <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm rounded-full px-4 py-2">
                <Users size={16} className="text-white/80" />
                <span className="text-white font-medium text-sm">
                  {challenge.participants.toLocaleString()} tham gia
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-xl border-b border-zinc-100">
        <div className="px-6 md:px-8">
          <div className="flex gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className="relative px-5 py-4 text-sm font-medium transition-colors"
              >
                {activeTab === tab.value && (
                  <motion.div
                    layoutId="detailTabIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-enat-green"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span
                  className={
                    activeTab === tab.value
                      ? "text-enat-green"
                      : "text-zinc-400 hover:text-zinc-600"
                  }
                >
                  {tab.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-6 md:p-8 max-w-5xl">
        <AnimatePresence mode="wait">
          {/* Info Tab */}
          {activeTab === "info" && (
            <motion.div
              key="info"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              {/* Description */}
              <div className="bg-white rounded-2xl p-6 border border-zinc-100 shadow-sm">
                <h2 className="text-lg font-bold text-enat-dark mb-3">
                  Mô tả thử thách
                </h2>
                <p className="text-zinc-600 leading-relaxed">
                  {challenge.description}
                </p>
              </div>

              {/* Rules */}
              {challenge.rules.length > 0 && (
                <div className="bg-white rounded-2xl p-6 border border-zinc-100 shadow-sm">
                  <h2 className="text-lg font-bold text-enat-dark mb-4">
                    Thể lệ tham gia
                  </h2>
                  <div className="space-y-3">
                    {challenge.rules.map((rule, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-start gap-3"
                      >
                        <div className="mt-0.5 w-6 h-6 rounded-full bg-enat-green/10 flex items-center justify-center shrink-0">
                          <CheckCircle2 size={14} className="text-enat-green" />
                        </div>
                        <span className="text-zinc-600 text-sm leading-relaxed">
                          {rule}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Prize Table */}
              {challenge.prizes.length > 0 && (
                <div className="bg-white rounded-2xl p-6 border border-zinc-100 shadow-sm">
                  <h2 className="text-lg font-bold text-enat-dark mb-4">
                    Cơ cấu giải thưởng
                  </h2>
                  <div className="space-y-3">
                    {challenge.prizes.map((prize, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.12 }}
                        className="flex items-center justify-between bg-gradient-to-r from-enat-yellow-light/50 to-transparent rounded-xl p-4 border border-enat-gold/10"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              i === 0
                                ? "bg-gradient-to-br from-yellow-400 to-amber-500"
                                : i === 1
                                ? "bg-gradient-to-br from-zinc-300 to-zinc-400"
                                : "bg-gradient-to-br from-amber-600 to-amber-700"
                            }`}
                          >
                            <Medal
                              size={18}
                              className="text-white"
                            />
                          </div>
                          <div>
                            <span className="font-semibold text-enat-dark text-sm">
                              {prize.rank}
                            </span>
                            <span className="text-zinc-400 text-xs ml-2">
                              x{prize.count}
                            </span>
                          </div>
                        </div>
                        <span className="text-enat-gold font-bold">
                          {prize.amount}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Timeline */}
              <div className="bg-white rounded-2xl p-6 border border-zinc-100 shadow-sm">
                <h2 className="text-lg font-bold text-enat-dark mb-4">
                  Thời gian
                </h2>
                <div className="flex items-center gap-4">
                  <div className="flex-1 bg-zinc-50 rounded-xl p-4 text-center">
                    <p className="text-xs text-zinc-400 mb-1">Hạn chót</p>
                    <p className="font-bold text-enat-dark">
                      {challenge.deadline}
                    </p>
                  </div>
                  <div className="flex-1 bg-zinc-50 rounded-xl p-4 text-center">
                    <p className="text-xs text-zinc-400 mb-1">Thời gian còn lại</p>
                    <p className="font-bold text-enat-red">
                      {challenge.status === "ended"
                        ? "Đã kết thúc"
                        : `${days} ngày ${hours} giờ`}
                    </p>
                  </div>
                  <div className="flex-1 bg-zinc-50 rounded-xl p-4 text-center">
                    <p className="text-xs text-zinc-400 mb-1">Người tham gia</p>
                    <div className="flex items-center justify-center gap-2">
                      <p className="font-bold text-enat-dark">
                        {challenge.participants.toLocaleString()}
                      </p>
                      <span className="text-xs text-zinc-400">
                        / {challenge.maxParticipants.toLocaleString()}
                      </span>
                    </div>
                    <div className="mt-2 h-1.5 bg-zinc-200 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="h-full rounded-full bg-gradient-to-r from-enat-green to-enat-green-light"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Leaderboard Tab */}
          {activeTab === "leaderboard" && (
            <motion.div
              key="leaderboard"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm overflow-hidden">
                {/* Table header */}
                <div className="grid grid-cols-[60px_1fr_100px_100px_100px_80px] gap-2 px-6 py-3 bg-zinc-50 text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                  <span>Hạng</span>
                  <span>Người tham gia</span>
                  <span className="text-right">Lượt xem</span>
                  <span className="text-right">Lượt thích</span>
                  <span className="text-right">Chia sẻ</span>
                  <span className="text-right">Điểm</span>
                </div>

                {/* Table rows */}
                <div className="divide-y divide-zinc-50">
                  {leaderboard.map((entry, i) => {
                    const rankBg =
                      entry.rank === 1
                        ? "bg-gradient-to-br from-yellow-400 to-amber-500"
                        : entry.rank === 2
                        ? "bg-gradient-to-br from-zinc-300 to-zinc-400"
                        : entry.rank === 3
                        ? "bg-gradient-to-br from-amber-600 to-amber-700"
                        : "bg-zinc-100";
                    const rankText =
                      entry.rank <= 3 ? "text-white" : "text-zinc-500";

                    return (
                      <motion.div
                        key={entry.rank}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.06 }}
                        className="grid grid-cols-[60px_1fr_100px_100px_100px_80px] gap-2 px-6 py-4 items-center hover:bg-zinc-50/50 transition-colors"
                      >
                        {/* Rank */}
                        <div>
                          <div
                            className={`w-8 h-8 rounded-full ${rankBg} flex items-center justify-center`}
                          >
                            <span className={`text-xs font-bold ${rankText}`}>
                              {entry.rank}
                            </span>
                          </div>
                        </div>

                        {/* User */}
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-enat-green/10 flex items-center justify-center">
                            <span className="text-xs font-bold text-enat-green">
                              {entry.avatar}
                            </span>
                          </div>
                          <span className="font-medium text-enat-dark text-sm">
                            {entry.name}
                          </span>
                        </div>

                        {/* Views */}
                        <div className="text-right">
                          <div className="flex items-center justify-end gap-1 text-sm text-zinc-600">
                            <Eye size={13} className="text-zinc-400" />
                            <span>{formatNumber(entry.views)}</span>
                          </div>
                        </div>

                        {/* Likes */}
                        <div className="text-right">
                          <div className="flex items-center justify-end gap-1 text-sm text-zinc-600">
                            <Heart size={13} className="text-zinc-400" />
                            <span>{formatNumber(entry.likes)}</span>
                          </div>
                        </div>

                        {/* Shares */}
                        <div className="text-right">
                          <div className="flex items-center justify-end gap-1 text-sm text-zinc-600">
                            <Share2 size={13} className="text-zinc-400" />
                            <span>{formatNumber(entry.shares)}</span>
                          </div>
                        </div>

                        {/* Score */}
                        <div className="text-right">
                          <div className="flex items-center justify-end gap-1">
                            <Star size={13} className="text-enat-gold" />
                            <span className="font-bold text-enat-dark text-sm">
                              {entry.score}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}

          {/* Submit Tab */}
          {activeTab === "submit" && (
            <motion.div
              key="submit"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {/* Card A: Paste Link */}
              <motion.div
                {...scaleIn}
                transition={{ ...scaleIn.transition, delay: 0.1 }}
                className="bg-white rounded-2xl p-6 border border-zinc-100 shadow-sm"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-enat-blue flex items-center justify-center">
                    <Link2 size={20} className="text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-enat-dark">Dán Link</h3>
                    <p className="text-xs text-zinc-400">
                      Dán link bài đăng từ mạng xã hội
                    </p>
                  </div>
                </div>

                {/* URL Input */}
                <div className="relative mb-4">
                  <input
                    type="text"
                    value={linkInput}
                    onChange={(e) => setLinkInput(e.target.value)}
                    placeholder="https://www.tiktok.com/@user/video/..."
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 pr-24 text-sm text-enat-dark placeholder:text-zinc-300 focus:outline-none focus:ring-2 focus:ring-enat-green/20 focus:border-enat-green transition-all"
                  />
                  {/* Auto-detect platform icon */}
                  {linkInput && detectPlatform(linkInput) && (
                    <div className="absolute right-14 top-1/2 -translate-y-1/2">
                      <div
                        className={`w-6 h-6 rounded-full ${
                          platformColors[detectPlatform(linkInput)!]
                        }`}
                      />
                    </div>
                  )}
                  <button
                    onClick={handlePaste}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-enat-green text-white px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-enat-green-light transition-colors flex items-center gap-1"
                  >
                    <Clipboard size={12} />
                    Dán
                  </button>
                </div>

                {/* Preview card after paste */}
                <AnimatePresence>
                  {pastedLink && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="bg-zinc-50 rounded-xl p-4 border border-zinc-100">
                        <div className="flex gap-3">
                          <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-enat-pink to-enat-blue flex items-center justify-center shrink-0">
                            <ExternalLink
                              size={24}
                              className="text-enat-green"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              {detectedPlatform && (
                                <div
                                  className={`w-4 h-4 rounded-full ${platformColors[detectedPlatform]}`}
                                />
                              )}
                              <span className="text-xs text-zinc-400 font-medium">
                                {detectedPlatform
                                  ? platformLabels[detectedPlatform]
                                  : "Liên kết"}
                              </span>
                            </div>
                            <p className="text-sm font-medium text-enat-dark mb-1 truncate">
                              {challenge.title} - Bài dự thi
                            </p>
                            <p className="text-xs text-zinc-400 truncate">
                              {pastedLink}
                            </p>
                          </div>
                        </div>
                        <div className="mt-3 pt-3 border-t border-zinc-200 flex items-center justify-between">
                          <span className="text-xs text-enat-green font-medium flex items-center gap-1">
                            <CheckCircle2 size={12} />
                            Sẵn sàng gửi
                          </span>
                          <button className="bg-enat-green text-white px-4 py-1.5 rounded-lg text-xs font-medium hover:bg-enat-green-light transition-colors">
                            Gửi bài dự thi
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {!pastedLink && (
                  <p className="text-xs text-zinc-400 mt-2 text-center">
                    Dán link bài đăng từ Facebook, Instagram hoặc TikTok
                  </p>
                )}
              </motion.div>

              {/* Card B: Creator Hub AI */}
              <motion.div
                {...scaleIn}
                transition={{ ...scaleIn.transition, delay: 0.2 }}
                className="relative bg-gradient-to-br from-enat-green-dark to-enat-green rounded-2xl p-6 border border-enat-green/20 shadow-sm overflow-hidden"
              >
                {/* Decorative blobs */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-enat-gold/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-enat-green-light/20 rounded-full blur-2xl" />

                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-enat-gold/20 flex items-center justify-center pulse-glow">
                      <Sparkles size={20} className="text-enat-gold" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white">Creator Hub AI</h3>
                      <p className="text-xs text-white/50">
                        Tạo nội dung chuyên nghiệp với AI
                      </p>
                    </div>
                  </div>

                  <p className="text-sm text-white/70 leading-relaxed mb-6">
                    Sử dụng sức mạnh của AI để tạo nội dung chất lượng cao cho thử thách.
                    Tự động tạo video, hình ảnh, caption và hashtag phù hợp với
                    yêu cầu của thử thách.
                  </p>

                  <ul className="space-y-2.5 mb-6">
                    {[
                      "Tự động tạo script video từ đề bài",
                      "Gợi ý caption & hashtag trending",
                      "Tạo hình ảnh/video template chuyên nghiệp",
                      "Phân tích & tối ưu nội dung trước khi đăng",
                    ].map((feature, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + i * 0.08 }}
                        className="flex items-center gap-2 text-sm text-white/80"
                      >
                        <div className="w-5 h-5 rounded-full bg-enat-gold/20 flex items-center justify-center shrink-0">
                          <CheckCircle2 size={12} className="text-enat-gold" />
                        </div>
                        {feature}
                      </motion.li>
                    ))}
                  </ul>

                  <Link href="/creator-hub">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="w-full bg-gradient-to-r from-enat-gold to-yellow-400 text-enat-green-dark font-bold py-3 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-enat-gold/20 hover:shadow-enat-gold/40 transition-shadow"
                    >
                      <Sparkles size={18} />
                      Mở Creator Hub
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
