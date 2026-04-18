// ====================== PRELOADER.JS - Auto Scroll to Top After Loading ======================

const Preloader = {
  init() {
    const preloader = document.getElementById("preloader");
    const startBtn = document.getElementById("preloader-start-btn");
    const progressContainer = document.getElementById("progress-container");
    const progressFill = document.getElementById("progress-fill");
    const progressText = document.getElementById("progress-text");

    if (!preloader || !startBtn) return;

   
    this.lockScroll();

    startBtn.addEventListener("click", () => {
      this.startLoading(
        preloader,
        startBtn,
        progressContainer,
        progressFill,
        progressText,
      );
    });
  },

  lockScroll() {
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
  },

  unlockScroll() {
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
  },

  startLoading(
    preloader,
    startBtn,
    progressContainer,
    progressFill,
    progressText,
  ) {
    startBtn.style.display = "none";
    progressContainer.classList.remove("hidden");

    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 13 + 9;

      if (progress > 100) progress = 100;

      progressFill.style.width = `${progress}%`;
      progressText.textContent = `Đang tải... ${Math.floor(progress)}%`;

      if (progress >= 100) {
        clearInterval(interval);

        setTimeout(() => {
          preloader.classList.add("hidden");

          setTimeout(() => {
            this.unlockScroll();

            if (typeof initHeroVideo === "function") {
              initHeroVideo();
            }
          }, 800);
        }, 500);
      }
    }, 75);
  },
};

window.initPreloader = () => Preloader.init();
