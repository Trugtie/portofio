// Asset/js/config.js
export const CONFIG = {
  // 🔥 Đổi background chỉ cần thay link này
  background: {
    type: "video",                    // "video" hoặc "image"
    url: "https://your-video-link.mp4"   // ← thay link video/image bất kỳ
  },

  // 🎵 Nhạc nền (đổi link thoải mái)
  music: {
    url: "https://your-music-link.mp3",   // ← thay link nhạc
    volume: 0.25
  },

  // 👤 Thông tin cá nhân
  name: "Miyazaki Gia Hân",
  title: "Cosplayer • Creator • Dreamer",
  bio: "Hewo! I'm living in my dreams. Let's create magical memories together ✨",

  // 🔗 Social links (thêm/xóa thoải mái)
  socials: [
    { name: "youtube", url: "https://www.youtube.com/@JiaHanMiyazaki", icon: "▶️" },
    { name: "tiktok",  url: "https://www.tiktok.com/@jiahan2103", icon: "♬" },
    { name: "twitter", url: "https://twitter.com/JiahanMiya91474", icon: "𝕏" },
    { name: "steam",   url: "https://steamcommunity.com/profiles/76561199001113312", icon: "🎮" },
    { name: "discord", url: "./discordpage.html", icon: "💬" },
  ]
};