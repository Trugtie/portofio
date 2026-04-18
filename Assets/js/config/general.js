// ====================== GENERAL.JS - WITH SOCIAL MEDIA LINKS ======================
// Assets/js/config/general.js

window.ConfigGeneral = {
  socialLinks: [],

  init() {
    this.bindColorSync();
    this.bindGradientPickers();
    this.bindNavbarColor();
    console.log(
      "%c✅ General module initialized with Social Media Links",
      "color: #ff9edb",
    );
  },

  bindColorSync() {
    const colorFields = [
      "primary-color",
      "primary-hover",
      "accent-color",
      "highlight-color",
      "text-dark",
    ];
    colorFields.forEach((id) => {
      const picker = document.getElementById(id);
      const textInput = document.getElementById(id + "-text");
      if (picker && textInput) {
        picker.addEventListener(
          "input",
          () => (textInput.value = picker.value),
        );
        textInput.addEventListener(
          "input",
          () => (picker.value = textInput.value),
        );
      }
    });
  },

  bindGradientPickers() {
    const gradientGroups = [
      { prefix: "bg-body", mode: "light" },
      { prefix: "bg-body-dark", mode: "dark" },
      { prefix: "preloader", mode: "preloader" },
    ];
    gradientGroups.forEach((group) => {
      for (let i = 1; i <= 3; i++) {
        const el = document.getElementById(`${group.prefix}-color${i}`);
        if (el)
          el.addEventListener("input", () =>
            this.updateGradientDisplay(group.mode),
          );
      }
    });
  },

  updateGradientDisplay(mode) {
    if (mode === "light") {
      const c1 = document.getElementById("bg-body-color1").value;
      const c2 = document.getElementById("bg-body-color2").value;
      const c3 = document.getElementById("bg-body-color3").value;
      document.getElementById("bg-body").value =
        `linear-gradient(135deg, ${c1} 0%, ${c2} 50%, ${c3} 100%)`;
    } else if (mode === "dark") {
      const c1 = document.getElementById("bg-body-dark-color1").value;
      const c2 = document.getElementById("bg-body-dark-color2").value;
      const c3 = document.getElementById("bg-body-dark-color3").value;
      document.getElementById("bg-body-dark").value =
        `linear-gradient(135deg, ${c1} 0%, ${c2} 50%, ${c3} 100%)`;
    } else if (mode === "preloader") {
      const c1 = document.getElementById("preloader-color1").value;
      const c2 = document.getElementById("preloader-color2").value;
      const c3 = document.getElementById("preloader-color3").value;
      document.getElementById("preloader-bg").value =
        `linear-gradient(135deg, ${c1} 0%, ${c2} 50%, ${c3} 100%)`;
    }
  },

  bindNavbarColor() {
    const picker = document.getElementById("bg-navbar-color");
    const input = document.getElementById("bg-navbar");
    if (picker && input) {
      picker.addEventListener("input", () => {
        const hex = picker.value;
        const r = parseInt(hex.substr(1, 2), 16);
        const g = parseInt(hex.substr(3, 2), 16);
        const b = parseInt(hex.substr(5, 2), 16);
        input.value = `rgba(${r}, ${g}, ${b}, 0.2)`;
      });
    }
  },

  // ====================== SOCIAL MEDIA LINKS ======================
  renderSocialLinks() {
    const container = document.getElementById("social-links-container");
    if (!container) return;

    let html = "";
    this.socialLinks.forEach((link, index) => {
      html += `
        <div style="border:2px solid var(--accent); padding:18px; margin-bottom:16px; border-radius:14px; background:rgba(255,255,255,0.6); display:grid; grid-template-columns:1fr 1fr 80px; gap:12px; align-items:center;">
          <div>
            <label>Icon Class (Font Awesome)</label>
            <input type="text" class="config-input social-input" 
                   data-index="${index}" data-field="icon" 
                   value="${link.icon}">
          </div>
          <div>
            <label>URL</label>
            <input type="text" class="config-input social-input" 
                   data-index="${index}" data-field="url" 
                   value="${link.url}">
          </div>
          <button class="config-btn secondary" 
                  onclick="ConfigManager.modules.general.removeSocialLink(${index})"
                  style="background:#ff6b6b;color:white;padding:8px 12px;">Xóa</button>
        </div>`;
    });

    container.innerHTML =
      html ||
      `<p style="opacity:0.6;text-align:center;padding:40px;">Chưa có social link nào</p>`;

    document.querySelectorAll(".social-input").forEach((input) => {
      input.addEventListener("input", (e) => {
        const i = parseInt(e.target.dataset.index);
        const f = e.target.dataset.field;
        if (this.socialLinks[i]) this.socialLinks[i][f] = e.target.value.trim();
      });
    });
  },

  addNewSocialLink() {
    if (!this.socialLinks) this.socialLinks = [];
    this.socialLinks.push({
      icon: "fab fa-youtube",
      url: "https://youtube.com",
    });
    this.renderSocialLinks();
  },

  removeSocialLink(index) {
    if (confirm("Xóa social media link này?")) {
      this.socialLinks.splice(index, 1);
      this.renderSocialLinks();
    }
  },

  // ====================== SAVE ======================
  save() {
    return {
      primary: document.getElementById("primary-color").value,
      primaryHover: document.getElementById("primary-hover").value,
      accent: document.getElementById("accent-color").value,
      highlight: document.getElementById("highlight-color").value,
      textDark: document.getElementById("text-dark").value,
      bgBody: document.getElementById("bg-body").value,
      bgBodyDark: document.getElementById("bg-body-dark").value,
      bgNavbar: document.getElementById("bg-navbar").value,
      preloaderBg: document.getElementById("preloader-bg").value,
      defaultTheme: document.getElementById("default-theme").value,
      socialLinks: this.socialLinks || [],
    };
  },

  // ====================== LOAD ======================
  load(data) {
    if (!data) return;

    if (data.primary) {
      document.getElementById("primary-color").value = data.primary;
      document.getElementById("primary-color-text").value = data.primary;
    }
    if (data.primaryHover) {
      document.getElementById("primary-hover").value = data.primaryHover;
      document.getElementById("primary-hover-text").value = data.primaryHover;
    }

    this.socialLinks = Array.isArray(data.socialLinks)
      ? data.socialLinks
      : [
          {
            icon: "fab fa-youtube",
            url: "https://www.youtube.com/channel/UCfXT5WxwDzsXy4v04K758dg",
          },
          { icon: "fab fa-x-twitter", url: "https://x.com/JiahanMiya91474" },
          { icon: "fab fa-tiktok", url: "https://www.tiktok.com/@jiahan2103" },
          { icon: "fab fa-discord", url: "./discordpage.html" },
        ];

    this.renderSocialLinks();
    this.updateGradientDisplay("light");
    this.updateGradientDisplay("dark");
    this.updateGradientDisplay("preloader");
  },
};
