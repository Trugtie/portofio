// ====================== HERO CONFIG - WITH PREVIEW ======================
// Assets/js/config/hero.js

window.ConfigHero = {
  init() {
    this.bindPreviewListeners();
  },

  bindPreviewListeners() {
    // YouTube Preview
    const ytInput = document.getElementById("hero-youtube");
    if (ytInput) {
      ytInput.addEventListener("input", () => this.updateYouTubePreview());
    }

    // Hero Image Preview
    const imageInput = document.getElementById("hero-image");
    if (imageInput) {
      imageInput.addEventListener("input", () => this.updateHeroImagePreview());
    }
  },

  // ====================== YOUTUBE PREVIEW ======================
  updateYouTubePreview() {
    const videoId = document.getElementById("hero-youtube").value.trim();
    const container = document.getElementById("youtube-preview");

    if (!videoId) {
      container.innerHTML = `<p style="color:#888; text-align:center;">Nhập Video ID để xem thumbnail</p>`;
      return;
    }

    const thumb = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
    container.innerHTML = `
      <p style="margin-bottom:8px; font-weight:600; color:#6b4e9e;">YouTube Background Preview:</p>
      <img src="${thumb}" 
           style="width:100%; border-radius:12px; box-shadow:0 8px 25px rgba(0,0,0,0.15);" 
           onerror="this.src='https://via.placeholder.com/640x360/2d1b4a/ffffff?text=Video+Not+Found';">
      <small style="display:block; margin-top:8px; color:#666;">ID: ${videoId}</small>
    `;
  },

  // ====================== HERO IMAGE PREVIEW ======================
  updateHeroImagePreview() {
    const url = document.getElementById("hero-image").value.trim();
    const container = document.getElementById("hero-image-preview");

    if (!url) {
      container.innerHTML = `<p style="color:#888; text-align:center;">Chưa có URL ảnh</p>`;
      return;
    }

    container.innerHTML = `
      <p style="margin-bottom:8px; font-weight:600; color:#6b4e9e;">Hero Image Preview:</p>
      <img src="${url}" 
           style="max-width:100%; max-height:240px; border-radius:12px; box-shadow:0 8px 25px rgba(0,0,0,0.15); object-fit:contain; background:#f8f1eb;"
           onerror="this.style.display='none'; this.parentElement.innerHTML += '<p style=\'color:#ff6b6b; text-align:center;\'>❌ Không tải được ảnh</p>'">
    `;
  },

  // ====================== SAVE ======================
  save() {
    return {
      youtubeId: document.getElementById("hero-youtube")?.value.trim() || "",
      badgeIcon:
        document.getElementById("hero-badge-icon")?.value.trim() || "🎨",
      badgeText: document.getElementById("hero-badge-text")?.value.trim() || "",
      titlePrefix:
        document.getElementById("hero-title-prefix")?.value || "Hi, I'm ",
      titleHighlight:
        document.getElementById("hero-title-highlight")?.value || "Linh",
      subtitle: document.getElementById("hero-subtitle")?.value.trim() || "",
      heroImage:
        document.getElementById("hero-image")?.value.trim() ||
        "./Assets/Images/animegirl.png",
      btn1Text:
        document.getElementById("btn1-text")?.value.trim() || "View My Works",
      btn1Link:
        document.getElementById("btn1-link")?.value.trim() || "#gallery",
      btn2Text:
        document.getElementById("btn2-text")?.value.trim() ||
        "Learn More About Me",
      btn2Link: document.getElementById("btn2-link")?.value.trim() || "#about",
    };
  },

  // ====================== LOAD ======================
  load(data) {
    if (!data) return;

    const fields = {
      "hero-youtube": data.youtubeId,
      "hero-badge-icon": data.badgeIcon,
      "hero-badge-text": data.badgeText,
      "hero-title-prefix": data.titlePrefix,
      "hero-title-highlight": data.titleHighlight,
      "hero-subtitle": data.subtitle,
      "hero-image": data.heroImage,
      "btn1-text": data.btn1Text,
      "btn1-link": data.btn1Link,
      "btn2-text": data.btn2Text,
      "btn2-link": data.btn2Link,
    };

    Object.keys(fields).forEach((id) => {
      const el = document.getElementById(id);
      if (el && fields[id] !== undefined) el.value = fields[id];
    });

    // Cập nhật preview sau khi load
    setTimeout(() => {
      this.updateYouTubePreview();
      this.updateHeroImagePreview();
    }, 150);
  },
};
