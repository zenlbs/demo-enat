export const challenges = [
  {
    id: "1",
    title: "#HộiĐồngE Khoe Da Mộc, Đẹp Đồng Điệu Từ Gốc",
    description: "Ai nói da đẹp là nhờ makeup. Da khỏe đẹp đồng điệu từ trong ra ngoài, cho dù lúc makeup hay khi tẩy trang vẫn tự tin.",
    coverImage: "/challenges/block-1.png",
    prize: "50.000.000 VNĐ",
    deadline: "2026-04-15",
    participants: 1247,
    maxParticipants: 2000,
    status: "active" as const,
    platform: ["facebook", "instagram", "tiktok"] as const,
    rules: [
      "Video/hình ảnh phải có sản phẩm ENAT 400",
      "Sử dụng hashtag #HộiĐồngE",
      "Nội dung phải là trải nghiệm thực tế",
      "Tối thiểu 30 giây cho video",
      "Đăng trên ít nhất 1 nền tảng",
    ],
    prizes: [
      { rank: "Giải Nhất", amount: "20.000.000 VNĐ", count: 1 },
      { rank: "Giải Nhì", amount: "10.000.000 VNĐ", count: 2 },
      { rank: "Giải Ba", amount: "5.000.000 VNĐ", count: 4 },
    ],
  },
  {
    id: "2",
    title: "WHAT'S INSIDE #HỘIĐỒNGE BAG?",
    description: "Những món đồ trong túi thể hiện lifestyle của bạn nhưng không thể thiếu 1 bước block gốc tự do đơn giản với vitamin E.",
    coverImage: "/challenges/block-2.png",
    prize: "30.000.000 VNĐ",
    deadline: "2026-04-30",
    participants: 856,
    maxParticipants: 1500,
    status: "active" as const,
    platform: ["tiktok", "instagram"] as const,
    rules: [
      "Nội dung beauty hack phải liên quan đến Vitamin E",
      "Sử dụng hashtag #HộiĐồngE",
      "Video từ 15-60 giây",
    ],
    prizes: [
      { rank: "Giải Nhất", amount: "15.000.000 VNĐ", count: 1 },
      { rank: "Giải Nhì", amount: "7.500.000 VNĐ", count: 2 },
    ],
  },
  {
    id: "3",
    title: "#HỘIĐỒNGE BLOCK GỐC TỰ DO \"5 GIÂY 6 NGÀN\"",
    description: "Chăm da đẹp đồng điệu không phí routine tiền triệu nhờ bí kíp block gốc tự do cho muôn kiểu chăm da.",
    coverImage: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600&h=400&fit=crop",
    prize: "40.000.000 VNĐ",
    deadline: "2026-05-15",
    participants: 432,
    maxParticipants: 1000,
    status: "upcoming" as const,
    platform: ["facebook", "instagram"] as const,
    rules: [
      "Ảnh before/after phải chân thực",
      "Sử dụng hashtag #ENATTransformation",
      "Chia sẻ quy trình sử dụng ENAT 400",
    ],
    prizes: [
      { rank: "Giải Nhất", amount: "20.000.000 VNĐ", count: 1 },
      { rank: "Giải Nhì", amount: "10.000.000 VNĐ", count: 2 },
    ],
  },
  {
    id: "4",
    title: "Routine Buổi Sáng Hoàn Hảo",
    description: "Quay video morning skincare routine có sử dụng ENAT 400. Chia sẻ bí quyết bắt đầu ngày mới với làn da rạng rỡ.",
    coverImage: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600&h=400&fit=crop",
    prize: "25.000.000 VNĐ",
    deadline: "2026-03-01",
    participants: 2000,
    maxParticipants: 2000,
    status: "ended" as const,
    platform: ["tiktok"] as const,
    rules: [],
    prizes: [],
  },
  {
    id: "5",
    title: "ENAT x Aesthetic Beauty",
    description: "Tạo nội dung thẩm mỹ, nghệ thuật với chủ đề làm đẹp tự nhiên cùng ENAT 400.",
    coverImage: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&h=400&fit=crop",
    prize: "35.000.000 VNĐ",
    deadline: "2026-05-01",
    participants: 678,
    maxParticipants: 1500,
    status: "active" as const,
    platform: ["instagram", "tiktok"] as const,
    rules: [],
    prizes: [],
  },
];

export const leaderboard = [
  { rank: 1, name: "Nguyễn Thị Mai", avatar: "NT", views: 125000, likes: 8900, shares: 1200, score: 98 },
  { rank: 2, name: "Trần Hương Giang", avatar: "TH", views: 98000, likes: 7200, shares: 980, score: 92 },
  { rank: 3, name: "Lê Phương Anh", avatar: "LP", views: 87000, likes: 6500, shares: 850, score: 88 },
  { rank: 4, name: "Phạm Thùy Linh", avatar: "PT", views: 76000, likes: 5800, shares: 720, score: 85 },
  { rank: 5, name: "Đỗ Minh Châu", avatar: "ĐM", views: 65000, likes: 4900, shares: 650, score: 81 },
  { rank: 6, name: "Vũ Thanh Hà", avatar: "VT", views: 54000, likes: 4200, shares: 580, score: 78 },
  { rank: 7, name: "Hoàng Yến Nhi", avatar: "HY", views: 48000, likes: 3800, shares: 490, score: 75 },
  { rank: 8, name: "Bùi Khánh Linh", avatar: "BK", views: 42000, likes: 3200, shares: 420, score: 72 },
];

export const contentItems = [
  { id: "c1", title: "Skincare routine buổi sáng cùng ENAT", status: "published" as const, platform: "instagram", views: 12500, likes: 890, date: "2026-03-15", thumbnail: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=200&h=200&fit=crop" },
  { id: "c2", title: "Review ENAT 400 sau 30 ngày", status: "published" as const, platform: "tiktok", views: 45200, likes: 3200, date: "2026-03-14", thumbnail: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=200&h=200&fit=crop" },
  { id: "c3", title: "5 cách dùng Vitamin E cho da đẹp", status: "approved" as const, platform: "facebook", views: 0, likes: 0, date: "2026-03-16", thumbnail: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=200&h=200&fit=crop" },
  { id: "c4", title: "Before/After 2 tuần dùng ENAT", status: "review" as const, platform: "instagram", views: 0, likes: 0, date: "2026-03-17", thumbnail: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=200&h=200&fit=crop" },
  { id: "c5", title: "Beauty hack: Vitamin E + Mật ong", status: "review" as const, platform: "tiktok", views: 0, likes: 0, date: "2026-03-17", thumbnail: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=200&h=200&fit=crop" },
  { id: "c6", title: "Night routine cùng ENAT 400", status: "draft" as const, platform: "instagram", views: 0, likes: 0, date: "2026-03-18", thumbnail: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=200&h=200&fit=crop" },
  { id: "c7", title: "Vitamin E cho tóc suôn mượt", status: "draft" as const, platform: "facebook", views: 0, likes: 0, date: "2026-03-18", thumbnail: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=200&h=200&fit=crop" },
  { id: "c8", title: "ENAT 400 - Bảo vệ da mùa hè", status: "published" as const, platform: "tiktok", views: 28700, likes: 2100, date: "2026-03-12", thumbnail: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=200&h=200&fit=crop" },
];

export const dashboardMetrics = {
  totalViews: 245800,
  engagementRate: 7.8,
  conversions: 1247,
  commission: 12450000,
};

export const performanceData = [
  { date: "01/03", views: 12000, engagement: 850, conversions: 45 },
  { date: "03/03", views: 15000, engagement: 1100, conversions: 52 },
  { date: "05/03", views: 18500, engagement: 1350, conversions: 68 },
  { date: "07/03", views: 22000, engagement: 1600, conversions: 78 },
  { date: "09/03", views: 19000, engagement: 1400, conversions: 65 },
  { date: "11/03", views: 28000, engagement: 2100, conversions: 95 },
  { date: "13/03", views: 32000, engagement: 2400, conversions: 110 },
  { date: "15/03", views: 35000, engagement: 2800, conversions: 125 },
  { date: "17/03", views: 38000, engagement: 3100, conversions: 142 },
  { date: "18/03", views: 42000, engagement: 3500, conversions: 158 },
];

export const platformBreakdown = [
  { name: "Facebook", value: 35, color: "#1877F2" },
  { name: "Instagram", value: 40, color: "#E4405F" },
  { name: "TikTok", value: 25, color: "#000000" },
];

export const activityFeed = [
  { id: 1, type: "view" as const, message: "Video 'Skincare routine buổi sáng' đạt 10.000 lượt xem", time: "2 phút trước" },
  { id: 2, type: "like" as const, message: "50 lượt thích mới cho bài 'Review ENAT 400'", time: "5 phút trước" },
  { id: 3, type: "share" as const, message: "Bài 'Beauty hack Vitamin E' được chia sẻ 25 lần", time: "12 phút trước" },
  { id: 4, type: "comment" as const, message: "15 bình luận mới trên Instagram", time: "20 phút trước" },
  { id: 5, type: "conversion" as const, message: "3 đơn hàng mới từ link affiliate", time: "35 phút trước" },
  { id: 6, type: "view" as const, message: "Video TikTok đạt 5.000 lượt xem trong 1 giờ", time: "1 giờ trước" },
];

export const insightScores = {
  overall: 82,
  contentQuality: 88,
  engagement: 76,
  reach: 85,
  conversion: 79,
};

export const aiInsights = [
  {
    icon: "clock",
    title: "Thời gian đăng tối ưu",
    description: "Dữ liệu cho thấy bài đăng lúc 19:00-21:00 có engagement cao hơn 45% so với buổi sáng. Đặc biệt, Thứ 3 và Thứ 5 là ngày có tương tác cao nhất.",
    impact: "high" as const,
  },
  {
    icon: "trending",
    title: "Nội dung hiệu quả nhất",
    description: "Video dạng 'Before/After' có conversion rate cao gấp 2.3x so với video review thông thường. Nên tập trung vào format này trong chiến dịch tiếp theo.",
    impact: "high" as const,
  },
  {
    icon: "target",
    title: "Đề xuất cải thiện",
    description: "Caption dài 80-120 từ có engagement tốt nhất. Thêm CTA rõ ràng ở cuối caption giúp tăng 35% click rate vào link affiliate.",
    impact: "medium" as const,
  },
  {
    icon: "zap",
    title: "Hashtag hiệu quả",
    description: "Kết hợp 3-5 hashtag branded + 5-7 hashtag trending giúp tăng reach 60%. Tránh dùng quá 15 hashtag vì sẽ bị giảm phân phối.",
    impact: "medium" as const,
  },
];

export const aiChatHistory = [
  { role: "user" as const, message: "Làm sao để tăng engagement rate?" },
  { role: "assistant" as const, message: "Dựa trên phân tích dữ liệu của bạn, tôi có 3 đề xuất chính:\n\n1. **Thay đổi thời gian đăng:** Chuyển sang khung 19:00-21:00 thay vì buổi sáng. Dữ liệu cho thấy engagement tăng 45%.\n\n2. **Tăng tương tác trong caption:** Đặt câu hỏi cuối bài hoặc tạo poll. Bài có CTA dạng câu hỏi có comment cao hơn 3x.\n\n3. **Sử dụng format Carousel:** Trên Instagram, carousel post có engagement cao hơn 1.4x so với single image." },
  { role: "user" as const, message: "Content nào đang perform tốt nhất?" },
  { role: "assistant" as const, message: "Top 3 content theo conversion rate:\n\n🥇 **'Review ENAT 400 sau 30 ngày'** — 3.2% CR, 45.2K views\n🥈 **'Before/After 2 tuần'** — 2.8% CR, 28.7K views  \n🥉 **'Skincare routine buổi sáng'** — 2.1% CR, 12.5K views\n\nĐặc điểm chung: đều là nội dung **chia sẻ trải nghiệm thực tế** với thời lượng 45-90 giây. Nên replicate format này." },
];

export const adminIntegrations = [
  { name: "Dify AI", status: "connected" as const, icon: "brain", lastSync: "2 phút trước", description: "AI Orchestration Layer" },
  { name: "Creatomate", status: "connected" as const, icon: "video", lastSync: "5 phút trước", description: "Video/Image Rendering" },
  { name: "Meta (FB/IG)", status: "connected" as const, icon: "globe", lastSync: "10 phút trước", description: "Facebook & Instagram API" },
  { name: "TikTok", status: "connected" as const, icon: "music", lastSync: "15 phút trước", description: "TikTok Creator API" },
  { name: "Zalo", status: "warning" as const, icon: "message", lastSync: "2 giờ trước", description: "Zalo OA API — Token sắp hết hạn" },
  { name: "Claude API", status: "connected" as const, icon: "sparkles", lastSync: "1 phút trước", description: "AI Content Generation" },
];

export const adminUsers = [
  { name: "Nguyễn Huy", email: "huy@zenlabs.vn", role: "Admin" as const, lastActive: "Đang online" },
  { name: "Trần Minh Anh", email: "anh@golden.vn", role: "Editor" as const, lastActive: "5 phút trước" },
  { name: "Lê Thu Hà", email: "ha@golden.vn", role: "Reviewer" as const, lastActive: "1 giờ trước" },
  { name: "Phạm Quỳnh", email: "quynh@golden.vn", role: "Editor" as const, lastActive: "3 giờ trước" },
];
