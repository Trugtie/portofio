// ====================== GALLERY.JS ======================
// Assets/js/config/gallery.js

window.ConfigMainGallery = {
  init() {
    if (!ConfigManager.galleryItems) ConfigManager.galleryItems = [];
    console.log("%c✅ Main Gallery module initialized", "color: #ff9edb");
  },

  render() {
    const container = document.getElementById("main-gallery-container");
    if (!container) return;

    if (ConfigManager.galleryItems.length === 0) {
      container.innerHTML = `<p style="opacity:0.6;text-align:center;padding:80px;">Chưa có ảnh nào.<br>Nhấn "+ Thêm Ảnh Mới"</p>`;
      return;
    }

    let html = "";
    ConfigManager.galleryItems.forEach((item, i) => {
      html += `
                <div style="border:2px solid var(--accent);padding:18px;margin-bottom:20px;border-radius:16px;background:rgba(255,255,255,0.6);">
                    <h4>Ảnh ${i + 1}</h4>
                    <div style="display:grid;grid-template-columns:1fr 1fr;gap:15px;">
                        <div><label>Title</label><input type="text" class="config-input gallery-input" data-index="${i}" data-field="title" value="${item.title || ""}"></div>
                        <div><label>Desc</label><input type="text" class="config-input gallery-input" data-index="${i}" data-field="desc" value="${item.desc || ""}"></div>
                    </div>
                    <div style="margin-top:12px;">
                        <label>Image URL</label>
                        <input type="text" class="config-input gallery-input" data-index="${i}" data-field="image" value="${item.image || ""}" style="width:100%;">
                    </div>
                    <button class="config-btn secondary" onclick="ConfigManager.modules.gallery.removeItem(${i})" style="margin-top:15px;background:#ff6b6b;color:white;">Xóa Ảnh</button>
                </div>`;
    });

    container.innerHTML = html;
    this.bindInputEvents();
  },

  bindInputEvents() {
    document.querySelectorAll(".gallery-input").forEach((input) => {
      input.addEventListener("change", (e) => {
        const i = parseInt(e.target.dataset.index);
        const f = e.target.dataset.field;
        if (ConfigManager.galleryItems[i])
          ConfigManager.galleryItems[i][f] = e.target.value.trim();
      });
    });
  },

  addNewItem() {
    if (!ConfigManager.galleryItems) ConfigManager.galleryItems = [];
    ConfigManager.galleryItems.push({
      id: Date.now(),
      title: "New Artwork",
      desc: "Digital Painting • 2025",
      image:
        "https://i.pinimg.com/736x/98/07/9a/98079a9200ba4707c2f4be763bd81345.jpg",
    });
    this.render();
  },

  removeItem(index) {
    if (confirm("Xóa ảnh này?")) {
      ConfigManager.galleryItems.splice(index, 1);
      this.render();
    }
  },

  save() {
    return ConfigManager.galleryItems;
  },

  load(data) {
    ConfigManager.galleryItems = Array.isArray(data) ? data : [];
  },
};
