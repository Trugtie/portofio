// ====================== ABOUT.JS - FIXED UNDEFINED HOBBY ======================

function initAbout() {
  renderAbout();

  document.addEventListener("configMainReady", () => {
    renderAbout();
  });
}

function renderAbout() {
  const aboutConfig = ConfigMain.getAbout() || {};

  // ==================== ABOUT ME CARD ====================
  const aboutHTML = `
    <div class="about-me-card">
      <div class="about-left">
        <div class="profile-circle">
          <img src="${aboutConfig.profileImage || "https://i.pinimg.com/736x/74/60/a1/7460a1cae8d0a02eb59933ddea60df29.jpg"}" 
               alt="Gia Hân">
        </div>
        <h3 class="name">${aboutConfig.name || "Gia Hân"}</h3>
        <p class="title">${aboutConfig.title || "Digital Artist & Gamer"}</p>
      </div>

      <div class="about-right">
        <h2 class="section-title">About Me <span class="pink-flower">🌸</span></h2>
        
        <p class="greeting">
          ❤️ Xin chào! Mình là ${aboutConfig.name || "Gia Hân"} — ${aboutConfig.title || "Digital Artist & Gamer"} nhó xíu đến từ Việt Nam ❤️
        </p>
        
        <p class="bio">
          ${aboutConfig.bio || `Mình yêu thích sự kết hợp hoàn hảo giữa nghệ thuật anime dễ thương và thế giới gaming đầy màu sắc. Mỗi thiết kế mình tạo ra đều mang phong cách hiện đại, trẻ trung, và một chút vibe Nhật Bản ngọt ngào như hoa anh đào bay trong gió 🌸✨`}
        </p>
        
        <p class="invite">
          ${aboutConfig.invite || "Hãy cùng mình lan tỏa những giấc mơ màu hồng nhé! 😊"}
        </p>
        
        <p class="thanks">
          ${aboutConfig.thanks || "Cảm ơn bạn đã ghé thăm! ❤️"}
        </p>
      </div>
    </div>
  `;

  document.getElementById("about-me-content").innerHTML = aboutHTML;

  // ==================== HOBBY SECTION ====================
  const hobbies = getHobbies();

  let hobbyHTML = `
    <h2 class="hobby-main-title">Hobby <span class="pink-flower">🌸</span></h2>
    <p class="hobby-subtitle">
      ${aboutConfig.hobbySubtitle || "Những điều mình yêu thích mỗi ngày"}
    </p>
    <div class="hobby-grid">
  `;

  hobbies.forEach((h) => {
    hobbyHTML += `
      <div class="hobby-card">
        <div class="hobby-icon">${h.icon || "🌟"}</div>
        <h4>${h.title || "Hobby"}</h4>
        <p>${h.desc || "Mô tả đang được cập nhật..."}</p>
      </div>
    `;
  });

  hobbyHTML += `</div>`;

  document.getElementById("hobby-content").innerHTML = hobbyHTML;
}

// ====================== LẤY HOBBY (ƯU TIÊN CONFIG) ======================
function getHobbies() {
  const aboutConfig = ConfigMain.getAbout() || {};

  console.log("About Config:", aboutConfig); // Debug: Kiểm tra cấu hình About

  if (Array.isArray(aboutConfig.hobbies) && aboutConfig.hobbies.length > 0) {
    return aboutConfig.hobbies.filter((h) => h && (h.title || h.desc));
  }

  // Fallback về default
  return getDefaultHobbies();
}

// ====================== DEFAULT HOBBY ======================
function getDefaultHobbies() {
  return [
    {
      icon: "🎨",
      title: "Vẽ Anime",
      desc: "Mình thích vẽ những nhân vật dễ thương, màu sắc tươi sáng và đầy cảm xúc.",
    },
    {
      icon: "🎮",
      title: "Chơi Game",
      desc: "League of Legends (Master), Genshin Impact, Teamfight Tactics và nhiều game khác.",
    },
    {
      icon: "🌸",
      title: "Cosplay",
      desc: "Hóa thân thành các nhân vật anime yêu thích và chụp ảnh.",
    },
    {
      icon: "📺",
      title: "Xem Anime",
      desc: "Your Name, Weathering With You, Spy x Family, Jujutsu Kaisen...",
    },
    {
      icon: "☕",
      title: "Chill với bạn bè",
      desc: "Ngồi cà phê, trò chuyện và tạo ra những kỷ niệm đẹp.",
    },
    {
      icon: "🎵",
      title: "Nghe nhạc",
      desc: "Anime OST, nhạc Nhật Bản và những bản ballad nhẹ nhàng.",
    },
  ];
}

window.initAbout = initAbout;
