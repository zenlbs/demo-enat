"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  GraduationCap,
  Clock,
  Users,
  Play,
  Lock,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  BookOpen,
  Filter,
  Camera,
  Palette,
  BrainCircuit,
  Radio,
} from "lucide-react";
import { staggerContainer, staggerItem } from "@/lib/animations";

type Level = "Cơ bản" | "Nâng cao" | "Chuyên gia";
type PremiumStatus = "Miễn phí" | "Premium";

interface Course {
  id: number;
  title: string;
  description: string;
  duration: string;
  level: Level;
  status: PremiumStatus;
  participants: number;
  progress: number | null;
  image: string | null;
  instructor: string;
  category: string;
}

const levelColors: Record<Level, string> = {
  "Cơ bản": "bg-emerald-100 text-emerald-700",
  "Nâng cao": "bg-blue-100 text-blue-700",
  "Chuyên gia": "bg-purple-100 text-purple-700",
};

const categoryStyles: Record<string, { gradient: string; icon: React.ReactNode }> = {
  TikTok: {
    gradient: "from-gray-900 via-gray-800 to-black",
    icon: <svg viewBox="0 0 24 24" className="w-16 h-16 text-white/80" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.72a8.2 8.2 0 004.76 1.52V6.79a4.84 4.84 0 01-1-.1z"/></svg>,
  },
  Photography: {
    gradient: "from-amber-500 via-orange-500 to-red-500",
    icon: <Camera className="w-16 h-16 text-white/80" />,
  },
  Instagram: {
    gradient: "from-purple-600 via-pink-500 to-orange-400",
    icon: <svg viewBox="0 0 24 24" className="w-16 h-16 text-white/80" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>,
  },
  Branding: {
    gradient: "from-enat-green-dark via-enat-green to-emerald-500",
    icon: <Palette className="w-16 h-16 text-white/80" />,
  },
  "AI Tools": {
    gradient: "from-indigo-600 via-violet-600 to-purple-700",
    icon: <BrainCircuit className="w-16 h-16 text-white/80" />,
  },
  Livestream: {
    gradient: "from-red-600 via-red-500 to-rose-500",
    icon: <Radio className="w-16 h-16 text-white/80" />,
  },
};

const courses: Course[] = [
  {
    id: 1,
    title: "Cách tạo nội dung viral trên TikTok",
    description:
      "Học cách xây dựng kịch bản, quay dựng và tối ưu video TikTok để đạt hàng triệu lượt xem.",
    duration: "45 phút",
    level: "Cơ bản",
    status: "Miễn phí",
    participants: 3420,
    progress: 65,
    image:
      null,
    instructor: "Minh Tú",
    category: "TikTok",
  },
  {
    id: 2,
    title: "Workshop: Chụp ảnh sản phẩm chuyên nghiệp",
    description:
      "Kỹ thuật ánh sáng, bố cục và chỉnh sửa ảnh sản phẩm làm đẹp ngay trên điện thoại.",
    duration: "2 giờ",
    level: "Nâng cao",
    status: "Premium",
    participants: 1856,
    progress: 30,
    image:
      null,
    instructor: "Lan Phương",
    category: "Photography",
  },
  {
    id: 3,
    title: "Bí quyết tăng tương tác trên Instagram",
    description:
      "Chiến lược nội dung, hashtag và thời điểm đăng bài để tối đa hóa engagement.",
    duration: "1 giờ 30 phút",
    level: "Cơ bản",
    status: "Miễn phí",
    participants: 2741,
    progress: null,
    image:
      null,
    instructor: "Hải Yến",
    category: "Instagram",
  },
  {
    id: 4,
    title: "Xây dựng thương hiệu cá nhân",
    description:
      "Định vị bản thân, xây dựng câu chuyện thương hiệu và chiến lược phát triển lâu dài.",
    duration: "3 giờ",
    level: "Chuyên gia",
    status: "Premium",
    participants: 987,
    progress: null,
    image:
      null,
    instructor: "Quốc Anh",
    category: "Branding",
  },
  {
    id: 5,
    title: "AI Tools cho Content Creator",
    description:
      "Ứng dụng các công cụ AI để tạo nội dung nhanh hơn, sáng tạo hơn và hiệu quả hơn.",
    duration: "1 giờ",
    level: "Nâng cao",
    status: "Miễn phí",
    participants: 4200,
    progress: 10,
    image:
      null,
    instructor: "Bảo Châu",
    category: "AI Tools",
  },
  {
    id: 6,
    title: "Livestream bán hàng đỉnh cao",
    description:
      "Kỹ năng dẫn chương trình, xử lý tình huống và chốt đơn hiệu quả khi livestream.",
    duration: "2 giờ 30 phút",
    level: "Chuyên gia",
    status: "Premium",
    participants: 1234,
    progress: null,
    image:
      null,
    instructor: "Ngọc Trinh",
    category: "Livestream",
  },
];

function CourseCard({ course, index }: { course: Course; index: number }) {
  const isPremium = course.status === "Premium";
  const hasProgress = course.progress !== null;

  return (
    <motion.div
      variants={staggerItem}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl hover:border-enat-green/20 transition-all duration-300"
    >
      {/* Cover */}
      <div className="relative h-44 overflow-hidden">
        <div className={`w-full h-full bg-gradient-to-br ${categoryStyles[course.category]?.gradient || "from-gray-600 to-gray-800"} flex items-center justify-center group-hover:scale-105 transition-transform duration-500`}>
          {categoryStyles[course.category]?.icon}
        </div>
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

        {/* Top badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <span
            className={`px-2.5 py-1 rounded-lg text-xs font-bold ${levelColors[course.level]}`}
          >
            {course.level}
          </span>
          <span
            className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1 ${
              isPremium
                ? "bg-enat-gold text-enat-green-dark"
                : "bg-white/90 text-enat-green"
            }`}
          >
            {isPremium ? (
              <>
                <Sparkles className="w-3 h-3" />
                Premium
              </>
            ) : (
              <>
                <CheckCircle2 className="w-3 h-3" />
                Miễn phí
              </>
            )}
          </span>
        </div>

        {/* Play button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <motion.div
            initial={{ scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            className="w-14 h-14 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-xl"
          >
            {isPremium ? (
              <Lock className="w-6 h-6 text-enat-gold" />
            ) : (
              <Play className="w-6 h-6 text-enat-green fill-enat-green ml-1" />
            )}
          </motion.div>
        </div>

        {/* Category tag bottom */}
        <div className="absolute bottom-3 left-3">
          <span className="px-2.5 py-0.5 bg-black/40 backdrop-blur-sm text-white/90 text-[10px] font-medium rounded-full">
            {course.category}
          </span>
        </div>
      </div>

      {/* Card body */}
      <div className="p-5">
        <h3 className="text-sm font-bold text-enat-dark mb-2 line-clamp-2 group-hover:text-enat-green transition-colors">
          {course.title}
        </h3>
        <p className="text-xs text-enat-dark/50 mb-4 line-clamp-2 leading-relaxed">
          {course.description}
        </p>

        {/* Meta row */}
        <div className="flex items-center gap-4 text-xs text-enat-dark/40 mb-4">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {course.duration}
          </span>
          <span className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5" />
            {course.participants.toLocaleString("vi-VN")}
          </span>
          <span className="flex items-center gap-1">
            <BookOpen className="w-3.5 h-3.5" />
            {course.instructor}
          </span>
        </div>

        {/* Progress bar (if in progress) */}
        {hasProgress && (
          <div className="mb-4">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-enat-dark/50">Tiến độ học</span>
              <span className="font-semibold text-enat-green">
                {course.progress}%
              </span>
            </div>
            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${course.progress}%` }}
                transition={{ duration: 1, delay: 0.2 + index * 0.1, ease: "easeOut" }}
                className="h-full rounded-full bg-gradient-to-r from-enat-green to-emerald-400"
              />
            </div>
          </div>
        )}

        {/* CTA button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
            isPremium
              ? "bg-enat-gold/10 text-enat-gold border border-enat-gold/30 hover:bg-enat-gold/20"
              : hasProgress
              ? "bg-enat-green text-white shadow-md shadow-enat-green/20 hover:shadow-lg"
              : "bg-enat-green/10 text-enat-green border border-enat-green/20 hover:bg-enat-green/20"
          }`}
        >
          {isPremium ? (
            <>
              <Lock className="w-4 h-4" />
              Mở khoá Premium
            </>
          ) : hasProgress ? (
            <>
              <Play className="w-4 h-4 fill-white" />
              Tiếp tục học
            </>
          ) : (
            <>
              <Play className="w-4 h-4" />
              Bắt đầu học
            </>
          )}
          <ChevronRight className="w-4 h-4 ml-auto" />
        </motion.button>
      </div>
    </motion.div>
  );
}

const filterOptions = ["Tất cả", "Miễn phí", "Premium", "Đang học"];

export default function TrainingPage() {
  const [activeFilter, setActiveFilter] = useState("Tất cả");

  const filtered = courses.filter((c) => {
    if (activeFilter === "Tất cả") return true;
    if (activeFilter === "Miễn phí") return c.status === "Miễn phí";
    if (activeFilter === "Premium") return c.status === "Premium";
    if (activeFilter === "Đang học") return c.progress !== null;
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50/30 p-6 md:p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-enat-green to-emerald-500 flex items-center justify-center shadow-lg shadow-enat-green/30">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-enat-dark">
            Chương Trình Đào Tạo
          </h1>
        </div>
        <p className="text-enat-dark/50 text-sm ml-[52px]">
          Nâng cao kỹ năng sáng tạo nội dung cùng đội ngũ chuyên gia ENAT
        </p>
      </motion.div>

      {/* Stats banner */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="relative mb-8 overflow-hidden rounded-2xl bg-gradient-to-r from-enat-green to-emerald-600 p-6"
      >
        <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/4" />
        <div className="relative z-10 flex flex-wrap items-center gap-8">
          <div>
            <p className="text-white/60 text-xs mb-0.5">Khoá học</p>
            <p className="text-white font-black text-2xl">24+</p>
          </div>
          <div className="w-px h-10 bg-white/20" />
          <div>
            <p className="text-white/60 text-xs mb-0.5">Học viên</p>
            <p className="text-white font-black text-2xl">12.500+</p>
          </div>
          <div className="w-px h-10 bg-white/20" />
          <div>
            <p className="text-white/60 text-xs mb-0.5">Giảng viên</p>
            <p className="text-white font-black text-2xl">8</p>
          </div>
          <div className="w-px h-10 bg-white/20" />
          <div>
            <p className="text-white/60 text-xs mb-0.5">Chứng chỉ</p>
            <p className="text-white font-black text-2xl">ENAT Certified</p>
          </div>
        </div>
      </motion.div>

      {/* Filter tabs */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="flex items-center gap-2 mb-6 flex-wrap"
      >
        <Filter className="w-4 h-4 text-enat-dark/30 mr-1" />
        {filterOptions.map((opt) => (
          <button
            key={opt}
            onClick={() => setActiveFilter(opt)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeFilter === opt
                ? "bg-enat-green text-white shadow-md shadow-enat-green/20"
                : "bg-white text-enat-dark/60 border border-gray-200 hover:border-enat-green/30 hover:text-enat-green"
            }`}
          >
            {opt}
            {opt === "Đang học" && (
              <span className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full bg-white/20 text-[10px]">
                {courses.filter((c) => c.progress !== null).length}
              </span>
            )}
          </button>
        ))}
      </motion.div>

      {/* Courses grid */}
      <motion.div
        key={activeFilter}
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filtered.map((course, i) => (
          <CourseCard key={course.id} course={course} index={i} />
        ))}
      </motion.div>

      {filtered.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16"
        >
          <GraduationCap className="w-12 h-12 text-enat-dark/20 mx-auto mb-3" />
          <p className="text-enat-dark/40 text-sm">Không có khoá học nào phù hợp.</p>
        </motion.div>
      )}
    </div>
  );
}
