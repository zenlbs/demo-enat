"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Clock, Users, Gift, Calendar } from "lucide-react";
import { challenges } from "@/data/mock";
import { staggerContainer, staggerItem } from "@/lib/animations";

type StatusFilter = "all" | "active" | "upcoming" | "ended";

const tabs: { label: string; value: StatusFilter }[] = [
  { label: "Tất cả", value: "all" },
  { label: "Đang diễn ra", value: "active" },
  { label: "Sắp tới", value: "upcoming" },
  { label: "Đã kết thúc", value: "ended" },
];

const statusConfig = {
  active: { label: "Đang diễn ra", bg: "bg-enat-green", text: "text-white" },
  upcoming: { label: "Sắp tới", bg: "bg-enat-gold", text: "text-enat-dark" },
  ended: { label: "Đã kết thúc", bg: "bg-zinc-400", text: "text-white" },
};

const platformColors: Record<string, string> = {
  facebook: "bg-[#1877F2]",
  instagram: "bg-[#E4405F]",
  tiktok: "bg-enat-dark",
};

function getDaysRemaining(deadline: string): number {
  const now = new Date();
  const end = new Date(deadline);
  const diff = end.getTime() - now.getTime();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

export default function ChallengesPage() {
  const [activeFilter, setActiveFilter] = useState<StatusFilter>("all");

  const filtered =
    activeFilter === "all"
      ? challenges
      : challenges.filter((c) => c.status === activeFilter);

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 to-white p-6 lg:p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" as const }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-enat-gold to-enat-yellow flex items-center justify-center">
            <Trophy size={20} className="text-enat-green-dark" />
          </div>
          <h1 className="text-2xl font-bold text-enat-dark">Thử Thách</h1>
        </div>
        <p className="text-zinc-500 ml-[52px]">
          Tham gia các thử thách sáng tạo nội dung cùng ENAT và nhận giải thưởng hấp dẫn
        </p>
      </motion.div>

      {/* Filter Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" as const, delay: 0.1 }}
        className="mb-8"
      >
        <div className="flex gap-1 bg-white rounded-2xl p-1.5 shadow-sm border border-zinc-100 w-fit">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveFilter(tab.value)}
              className="relative px-5 py-2 rounded-xl text-sm font-medium transition-colors duration-200"
            >
              {activeFilter === tab.value && (
                <motion.div
                  layoutId="challengeTabIndicator"
                  className="absolute inset-0 bg-enat-green rounded-xl shadow-md"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span
                className={`relative z-10 ${
                  activeFilter === tab.value ? "text-white" : "text-zinc-500 hover:text-zinc-700"
                }`}
              >
                {tab.label}
              </span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Challenge Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeFilter}
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          exit={{ opacity: 0, transition: { duration: 0.15 } }}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
        >
          {filtered.map((challenge, index) => {
            const days = getDaysRemaining(challenge.deadline);
            const progress =
              (challenge.participants / challenge.maxParticipants) * 100;
            const cfg = statusConfig[challenge.status];

            return (
              <motion.div
                key={challenge.id}
                variants={staggerItem}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                whileHover={{ scale: 1.03, y: -4 }}
                className="group"
              >
                <Link href={`/challenges/${challenge.id}`}>
                  <div className="bg-white rounded-2xl overflow-hidden border border-zinc-100 shadow-sm hover:shadow-xl transition-shadow duration-300">
                    {/* Cover Image */}
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={challenge.coverImage}
                        alt={challenge.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                      {/* Status Badge */}
                      <div className="absolute top-3 left-3">
                        <span
                          className={`${cfg.bg} ${cfg.text} text-xs font-semibold px-3 py-1 rounded-full`}
                        >
                          {cfg.label}
                        </span>
                      </div>

                      {/* Platform Icons */}
                      <div className="absolute top-3 right-3 flex gap-1.5">
                        {challenge.platform.map((p) => (
                          <div
                            key={p}
                            className={`w-6 h-6 rounded-full ${platformColors[p]} border-2 border-white/80 shadow-sm`}
                            title={p}
                          />
                        ))}
                      </div>

                      {/* Prize overlay */}
                      <div className="absolute bottom-3 left-3">
                        <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-sm rounded-full px-3 py-1">
                          <Gift size={14} className="text-enat-gold" />
                          <span className="text-enat-gold font-bold text-sm">
                            {challenge.prize}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <h3 className="text-lg font-bold text-enat-dark mb-1.5 group-hover:text-enat-green transition-colors line-clamp-1">
                        {challenge.title}
                      </h3>
                      <p className="text-sm text-zinc-500 mb-4 line-clamp-2 leading-relaxed">
                        {challenge.description}
                      </p>

                      {/* Deadline */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-1.5 text-sm text-zinc-400">
                          <Calendar size={14} />
                          <span>{challenge.deadline}</span>
                        </div>
                        {challenge.status === "active" && (
                          <div className="flex items-center gap-1.5">
                            <Clock size={14} className="text-enat-red" />
                            <span className="text-sm font-semibold text-enat-red">
                              Còn {days} ngày
                            </span>
                          </div>
                        )}
                        {challenge.status === "upcoming" && (
                          <div className="flex items-center gap-1.5">
                            <Clock size={14} className="text-enat-gold" />
                            <span className="text-sm font-semibold text-enat-gold">
                              Còn {days} ngày
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Participants */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-1.5 text-zinc-500">
                            <Users size={14} />
                            <span>
                              {challenge.participants.toLocaleString()}/
                              {challenge.maxParticipants.toLocaleString()}
                            </span>
                          </div>
                          <span className="text-zinc-400 text-xs font-medium">
                            {Math.round(progress)}%
                          </span>
                        </div>
                        <div className="h-1.5 bg-zinc-100 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 1, delay: 0.3 + index * 0.1 }}
                            className="h-full rounded-full bg-gradient-to-r from-enat-green to-enat-green-light"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </AnimatePresence>

      {/* Empty state */}
      {filtered.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-20"
        >
          <Trophy size={48} className="text-zinc-300 mx-auto mb-4" />
          <p className="text-zinc-400 text-lg">
            Không có thử thách nào trong danh mục này
          </p>
        </motion.div>
      )}
    </div>
  );
}
