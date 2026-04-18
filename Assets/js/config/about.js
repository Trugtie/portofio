// ====================== ABOUT.JS ======================
// Assets/js/config/about.js

window.ConfigAbout = {
  init() {
    console.log("%c✅ About module initialized", "color: #ff9edb");
  },

  // Render lại nếu cần khi chuyển tab (hiện tại chưa cần)
  render() {
    console.log("%cAbout tab rendered", "color: #ff9edb");
  },

  // ====================== SAVE ======================
  save() {
    return {
      aboutText: document.getElementById("about-text")
        ? document.getElementById("about-text").value.trim()
        : "",

      profileImage: document.getElementById("about-profile-image")
        ? document.getElementById("about-profile-image").value.trim()
        : "./Assets/Images/Avatar.gif",

      // Xử lý hobby list (mỗi dòng một hobby)
      hobbies: document.getElementById("hobby-list")
        ? document
            .getElementById("hobby-list")
            .value.trim()
            .split("\n")
            .map((h) => h.trim())
            .filter((h) => h.length > 0)
        : [],

      aboutMeBg: document.getElementById("about-me-bg")
        ? document.getElementById("about-me-bg").value.trim()
        : "",

      hobbyBg: document.getElementById("hobby-bg")
        ? document.getElementById("hobby-bg").value.trim()
        : "",
    };
  },

  // ====================== LOAD ======================
  load(data) {
    if (!data) return;

    // Load About Text
    if (document.getElementById("about-text") && data.aboutText) {
      document.getElementById("about-text").value = data.aboutText;
    }

    // Load Profile Image
    if (document.getElementById("about-profile-image") && data.profileImage) {
      document.getElementById("about-profile-image").value = data.profileImage;
    }

    // Load Hobby List (chuyển mảng thành chuỗi mỗi dòng một hobby)
    if (document.getElementById("hobby-list") && Array.isArray(data.hobbies)) {
      document.getElementById("hobby-list").value = data.hobbies.join("\n");
    }

    // Load Background Images
    if (document.getElementById("about-me-bg") && data.aboutMeBg) {
      document.getElementById("about-me-bg").value = data.aboutMeBg;
    }

    if (document.getElementById("hobby-bg") && data.hobbyBg) {
      document.getElementById("hobby-bg").value = data.hobbyBg;
    }

    console.log("%cAbout data loaded from config", "color: #ff9edb");
  },
};
