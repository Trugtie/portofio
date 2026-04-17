document.addEventListener("DOMContentLoaded", () => {
  console.log(
    "%cLinh Portfolio - Loaded successfully 🌸",
    "color: #ff9edb; font-weight: bold; font-size: 14px;",
  );

  if (typeof initPreloader === "function") initPreloader();
  if (typeof initNavbar === "function") initNavbar();
  if (typeof initHero === "function") initHero();
  if (typeof initAbout === "function") initAbout();
  if (typeof initGaming === "function") initGaming();
  if (typeof initGallery === "function") initGallery();
  if (typeof initFanGallery === "function") initFanGallery();
  if (typeof initSettings === "function") initSettings();
  if (typeof initBackToTop === "function") initBackToTop();
  if (typeof initMusicPlayer === "function") initMusicPlayer();

  console.log(
    "%c✅ All modules initialized from main.js",
    "color: #ff9edb; font-weight: bold;",
  );
});
