// ====================== ABOUT.JS ======================
// Assets/js/about.js - Đồng bộ đầy đủ từ ConfigMain (text + image + hobby + background)

function initAbout() {

  renderAbout();

  // Lắng nghe khi ConfigMain cập nhật data
  document.addEventListener("configMainReady", () => {
    renderAbout();
  });
}

function renderAbout() {
  const data = ConfigMain.getAbout() || {};

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
    hobbyStyles: Array.isArray(data.hobbyStyles) ? data.hobbyStyles : [],
    aboutMeBg:
      data.aboutMeBg ||
      "https://i.pinimg.com/736x/74/60/a1/7460a1cae8d0a02eb59933ddea60df29.jpg",
    hobbyBg:
      data.hobbyBg ||
      "https://i.pinimg.com/736x/a6/fe/52/a6fe52829cdcdeb359cb810445f45dbe.jpg",
  };

  // === Render About Me ===
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

    // Đồng bộ background cho .about-me
    const aboutSection = aboutMeEl.closest(".about-me");
    if (aboutSection) {
      aboutSection.style.backgroundImage = `url("${aboutData.aboutMeBg}")`;
    }
  }

  // === Render Hobby ===
  const hobbyEl = document.getElementById("hobby-content");
  if (hobbyEl) {
    let hobbyHTML = "";

    aboutData.hobbies.forEach((hobby, index) => {
      const style = aboutData.hobbyStyles[index] || {};
      const background =
        style.background || "linear-gradient(135deg, #ff9edb, #ff6ec4)";
      const borderColor = style.borderColor || "#ff9edb";

      hobbyHTML += `
        <div class="hobby-badge" style="background: ${background}; border-color: ${borderColor};">
          ${hobby}
        </div>
      `;
    });

    hobbyEl.innerHTML = `
      <h2 class="section-title">Hobby</h2>
      <div class="hobby-grid">
        ${hobbyHTML}
      </div>
    `;

    // Đồng bộ background cho .hobby-section
    const hobbySection = hobbyEl.closest(".hobby-section");
    if (hobbySection) {
      hobbySection.style.backgroundImage = `url("${aboutData.hobbyBg}")`;
    }
  }


}

// Export
window.initAbout = initAbout;
