"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Brain,
  Video,
  Globe,
  Music,
  MessageSquare,
  Sparkles,
  Plus,
  Upload,
  ChevronDown,
  Settings2,
} from "lucide-react";
import { adminIntegrations, adminUsers } from "@/data/mock";

const iconMap: Record<string, React.ElementType> = {
  brain: Brain,
  video: Video,
  globe: Globe,
  music: Music,
  message: MessageSquare,
  sparkles: Sparkles,
};

const tabs = [
  { key: "integrations", label: "Tích hợp" },
  { key: "users", label: "Người dùng" },
  { key: "brand", label: "Thương hiệu" },
];

const roleBadge: Record<string, string> = {
  Admin: "bg-emerald-100 text-emerald-700",
  Editor: "bg-blue-100 text-blue-700",
  Reviewer: "bg-amber-100 text-amber-700",
};

const avatarColors = [
  "bg-enat-green",
  "bg-enat-gold",
  "bg-enat-red",
  "bg-blue-500",
];

const brandColors = [
  { name: "ENAT Green", hex: "#1A7340" },
  { name: "ENAT Gold", hex: "#F5C518" },
  { name: "ENAT Red", hex: "#E84B2A" },
  { name: "ENAT Dark", hex: "#1A1A1A" },
];

const toneOptions = ["Thân thiện", "Chuyên nghiệp", "Trẻ trung"];

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("integrations");
  const [selectedTone, setSelectedTone] = useState("Thân thiện");
  const [toneOpen, setToneOpen] = useState(false);

  return (
    <div className="p-6 md:p-8 min-h-screen bg-enat-yellow-light/30">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-1">
          <Settings2 className="w-7 h-7 text-enat-green" />
          <h1 className="text-3xl font-bold text-enat-dark">
            Quản Trị Hệ Thống
          </h1>
        </div>
        <p className="text-enat-dark/50 ml-10">
          Quản lý tích hợp, người dùng và cài đặt thương hiệu
        </p>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="relative flex gap-1 bg-white rounded-2xl p-1.5 shadow-sm border border-enat-green/5 mb-8 w-fit"
      >
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`relative px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 z-10 ${
              activeTab === tab.key
                ? "text-white"
                : "text-enat-dark/50 hover:text-enat-dark/80"
            }`}
          >
            {activeTab === tab.key && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-gradient-to-r from-enat-green to-enat-green-light rounded-xl shadow-md shadow-enat-green/20"
                transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
              />
            )}
            <span className="relative z-10">{tab.label}</span>
          </button>
        ))}
      </motion.div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        {/* Integrations Tab */}
        {activeTab === "integrations" && (
          <motion.div
            key="integrations"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5"
          >
            {adminIntegrations.map((integration, i) => {
              const Icon = iconMap[integration.icon] || Sparkles;
              return (
                <motion.div
                  key={integration.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="group relative bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-white/60 shadow-sm hover:shadow-xl hover:bg-white/90 hover:-translate-y-1 transition-all duration-300"
                >
                  {/* Glassmorphism shimmer overlay */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/50 via-transparent to-white/20 pointer-events-none" />

                  <div className="relative z-10">
                    {/* Top row: icon + status */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-enat-green/10 to-enat-green/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-6 h-6 text-enat-green" />
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`w-2.5 h-2.5 rounded-full ${
                            integration.status === "connected"
                              ? "bg-green-400"
                              : "bg-yellow-400 animate-pulse"
                          }`}
                        />
                        <span
                          className={`text-xs font-medium ${
                            integration.status === "connected"
                              ? "text-green-600"
                              : "text-yellow-600"
                          }`}
                        >
                          {integration.status === "connected"
                            ? "Kết nối"
                            : "Cảnh báo"}
                        </span>
                      </div>
                    </div>

                    {/* Name + description */}
                    <h3 className="font-bold text-enat-dark text-lg mb-1">
                      {integration.name}
                    </h3>
                    <p className="text-sm text-enat-dark/50 mb-4">
                      {integration.description}
                    </p>

                    {/* Last sync */}
                    <div className="flex items-center justify-between pt-3 border-t border-enat-green/5">
                      <span className="text-xs text-enat-dark/40">
                        Đồng bộ: {integration.lastSync}
                      </span>
                      <button className="text-xs font-medium text-enat-green hover:text-enat-green-light transition-colors">
                        Cài đặt
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {/* Users Tab */}
        {activeTab === "users" && (
          <motion.div
            key="users"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
          >
            {/* Add user button */}
            <div className="flex justify-end mb-5">
              <button className="flex items-center gap-2 bg-gradient-to-r from-enat-green to-enat-green-light text-white px-5 py-2.5 rounded-xl font-medium text-sm shadow-lg shadow-enat-green/20 hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
                <Plus className="w-4 h-4" />
                Thêm người dùng
              </button>
            </div>

            {/* Users table */}
            <div className="bg-white rounded-2xl border border-enat-green/5 shadow-sm overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-enat-green/5">
                    <th className="text-left px-6 py-4 text-xs font-bold text-enat-dark/40 uppercase tracking-wider">
                      Người dùng
                    </th>
                    <th className="text-left px-6 py-4 text-xs font-bold text-enat-dark/40 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="text-left px-6 py-4 text-xs font-bold text-enat-dark/40 uppercase tracking-wider">
                      Vai trò
                    </th>
                    <th className="text-left px-6 py-4 text-xs font-bold text-enat-dark/40 uppercase tracking-wider">
                      Trạng thái
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {adminUsers.map((user, i) => (
                    <motion.tr
                      key={user.email}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.08 }}
                      className="border-b border-enat-green/5 last:border-0 hover:bg-enat-yellow-light/30 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-10 h-10 rounded-full ${avatarColors[i % avatarColors.length]} flex items-center justify-center shadow-sm`}
                          >
                            <span className="text-sm font-bold text-white">
                              {user.name
                                .split(" ")
                                .map((w) => w[0])
                                .slice(0, 2)
                                .join("")}
                            </span>
                          </div>
                          <span className="font-semibold text-enat-dark text-sm">
                            {user.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-enat-dark/60">
                        {user.email}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex px-3 py-1 rounded-lg text-xs font-bold ${roleBadge[user.role]}`}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {user.lastActive === "Đang online" && (
                            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                          )}
                          <span
                            className={`text-sm ${
                              user.lastActive === "Đang online"
                                ? "text-green-600 font-medium"
                                : "text-enat-dark/40"
                            }`}
                          >
                            {user.lastActive}
                          </span>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* Brand Tab */}
        {activeTab === "brand" && (
          <motion.div
            key="brand"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="max-w-2xl"
          >
            <div className="bg-white rounded-2xl border border-enat-green/5 shadow-sm p-8 space-y-8">
              {/* Brand Name */}
              <div>
                <label className="block text-sm font-bold text-enat-dark mb-2">
                  Tên thương hiệu
                </label>
                <input
                  type="text"
                  defaultValue="ENAT 400"
                  className="w-full px-4 py-3 rounded-xl border border-enat-green/10 bg-enat-yellow-light/20 text-enat-dark font-medium focus:outline-none focus:ring-2 focus:ring-enat-green/20 focus:border-enat-green/30 transition-all"
                />
              </div>

              {/* Brand Colors */}
              <div>
                <label className="block text-sm font-bold text-enat-dark mb-3">
                  Bảng màu thương hiệu
                </label>
                <div className="flex flex-wrap gap-4">
                  {brandColors.map((c) => (
                    <div key={c.hex} className="flex items-center gap-3 group">
                      <div
                        className="w-10 h-10 rounded-full shadow-md border-2 border-white group-hover:scale-110 transition-transform duration-300 cursor-pointer"
                        style={{ backgroundColor: c.hex }}
                      />
                      <div>
                        <p className="text-xs font-semibold text-enat-dark">
                          {c.name}
                        </p>
                        <p className="text-[10px] text-enat-dark/40 uppercase">
                          {c.hex}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tone of Voice */}
              <div>
                <label className="block text-sm font-bold text-enat-dark mb-2">
                  Giọng điệu thương hiệu
                </label>
                <div className="relative">
                  <button
                    onClick={() => setToneOpen(!toneOpen)}
                    className="w-full flex items-center justify-between px-4 py-3 rounded-xl border border-enat-green/10 bg-enat-yellow-light/20 text-sm font-medium text-enat-dark hover:border-enat-green/30 transition-all"
                  >
                    {selectedTone}
                    <ChevronDown
                      className={`w-4 h-4 text-enat-dark/40 transition-transform duration-300 ${toneOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  <AnimatePresence>
                    {toneOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl shadow-lg border border-enat-green/10 overflow-hidden z-20"
                      >
                        {toneOptions.map((tone) => (
                          <button
                            key={tone}
                            onClick={() => {
                              setSelectedTone(tone);
                              setToneOpen(false);
                            }}
                            className={`w-full text-left px-4 py-3 text-sm hover:bg-enat-yellow-light/50 transition-colors ${
                              selectedTone === tone
                                ? "text-enat-green font-semibold bg-enat-green/5"
                                : "text-enat-dark/70"
                            }`}
                          >
                            {tone}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Logo Upload */}
              <div>
                <label className="block text-sm font-bold text-enat-dark mb-2">
                  Logo thương hiệu
                </label>
                <div className="border-2 border-dashed border-enat-green/15 rounded-2xl p-8 text-center hover:border-enat-green/30 hover:bg-enat-green/[0.02] transition-all duration-300 cursor-pointer group">
                  <div className="w-14 h-14 mx-auto mb-3 rounded-xl bg-enat-green/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Upload className="w-6 h-6 text-enat-green/50 group-hover:text-enat-green transition-colors" />
                  </div>
                  <p className="text-sm font-medium text-enat-dark/50">
                    Kéo thả hoặc click để tải lên logo
                  </p>
                  <p className="text-xs text-enat-dark/30 mt-1">
                    PNG, SVG, JPG (tối đa 2MB)
                  </p>
                </div>
              </div>

              {/* Save button */}
              <div className="pt-4">
                <button className="bg-gradient-to-r from-enat-green to-enat-green-light text-white px-8 py-3 rounded-xl font-semibold shadow-lg shadow-enat-green/20 hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
                  Lưu thay đổi
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
