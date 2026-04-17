// ====================== HERO.JS - Background Video Player ======================

let heroPlayer = null;

const heroConfig = {
  youtubeId: "F_Co6qvNsUY",
  badge: {
    icon: "🎨",
    text: "Digital Artist & Gamer",
  },
  title: {
    prefix: "Hi, I'm ",
    highlight: "Linh",
  },
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
  console.log("%c ✅ Hero Background Player initialized 🌸", "color: #ff9edb;");

  // Render nội dung
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

  // Khởi tạo Background Player
  initHeroBackgroundPlayer();
}

// ====================== CHUNG API LOADER ======================
function initHeroBackgroundPlayer() {
  // Nếu API chưa load thì load một lần
  if (typeof YT === "undefined" && !window.youtubeAPILoaded) {
    window.youtubeAPILoaded = true;
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(tag);
  }

  window.onYouTubeIframeAPIReady = () => {
    console.log(
      "%c🎥 YouTube IFrame API Ready - Creating Hero Player",
      "color: #ff9edb;",
    );

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
        iv_load_policy: 3,
      },
      events: {
        onReady: (event) => {
          window.heroPlayer = event.target;
          console.log(
            "%c🎥 Hero Background Player Ready",
            "color: #ff9edb; font-weight: bold;",
          );

          const savedVol = localStorage.getItem("videoVolume") || "30";
          event.target.setVolume(parseInt(savedVol));
        },
      },
    });
  };
}

window.initHero = initHero;
