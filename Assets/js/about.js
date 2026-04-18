// ====================== ABOUT.JS ======================
// Assets/js/about.js - Đồng bộ data từ ConfigMain

function initAbout() {
  console.log("%c📖 About init - Syncing from ConfigMain", "color: #ff9edb");

  renderAbout();

  // Lắng nghe khi ConfigMain load hoặc cập nhật data
  document.addEventListener("configMainReady", () => {
    console.log("%c🔄 ConfigMainReady - Re-rendering About", "color: #ff9edb");
    renderAbout();
  });
}

function renderAbout() {
  const data = ConfigMain.getAbout() || {};

  // Dữ liệu mặc định nếu chưa có từ Config
  const aboutData = {
    title: "About Me",
    profileImage: data.profileImage || "./Assets/Images/Avatar.gif",
    alt: "Linh Avatar",
    text:
      data.aboutText ||
      "Linh là một Digital Artist & Gamer người Việt Nam yêu thích sự kết hợp giữa nghệ thuật anime và gaming. Tôi tạo ra những thiết kế hiện đại, trẻ trung với chút vibe Nhật Bản.",
    hobbies: Array.isArray(data.hobbies)
      ? data.hobbies
      : [
          "Watching Anime",
          "Anime Drawing",
          "Cosplay",
          "League of Legends",
          "Gaming",
          "Chilling With Friends",
        ],
  };

  // Render About Me
  const aboutMeEl = document.getElementById("about-me-content");
  if (aboutMeEl) {
    aboutMeEl.innerHTML = `
      <h2 class="section-title">${aboutData.title}</h2>
      
      <div class="profile-image-wrapper">
        <img src="${aboutData.profileImage}" 
             alt="${aboutData.alt}" 
             class="profile-image">
      </div>
      
      <p class="about-text">${aboutData.text}</p>
    `;
  }

  // Render Hobby
  const hobbyEl = document.getElementById("hobby-content");
  if (hobbyEl) {
    const hobbyHTML = aboutData.hobbies
      .map((hobby) => `<div class="hobby-badge">${hobby}</div>`)
      .join("");

    hobbyEl.innerHTML = `
      <h2 class="section-title">Hobby</h2>
      <div class="hobby-grid">
        ${hobbyHTML}
      </div>
    `;
  }

  console.log("%c✅ About section rendered from ConfigMain", "color: #ff9edb");
}

// Export
window.initAbout = initAbout;
