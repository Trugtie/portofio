// ====================== ABOUT.JS ======================

const aboutData = {
  aboutMe: {
    title: "About Me",
    profileImage: "./Assets/Images/Avatar.gif",
    alt: "Linh Avatar",
    text: "Linh là một Digital Artist & Gamer người Việt Nam yêu thích sự kết hợp giữa nghệ thuật anime và gaming. Tôi tạo ra những thiết kế hiện đại, trẻ trung với chút vibe Nhật Bản.",
  },
  hobbies: [
    "Watching Anime",
    "Anime Drawing",
    "Cosplay",
    "League of Legends",
    "Gaming",
    "Chilling With Friends",
  ],
};

function initAbout() {
  // Render About Me
  const aboutMeEl = document.getElementById("about-me-content");
  if (aboutMeEl) {
    aboutMeEl.innerHTML = `
      <h2 class="section-title">${aboutData.aboutMe.title}</h2>
      
      <div class="profile-image-wrapper">
        <img src="${aboutData.aboutMe.profileImage}" 
             alt="${aboutData.aboutMe.alt}" 
             class="profile-image">
      </div>
      
      <p class="about-text">${aboutData.aboutMe.text}</p>
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

  console.log(
    "%c✅ About section rendered successfully",
    "color: #ff9edb; font-weight: bold;",
  );
}

// Export function để main.js gọi
window.initAbout = initAbout;
