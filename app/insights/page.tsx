"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Clock,
  TrendingUp,
  Target,
  Zap,
  Send,
  Bot,
  User,
} from "lucide-react";
import { insightScores, aiInsights, aiChatHistory } from "@/data/mock";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations";

/* ─── Animated Gauge (SVG circle) ─── */
function ScoreGauge({
  score,
  size = 200,
  strokeWidth = 14,
}: {
  score: number;
  size?: number;
  strokeWidth?: number;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const [offset, setOffset] = useState(circumference);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOffset(circumference - (score / 100) * circumference);
    }, 300);
    return () => clearTimeout(timer);
  }, [score, circumference]);

  const getColor = (s: number) => {
    if (s >= 80) return { stroke: "#1A7340", glow: "rgba(26,115,64,0.3)" };
    if (s >= 60) return { stroke: "#F5C518", glow: "rgba(245,197,24,0.3)" };
    return { stroke: "#E84B2A", glow: "rgba(232,75,42,0.3)" };
  };

  const color = getColor(score);

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <defs>
          <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1A7340" />
            <stop offset="100%" stopColor="#2A9B58" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {/* Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#f0f0f0"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        {/* Progress */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="url(#gaugeGradient)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          filter="url(#glow)"
          style={{
            transition: "stroke-dashoffset 1.5s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        />
      </svg>
      {/* Center number */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-5xl font-bold text-enat-dark">{score}</span>
        <span className="text-sm text-zinc-400 mt-1">/ 100</span>
        <span className="text-xs font-semibold text-enat-green mt-2 bg-enat-green/10 px-3 py-0.5 rounded-full">
          Tốt
        </span>
      </div>
    </div>
  );
}

/* ─── Score Card with Progress Bar ─── */
function ScoreCard({
  label,
  score,
  delay,
}: {
  label: string;
  score: number;
  delay: number;
}) {
  const getBarColor = (s: number) => {
    if (s >= 80) return "from-enat-green to-enat-green-light";
    if (s >= 60) return "from-enat-gold to-amber-400";
    return "from-enat-red to-red-400";
  };

  const getTextColor = (s: number) => {
    if (s >= 80) return "text-enat-green";
    if (s >= 60) return "text-enat-gold";
    return "text-enat-red";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -2, scale: 1.02 }}
      className="bg-white rounded-2xl border border-zinc-100 shadow-sm p-5 hover:shadow-lg transition-shadow duration-300"
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-zinc-600">{label}</span>
        <span className={`text-2xl font-bold ${getTextColor(score)}`}>
          {score}
        </span>
      </div>
      <div className="h-2.5 bg-zinc-100 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 1.2, delay: delay + 0.3, ease: "easeOut" }}
          className={`h-full rounded-full bg-gradient-to-r ${getBarColor(score)}`}
        />
      </div>
    </motion.div>
  );
}

/* ─── Insight Icon Map ─── */
const insightIconMap: Record<string, React.ElementType> = {
  clock: Clock,
  trending: TrendingUp,
  target: Target,
  zap: Zap,
};

/* ─── Bold Text Renderer ─── */
function RichText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={i} className="font-semibold text-enat-dark">
              {part.slice(2, -2)}
            </strong>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

/* ─── Typing Animation ─── */
function TypingIndicator() {
  return (
    <div className="flex items-center gap-1.5 px-4 py-3">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-2 h-2 rounded-full bg-enat-green/40"
          animate={{ y: [0, -6, 0] }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: i * 0.15,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/* ─── Mock AI Responses ─── */
const mockResponses = [
  "Dựa trên phân tích gần đây, tôi nhận thấy nội dung dạng **video ngắn** (15-30 giây) đang có hiệu suất tốt nhất. Engagement rate trung bình đạt **9.2%**, cao hơn 40% so với các format khác. Bạn nên tập trung vào TikTok và Instagram Reels.",
  "Chiến dịch hiện tại có **ROI là 3.2x**, khá tốt so với trung bình ngành (2.5x). Để cải thiện thêm, tôi đề xuất tăng ngân sách cho **nội dung Before/After** vì đây là format có conversion rate cao nhất.",
  "Tôi phát hiện rằng **hashtag #ENATskincare** đang trending với hơn 50K lượt sử dụng trong tuần qua. Đề xuất kết hợp hashtag này vào các bài đăng tiếp theo để tăng organic reach.",
  "Phân tích cho thấy đối tượng **nữ 25-34 tuổi** chiếm 65% tổng engagement. Nên tối ưu content và thời gian đăng phù hợp với nhóm này — cụ thể là **19:00-21:00 các ngày trong tuần**.",
];

/* ═══════════════════════════════════════════════════════════
   INSIGHTS PAGE
   ═══════════════════════════════════════════════════════════ */
export default function InsightsPage() {
  type ChatMessage = { role: "user" | "assistant"; message: string };

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    ...aiChatHistory,
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const responseIndexRef = useRef(0);

  const scrollToBottom = useCallback(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages, isTyping, scrollToBottom]);

  const handleSend = useCallback(() => {
    const trimmed = inputValue.trim();
    if (!trimmed || isTyping) return;

    setChatMessages((prev) => [...prev, { role: "user", message: trimmed }]);
    setInputValue("");
    setIsTyping(true);

    const delay = 1500 + Math.random() * 1000;
    setTimeout(() => {
      const response =
        mockResponses[responseIndexRef.current % mockResponses.length];
      responseIndexRef.current += 1;
      setChatMessages((prev) => [
        ...prev,
        { role: "assistant", message: response },
      ]);
      setIsTyping(false);
    }, delay);
  }, [inputValue, isTyping]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    },
    [handleSend]
  );

  const impactBadge = useMemo(
    () => ({
      high: {
        label: "Ảnh hưởng cao",
        bg: "bg-enat-red/10",
        text: "text-enat-red",
        dot: "bg-enat-red",
      },
      medium: {
        label: "Ảnh hưởng vừa",
        bg: "bg-enat-gold/10",
        text: "text-amber-700",
        dot: "bg-enat-gold",
      },
      low: {
        label: "Ảnh hưởng thấp",
        bg: "bg-zinc-100",
        text: "text-zinc-500",
        dot: "bg-zinc-400",
      },
    }),
    []
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-enat-blue/10 p-6 lg:p-8">
      {/* ─── Header ─── */}
      <motion.div {...fadeInUp} className="mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-violet-500/20">
            <Sparkles size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-enat-dark">AI Insights</h1>
            <p className="text-sm text-zinc-400">
              Phân tích thông minh & đề xuất chiến lược từ AI
            </p>
          </div>
        </div>
      </motion.div>

      {/* ─── Gauge + Score Cards ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
        {/* Gauge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="lg:col-span-4 bg-white rounded-2xl border border-zinc-100 shadow-sm p-8 flex flex-col items-center justify-center"
        >
          <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-6">
            Điểm sức khỏe chiến dịch
          </h2>
          <ScoreGauge score={insightScores.overall} />
          <p className="text-sm text-zinc-500 mt-6 text-center max-w-[220px]">
            Chiến dịch đang hoạt động tốt. Cải thiện engagement để đạt điểm cao
            hơn.
          </p>
        </motion.div>

        {/* Score Cards */}
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <ScoreCard
            label="Chất lượng nội dung"
            score={insightScores.contentQuality}
            delay={0.15}
          />
          <ScoreCard
            label="Tương tác"
            score={insightScores.engagement}
            delay={0.25}
          />
          <ScoreCard
            label="Độ phủ"
            score={insightScores.reach}
            delay={0.35}
          />
          <ScoreCard
            label="Chuyển đổi"
            score={insightScores.conversion}
            delay={0.45}
          />
        </div>
      </div>

      {/* ─── AI Insight Cards ─── */}
      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8"
      >
        {aiInsights.map((insight, index) => {
          const IconComp = insightIconMap[insight.icon] || Zap;
          const badge =
            impactBadge[insight.impact as keyof typeof impactBadge] ||
            impactBadge.medium;

          const iconColors = [
            "from-enat-green to-emerald-500",
            "from-blue-500 to-cyan-500",
            "from-violet-500 to-purple-500",
            "from-amber-500 to-orange-500",
          ];

          return (
            <motion.div
              key={index}
              variants={staggerItem}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ y: -6, scale: 1.01 }}
              className="bg-white rounded-2xl border border-zinc-100 shadow-sm p-6 hover:shadow-xl transition-all duration-300 cursor-pointer group"
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className={`w-11 h-11 rounded-xl bg-gradient-to-br ${iconColors[index % iconColors.length]} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}
                >
                  <IconComp size={20} className="text-white" />
                </div>
                <div
                  className={`flex items-center gap-1.5 ${badge.bg} px-2.5 py-1 rounded-full`}
                >
                  <div className={`w-1.5 h-1.5 rounded-full ${badge.dot}`} />
                  <span className={`text-xs font-semibold ${badge.text}`}>
                    {badge.label}
                  </span>
                </div>
              </div>
              <h3 className="text-base font-bold text-enat-dark mb-2 group-hover:text-enat-green transition-colors">
                {insight.title}
              </h3>
              <p className="text-sm text-zinc-500 leading-relaxed">
                {insight.description}
              </p>
            </motion.div>
          );
        })}
      </motion.div>

      {/* ─── AI Chat Interface ─── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="bg-white rounded-2xl border border-zinc-100 shadow-sm overflow-hidden"
      >
        {/* Chat header */}
        <div className="px-6 py-4 border-b border-zinc-100 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-enat-green to-enat-green-light flex items-center justify-center">
            <Bot size={18} className="text-white" />
          </div>
          <div>
            <h2 className="text-base font-bold text-enat-dark">
              ENAT AI Assistant
            </h2>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-enat-green animate-pulse" />
              <span className="text-xs text-zinc-400">Đang hoạt động</span>
            </div>
          </div>
        </div>

        {/* Chat messages */}
        <div className="h-[420px] overflow-y-auto px-6 py-4 space-y-4 bg-zinc-50/50">
          <AnimatePresence initial={false}>
            {chatMessages.map((msg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.3 }}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`flex items-start gap-2.5 max-w-[80%] ${
                    msg.role === "user" ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  {/* Avatar */}
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                      msg.role === "user"
                        ? "bg-gradient-to-br from-enat-green to-enat-green-light"
                        : "bg-gradient-to-br from-violet-500 to-purple-600"
                    }`}
                  >
                    {msg.role === "user" ? (
                      <User size={14} className="text-white" />
                    ) : (
                      <Sparkles size={14} className="text-white" />
                    )}
                  </div>

                  {/* Bubble */}
                  <div
                    className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-enat-green text-white rounded-br-md"
                        : "bg-white border border-enat-green/15 text-zinc-700 rounded-bl-md shadow-sm"
                    }`}
                  >
                    {msg.message.split("\n").map((line, li) => (
                      <p
                        key={li}
                        className={li > 0 ? "mt-1.5" : ""}
                      >
                        <RichText text={line} />
                      </p>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing indicator */}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start gap-2.5"
            >
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shrink-0">
                <Sparkles size={14} className="text-white" />
              </div>
              <div className="bg-white border border-enat-green/15 rounded-2xl rounded-bl-md shadow-sm">
                <TypingIndicator />
              </div>
            </motion.div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Chat input */}
        <div className="px-6 py-4 border-t border-zinc-100 bg-white">
          <div className="flex items-center gap-3">
            <div className="flex-1 relative">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Hỏi AI về chiến dịch..."
                className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 pr-12 text-sm text-enat-dark placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-enat-green/20 focus:border-enat-green/40 transition-all"
                disabled={isTyping}
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSend}
              disabled={!inputValue.trim() || isTyping}
              className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all shadow-md ${
                inputValue.trim() && !isTyping
                  ? "bg-gradient-to-br from-enat-green to-enat-green-light text-white shadow-enat-green/30 cursor-pointer"
                  : "bg-zinc-200 text-zinc-400 shadow-none cursor-not-allowed"
              }`}
            >
              <Send size={18} />
            </motion.button>
          </div>
          <p className="text-xs text-zinc-400 mt-2 ml-1">
            AI phân tích dựa trên dữ liệu chiến dịch thực tế của bạn
          </p>
        </div>
      </motion.div>
    </div>
  );
}
