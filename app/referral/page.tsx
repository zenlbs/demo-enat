"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Gift,
  Copy,
  Check,
  Users,
  TrendingUp,
  Percent,
  Facebook,
  Share2,
  Link2,
  ChevronRight,
} from "lucide-react";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations";

const referralCode = "ENAT-CREATOR-2026";

const stats = [
  {
    label: "Số người đã mời",
    value: "12",
    unit: "người",
    icon: Users,
    color: "from-enat-green to-emerald-600",
    bg: "bg-enat-green/10",
    text: "text-enat-green",
  },
  {
    label: "Hoa hồng tích lũy",
    value: "2.450.000",
    unit: "VND",
    icon: TrendingUp,
    color: "from-enat-gold to-yellow-500",
    bg: "bg-enat-gold/10",
    text: "text-enat-gold",
  },
  {
    label: "Tỷ lệ chuyển đổi",
    value: "8,5",
    unit: "%",
    icon: Percent,
    color: "from-purple-500 to-violet-600",
    bg: "bg-purple-500/10",
    text: "text-purple-600",
  },
];

const referralHistory = [
  {
    id: 1,
    name: "Nguyễn Thị Lan",
    date: "12/03/2026",
    status: "Đã đăng ký",
    commission: "250.000 ₫",
    statusColor: "bg-emerald-100 text-emerald-700",
  },
  {
    id: 2,
    name: "Trần Văn Minh",
    date: "08/03/2026",
    status: "Đã đăng ký",
    commission: "250.000 ₫",
    statusColor: "bg-emerald-100 text-emerald-700",
  },
  {
    id: 3,
    name: "Phạm Thị Hoa",
    date: "05/03/2026",
    status: "Đang chờ",
    commission: "—",
    statusColor: "bg-yellow-100 text-yellow-700",
  },
  {
    id: 4,
    name: "Lê Hoàng Nam",
    date: "28/02/2026",
    status: "Đã đăng ký",
    commission: "250.000 ₫",
    statusColor: "bg-emerald-100 text-emerald-700",
  },
  {
    id: 5,
    name: "Vũ Thị Thanh",
    date: "20/02/2026",
    status: "Đang chờ",
    commission: "—",
    statusColor: "bg-yellow-100 text-yellow-700",
  },
  {
    id: 6,
    name: "Đặng Quốc Bảo",
    date: "14/02/2026",
    status: "Đã đăng ký",
    commission: "250.000 ₫",
    statusColor: "bg-emerald-100 text-emerald-700",
  },
];

export default function ReferralPage() {
  const [copied, setCopied] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://enat.vn/join?ref=${referralCode}`);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50/30 p-6 md:p-8">
      {/* Header */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-enat-gold to-yellow-400 flex items-center justify-center shadow-lg shadow-enat-gold/30">
            <Gift className="w-5 h-5 text-enat-green-dark" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-enat-dark">
            Mã Giới Thiệu
          </h1>
        </div>
        <p className="text-enat-dark/50 text-sm ml-[52px]">
          Mời bạn bè tham gia và nhận hoa hồng hấp dẫn
        </p>
      </motion.div>

      {/* Referral Code Card */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.1 }}
        className="relative mb-8 overflow-hidden rounded-3xl bg-gradient-to-br from-enat-green via-emerald-700 to-enat-green-dark p-8 shadow-2xl shadow-enat-green/20"
      >
        {/* Background decorations */}
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-white/5 translate-y-1/2 -translate-x-1/2" />

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <Gift className="w-5 h-5 text-enat-gold" />
            <span className="text-white/70 text-sm font-medium">
              Mã giới thiệu của bạn
            </span>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-6 py-4">
              <span className="text-2xl md:text-3xl font-black text-enat-gold tracking-widest">
                {referralCode}
              </span>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCopyCode}
              className="flex items-center gap-2 bg-enat-gold text-enat-green-dark font-bold px-6 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200"
            >
              {copied ? (
                <>
                  <Check className="w-5 h-5" />
                  <span className="hidden sm:inline">Đã sao chép</span>
                </>
              ) : (
                <>
                  <Copy className="w-5 h-5" />
                  <span className="hidden sm:inline">Sao chép</span>
                </>
              )}
            </motion.button>
          </div>

          <p className="text-white/60 text-sm">
            Mỗi người dùng mã của bạn đăng ký thành công, bạn nhận ngay{" "}
            <span className="text-enat-gold font-bold">250.000 ₫</span> hoa hồng.
          </p>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8"
      >
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              variants={staggerItem}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center mb-4`}>
                <Icon className={`w-5 h-5 ${stat.text}`} />
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black text-enat-dark">
                  {stat.value}
                </span>
                <span className="text-sm text-enat-dark/40">{stat.unit}</span>
              </div>
              <p className="text-sm text-enat-dark/50 mt-1">{stat.label}</p>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Share buttons */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.25 }}
        className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8"
      >
        <h2 className="text-base font-bold text-enat-dark mb-4 flex items-center gap-2">
          <Share2 className="w-5 h-5 text-enat-green" />
          Chia sẻ ngay
        </h2>
        <div className="flex flex-wrap gap-3">
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="flex items-center gap-2 bg-[#1877F2] text-white font-semibold px-5 py-3 rounded-xl shadow hover:shadow-md transition-all"
          >
            <Facebook className="w-5 h-5" />
            Facebook
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="flex items-center gap-2 bg-[#0068FF] text-white font-semibold px-5 py-3 rounded-xl shadow hover:shadow-md transition-all"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" />
            </svg>
            Zalo
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={handleCopyLink}
            className="flex items-center gap-2 bg-gray-100 text-enat-dark font-semibold px-5 py-3 rounded-xl hover:bg-gray-200 transition-all"
          >
            {copiedLink ? (
              <>
                <Check className="w-5 h-5 text-enat-green" />
                Đã sao chép link
              </>
            ) : (
              <>
                <Link2 className="w-5 h-5" />
                Sao chép link
              </>
            )}
          </motion.button>
        </div>
      </motion.div>

      {/* Referral history table */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.3 }}
        className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
      >
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-base font-bold text-enat-dark flex items-center gap-2">
            <Users className="w-5 h-5 text-enat-green" />
            Lịch sử giới thiệu
          </h2>
          <button className="text-sm text-enat-green font-medium flex items-center gap-1 hover:gap-2 transition-all">
            Xem tất cả <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50/70">
                <th className="text-left text-xs font-semibold text-enat-dark/40 uppercase tracking-wider px-6 py-3">
                  Tên
                </th>
                <th className="text-left text-xs font-semibold text-enat-dark/40 uppercase tracking-wider px-6 py-3">
                  Ngày đăng ký
                </th>
                <th className="text-left text-xs font-semibold text-enat-dark/40 uppercase tracking-wider px-6 py-3">
                  Trạng thái
                </th>
                <th className="text-right text-xs font-semibold text-enat-dark/40 uppercase tracking-wider px-6 py-3">
                  Hoa hồng
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {referralHistory.map((item, i) => (
                <motion.tr
                  key={item.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.35 + i * 0.05 }}
                  className="hover:bg-gray-50/50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-enat-green to-emerald-400 flex items-center justify-center text-white text-xs font-bold shrink-0">
                        {item.name.charAt(0)}
                      </div>
                      <span className="text-sm font-medium text-enat-dark">
                        {item.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-enat-dark/50">
                    {item.date}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${item.statusColor}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right text-sm font-semibold text-enat-dark">
                    {item.commission}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
