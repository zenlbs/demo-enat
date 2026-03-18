"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Sparkles,
  Trophy,
  Wand2,
  ArrowRight,
  Users,
  Eye,
  Megaphone,
  ChevronRight,
  Clock,
  Flame,
} from "lucide-react";
import { challenges } from "@/data/mock";
import { staggerContainer, staggerItem } from "@/lib/animations";

function useCountUp(target: number, duration = 2000) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const start = performance.now();

          const tick = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) {
              requestAnimationFrame(tick);
            } else {
              setCount(target);
            }
          };

          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return { count, ref };
}

const stats = [
  { label: "Creators", value: 10000, icon: Users, suffix: "+" },
  { label: "Lượt xem", value: 50000000, icon: Eye, suffix: "+" },
  { label: "Chiến dịch", value: 500, icon: Megaphone, suffix: "+" },
];

function formatNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(0)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0).replace(/\.0$/, "")}K`;
  return n.toLocaleString("vi-VN");
}

const howItWorks = [
  {
    icon: Flame,
    title: "Tham gia Thử thách",
    description:
      "Chọn chiến dịch phù hợp với phong cách của bạn. Mỗi thử thách đi kèm brief sáng tạo, giải thưởng hấp dẫn và hướng dẫn chi tiết.",
    gradient: "from-enat-green to-enat-green-light",
  },
  {
    icon: Wand2,
    title: "Tạo Nội dung AI",
    description:
      "Sử dụng công cụ AI để tạo video, hình ảnh và caption chuyên nghiệp chỉ trong vài phút — không cần kỹ năng thiết kế.",
    gradient: "from-enat-gold to-yellow-400",
  },
  {
    icon: Trophy,
    title: "Nhận Thưởng",
    description:
      "Nội dung xuất sắc sẽ được thưởng tiền mặt, hoa hồng liên kết và cơ hội hợp tác lâu dài cùng ENAT.",
    gradient: "from-enat-red to-orange-400",
  },
];

const featuredChallenges = challenges.slice(0, 3);

function StatCard({
  stat,
  index,
}: {
  stat: (typeof stats)[0];
  index: number;
}) {
  const { count, ref } = useCountUp(stat.value);
  const Icon = stat.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.8 + index * 0.15 }}
      className="flex flex-col items-center gap-2"
    >
      <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm mb-1">
        <Icon className="w-6 h-6 text-enat-yellow" />
      </div>
      <span className="text-3xl md:text-4xl font-bold text-white tracking-tight">
        {formatNumber(count)}
        <span className="text-enat-gold">{stat.suffix}</span>
      </span>
      <span className="text-sm text-white/70 font-medium">{stat.label}</span>
    </motion.div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* ─── HERO SECTION ─── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-enat-green-dark via-enat-green to-enat-green-light min-h-[90vh] flex items-center">
        {/* Organic blob shapes */}
        <div className="blob absolute -top-32 -left-32 w-[500px] h-[500px] bg-enat-green-light/20 blur-3xl" />
        <div className="blob absolute top-1/2 -right-48 w-[600px] h-[600px] bg-enat-gold/10 blur-3xl" />
        <div className="blob absolute bottom-0 left-1/3 w-[400px] h-[400px] bg-enat-yellow/10 blur-3xl" />

        {/* Subtle grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text content */}
            <div className="flex flex-col gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 w-fit"
              >
                <Sparkles className="w-4 h-4 text-enat-gold" />
                <span className="text-sm font-medium text-white/90">
                  ENAT AI Content Factory
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.15] tracking-tight"
              >
                Ai Cũng Có Thể{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-enat-yellow via-enat-gold to-enat-yellow gradient-animate">
                  Tạo Nội Dung Đẹp
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-lg md:text-xl text-white/80 leading-relaxed max-w-xl"
              >
                Nền tảng sáng tạo nội dung bằng AI dành cho cộng đồng ENAT.
                Tham gia thử thách, tạo content viral và nhận thưởng xứng đáng.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.55 }}
                className="flex flex-wrap items-center gap-4"
              >
                <Link
                  href="/challenges"
                  className="pulse-glow inline-flex items-center gap-2 bg-gradient-to-r from-enat-gold to-yellow-400 text-enat-green-dark font-bold px-8 py-4 rounded-2xl text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
                >
                  Khám phá ngay
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/ai-studio"
                  className="inline-flex items-center gap-2 border-2 border-white/30 text-white font-semibold px-8 py-4 rounded-2xl text-lg hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
                >
                  <Wand2 className="w-5 h-5" />
                  AI Studio
                </Link>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="grid grid-cols-3 gap-6 mt-4 pt-8 border-t border-white/10"
              >
                {stats.map((stat, i) => (
                  <StatCard key={stat.label} stat={stat} index={i} />
                ))}
              </motion.div>
            </div>

            {/* Right: Floating product visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="hidden lg:flex items-center justify-center relative"
            >
              {/* Glow ring behind product */}
              <div className="absolute w-80 h-80 rounded-full bg-gradient-to-tr from-enat-gold/30 to-enat-yellow/20 blur-2xl" />
              <div className="animate-float relative z-10">
                <div className="w-72 h-72 rounded-3xl bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-md border border-white/20 shadow-2xl flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="w-24 h-24 mx-auto rounded-2xl bg-gradient-to-br from-enat-gold to-enat-yellow flex items-center justify-center shadow-lg">
                      <span className="text-3xl font-black text-enat-green-dark">
                        E
                      </span>
                    </div>
                    <div>
                      <p className="text-white font-bold text-xl">ENAT 400</p>
                      <p className="text-white/60 text-sm">Vitamin E Thiên Nhiên</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating accent cards */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                className="absolute -right-4 top-8 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl px-4 py-3 shadow-xl"
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-green-400/20 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-green-300" />
                  </div>
                  <div>
                    <p className="text-white text-xs font-semibold">AI Ready</p>
                    <p className="text-white/50 text-[10px]">Tạo content tự động</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1.1 }}
                className="absolute -left-4 bottom-16 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl px-4 py-3 shadow-xl"
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-yellow-400/20 flex items-center justify-center">
                    <Trophy className="w-4 h-4 text-yellow-300" />
                  </div>
                  <div>
                    <p className="text-white text-xs font-semibold">50M VNĐ+</p>
                    <p className="text-white/50 text-[10px]">Tổng giải thưởng</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full"
          >
            <path
              d="M0 40C360 80 720 0 1080 40C1260 60 1380 70 1440 60V100H0V40Z"
              fill="#FFF9D6"
            />
          </svg>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-sm font-bold text-enat-green uppercase tracking-widest mb-3">
            Cách hoạt động
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-enat-dark">
            Ba bước đơn giản để{" "}
            <span className="text-enat-green">kiếm thưởng</span>
          </h2>
          <p className="mt-4 text-lg text-enat-dark/60 max-w-2xl mx-auto">
            Không cần kinh nghiệm sáng tạo nội dung. AI sẽ hỗ trợ bạn từ ý
            tưởng đến sản phẩm hoàn chỉnh.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8"
        >
          {howItWorks.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                variants={staggerItem}
                className="group relative bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-500 border border-enat-green/5 hover:border-enat-green/15"
              >
                {/* Step number */}
                <span className="absolute top-6 right-6 text-7xl font-black text-enat-green/5 select-none group-hover:text-enat-green/10 transition-colors">
                  {i + 1}
                </span>

                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-xl font-bold text-enat-dark mb-3">
                  {step.title}
                </h3>
                <p className="text-enat-dark/60 leading-relaxed">
                  {step.description}
                </p>

                {/* Connector line for desktop */}
                {i < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 border-t-2 border-dashed border-enat-green/20" />
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* ─── FEATURED CHALLENGES ─── */}
      <section className="py-24 px-6 md:px-12 bg-gradient-to-b from-enat-yellow-light/50 to-transparent">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-end justify-between mb-12"
          >
            <div>
              <span className="inline-block text-sm font-bold text-enat-green uppercase tracking-widest mb-3">
                Thử thách nổi bật
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-enat-dark">
                Tham gia & nhận{" "}
                <span className="text-enat-green">giải thưởng lớn</span>
              </h2>
            </div>
            <Link
              href="/challenges"
              className="hidden md:inline-flex items-center gap-1.5 text-enat-green font-semibold hover:gap-3 transition-all duration-300"
            >
              Xem tất cả
              <ChevronRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {featuredChallenges.map((challenge) => (
              <motion.div key={challenge.id} variants={staggerItem}>
                <Link
                  href={`/challenges/${challenge.id}`}
                  className="group block bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-enat-green/5"
                >
                  {/* Cover image */}
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={challenge.coverImage}
                      alt={challenge.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                    {/* Status badge */}
                    <div className="absolute top-4 left-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm ${
                          challenge.status === "active"
                            ? "bg-green-500/90 text-white"
                            : challenge.status === "upcoming"
                              ? "bg-enat-gold/90 text-enat-dark"
                              : "bg-gray-500/80 text-white"
                        }`}
                      >
                        {challenge.status === "active" && (
                          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                        )}
                        {challenge.status === "active"
                          ? "Đang diễn ra"
                          : challenge.status === "upcoming"
                            ? "Sắp mở"
                            : "Đã kết thúc"}
                      </span>
                    </div>

                    {/* Prize badge */}
                    <div className="absolute bottom-4 right-4">
                      <span className="inline-flex items-center gap-1 bg-enat-gold/90 backdrop-blur-sm text-enat-dark px-3 py-1.5 rounded-xl text-sm font-bold shadow-lg">
                        <Trophy className="w-3.5 h-3.5" />
                        {challenge.prize}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-enat-dark mb-2 group-hover:text-enat-green transition-colors">
                      {challenge.title}
                    </h3>
                    <p className="text-sm text-enat-dark/60 leading-relaxed line-clamp-2 mb-4">
                      {challenge.description}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center justify-between text-xs text-enat-dark/50">
                      <div className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5" />
                        <span>
                          {challenge.participants.toLocaleString("vi-VN")}/
                          {challenge.maxParticipants.toLocaleString("vi-VN")}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        <span>
                          {new Date(challenge.deadline).toLocaleDateString(
                            "vi-VN",
                            { day: "2-digit", month: "2-digit" }
                          )}
                        </span>
                      </div>
                    </div>

                    {/* Progress bar */}
                    <div className="mt-4 h-1.5 rounded-full bg-enat-green/10 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-enat-green to-enat-green-light transition-all duration-700"
                        style={{
                          width: `${Math.min(
                            (challenge.participants / challenge.maxParticipants) *
                              100,
                            100
                          )}%`,
                        }}
                      />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* Mobile "View all" link */}
          <div className="mt-8 text-center md:hidden">
            <Link
              href="/challenges"
              className="inline-flex items-center gap-1.5 text-enat-green font-semibold"
            >
              Xem tất cả thử thách
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── BOTTOM CTA ─── */}
      <section className="py-24 px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="max-w-4xl mx-auto relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-enat-green-dark via-enat-green to-enat-green-light p-12 md:p-16 text-center"
        >
          {/* Decorative blobs */}
          <div className="blob absolute -top-20 -right-20 w-64 h-64 bg-enat-gold/15 blur-2xl" />
          <div className="blob absolute -bottom-20 -left-20 w-64 h-64 bg-enat-yellow/10 blur-2xl" />

          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center"
            >
              <Sparkles className="w-8 h-8 text-enat-gold" />
            </motion.div>

            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Bắt đầu hành trình sáng tạo
            </h2>
            <p className="text-lg text-white/70 max-w-xl mx-auto mb-8">
              Hàng nghìn creator đã kiếm được thu nhập từ ENAT Content Factory.
              Đến lượt bạn tạo nên điều khác biệt.
            </p>

            <Link
              href="/challenges"
              className="pulse-glow inline-flex items-center gap-3 bg-gradient-to-r from-enat-gold to-yellow-400 text-enat-green-dark font-bold px-10 py-4 rounded-2xl text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
            >
              Khám phá thử thách
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
