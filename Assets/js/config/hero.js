// ====================== HERO.JS ======================
// Assets/js/config/hero.js

window.ConfigHero = {
  init() {
    console.log("%c✅ Hero module initialized", "color: #ff9edb");
    // Có thể thêm logic khởi tạo đặc biệt cho Hero nếu cần
  },

  // Render lại dữ liệu khi chuyển sang tab Hero (nếu cần)
  render() {
    // Hiện tại chưa cần render động, chỉ load data là đủ
    console.log("%cHero tab rendered", "color: #ff9edb");
  },

  // ====================== SAVE ======================
  save() {
    return {
      youtubeId: document.getElementById("hero-youtube")
        ? document.getElementById("hero-youtube").value.trim()
        : "",

      badgeIcon: document.getElementById("hero-badge-icon")
        ? document.getElementById("hero-badge-icon").value.trim()
        : "🎨",

      badgeText: document.getElementById("hero-badge-text")
        ? document.getElementById("hero-badge-text").value.trim()
        : "",

      titlePrefix: document.getElementById("hero-title-prefix")
        ? document.getElementById("hero-title-prefix").value
        : "Hi, I'm ",

      titleHighlight: document.getElementById("hero-title-highlight")
        ? document.getElementById("hero-title-highlight").value
        : "Linh",

      subtitle: document.getElementById("hero-subtitle")
        ? document.getElementById("hero-subtitle").value.trim()
        : "",

      heroImage: document.getElementById("hero-image")
        ? document.getElementById("hero-image").value.trim()
        : "./Assets/Images/animegirl.png",

      // Button 1
      btn1Text: document.getElementById("btn1-text")
        ? document.getElementById("btn1-text").value.trim()
        : "View My Works",

      btn1Link: document.getElementById("btn1-link")
        ? document.getElementById("btn1-link").value.trim()
        : "#gallery",

      // Button 2
      btn2Text: document.getElementById("btn2-text")
        ? document.getElementById("btn2-text").value.trim()
        : "Learn More About Me",

      btn2Link: document.getElementById("btn2-link")
        ? document.getElementById("btn2-link").value.trim()
        : "#about",
    };
  },

  // ====================== LOAD ======================
  load(data) {
    if (!data) return;

    const fields = {
      "hero-youtube": data.youtubeId,
      "hero-badge-icon": data.badgeIcon,
      "hero-badge-text": data.badgeText,
      "hero-title-prefix": data.titlePrefix,
      "hero-title-highlight": data.titleHighlight,
      "hero-subtitle": data.subtitle,
      "hero-image": data.heroImage,
      "btn1-text": data.btn1Text,
      "btn1-link": data.btn1Link,
      "btn2-text": data.btn2Text,
      "btn2-link": data.btn2Link,
    };

    Object.keys(fields).forEach((id) => {
      const element = document.getElementById(id);
      if (element && fields[id] !== undefined) {
        element.value = fields[id];
      }
    });

    console.log("%cHero data loaded from config", "color: #ff9edb");
  },
};
