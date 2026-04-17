// ====================== SETTINGS.JS - Dark Mode + Video Volume + Music Volume ======================

let ytPlayer = null; // Nếu bạn vẫn giữ video background

const Settings = {
  init() {
    this.modal = document.getElementById("settings-modal");
    if (!this.modal) return;

    this.themeToggle = document.getElementById("theme-toggle");
    this.themeStatus = document.getElementById("theme-status");
    this.volumeSlider = document.getElementById("volume-slider"); // ← Slider Âm nhạc
    this.volumeValue = document.getElementById("volume-value");
    this.videoVolumeSlider = document.getElementById("video-volume-slider");
    this.videoVolumeValue = document.getElementById("video-volume-value");

    this.bindEvents();
    this.loadSavedSettings();

    console.log(
      "%c⚙️ Settings loaded with Music & Video Volume 🌸",
      "color: #ff9edb; font-weight: bold;",
    );
  },

  bindEvents() {
    const contactBtn = document.getElementById("contact-btn");
    if (contactBtn) {
      contactBtn.addEventListener("click", (e) => {
        e.preventDefault();
        this.openModal();
      });
    }

    document
      .getElementById("close-settings")
      .addEventListener("click", () => this.closeModal());
    this.modal.addEventListener("click", (e) => {
      if (e.target === this.modal) this.closeModal();
    });

    this.themeToggle.addEventListener("change", () => this.toggleTheme());

    // Slider Âm nhạc (Music Player)
    this.volumeSlider.addEventListener("input", () => this.updateMusicVolume());

    // Slider Video Background
    if (this.videoVolumeSlider) {
      this.videoVolumeSlider.addEventListener("input", () =>
        this.updateVideoVolume(),
      );
    }

    document.getElementById("btn-config-page").addEventListener("click", () => {
      this.closeModal();
      window.location.href = "./config.html";
    });

    document.getElementById("btn-back-home").addEventListener("click", () => {
      this.closeModal();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  },

  // ====================== MUSIC VOLUME ======================
  updateMusicVolume() {
    const vol = parseInt(this.volumeSlider.value);
    this.volumeValue.textContent = vol + "%";
    localStorage.setItem("musicVolume", vol);

    if (musicPlayer && typeof musicPlayer.setVolume === "function") {
      musicPlayer.setVolume(vol);
      console.log(`🎵 Music volume → ${vol}%`);
    }
  },

  // ====================== VIDEO VOLUME ======================
  updateVideoVolume() {
    const vol = parseInt(this.videoVolumeSlider.value);
    this.videoVolumeValue.textContent = vol + "%";
    localStorage.setItem("videoVolume", vol);

    if (
      window.heroPlayer &&
      typeof window.heroPlayer.setVolume === "function"
    ) {
      window.heroPlayer.setVolume(vol);
      console.log(`🎥 Video volume → ${vol}%`);
    }
  },

  openModal() {
    this.modal.classList.add("active");
    document.body.style.overflow = "hidden";
  },

  closeModal() {
    this.modal.classList.remove("active");
    document.body.style.overflow = "visible";
  },

  toggleTheme() {
    const isDark = this.themeToggle.checked;
    document.documentElement.setAttribute(
      "data-theme",
      isDark ? "dark" : "light",
    );
    this.themeStatus.textContent = isDark ? "Dark Mode" : "Light Mode";
    localStorage.setItem("theme", isDark ? "dark" : "light");
  },

  loadSavedSettings() {
    // Theme
    const savedTheme = localStorage.getItem("theme") || "light";
    const isDark = savedTheme === "dark";
    this.themeToggle.checked = isDark;
    document.documentElement.setAttribute("data-theme", savedTheme);
    this.themeStatus.textContent = isDark ? "Dark Mode" : "Light Mode";

    // Music Volume
    const savedMusicVol = localStorage.getItem("musicVolume") || "65";
    this.volumeSlider.value = savedMusicVol;
    this.volumeValue.textContent = savedMusicVol + "%";

    // Video Volume
    const savedVideoVol = localStorage.getItem("videoVolume") || "30";
    if (this.videoVolumeSlider) {
      this.videoVolumeSlider.value = savedVideoVol;
      this.videoVolumeValue.textContent = savedVideoVol + "%";
    }
  },
};

window.initSettings = () => Settings.init();
