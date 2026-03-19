"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  FileBarChart,
  BarChart3,
  Users,
  Radio,
  FileText,
  Download,
  Eye,
  Calendar,
  Clock,
  CheckCircle2,
  Loader2,
  Mail,
  Slack,
  ToggleRight,
  ChevronDown,
} from "lucide-react";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations";

/* ─── Types ─── */
type ReportType = "campaign" | "influencer" | "social" | "content";
type ReportStatus = "done" | "processing";
type ExportFormat = "PDF" | "Excel" | "Google Sheets" | "PowerPoint";
type DateRange = "Tùy chỉnh" | "Tuần này" | "Tháng này" | "Quý này";

/* ─── Data ─── */
const reportTemplates: {
  id: ReportType;
  title: string;
  description: string;
  icon: React.ElementType;
  gradient: string;
  shadow: string;
}[] = [
  {
    id: "campaign",
    title: "Báo Cáo Chiến Dịch",
    description:
      "Hiệu suất chiến dịch, ROI và phân tích tỷ lệ tương tác theo từng kênh.",
    icon: BarChart3,
    gradient: "from-enat-green to-emerald-500",
    shadow: "shadow-enat-green/25",
  },
  {
    id: "influencer",
    title: "Báo Cáo Influencer",
    description:
      "Hiệu suất từng influencer và tổng hợp theo nhóm, chiến dịch.",
    icon: Users,
    gradient: "from-blue-500 to-cyan-500",
    shadow: "shadow-blue-500/25",
  },
  {
    id: "social",
    title: "Báo Cáo Social Listening",
    description:
      "Lượt đề cập, phân tích cảm xúc và so sánh với đối thủ cạnh tranh.",
    icon: Radio,
    gradient: "from-violet-500 to-purple-600",
    shadow: "shadow-violet-500/25",
  },
  {
    id: "content",
    title: "Báo Cáo Nội Dung",
    description:
      "Hiệu suất nội dung, bài đăng nổi bật và so sánh hiệu quả các nền tảng.",
    icon: FileText,
    gradient: "from-enat-gold to-amber-500",
    shadow: "shadow-amber-500/25",
  },
];

const recentReports: {
  name: string;
  type: string;
  typeColor: string;
  date: string;
  status: ReportStatus;
}[] = [
  {
    name: "Chiến dịch Làn Da Khỏe Mạnh — Tháng 3",
    type: "Chiến dịch",
    typeColor: "bg-enat-green/10 text-enat-green",
    date: "18/03/2026",
    status: "done",
  },
  {
    name: "Hiệu suất Influencer Q1 2026",
    type: "Influencer",
    typeColor: "bg-blue-100 text-blue-700",
    date: "15/03/2026",
    status: "done",
  },
  {
    name: "Social Listening — Tuần 11",
    type: "Social",
    typeColor: "bg-violet-100 text-violet-700",
    date: "14/03/2026",
    status: "done",
  },
  {
    name: "Phân tích Nội dung Tháng 2",
    type: "Nội dung",
    typeColor: "bg-amber-100 text-amber-700",
    date: "01/03/2026",
    status: "done",
  },
  {
    name: "Báo cáo Đối thủ Q1",
    type: "Social",
    typeColor: "bg-violet-100 text-violet-700",
    date: "10/03/2026",
    status: "processing",
  },
  {
    name: "Tổng hợp ROI Chiến dịch 2026",
    type: "Chiến dịch",
    typeColor: "bg-enat-green/10 text-enat-green",
    date: "12/03/2026",
    status: "done",
  },
];

const exportFormats: { id: ExportFormat; icon: string }[] = [
  { id: "PDF", icon: "📄" },
  { id: "Excel", icon: "📊" },
  { id: "Google Sheets", icon: "🗂️" },
  { id: "PowerPoint", icon: "📽️" },
];

const dateRanges: DateRange[] = ["Tùy chỉnh", "Tuần này", "Tháng này", "Quý này"];

const scheduledReports: {
  name: string;
  schedule: string;
  destination: string;
  destIcon: React.ElementType;
  destColor: string;
}[] = [
  {
    name: "Báo cáo hàng tuần",
    schedule: "Mỗi thứ Hai, 8:00",
    destination: "Email to team",
    destIcon: Mail,
    destColor: "text-blue-500 bg-blue-50",
  },
  {
    name: "Báo cáo tháng",
    schedule: "Ngày 1 hàng tháng",
    destination: "Slack #marketing",
    destIcon: Slack,
    destColor: "text-violet-500 bg-violet-50",
  },
  {
    name: "Báo cáo chiến dịch",
    schedule: "Khi kết thúc",
    destination: "Email to manager",
    destIcon: Mail,
    destColor: "text-blue-500 bg-blue-50",
  },
];

/* ═══════════════════════════════════════════════════════════
   REPORTS PAGE
   ═══════════════════════════════════════════════════════════ */
export default function ReportsPage() {
  const [selectedFormat, setSelectedFormat] = useState<ExportFormat>("PDF");
  const [selectedRange, setSelectedRange] = useState<DateRange>("Tháng này");

  return (
    <div className="p-8 space-y-8 min-h-screen bg-gradient-to-br from-zinc-50 via-white to-enat-yellow/20">

      {/* ─── Header ─── */}
      <motion.div {...fadeInUp} className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-enat-green to-emerald-500 flex items-center justify-center shadow-lg shadow-enat-green/25">
          <FileBarChart size={22} className="text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-enat-dark">Báo Cáo</h1>
          <p className="text-sm text-zinc-400">
            Tạo, quản lý và lên lịch báo cáo hiệu suất
          </p>
        </div>
      </motion.div>

      {/* ─── Quick Stats Bar ─── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {[
          {
            label: "Báo cáo tháng này",
            value: "12",
            icon: FileBarChart,
            color: "text-enat-green",
            bg: "bg-enat-green/10",
          },
          {
            label: "Đã xuất",
            value: "8",
            icon: CheckCircle2,
            color: "text-emerald-600",
            bg: "bg-emerald-50",
          },
          {
            label: "Đang chờ",
            value: "4",
            icon: Clock,
            color: "text-enat-gold",
            bg: "bg-amber-50",
          },
          {
            label: "Lần xuất cuối",
            value: "18/03/2026",
            icon: Calendar,
            color: "text-zinc-500",
            bg: "bg-zinc-100",
          },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 + i * 0.07 }}
              whileHover={{ y: -2 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl border border-zinc-100 shadow-sm px-5 py-4 flex items-center gap-4 hover:shadow-md transition-all duration-300"
            >
              <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center shrink-0`}>
                <Icon size={18} className={stat.color} />
              </div>
              <div>
                <p className="text-xs text-zinc-400 font-medium">{stat.label}</p>
                <p className="text-xl font-bold text-enat-dark leading-tight">{stat.value}</p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* ─── Report Templates ─── */}
      <motion.section
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        <motion.h2
          variants={staggerItem}
          className="text-base font-bold text-enat-dark mb-4"
        >
          Mẫu Báo Cáo
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {reportTemplates.map((tpl, i) => {
            const Icon = tpl.icon;
            return (
              <motion.div
                key={tpl.id}
                variants={staggerItem}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                whileHover={{ y: -6, scale: 1.01 }}
                className="group bg-white/80 backdrop-blur-sm rounded-2xl border border-zinc-100 shadow-sm p-6 hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col gap-4"
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tpl.gradient} flex items-center justify-center shadow-lg ${tpl.shadow} group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon size={22} className="text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-enat-dark mb-1.5 group-hover:text-enat-green transition-colors">
                    {tpl.title}
                  </h3>
                  <p className="text-xs text-zinc-500 leading-relaxed">
                    {tpl.description}
                  </p>
                </div>
                <button className="w-full text-center text-sm font-semibold text-enat-green border border-enat-green/30 rounded-xl py-2.5 hover:bg-enat-green hover:text-white hover:border-enat-green transition-all duration-200">
                  Tạo báo cáo
                </button>
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      {/* ─── Recent Reports ─── */}
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <h2 className="text-base font-bold text-enat-dark mb-4">
          Báo Cáo Gần Đây
        </h2>
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-zinc-100 shadow-sm overflow-hidden">
          {/* Table header */}
          <div className="grid grid-cols-[1fr_120px_120px_140px_140px] gap-4 px-6 py-3 bg-zinc-50/80 border-b border-zinc-100 text-xs font-semibold text-zinc-400 uppercase tracking-wide">
            <span>Tên báo cáo</span>
            <span>Loại</span>
            <span>Ngày tạo</span>
            <span>Trạng thái</span>
            <span>Hành động</span>
          </div>

          {/* Table rows */}
          {recentReports.map((report, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35, delay: 0.45 + i * 0.06 }}
              className={`grid grid-cols-[1fr_120px_120px_140px_140px] gap-4 px-6 py-4 items-center border-b border-zinc-50 hover:bg-enat-yellow/30 transition-colors duration-200 ${
                i % 2 === 0 ? "bg-white" : "bg-zinc-50/40"
              }`}
            >
              {/* Name */}
              <span className="text-sm font-medium text-enat-dark truncate pr-2">
                {report.name}
              </span>

              {/* Type */}
              <span
                className={`inline-flex items-center justify-center px-2.5 py-1 rounded-lg text-xs font-semibold ${report.typeColor} w-fit`}
              >
                {report.type}
              </span>

              {/* Date */}
              <span className="text-sm text-zinc-500">{report.date}</span>

              {/* Status */}
              {report.status === "done" ? (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-enat-green/10 text-enat-green text-xs font-semibold w-fit">
                  <CheckCircle2 size={12} />
                  Hoàn thành
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-enat-gold/20 text-amber-700 text-xs font-semibold w-fit">
                  <Loader2 size={12} className="animate-spin" />
                  Đang xử lý
                </span>
              )}

              {/* Actions */}
              <div className="flex items-center gap-2">
                {report.status === "done" ? (
                  <>
                    <motion.button
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-enat-green text-white text-xs font-semibold hover:bg-enat-green/90 transition-colors shadow-sm"
                    >
                      <Download size={12} />
                      Tải xuống
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-200 text-zinc-600 text-xs font-semibold hover:border-enat-green/40 hover:text-enat-green transition-colors"
                    >
                      <Eye size={12} />
                      Xem
                    </motion.button>
                  </>
                ) : (
                  <span className="text-xs text-zinc-400 italic">—</span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ─── Export Options + Scheduled Reports (two-column) ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Export Options */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.55 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl border border-zinc-100 shadow-sm p-6 space-y-5"
        >
          <h2 className="text-base font-bold text-enat-dark">Tuỳ Chọn Xuất</h2>

          {/* Format selector */}
          <div>
            <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wide mb-3">
              Định dạng
            </p>
            <div className="grid grid-cols-2 gap-2.5">
              {exportFormats.map((fmt) => (
                <motion.button
                  key={fmt.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setSelectedFormat(fmt.id)}
                  className={`flex items-center gap-2.5 px-4 py-3 rounded-xl border text-sm font-medium transition-all duration-200 ${
                    selectedFormat === fmt.id
                      ? "border-enat-green bg-enat-green/5 text-enat-green shadow-sm"
                      : "border-zinc-200 text-zinc-600 hover:border-enat-green/30 hover:bg-zinc-50"
                  }`}
                >
                  <span className="text-base">{fmt.icon}</span>
                  {fmt.id}
                  {selectedFormat === fmt.id && (
                    <CheckCircle2 size={14} className="ml-auto text-enat-green" />
                  )}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Date range */}
          <div>
            <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wide mb-3">
              Khoảng thời gian
            </p>
            <div className="flex flex-wrap gap-2">
              {dateRanges.map((range) => (
                <button
                  key={range}
                  onClick={() => setSelectedRange(range)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    selectedRange === range
                      ? "bg-enat-green text-white shadow-md shadow-enat-green/20"
                      : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
            {selectedRange === "Tùy chỉnh" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.25 }}
                className="mt-3 flex gap-2"
              >
                <input
                  type="date"
                  className="flex-1 border border-zinc-200 rounded-xl px-3 py-2 text-sm text-enat-dark focus:outline-none focus:ring-2 focus:ring-enat-green/20 focus:border-enat-green/40 transition-all"
                  defaultValue="2026-03-01"
                />
                <span className="self-center text-zinc-400 text-sm">đến</span>
                <input
                  type="date"
                  className="flex-1 border border-zinc-200 rounded-xl px-3 py-2 text-sm text-enat-dark focus:outline-none focus:ring-2 focus:ring-enat-green/20 focus:border-enat-green/40 transition-all"
                  defaultValue="2026-03-19"
                />
              </motion.div>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-1">
            <motion.button
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.97 }}
              className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-enat-green to-emerald-500 text-white font-semibold py-3 rounded-xl shadow-lg shadow-enat-green/25 hover:shadow-xl hover:shadow-enat-green/30 transition-all duration-300 text-sm"
            >
              <Download size={16} />
              Xuất báo cáo
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.97 }}
              className="flex-1 flex items-center justify-center gap-2 border-2 border-enat-green/30 text-enat-green font-semibold py-3 rounded-xl hover:bg-enat-green/5 hover:border-enat-green/60 transition-all duration-300 text-sm"
            >
              <Calendar size={16} />
              Lên lịch tự động
            </motion.button>
          </div>
        </motion.section>

        {/* Scheduled Reports */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.65 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl border border-zinc-100 shadow-sm p-6"
        >
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base font-bold text-enat-dark">
              Báo Cáo Tự Động
            </h2>
            <span className="text-xs font-semibold text-enat-green bg-enat-green/10 px-2.5 py-1 rounded-full">
              3 đang hoạt động
            </span>
          </div>

          <div className="space-y-3">
            {scheduledReports.map((report, i) => {
              const DestIcon = report.destIcon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.7 + i * 0.08 }}
                  whileHover={{ x: 2 }}
                  className="flex items-center gap-4 p-4 rounded-xl border border-zinc-100 hover:border-enat-green/20 hover:bg-enat-yellow/20 transition-all duration-200 group cursor-pointer"
                >
                  {/* Destination icon */}
                  <div className={`w-9 h-9 rounded-lg ${report.destColor} flex items-center justify-center shrink-0`}>
                    <DestIcon size={16} />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-enat-dark group-hover:text-enat-green transition-colors truncate">
                      {report.name}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <Clock size={11} className="text-zinc-400 shrink-0" />
                      <span className="text-xs text-zinc-400 truncate">
                        {report.schedule}
                      </span>
                      <span className="text-zinc-300">·</span>
                      <span className="text-xs text-zinc-400 truncate">
                        {report.destination}
                      </span>
                    </div>
                  </div>

                  {/* Toggle (always active) */}
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[10px] font-semibold text-enat-green hidden sm:block">
                      Đang bật
                    </span>
                    <ToggleRight size={24} className="text-enat-green" />
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Add new schedule CTA */}
          <motion.button
            whileHover={{ scale: 1.01, y: -1 }}
            whileTap={{ scale: 0.98 }}
            className="w-full mt-4 flex items-center justify-center gap-2 border-2 border-dashed border-zinc-200 text-zinc-400 text-sm font-medium py-3 rounded-xl hover:border-enat-green/40 hover:text-enat-green hover:bg-enat-green/5 transition-all duration-300"
          >
            <ChevronDown size={14} className="rotate-[-90deg]" />
            Thêm lịch mới
          </motion.button>
        </motion.section>
      </div>
    </div>
  );
}
