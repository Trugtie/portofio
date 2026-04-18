// ====================== HERO.JS - Only Hero Content & Background Video ======================

let heroPlayer = null;

const heroConfig = {
  youtubeId: "F_Co6qvNsUY",
  badge: { icon: "🎨", text: "Digital Artist & Gamer" },
  title: { prefix: "Hi, I'm ", highlight: "Linh" },
  subtitle:
    "Chào mừng bạn đến với thế giới của tôi — nơi nghệ thuật kỹ thuật số gặp gỡ gaming và những giấc mơ màu hồng.",
  buttons: [
    { text: "View My Works", href: "#gallery", className: "btn-primary" },
    { text: "Learn More About Me", href: "#about", className: "btn-secondary" },
  ],
  heroImage: {
    src: "./Assets/Images/animegirl.png",
    alt: "Linh - Digital Artist & Gamer",
  },
};

function initHero() {
  renderHeroContent();
}

// Render nội dung tĩnh của Hero
function renderHeroContent() {
  const badgeIcon = document.querySelector(".badge .badge-icon");
  const badgeText = document.querySelector(".badge .badge-text");
  if (badgeIcon) badgeIcon.textContent = heroConfig.badge.icon;
  if (badgeText) badgeText.textContent = heroConfig.badge.text;

  const titleEl = document.querySelector(".hero-title");
  if (titleEl) {
    titleEl.innerHTML = `${heroConfig.title.prefix}<span class="highlight">${heroConfig.title.highlight}</span>`;
  }

  const subtitleEl = document.querySelector(".hero-subtitle");
  if (subtitleEl) subtitleEl.textContent = heroConfig.subtitle;

  const buttonsContainer = document.querySelector(".hero-buttons");
  if (buttonsContainer) {
    buttonsContainer.innerHTML = heroConfig.buttons
      .map(
        (btn) =>
          `<a href="${btn.href}" class="${btn.className}">${btn.text}</a>`,
      )
      .join("");
  }

  const imageEl = document.querySelector(".hero-image");
  if (imageEl) {
    imageEl.src = heroConfig.heroImage.src;
    imageEl.alt = heroConfig.heroImage.alt;
  }
}

// Hàm riêng để khởi tạo Video Background (được gọi từ preloader sau khi progress xong)
function initHeroVideo() {
  if (heroPlayer) return;

  if (typeof YT === "undefined" && !window.youtubeAPILoaded) {
    window.youtubeAPILoaded = true;
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(tag);
  }

  window.onYouTubeIframeAPIReady = () => {
    heroPlayer = new YT.Player("hero-video", {
      videoId: heroConfig.youtubeId,
      playerVars: {
        autoplay: 1,
        mute: 0,
        controls: 0,
        loop: 1,
        playlist: heroConfig.youtubeId,
        modestbranding: 1,
        rel: 0,
        playsinline: 1,
        enablejsapi: 1,
      },
      events: {
        onReady: (event) => {
          window.heroPlayer = event.target;
          const savedVol = localStorage.getItem("videoVolume") || "40";
          event.target.setVolume(parseInt(savedVol));
          event.target.playVideo();
        },
      },
    });
  };
}

// Export
window.initHero = initHero;
window.initHeroVideo = initHeroVideo; //
