// ====================== CONFIG-MAIN.JS ======================
// Assets/js/config-main.js
// Config Manager cho trang index.html - Load tất cả data từ Firebase

const ConfigMain = {
  // Giữ lại tất cả dữ liệu
  general: {},
  hero: {},
  about: {},
  gamingCards: [],
  fanDecks: [],
  galleryItems: [],
  musicConfig: {},
  music: {},

  useFirebase: true,

  init() {
    console.log(
      "%c📥 ConfigMain - Loading all data from database...",
      "color: #ff9edb; font-weight: bold;",
    );
    this.loadSavedConfig();
  },

  loadSavedConfig() {
    if (
      this.useFirebase &&
      typeof window.loadConfigFromFirebase === "function"
    ) {
      window.loadConfigFromFirebase((config) => {
        this.applyConfig(config);
      });
    } else {
      const saved = localStorage.getItem("linhPortfolioConfig");
      if (saved) {
        try {
          this.applyConfig(JSON.parse(saved));
        } catch (e) {
          console.warn("%c⚠️ Parse config failed", "color: orange");
        }
      }
    }
  },

  applyConfig(config) {
    if (!config) return;

    // Giữ lại hết tất cả data
    this.general = config.general || {};
    this.hero = config.hero || {};
    this.about = config.about || {};
    this.gamingCards = config.gaming || [];
    this.fanDecks = config.fan || [];
    this.galleryItems = config.gallery || [];
    this.musicConfig = config.music || {};
    this.music = config.music || {};

    console.log(
      "%c✅ ConfigMain - All data loaded successfully",
      "color: #ff9edb",
    );

    // Thông báo cho các component biết data đã sẵn sàng
    document.dispatchEvent(new Event("configMainReady"));
  },

  // Helper functions (dùng trong các file hero.js, about.js, ...)
  getGeneral() {
    return this.general;
  },
  getHero() {
    return this.hero;
  },
  getAbout() {
    return this.about;
  },
  getGamingCards() {
    return this.gamingCards;
  },
  getFanDecks() {
    return this.fanDecks;
  },
  getGalleryItems() {
    return this.galleryItems;
  },
  getMusicConfig() {
    return this.musicConfig;
  },
};

// Khởi tạo tự động
document.addEventListener("DOMContentLoaded", () => ConfigMain.init());

window.ConfigMain = ConfigMain;
