"use client";
import { Bell, Search, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Topbar() {
  const [showNotif, setShowNotif] = useState(false);

  return (
    <header className="h-16 bg-white/80 backdrop-blur-xl border-b border-enat-green/10 flex items-center justify-between px-6 sticky top-0 z-40">
      {/* Search */}
      <div className="flex items-center gap-3 bg-enat-yellow-light rounded-xl px-4 py-2 w-96">
        <Search size={18} className="text-enat-green/40" />
        <input
          type="text"
          placeholder="Tìm kiếm thử thách, nội dung..."
          className="bg-transparent outline-none text-sm text-enat-dark w-full placeholder:text-enat-green/30"
        />
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <div className="relative">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowNotif(!showNotif)}
            className="relative p-2 rounded-xl hover:bg-enat-yellow-light transition-colors"
          >
            <Bell size={20} className="text-enat-green" />
            <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-enat-red rounded-full text-white text-xs flex items-center justify-center font-bold">
              3
            </span>
          </motion.button>
          {showNotif && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className="absolute right-0 top-12 w-80 bg-white rounded-2xl shadow-xl border border-enat-green/10 p-4 space-y-3"
            >
              <div className="text-sm font-semibold text-enat-green">Thông báo</div>
              {[
                "Video của bạn đạt 10K views!",
                "Thử thách mới vừa mở đăng ký",
                "Bài đăng đã được duyệt",
              ].map((msg, i) => (
                <div key={i} className="flex items-start gap-3 p-2 rounded-xl hover:bg-enat-yellow-light cursor-pointer transition-colors">
                  <div className="w-2 h-2 rounded-full bg-enat-red mt-1.5 shrink-0" />
                  <span className="text-sm text-enat-dark">{msg}</span>
                </div>
              ))}
            </motion.div>
          )}
        </div>

        {/* User */}
        <div className="flex items-center gap-3 pl-4 border-l border-enat-green/10 cursor-pointer group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-enat-green to-enat-green-light flex items-center justify-center text-white font-bold text-sm">
            NH
          </div>
          <div>
            <div className="text-sm font-semibold text-enat-dark group-hover:text-enat-green transition-colors">
              Nguyễn Huy
            </div>
            <div className="text-xs text-enat-green/50">Admin</div>
          </div>
          <ChevronDown size={14} className="text-enat-green/40" />
        </div>
      </div>
    </header>
  );
}
