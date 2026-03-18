"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Mail, Lock, User, Palette, Wand2, Eye, EyeOff } from "lucide-react";

type RoleOption = "creator" | "brand-admin";

const roles: {
  key: RoleOption;
  label: string;
  description: string;
  icon: React.ElementType;
}[] = [
  {
    key: "creator",
    label: "Creator",
    description: "T\u1ea1o n\u1ed9i dung s\u00e1ng t\u1ea1o v\u00e0 nh\u1eadn th\u01b0\u1edfng",
    icon: Wand2,
  },
  {
    key: "brand-admin",
    label: "Brand Admin",
    description: "Qu\u1ea3n l\u00fd chi\u1ebfn d\u1ecbch v\u00e0 th\u01b0\u01a1ng hi\u1ec7u",
    icon: Palette,
  },
];

export default function RegisterPage() {
  const [selectedRole, setSelectedRole] = useState<RoleOption | null>(null);
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
            {"Ai C\u0169ng C\u00f3 Th\u1ec3 "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-enat-yellow via-enat-gold to-enat-yellow gradient-animate">
              {"T\u1ea1o N\u1ed9i Dung \u0110\u1eb9p"}
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-white/60 text-sm leading-relaxed"
          >
            {"Tham gia c\u1ed9ng \u0111\u1ed3ng s\u00e1ng t\u1ea1o n\u1ed9i dung l\u1edbn nh\u1ea5t c\u1ee7a ENAT v\u00e0 ki\u1ebfm thu nh\u1eadp t\u1eeb n\u1ed9i dung c\u1ee7a b\u1ea1n"}
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
            {"\u0110\u0103ng k\u00fd"}
          </h1>
          <p className="text-enat-dark/50 mb-8">
            {"T\u1ea1o t\u00e0i kho\u1ea3n m\u1edbi \u0111\u1ec3 b\u1eaft \u0111\u1ea7u s\u00e1ng t\u1ea1o n\u1ed9i dung"}
          </p>

          <form
            className="space-y-5"
            onSubmit={(e) => e.preventDefault()}
          >
            {/* Full Name */}
            <div>
              <label className="block text-sm font-semibold text-enat-dark mb-1.5">
                {"H\u1ecd v\u00e0 t\u00ean"}
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-enat-dark/30" />
                <input
                  type="text"
                  placeholder={"Nguy\u1ec5n V\u0103n A"}
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-enat-green/20 focus:border-enat-green/30 focus:bg-white transition-all"
                />
              </div>
            </div>

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
                {"M\u1eadt kh\u1ea9u"}
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-enat-dark/30" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder={"T\u1ed1i thi\u1ec3u 8 k\u00fd t\u1ef1"}
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

            {/* Role selection */}
            <div>
              <label className="block text-sm font-semibold text-enat-dark mb-2.5">
                {"B\u1ea1n l\u00e0..."}
              </label>
              <div className="grid grid-cols-2 gap-3">
                {roles.map((role) => {
                  const Icon = role.icon;
                  const isSelected = selectedRole === role.key;
                  return (
                    <motion.button
                      key={role.key}
                      type="button"
                      onClick={() => setSelectedRole(role.key)}
                      whileTap={{ scale: 0.97 }}
                      className={`relative flex flex-col items-center gap-2 p-5 rounded-2xl border-2 text-center transition-all duration-300 ${
                        isSelected
                          ? "border-enat-green bg-enat-green/5 shadow-md shadow-enat-green/10"
                          : "border-gray-200 bg-gray-50/50 hover:border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-enat-green flex items-center justify-center"
                        >
                          <svg
                            className="w-3 h-3 text-white"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </motion.div>
                      )}
                      <div
                        className={`w-11 h-11 rounded-xl flex items-center justify-center transition-colors duration-300 ${
                          isSelected
                            ? "bg-enat-green text-white"
                            : "bg-gray-200/70 text-enat-dark/40"
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <span
                        className={`text-sm font-bold transition-colors ${
                          isSelected
                            ? "text-enat-green"
                            : "text-enat-dark/70"
                        }`}
                      >
                        {role.label}
                      </span>
                      <span className="text-[11px] text-enat-dark/40 leading-tight">
                        {role.description}
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-enat-green to-enat-green-light text-white font-bold py-3.5 rounded-xl shadow-lg shadow-enat-green/20 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 text-sm mt-2"
            >
              {"T\u1ea1o t\u00e0i kho\u1ea3n"}
            </button>
          </form>

          {/* Login link */}
          <p className="text-center mt-8 text-sm text-enat-dark/50">
            {"\u0110\u00e3 c\u00f3 t\u00e0i kho\u1ea3n? "}
            <Link
              href="/login"
              className="text-enat-green font-semibold hover:text-enat-green-light transition-colors"
            >
              {"\u0110\u0103ng nh\u1eadp"}
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
