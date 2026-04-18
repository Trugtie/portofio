// ====================== GENERAL.JS ======================
// Assets/js/config/general.js

window.ConfigGeneral = {
  init() {
    this.bindColorSync();
    this.bindGradientPickers();
    this.bindNavbarColor();
    console.log("%c✅ General module initialized", "color: #ff9edb");
  },

  // Đồng bộ giữa color picker và input text
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
        picker.addEventListener("input", () => {
          textInput.value = picker.value;
        });

        textInput.addEventListener("input", () => {
          picker.value = textInput.value;
        });
      }
    });
  },

  // Xử lý gradient cho bg-body (Light & Dark) và Preloader
  bindGradientPickers() {
    const gradientGroups = [
      { prefix: "bg-body", mode: "light" },
      { prefix: "bg-body-dark", mode: "dark" },
      { prefix: "preloader", mode: "preloader" },
    ];

    gradientGroups.forEach((group) => {
      for (let i = 1; i <= 3; i++) {
        const el = document.getElementById(`${group.prefix}-color${i}`);
        if (el) {
          el.addEventListener("input", () =>
            this.updateGradientDisplay(group.mode),
          );
        }
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

  // Xử lý bg-navbar (rgba)
  bindNavbarColor() {
    const navbarPicker = document.getElementById("bg-navbar-color");
    const navbarInput = document.getElementById("bg-navbar");

    if (navbarPicker && navbarInput) {
      navbarPicker.addEventListener("input", () => {
        const hex = navbarPicker.value;
        const r = parseInt(hex.substr(1, 2), 16);
        const g = parseInt(hex.substr(3, 2), 16);
        const b = parseInt(hex.substr(5, 2), 16);
        navbarInput.value = `rgba(${r}, ${g}, ${b}, 0.2)`;
      });
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
    };
  },

  // ====================== LOAD (nếu cần) ======================
  load(data) {
    if (!data) return;

    // Load màu sắc
    if (data.primary) {
      document.getElementById("primary-color").value = data.primary;
      document.getElementById("primary-color-text").value = data.primary;
    }
    if (data.primaryHover) {
      document.getElementById("primary-hover").value = data.primaryHover;
      document.getElementById("primary-hover-text").value = data.primaryHover;
    }
    // ... có thể bổ sung thêm các field khác sau

    this.updateGradientDisplay("light");
    this.updateGradientDisplay("dark");
    this.updateGradientDisplay("preloader");
  },
};
