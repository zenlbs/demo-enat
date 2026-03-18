"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex">
      {/* Left Panel — Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-enat-green-dark via-enat-green to-enat-green-light items-center justify-center">
        {/* Organic blobs */}
        <div className="blob absolute -top-40 -left-40 w-[500px] h-[500px] bg-enat-green-light/30 blur-3xl" />
        <div className="blob absolute bottom-0 right-0 w-[450px] h-[450px] bg-enat-gold/15 blur-3xl" />
        <div className="blob absolute top-1/2 left-1/4 w-[300px] h-[300px] bg-enat-yellow/10 blur-3xl" />

        {/* Dot pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        {/* Content */}
        <div className="relative z-10 text-center px-12 max-w-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="animate-float"
          >
            <div className="w-28 h-28 mx-auto rounded-3xl bg-gradient-to-br from-enat-gold to-enat-yellow flex items-center justify-center shadow-2xl mb-8">
              <span className="text-5xl font-black text-enat-green-dark">
                E
              </span>
            </div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-3xl font-bold text-white leading-snug mb-4"
          >
            {"Cộng Đồng Sáng Tạo "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-enat-yellow via-enat-gold to-enat-yellow gradient-animate">
              {"Nội Dung Làm Đẹp"}
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-white/60 text-sm leading-relaxed"
          >
            {"ENAT Creator Hub \u2014 Cộng đồng sáng tạo nội dung làm đẹp"}
          </motion.p>
        </div>
      </div>

      {/* Right Panel — Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full max-w-md"
        >
          {/* Mobile logo */}
          <div className="lg:hidden flex justify-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-enat-green to-enat-green-light flex items-center justify-center shadow-lg">
              <span className="text-2xl font-black text-white">E</span>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-enat-dark mb-2">
            {"Đăng nhập"}
          </h1>
          <p className="text-enat-dark/50 mb-8">
            {"Chào mừng trở lại! Vui lòng đăng nhập để tiếp tục."}
          </p>

          <form
            className="space-y-5"
            onSubmit={(e) => e.preventDefault()}
          >
            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-enat-dark mb-1.5">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-enat-dark/30" />
                <input
                  type="email"
                  placeholder="email@example.com"
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-enat-green/20 focus:border-enat-green/30 focus:bg-white transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-enat-dark mb-1.5">
                {"Mật khẩu"}
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-enat-dark/30" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder={"\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"}
                  className="w-full pl-11 pr-11 py-3 rounded-xl border border-gray-200 bg-gray-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-enat-green/20 focus:border-enat-green/30 focus:bg-white transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-enat-dark/30 hover:text-enat-dark/60 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Forgot password */}
            <div className="text-right">
              <button
                type="button"
                className="text-sm text-enat-green font-medium hover:text-enat-green-light transition-colors"
              >
                {"Quên mật khẩu?"}
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-enat-green to-enat-green-light text-white font-bold py-3.5 rounded-xl shadow-lg shadow-enat-green/20 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 text-sm"
            >
              {"Đăng nhập"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-7">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-enat-dark/30 font-medium">
              {"hoặc"}
            </span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Social login */}
          <div className="flex gap-3">
            <button className="flex-1 flex items-center justify-center gap-2 border border-gray-200 rounded-xl py-3 text-sm font-medium text-enat-dark/70 hover:bg-gray-50 hover:border-gray-300 transition-all duration-300">
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Google
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 border border-gray-200 rounded-xl py-3 text-sm font-medium text-enat-dark/70 hover:bg-gray-50 hover:border-gray-300 transition-all duration-300">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#1877F2">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              Facebook
            </button>
          </div>

          {/* Register link */}
          <p className="text-center mt-8 text-sm text-enat-dark/50">
            {"Chưa có tài khoản? "}
            <Link
              href="/register"
              className="text-enat-green font-semibold hover:text-enat-green-light transition-colors"
            >
              {"Đăng ký"}
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
