// ====================== HERO.JS - ĐÃ CHỈNH MUTE THEO VOLUME ======================
// Assets/js/hero.js

let heroPlayer = null;

function initHero() {
  renderHero();

  document.addEventListener("configMainReady", () => {
    renderHero();
  });
}

function renderHero() {
  const data = ConfigMain.getHero() || {};

  const heroData = {
    youtubeId: data.youtubeId || "F_Co6qvNsUY",
    badgeIcon: data.badgeIcon || "🎨",
    badgeText: data.badgeText || "Digital Artist & Gamer",
    titlePrefix: data.titlePrefix || "Hi, I'm ",
    titleHighlight: data.titleHighlight || "Linh",
    subtitle:
      data.subtitle ||
      "Chào mừng bạn đến với thế giới của tôi — nơi nghệ thuật kỹ thuật số gặp gỡ gaming và những giấc mơ màu hồng.",
    heroImage: data.heroImage || "./Assets/Images/animegirl.png",
    btn1Text: data.btn1Text || "View My Works",
    btn1Link: data.btn1Link || "#gallery",
    btn2Text: data.btn2Text || "Learn More About Me",
    btn2Link: data.btn2Link || "#about",
  };

  const badgeIconEl = document.querySelector(".badge .badge-icon");
  const badgeTextEl = document.querySelector(".badge .badge-text");
  if (badgeIconEl) badgeIconEl.textContent = heroData.badgeIcon;
  if (badgeTextEl) badgeTextEl.textContent = heroData.badgeText;

  const titleEl = document.querySelector(".hero-title");
  if (titleEl) {
    titleEl.innerHTML = `${heroData.titlePrefix}<span class="highlight">${heroData.titleHighlight}</span>`;
  }

  const subtitleEl = document.querySelector(".hero-subtitle");
  if (subtitleEl) subtitleEl.textContent = heroData.subtitle;

  const imageEl = document.querySelector(".hero-image");
  if (imageEl) imageEl.src = heroData.heroImage;

  const buttonsContainer = document.querySelector(".hero-buttons");
  if (buttonsContainer) {
    buttonsContainer.innerHTML = `
      <a href="${heroData.btn1Link}" class="btn-primary">${heroData.btn1Text}</a>
      <a href="${heroData.btn2Link}" class="btn-secondary">${heroData.btn2Text}</a>
    `;
  }
}

function initHeroVideo() {
  if (heroPlayer) return;

  const data = ConfigMain.getHero() || {};
  const youtubeId = data.youtubeId || "F_Co6qvNsUY";

  if (typeof YT === "undefined" && !window.youtubeAPILoaded) {
    window.youtubeAPILoaded = true;
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(tag);
  }

  window.onYouTubeIframeAPIReady = () => {
    heroPlayer = new YT.Player("hero-video", {
      videoId: youtubeId,
      playerVars: {
        autoplay: 1,
        mute: 1,
        controls: 0,
        loop: 1,
        playlist: youtubeId,
        modestbranding: 1,
        rel: 0,
        playsinline: 1,
        enablejsapi: 1,
      },
      events: {
        onReady: (event) => {
          window.heroPlayer = event.target;

          const savedVol = parseInt(localStorage.getItem("videoVolume") || "0");

          // Áp dụng volume + tự động mute/unmute
          event.target.setVolume(savedVol);
          if (savedVol > 0) {
            event.target.unMute();
          } else {
            event.target.mute();
          }

          event.target.playVideo();
        },
      },
    });
  };
}

// Export
window.initHero = initHero;
window.initHeroVideo = initHeroVideo;
