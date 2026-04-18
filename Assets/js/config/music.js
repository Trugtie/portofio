// ====================== MUSIC.JS ======================
// Assets/js/config/music.js

window.ConfigMusic = {
  init() {
    if (!ConfigManager.musicConfig) ConfigManager.musicConfig = {};
    this.bindVolumeSliders();
  },

  bindVolumeSliders() {
    const m = document.getElementById("default-music-volume");
    const v = document.getElementById("default-video-volume");
    if (m)
      m.addEventListener(
        "input",
        () =>
          (document.getElementById("music-vol-value").textContent =
            m.value + "%"),
      );
    if (v)
      v.addEventListener(
        "input",
        () =>
          (document.getElementById("video-vol-value").textContent =
            v.value + "%"),
      );
  },

  save() {
    return {
      defaultVideoId:
        document.getElementById("default-music-id")?.value.trim() || "",
      defaultTitle:
        document.getElementById("default-music-title")?.value.trim() || "",
      defaultMusicVolume: parseInt(
        document.getElementById("default-music-volume")?.value || 65,
      ),
      defaultVideoVolume: parseInt(
        document.getElementById("default-video-volume")?.value || 30,
      ),
      autoPlay: document.getElementById("music-autoplay")?.value === "true",
    };
  },

  load(data) {
    if (!data) return;
    if (document.getElementById("default-music-id"))
      document.getElementById("default-music-id").value =
        data.defaultVideoId || "";
    if (document.getElementById("default-music-title"))
      document.getElementById("default-music-title").value =
        data.defaultTitle || "";
    if (document.getElementById("default-music-volume")) {
      document.getElementById("default-music-volume").value =
        data.defaultMusicVolume || 65;
      document.getElementById("music-vol-value").textContent =
        (data.defaultMusicVolume || 65) + "%";
    }
    if (document.getElementById("default-video-volume")) {
      document.getElementById("default-video-volume").value =
        data.defaultVideoVolume || 30;
      document.getElementById("video-vol-value").textContent =
        (data.defaultVideoVolume || 30) + "%";
    }
    if (document.getElementById("music-autoplay"))
      document.getElementById("music-autoplay").value = data.autoPlay
        ? "true"
        : "false";
  },
};
