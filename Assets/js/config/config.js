// ====================== CONFIG.JS - MAIN ENTRY POINT ======================
// Assets/js/config/config.js

const ConfigManager = {
  // Dữ liệu chung
  gamingCards: [],
  fanDecks: [],
  galleryItems: [],
  musicConfig: {},

  modules: {},

  useFirebase: true,

  init() {
    console.log(
      "%c⚙️ Config System - Modular Version Started 🌸",
      "color: #ff9edb; font-weight: bold;",
    );

    this.loadAllModules();
    this.bindTabNavigation();
    this.bindGlobalButtons();
    this.loadSavedConfig();
    this.showTab("general");

    console.log(
      "%c✅ Config Manager initialized successfully",
      "color: #ff9edb; font-weight: bold;",
    );
  },

  loadAllModules() {
    this.modules = {
      general: window.ConfigGeneral || {},
      hero: window.ConfigHero || {},
      about: window.ConfigAbout || {},
      gaming: window.ConfigGaming || {},
      fan: window.ConfigFanGallery || {},
      gallery: window.ConfigMainGallery || {},
      music: window.ConfigMusic || {},
    };

    Object.values(this.modules).forEach((module) => {
      if (typeof module.init === "function") module.init();
    });
  },

  bindTabNavigation() {
    document.querySelectorAll(".config-nav-item").forEach((item) => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
        this.showTab(item.getAttribute("data-tab"));
      });
    });
  },

  showTab(tabId) {
    document
      .querySelectorAll(".config-tab")
      .forEach((tab) => tab.classList.remove("active"));
    const activeTab = document.getElementById(`tab-${tabId}`);
    if (activeTab) activeTab.classList.add("active");

    document.querySelectorAll(".config-nav-item").forEach((item) => {
      item.classList.toggle("active", item.getAttribute("data-tab") === tabId);
    });

    const module = this.modules[tabId];
    if (module && typeof module.render === "function") {
      module.render();
    }
  },

  bindGlobalButtons() {
    document
      .getElementById("btn-save-all")
      .addEventListener("click", () => this.saveAllConfig());
    document.getElementById("btn-reset").addEventListener("click", () => {
      if (confirm("Reset tất cả về mặc định?")) this.resetAllConfig();
    });
  },

  saveAllConfig() {
    const fullConfig = {};

    Object.keys(this.modules).forEach((key) => {
      const module = this.modules[key];
      if (typeof module.save === "function") {
        fullConfig[key] = module.save();
      }
    });

    if (this.useFirebase && typeof window.saveConfigToFirebase === "function") {
      window.saveConfigToFirebase(fullConfig);
    } else {
      localStorage.setItem("linhPortfolioConfig", JSON.stringify(fullConfig));
    }

    this.showNotification("✅ Đã lưu tất cả thay đổi!", "success");
  },

  loadSavedConfig() {
    if (
      this.useFirebase &&
      typeof window.loadConfigFromFirebase === "function"
    ) {
      window.loadConfigFromFirebase((config) => {
        this.applyLoadedConfig(config);
      });
    } else {
      const saved = localStorage.getItem("linhPortfolioConfig");
      if (saved) {
        try {
          this.applyLoadedConfig(JSON.parse(saved));
        } catch (e) {}
      }
    }
  },

  applyLoadedConfig(config) {
    Object.keys(this.modules).forEach((key) => {
      const module = this.modules[key];
      if (typeof module.load === "function" && config[key]) {
        module.load(config[key]);
      }
    });
  },

  resetAllConfig() {
    if (
      this.useFirebase &&
      typeof window.resetConfigInFirebase === "function"
    ) {
      window.resetConfigInFirebase();
    } else {
      localStorage.removeItem("linhPortfolioConfig");
    }
    this.showNotification("Đã reset về mặc định!", "info");
    setTimeout(() => location.reload(), 1200);
  },

  showNotification(message, type = "success") {
    const notif = document.createElement("div");
    notif.style.cssText = `position:fixed;bottom:30px;right:30px;padding:16px 24px;border-radius:12px;color:white;font-weight:600;z-index:10000;background:${type === "success" ? "#ff9edb" : "#6b4e9e"};`;
    notif.textContent = message;
    document.body.appendChild(notif);
    setTimeout(() => notif.remove(), 3000);
  },
};

document.addEventListener("DOMContentLoaded", () => ConfigManager.init());
window.ConfigManager = ConfigManager;
