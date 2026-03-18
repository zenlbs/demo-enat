"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  Check,
  Sparkles,
  Hash,
  ShieldCheck,
  Send,
  ArrowRight,
  Image as ImageIcon,
  Wand2,
  PartyPopper,
  ChevronRight,
  Play,
  Clock,
  ExternalLink,
  Zap,
  Brain,
  Clapperboard,
  Share2,
  FileText,
  X,
} from "lucide-react";

const sampleImages = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=400&h=500&fit=crop",
    label: "Skincare Routine",
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&h=500&fit=crop",
    label: "Beauty Product",
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=500&fit=crop",
    label: "Natural Beauty",
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1612817288484-6f916006741a?w=400&h=500&fit=crop",
    label: "Vitamin E",
  },
];

const hashtags = [
  "#ENAT400",
  "#VitaminE",
  "#Skincare",
  "#LanDaKhoeDep",
  "#LamDepTuNhien",
  "#BeautyTips",
  "#ENATChallenge",
  "#GiamGocTuDo",
];

const captionText =
  "Bí quyết làn da khỏe đẹp tự nhiên cùng ENAT 400 Vitamin E ✨ Mỗi ngày một viên, làn da rạng rỡ từ bên trong! #ENAT400 #LanDaKhoeDep";

const pipelineNodes = [
  { label: "Nội dung gốc", icon: FileText },
  { label: "Brand DNA", icon: ShieldCheck },
  { label: "Claude AI", icon: Brain },
  { label: "Creatomate", icon: Clapperboard },
  { label: "Phân phối", icon: Share2 },
];

type Platform = "facebook" | "instagram" | "tiktok";

const platformConfig: Record<
  Platform,
  { label: string; color: string; textColor: string; aspect: string }
> = {
  facebook: {
    label: "Facebook",
    color: "bg-[#1877F2]",
    textColor: "text-white",
    aspect: "1:1",
  },
  instagram: {
    label: "Instagram",
    color: "bg-gradient-to-br from-[#F58529] via-[#DD2A7B] to-[#8134AF]",
    textColor: "text-white",
    aspect: "4:5",
  },
  tiktok: {
    label: "TikTok",
    color: "bg-black",
    textColor: "text-white",
    aspect: "9:16",
  },
};

// Confetti particle component
function ConfettiParticle({ delay, x }: { delay: number; x: number }) {
  const colors = [
    "bg-enat-gold",
    "bg-enat-green",
    "bg-enat-red",
    "bg-enat-pink",
    "bg-enat-blue",
    "bg-yellow-400",
    "bg-green-400",
  ];
  const color = colors[Math.floor(Math.random() * colors.length)];
  const size = Math.random() * 8 + 4;
  const rotation = Math.random() * 360;

  return (
    <motion.div
      className={`absolute ${color} rounded-sm`}
      style={{
        width: size,
        height: size,
        left: `${x}%`,
        top: -10,
        rotate: rotation,
      }}
      initial={{ y: -20, opacity: 1, scale: 0 }}
      animate={{
        y: [0, 300 + Math.random() * 200],
        x: [0, (Math.random() - 0.5) * 200],
        opacity: [1, 1, 0],
        scale: [0, 1, 0.5],
        rotate: [rotation, rotation + Math.random() * 720],
      }}
      transition={{
        duration: 2 + Math.random() * 1.5,
        delay: delay,
        ease: "easeOut",
      }}
    />
  );
}

// Brand compliance circular progress
function BrandScoreRing({ score }: { score: number }) {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="relative w-28 h-28 mx-auto">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth="6"
        />
        <motion.circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="#1A7340"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          className="text-2xl font-bold text-enat-green"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.4 }}
        >
          {score}%
        </motion.span>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
        >
          <Check size={14} className="text-enat-green" />
        </motion.div>
      </div>
    </div>
  );
}

export default function CreatorHubPage() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedImage, setSelectedImage] = useState<
    (typeof sampleImages)[0] | null
  >(null);
  const [platform, setPlatform] = useState<Platform>("instagram");
  const [captionVisible, setCaptionVisible] = useState(false);
  const [typedCaption, setTypedCaption] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hashtagsVisible, setHashtagsVisible] = useState(false);
  const [postedPlatform, setPostedPlatform] = useState<Platform | null>(null);
  const [activePipelineNode, setActivePipelineNode] = useState(0);

  // Cycle through pipeline nodes
  useEffect(() => {
    const interval = setInterval(() => {
      setActivePipelineNode((prev) => (prev + 1) % pipelineNodes.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Typing animation for caption
  const startTyping = useCallback(() => {
    setCaptionVisible(true);
    setIsTyping(true);
    setTypedCaption("");
    let i = 0;
    const interval = setInterval(() => {
      if (i < captionText.length) {
        setTypedCaption(captionText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
        setIsTyping(false);
        setHashtagsVisible(true);
      }
    }, 30);
    return () => clearInterval(interval);
  }, []);

  const handleSelectImage = (img: (typeof sampleImages)[0]) => {
    setSelectedImage(img);
    setStep(2);
    setCaptionVisible(false);
    setTypedCaption("");
    setHashtagsVisible(false);
  };

  const handlePost = (p: Platform) => {
    setPostedPlatform(p);
    setStep(3);
  };

  const handleReset = () => {
    setStep(1);
    setSelectedImage(null);
    setCaptionVisible(false);
    setTypedCaption("");
    setIsTyping(false);
    setHashtagsVisible(false);
    setPostedPlatform(null);
  };

  const steps = [
    { num: 1, label: "Tải lên" },
    { num: 2, label: "Chỉnh sửa AI" },
    { num: 3, label: "Đăng bài" },
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-64px)]">
      {/* Main content area */}
      <div className="flex flex-1 min-h-0">
        {/* Left Panel - 55% */}
        <div className="w-[55%] flex flex-col p-6 bg-gradient-to-br from-enat-yellow-light/50 to-white">
          {/* Step Indicator */}
          <div className="flex items-center justify-center gap-2 mb-6">
            {steps.map((s, i) => (
              <div key={s.num} className="flex items-center gap-2">
                <motion.div
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    step === s.num
                      ? "bg-enat-green text-white shadow-lg shadow-enat-green/30"
                      : step > s.num
                        ? "bg-enat-green/20 text-enat-green"
                        : "bg-gray-100 text-gray-400"
                  }`}
                  animate={step === s.num ? { scale: [1, 1.05, 1] } : {}}
                  transition={{ duration: 0.4 }}
                >
                  {step > s.num ? (
                    <Check size={14} />
                  ) : (
                    <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs">
                      {s.num}
                    </span>
                  )}
                  {s.label}
                </motion.div>
                {i < steps.length - 1 && (
                  <ArrowRight
                    size={16}
                    className={
                      step > s.num ? "text-enat-green" : "text-gray-300"
                    }
                  />
                )}
              </div>
            ))}
          </div>

          {/* Step Content */}
          <div className="flex-1 flex items-center justify-center">
            <AnimatePresence mode="wait">
              {/* Step 1: Upload Zone */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="w-full max-w-lg"
                >
                  {/* Drop zone */}
                  <motion.div
                    className="border-2 border-dashed border-enat-green/40 rounded-2xl p-12 text-center cursor-pointer hover:border-enat-green hover:bg-enat-green/5 transition-all duration-300 group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <motion.div
                      animate={{
                        y: [0, -8, 0],
                        opacity: [0.6, 1, 0.6],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="flex justify-center mb-4"
                    >
                      <div className="w-16 h-16 rounded-2xl bg-enat-green/10 flex items-center justify-center group-hover:bg-enat-green/20 transition-colors">
                        <Upload
                          size={28}
                          className="text-enat-green"
                        />
                      </div>
                    </motion.div>
                    <p className="text-lg font-semibold text-enat-dark mb-1">
                      Kéo thả hình ảnh/video hoặc click để chọn
                    </p>
                    <p className="text-sm text-gray-400">
                      JPG, PNG, MP4 — tối đa 50MB
                    </p>
                  </motion.div>

                  {/* Sample images */}
                  <div className="mt-6">
                    <p className="text-sm text-gray-500 mb-3 text-center">
                      Hoặc chọn mẫu có sẵn
                    </p>
                    <div className="grid grid-cols-4 gap-3">
                      {sampleImages.map((img, i) => (
                        <motion.div
                          key={img.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 * i, duration: 0.4 }}
                          className="relative group cursor-pointer rounded-xl overflow-hidden aspect-[4/5] shadow-md hover:shadow-xl transition-shadow"
                          onClick={() => handleSelectImage(img)}
                          whileHover={{ y: -4 }}
                        >
                          <img
                            src={img.url}
                            alt={img.label}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                          <div className="absolute bottom-0 left-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <p className="text-white text-xs font-medium truncate">
                              {img.label}
                            </p>
                          </div>
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center">
                              <Play
                                size={16}
                                className="text-enat-green ml-0.5"
                              />
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Device Preview */}
              {step === 2 && selectedImage && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col items-center"
                >
                  {/* Phone frame */}
                  <div className="relative">
                    <div className="w-[280px] h-[560px] bg-black rounded-[40px] p-3 shadow-2xl shadow-black/30 relative">
                      {/* Notch */}
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[28px] bg-black rounded-b-2xl z-10" />
                      {/* Screen */}
                      <div className="w-full h-full rounded-[28px] overflow-hidden bg-gray-900 relative">
                        <img
                          src={selectedImage.url}
                          alt={selectedImage.label}
                          className="w-full h-full object-cover"
                        />
                        {/* Platform overlay */}
                        <div className="absolute top-8 left-3 right-3 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-full bg-enat-gold flex items-center justify-center text-xs font-bold text-enat-green">
                              E
                            </div>
                            <span className="text-white text-xs font-semibold drop-shadow-lg">
                              enat_official
                            </span>
                          </div>
                          <div className="text-white/80 text-xs drop-shadow-lg">
                            {platformConfig[platform].aspect}
                          </div>
                        </div>
                        {/* Bottom caption overlay */}
                        {typedCaption && (
                          <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                            <p className="text-white text-[10px] leading-relaxed line-clamp-3">
                              {typedCaption.slice(0, 60)}...
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Platform toggle */}
                  <div className="flex gap-2 mt-5 bg-white rounded-xl p-1.5 shadow-md">
                    {(
                      Object.entries(platformConfig) as [
                        Platform,
                        (typeof platformConfig)[Platform],
                      ][]
                    ).map(([key, cfg]) => (
                      <button
                        key={key}
                        onClick={() => setPlatform(key)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                          platform === key
                            ? `${cfg.color} ${cfg.textColor} shadow-md`
                            : "text-gray-500 hover:bg-gray-100"
                        }`}
                      >
                        {cfg.label}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Step 3: Success */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5, type: "spring" }}
                  className="text-center relative"
                >
                  {/* Confetti */}
                  <div className="absolute inset-0 overflow-hidden pointer-events-none -top-20 -left-40 -right-40">
                    {Array.from({ length: 40 }).map((_, i) => (
                      <ConfettiParticle
                        key={i}
                        delay={Math.random() * 0.8}
                        x={Math.random() * 100}
                      />
                    ))}
                  </div>

                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      delay: 0.2,
                    }}
                    className="w-24 h-24 rounded-full bg-enat-green mx-auto mb-6 flex items-center justify-center shadow-xl shadow-enat-green/40"
                  >
                    <Check size={48} className="text-white" strokeWidth={3} />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <PartyPopper
                        size={24}
                        className="text-enat-gold"
                      />
                      <h2 className="text-2xl font-bold text-enat-dark">
                        Đã đăng bài thành công!
                      </h2>
                      <PartyPopper
                        size={24}
                        className="text-enat-gold"
                      />
                    </div>
                    <p className="text-gray-500 mt-2">
                      Bài viết đã được đăng lên{" "}
                      {postedPlatform &&
                        platformConfig[postedPlatform].label}
                    </p>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right Panel - 45% */}
        <div className="w-[45%] bg-white/70 backdrop-blur-xl border-l border-white/40 flex flex-col p-6 overflow-y-auto">
          <AnimatePresence mode="wait">
            {/* Step 1 - Intro */}
            {step === 1 && (
              <motion.div
                key="right-step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col gap-5 flex-1 justify-center"
              >
                <div className="text-center mb-4">
                  <motion.div
                    className="w-16 h-16 rounded-2xl bg-gradient-to-br from-enat-green to-enat-green-light mx-auto mb-4 flex items-center justify-center shadow-lg shadow-enat-green/30"
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <Wand2 size={28} className="text-white" />
                  </motion.div>
                  <h2 className="text-xl font-bold text-enat-dark mb-2">
                    AI Content Studio
                  </h2>
                  <p className="text-sm text-gray-500">
                    Tạo nội dung chuyên nghiệp với sức mạnh AI
                  </p>
                </div>

                {[
                  {
                    icon: Sparkles,
                    title: "Tạo Caption thông minh",
                    desc: "AI viết caption phù hợp với thương hiệu ENAT",
                  },
                  {
                    icon: Hash,
                    title: "Gợi ý Hashtag tối ưu",
                    desc: "Hashtag trending và phù hợp nhất cho bài đăng",
                  },
                  {
                    icon: ShieldCheck,
                    title: "Kiểm tra Brand Safety",
                    desc: "Đảm bảo nội dung tuân thủ brand guideline",
                  },
                ].map((feature, i) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    className="flex gap-4 p-4 rounded-xl bg-white/80 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="w-10 h-10 rounded-xl bg-enat-green/10 flex items-center justify-center shrink-0">
                      <feature.icon
                        size={20}
                        className="text-enat-green"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-enat-dark text-sm">
                        {feature.title}
                      </h3>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {feature.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="mt-2 text-center"
                >
                  <p className="text-xs text-gray-400">
                    Chọn ảnh bên trái để bắt đầu
                  </p>
                </motion.div>
              </motion.div>
            )}

            {/* Step 2 - AI Tools */}
            {step === 2 && (
              <motion.div
                key="right-step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col gap-4 flex-1"
              >
                {/* Caption Generator Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="p-4 rounded-2xl bg-white border border-gray-100 shadow-sm"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                        <Sparkles size={16} className="text-white" />
                      </div>
                      <h3 className="font-semibold text-sm text-enat-dark">
                        Tạo Caption AI
                      </h3>
                    </div>
                    {!captionVisible && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={startTyping}
                        className="px-4 py-1.5 rounded-lg bg-enat-green text-white text-xs font-medium hover:bg-enat-green-light transition-colors flex items-center gap-1.5 shadow-md shadow-enat-green/20"
                      >
                        <Zap size={12} />
                        Tạo ngay
                      </motion.button>
                    )}
                  </div>

                  {captionVisible && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="bg-gray-50 rounded-xl p-3"
                    >
                      <p className="text-sm text-enat-dark leading-relaxed">
                        {typedCaption}
                        {isTyping && (
                          <span className="typing-cursor" />
                        )}
                      </p>
                    </motion.div>
                  )}
                </motion.div>

                {/* Hashtag Suggestions Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="p-4 rounded-2xl bg-white border border-gray-100 shadow-sm"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                      <Hash size={16} className="text-white" />
                    </div>
                    <h3 className="font-semibold text-sm text-enat-dark">
                      Gợi Ý Hashtag
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {hashtags.map((tag, i) => (
                      <motion.span
                        key={tag}
                        initial={
                          hashtagsVisible
                            ? { scale: 0, opacity: 0 }
                            : { scale: 1, opacity: 1 }
                        }
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{
                          delay: hashtagsVisible ? i * 0.08 : 0.3 + i * 0.05,
                          type: "spring",
                          stiffness: 300,
                          damping: 15,
                        }}
                        className="px-3 py-1.5 rounded-full bg-enat-green/10 text-enat-green text-xs font-medium cursor-pointer hover:bg-enat-green hover:text-white transition-colors duration-200"
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>

                {/* Brand Check Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="p-4 rounded-2xl bg-white border border-gray-100 shadow-sm"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-enat-green to-emerald-400 flex items-center justify-center">
                      <ShieldCheck size={16} className="text-white" />
                    </div>
                    <h3 className="font-semibold text-sm text-enat-dark">
                      Kiểm Tra Brand
                    </h3>
                  </div>
                  <BrandScoreRing score={92} />
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="text-center text-xs text-gray-500 mt-2"
                  >
                    Nội dung phù hợp với brand guideline
                  </motion.p>
                </motion.div>

                {/* Post Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="p-4 rounded-2xl bg-white border border-gray-100 shadow-sm mt-auto"
                >
                  <h3 className="font-semibold text-sm text-enat-dark mb-3 flex items-center gap-2">
                    <Send size={14} />
                    Đăng bài
                  </h3>
                  <div className="flex gap-2">
                    {/* Facebook */}
                    <motion.button
                      whileHover={{ scale: 1.03, y: -2 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handlePost("facebook")}
                      className="flex-1 py-2.5 rounded-xl bg-[#1877F2] text-white text-sm font-medium flex items-center justify-center gap-2 shadow-md shadow-[#1877F2]/30 hover:shadow-lg hover:shadow-[#1877F2]/40 transition-shadow"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                      Đăng
                    </motion.button>

                    {/* Instagram */}
                    <motion.button
                      whileHover={{ scale: 1.03, y: -2 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handlePost("instagram")}
                      className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white text-sm font-medium flex items-center justify-center gap-2 shadow-md shadow-pink-500/30 hover:shadow-lg hover:shadow-pink-500/40 transition-shadow"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                      </svg>
                      Đăng
                    </motion.button>

                    {/* TikTok */}
                    <motion.button
                      whileHover={{ scale: 1.03, y: -2 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handlePost("tiktok")}
                      className="flex-1 py-2.5 rounded-xl bg-black text-white text-sm font-medium flex items-center justify-center gap-2 shadow-md shadow-black/30 hover:shadow-lg hover:shadow-black/40 transition-shadow"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.48 6.3 6.3 0 001.83-4.48V8.74a8.26 8.26 0 004.75 1.5V6.79a4.84 4.84 0 01-1-.1z" />
                      </svg>
                      Đăng
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            )}

            {/* Step 3 - Summary */}
            {step === 3 && (
              <motion.div
                key="right-step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col gap-4 flex-1 justify-center"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="p-5 rounded-2xl bg-white border border-gray-100 shadow-sm"
                >
                  <h3 className="font-semibold text-enat-dark mb-4 flex items-center gap-2">
                    <FileText size={16} className="text-enat-green" />
                    Tóm tắt bài đăng
                  </h3>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Nền tảng</span>
                      <span className="font-medium text-enat-dark">
                        {postedPlatform &&
                          platformConfig[postedPlatform].label}
                      </span>
                    </div>
                    <div className="h-px bg-gray-100" />
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Thời gian</span>
                      <span className="font-medium text-enat-dark flex items-center gap-1">
                        <Clock size={12} />
                        {new Date().toLocaleString("vi-VN", {
                          hour: "2-digit",
                          minute: "2-digit",
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <div className="h-px bg-gray-100" />
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Brand Score</span>
                      <span className="font-medium text-enat-green flex items-center gap-1">
                        <Check size={12} />
                        92%
                      </span>
                    </div>
                    <div className="h-px bg-gray-100" />
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Trạng thái</span>
                      <span className="px-2 py-0.5 rounded-full bg-enat-green/10 text-enat-green text-xs font-medium">
                        Đã đăng
                      </span>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex gap-3"
                >
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleReset}
                    className="flex-1 py-3 rounded-xl bg-enat-green text-white font-medium text-sm flex items-center justify-center gap-2 shadow-md shadow-enat-green/20 hover:bg-enat-green-light transition-colors"
                  >
                    <ImageIcon size={16} />
                    Tạo bài mới
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="py-3 px-5 rounded-xl bg-white border border-gray-200 text-enat-dark font-medium text-sm flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
                  >
                    <ExternalLink size={16} />
                    Xem bài
                  </motion.button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom Bar - AI Pipeline */}
      <div className="h-[72px] border-t border-gray-200/60 bg-white/80 backdrop-blur-md flex items-center justify-center px-8">
        <div className="flex items-center gap-1">
          {pipelineNodes.map((node, i) => (
            <div key={node.label} className="flex items-center gap-1">
              <motion.div
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium transition-all duration-500 ${
                  activePipelineNode === i
                    ? "bg-enat-green text-white shadow-lg shadow-enat-green/30"
                    : "bg-gray-100 text-gray-500"
                }`}
                animate={
                  activePipelineNode === i
                    ? {
                        boxShadow: [
                          "0 0 0px rgba(26,115,64,0.3)",
                          "0 0 20px rgba(26,115,64,0.5)",
                          "0 0 0px rgba(26,115,64,0.3)",
                        ],
                      }
                    : {}
                }
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <node.icon size={14} />
                <span className="hidden lg:inline">{node.label}</span>
              </motion.div>

              {i < pipelineNodes.length - 1 && (
                <div className="flex items-center mx-1">
                  <div
                    className={`w-8 h-px border-t-2 border-dashed transition-colors duration-500 ${
                      activePipelineNode > i
                        ? "border-enat-green"
                        : "border-gray-300"
                    }`}
                    style={{
                      animation:
                        activePipelineNode === i
                          ? "shimmer 1.5s infinite"
                          : undefined,
                    }}
                  />
                  <ChevronRight
                    size={12}
                    className={`transition-colors duration-500 ${
                      activePipelineNode > i
                        ? "text-enat-green"
                        : "text-gray-300"
                    }`}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
