// ====================== MUSIC PLAYER.JS - Rút gọn tên bài hát + Auto Restore ======================

let musicPlayer = null;
let isPlaying = false;

const MusicPlayer = {
  init() {
    this.bindEvents();
    this.restoreSavedMusic();
  },

  bindEvents() {
    const toggleBtn = document.getElementById("music-toggle");
    const changeBtn = document.getElementById("change-music-btn");

    if (toggleBtn) toggleBtn.addEventListener("click", () => this.togglePlay());
    if (changeBtn)
      changeBtn.addEventListener("click", () => this.showMusicModal());

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

  // ====================== RÚT GỌN TÊN BÀI HÁT ======================
  shortenTitle(title) {
    if (!title) return "YouTube Music";
    const maxLength = 28;

    if (title.length <= maxLength) return title;
    return title.substring(0, maxLength).trim() + "...";
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
      this.createPlayer(videoId, true);
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

          const fullTitle =
            event.target.getVideoData().title || "YouTube Music";

          const shortTitle = this.shortenTitle(fullTitle);

          document.getElementById("music-title").textContent = shortTitle;
          localStorage.setItem("musicTitle", fullTitle); 

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
    if (!musicPlayer) {
      const savedId = localStorage.getItem("musicVideoId");
      if (savedId) {
        this.createPlayer(savedId, true);
        return;
      } else {
        this.showMusicModal();
        return;
      }
    }

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

    // Rút gọn tên khi restore
    const shortTitle = this.shortenTitle(savedTitle);
    document.getElementById("music-title").textContent = shortTitle;

    this.createPlayer(savedVideoId, wasPlaying);
  },
};

window.initMusicPlayer = () => MusicPlayer.init();
