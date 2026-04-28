// ====================== ABOUT.JS - FIXED aboutConfig ERROR ======================

function initAbout() {
  renderAbout();

  document.addEventListener("configMainReady", () => {
    renderAbout();
  });
}

function renderAbout() {
  const data = ConfigMain.getAbout() || {};

  // ==================== ABOUT ME CARD ====================
  const aboutHTML = `
    <div class="about-me-card">
      <div class="about-left">
        <div class="profile-circle">
          <img src="${data.profileImage || "https://i.pinimg.com/736x/74/60/a1/7460a1cae8d0a02eb59933ddea60df29.jpg"}" 
               alt="Gia Hân">
        </div>
        <h3 class="name">${data.name || "Gia Hân"}</h3>
        <p class="title">${data.title || "Digital Artist & Gamer"}</p>
      </div>

      <div class="about-right">
        <h2 class="section-title">About Me <span class="pink-flower">🌸</span></h2>
        
        <p class="greeting">${data.greeting || ""}</p>
        <p class="bio">${data.bio || ""}</p>
        <p class="invite">${data.invite || ""}</p>
        <p class="thanks">${data.thanks || ""}</p>
      </div>
    </div>
  `;

  document.getElementById("about-me-content").innerHTML = aboutHTML;

  // ==================== HOBBY SECTION ====================
  const hobbies =
    Array.isArray(data.hobbies) && data.hobbies.length
      ? data.hobbies
      : getDefaultHobbies();

  let hobbyHTML = `
    <h2 class="hobby-main-title">Hobby <span class="pink-flower">🌸</span></h2>
    <p class="hobby-subtitle">
      ${data.hobbySubtitle || "Những điều mình yêu thích mỗi ngày"}
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

// ====================== DEFAULT HOBBIES ======================
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
