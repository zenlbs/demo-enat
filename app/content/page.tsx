"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  Filter,
  Search,
  Plus,
  Instagram,
  Facebook,
  Music,
  ChevronRight,
} from "lucide-react";
import { contentItems } from "@/data/mock";
import { staggerContainer } from "@/lib/animations";

type Status = "draft" | "review" | "approved" | "published";

const columns: {
  key: Status;
  label: string;
  borderColor: string;
  bgColor: string;
}[] = [
  {
    key: "draft",
    label: "Nháp",
    borderColor: "border-t-gray-400",
    bgColor: "bg-gray-50",
  },
  {
    key: "review",
    label: "Chờ duyệt",
    borderColor: "border-t-enat-gold",
    bgColor: "bg-amber-50/50",
  },
  {
    key: "approved",
    label: "Đã duyệt",
    borderColor: "border-t-enat-green-light",
    bgColor: "bg-emerald-50/50",
  },
  {
    key: "published",
    label: "Đã đăng",
    borderColor: "border-t-enat-green",
    bgColor: "bg-green-50/60",
  },
];

const platformConfig: Record<
  string,
  { label: string; color: string; bg: string; icon: React.ElementType }
> = {
  instagram: {
    label: "IG",
    color: "text-pink-600",
    bg: "bg-pink-100",
    icon: Instagram,
  },
  facebook: {
    label: "FB",
    color: "text-blue-600",
    bg: "bg-blue-100",
    icon: Facebook,
  },
  tiktok: {
    label: "TikTok",
    color: "text-gray-900",
    bg: "bg-gray-200",
    icon: Music,
  },
};

const filters = ["Tất cả", "Instagram", "Facebook", "TikTok"];

export default function ContentPage() {
  const [activeFilter, setActiveFilter] = useState("Tất cả");

  const filteredItems = contentItems.filter((item) => {
    if (activeFilter === "Tất cả") return true;
    return item.platform === activeFilter.toLowerCase();
  });

  const getColumnItems = (status: Status) =>
    filteredItems.filter((item) => item.status === status);

  return (
    <div className="p-6 md:p-8 min-h-screen bg-enat-yellow-light/30">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-enat-dark mb-1">
          Quản Lý Nội Dung
        </h1>
        <p className="text-enat-dark/50">
          Theo dõi và quản lý tất cả nội dung trên các nền tảng
        </p>
      </motion.div>

      {/* Toolbar */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="flex flex-wrap items-center gap-3 mb-8"
      >
        {/* Search */}
        <div className="relative flex-1 min-w-[220px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-enat-dark/30" />
          <input
            type="text"
            placeholder="Tìm kiếm nội dung..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-enat-green/10 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-enat-green/20 focus:border-enat-green/30 transition-all"
          />
        </div>

        {/* Filter buttons */}
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-enat-dark/40" />
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                activeFilter === f
                  ? "bg-enat-green text-white shadow-md shadow-enat-green/20"
                  : "bg-white text-enat-dark/60 hover:bg-enat-green/5 border border-enat-green/10"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Add button */}
        <button className="ml-auto flex items-center gap-2 bg-gradient-to-r from-enat-green to-enat-green-light text-white px-5 py-2.5 rounded-xl font-medium text-sm shadow-lg shadow-enat-green/20 hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
          <Plus className="w-4 h-4" />
          Tạo mới
        </button>
      </motion.div>

      {/* Kanban Board */}
      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5"
      >
        {columns.map((col, colIdx) => {
          const items = getColumnItems(col.key);
          return (
            <motion.div
              key={col.key}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: colIdx * 0.1 }}
              className={`rounded-2xl border-t-4 ${col.borderColor} ${col.bgColor} p-4 min-h-[400px]`}
            >
              {/* Column header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-enat-dark text-sm">
                    {col.label}
                  </h3>
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-enat-dark/10 text-xs font-bold text-enat-dark/70">
                    {items.length}
                  </span>
                </div>
                {colIdx < columns.length - 1 && (
                  <ChevronRight className="w-4 h-4 text-enat-dark/20 hidden xl:block" />
                )}
              </div>

              {/* Cards */}
              <div className="flex flex-col gap-3">
                {items.map((item, i) => {
                  const platform = platformConfig[item.platform];
                  const PlatformIcon = platform?.icon;
                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{
                        duration: 0.4,
                        delay: colIdx * 0.1 + i * 0.08,
                      }}
                      className="group bg-white rounded-xl p-3 shadow-sm border border-enat-green/5 hover:shadow-lg hover:-translate-y-1 hover:border-enat-green/15 transition-all duration-300 cursor-pointer"
                    >
                      <div className="flex gap-3">
                        {/* Thumbnail */}
                        <div className="relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={item.thumbnail}
                            alt={item.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-enat-dark truncate group-hover:text-enat-green transition-colors">
                            {item.title}
                          </p>

                          <div className="flex items-center gap-2 mt-1.5">
                            {/* Platform badge */}
                            {platform && (
                              <span
                                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold ${platform.bg} ${platform.color}`}
                              >
                                {PlatformIcon && (
                                  <PlatformIcon className="w-2.5 h-2.5" />
                                )}
                                {platform.label}
                              </span>
                            )}

                            {/* Date */}
                            <span className="text-[10px] text-enat-dark/40">
                              {new Date(item.date).toLocaleDateString("vi-VN", {
                                day: "2-digit",
                                month: "2-digit",
                              })}
                            </span>
                          </div>

                          {/* Views for published */}
                          {item.status === "published" && item.views > 0 && (
                            <p className="text-[10px] text-enat-dark/40 mt-1">
                              {item.views.toLocaleString("vi-VN")} lượt xem
                            </p>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}

                {items.length === 0 && (
                  <div className="text-center py-8 text-sm text-enat-dark/30">
                    Không có nội dung
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Workflow arrow indicator (desktop) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="hidden xl:flex items-center justify-center gap-2 mt-6 text-enat-dark/20"
      >
        <span className="text-xs font-medium">Nháp</span>
        <ChevronRight className="w-4 h-4" />
        <span className="text-xs font-medium">Chờ duyệt</span>
        <ChevronRight className="w-4 h-4" />
        <span className="text-xs font-medium">Đã duyệt</span>
        <ChevronRight className="w-4 h-4" />
        <span className="text-xs font-medium">Đã đăng</span>
      </motion.div>
    </div>
  );
}
