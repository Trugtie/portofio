// ====================== MAIN JS ======================

document.addEventListener("DOMContentLoaded", () => {
  console.log(
    "%cLinh Portfolio - Loaded successfully 🌸",
    "color: #ff9edb; font-weight: bold; font-size: 14px;",
  );

  // Khởi tạo Gaming Section
  if (typeof initGaming === "function") {
    initGaming();
  }

  if (typeof initGallery === "function") {
    initGallery();
  }

  if (typeof initFanGallery === "function") {
    initFanGallery();
  }

  if (typeof initFooter === "function") {
    initFooter();
  }
});
