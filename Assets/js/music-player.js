// ====================== MUSIC PLAYER.JS - Final Fix Auto Restore ======================

let musicPlayer = null;
let isPlaying = false;

const MusicPlayer = {
  init() {
    this.bindEvents();
    this.restoreSavedMusic(); // Quan trọng nhất
    console.log(
      "%c🎵 Music Player - Final Auto Restore Fixed 🌸",
      "color: #ff9edb; font-weight: bold;",
    );
  },

  bindEvents() {
    const toggleBtn = document.getElementById("music-toggle");
    const changeBtn = document.getElementById("change-music-btn");

    if (toggleBtn) toggleBtn.addEventListener("click", () => this.togglePlay());
    if (changeBtn)
      changeBtn.addEventListener("click", () => this.showMusicModal());

    // Modal events
    document
      .getElementById("close-music-modal")
      .addEventListener("click", () => this.hideMusicModal());
    document
      .getElementById("cancel-music-btn")
      .addEventListener("click", () => this.hideMusicModal());
    document
      .getElementById("add-music-btn")
      .addEventListener("click", () => this.addMusicFromInput());
  },

  showMusicModal() {
    document.getElementById("music-link-modal").classList.add("active");
    document.getElementById("music-url-input").focus();
  },

  hideMusicModal() {
    document.getElementById("music-link-modal").classList.remove("active");
  },

  addMusicFromInput() {
    const url = document.getElementById("music-url-input").value.trim();
    this.hideMusicModal();

    if (!url) return;

    const videoId = this.extractVideoId(url);
    if (videoId) {
      this.loadMusic(videoId);
    } else {
      alert("Link YouTube không hợp lệ!");
    }
  },

  loadMusic(videoId) {
    document.getElementById("music-title").textContent = "Đang tải...";

    if (musicPlayer) {
      musicPlayer.loadVideoById(videoId);
      musicPlayer.playVideo();
    } else {
      this.createPlayer(videoId, true); // true = tự động phát
    }

    localStorage.setItem("musicVideoId", videoId);
  },

  createPlayer(videoId, autoPlay = false) {
    if (typeof YT === "undefined") return;

    musicPlayer = new YT.Player("youtube-music-player", {
      height: "0",
      width: "0",
      videoId: videoId,
      playerVars: {
        autoplay: 0,
        controls: 0,
        disablekb: 1,
        fs: 0,
        modestbranding: 1,
        rel: 0,
        showinfo: 0,
        iv_load_policy: 3,
      },
      events: {
        onReady: (event) => {
          const savedVol = localStorage.getItem("musicVolume") || "65";
          event.target.setVolume(parseInt(savedVol));

          const title = event.target.getVideoData().title || "YouTube Music";
          document.getElementById("music-title").textContent = title;
          localStorage.setItem("musicTitle", title);

          if (autoPlay) {
            setTimeout(() => event.target.playVideo(), 800);
          }
        },
        onStateChange: (event) => {
          if (event.data === YT.PlayerState.PLAYING) {
            isPlaying = true;
            this.muteHeroVideo(true);
          } else if (
            event.data === YT.PlayerState.PAUSED ||
            event.data === YT.PlayerState.ENDED
          ) {
            isPlaying = false;
            this.muteHeroVideo(false);
          }
          this.updateUI();
        },
      },
    });
  },

  muteHeroVideo(mute) {
    if (window.heroPlayer && typeof window.heroPlayer.mute === "function") {
      mute ? window.heroPlayer.mute() : window.heroPlayer.unMute();
    }
  },

  togglePlay() {
    // Nếu chưa có player nhưng có dữ liệu lưu → tạo lại player
    if (!musicPlayer) {
      const savedId = localStorage.getItem("musicVideoId");
      if (savedId) {
        this.createPlayer(savedId, true); // Tự động phát
        return;
      } else {
        this.showMusicModal(); // Không có dữ liệu thì mới hiện modal
        return;
      }
    }

    // Bình thường toggle play/pause
    isPlaying ? musicPlayer.pauseVideo() : musicPlayer.playVideo();
  },

  updateUI() {
    const btn = document.getElementById("music-toggle");
    if (btn) {
      btn.innerHTML = isPlaying
        ? '<i class="fas fa-pause"></i>'
        : '<i class="fas fa-play"></i>';
    }
    localStorage.setItem("musicWasPlaying", isPlaying);
  },

  extractVideoId(url) {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  },

  setVolume(volume) {
    if (musicPlayer && typeof musicPlayer.setVolume === "function") {
      musicPlayer.setVolume(volume);
    }
  },

  restoreSavedMusic() {
    const savedVideoId = localStorage.getItem("musicVideoId");
    if (!savedVideoId) return;

    const savedTitle = localStorage.getItem("musicTitle") || "YouTube Music";
    const wasPlaying = localStorage.getItem("musicWasPlaying") === "true";

    document.getElementById("music-title").textContent = savedTitle;

    // Tạo player ngay khi load trang
    this.createPlayer(savedVideoId, wasPlaying);
  },
};

window.initMusicPlayer = () => MusicPlayer.init();
