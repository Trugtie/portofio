// ====================== MAIN GALLERY CONFIG WITH IMAGE PREVIEW ======================
// Assets/js/config/gallery.js

window.ConfigMainGallery = {
  init() {
    console.log(
      "%c✅ Main Gallery module initialized with Preview",
      "color: #ff9edb",
    );
    this.ensureDefaultData();
  },

  ensureDefaultData() {
    if (
      !ConfigManager.galleryItems ||
      ConfigManager.galleryItems.length === 0
    ) {
      ConfigManager.galleryItems = [
        {
          id: 1,
          title: "Sakura Bloom",
          desc: "Digital Painting • 2025",
          image:
            "https://i.pinimg.com/736x/98/07/9a/98079a9200ba4707c2f4be763bd81345.jpg",
        },
        {
          id: 2,
          title: "Neon Waifu",
          desc: "Character Illustration",
          image:
            "https://i.pinimg.com/736x/bc/13/98/bc139837af1b0971b891467675be83fd.jpg",
        },
        {
          id: 3,
          title: "Raiden Shogun",
          desc: "Genshin Impact Fanart",
          image:
            "https://i.pinimg.com/736x/25/52/80/25528003516c9984fe747a59553e460a.jpg",
        },
        {
          id: 4,
          title: "Midnight Gaming",
          desc: "League of Legends Scene",
          image:
            "https://i.pinimg.com/736x/cc/e7/d1/cce7d13b3392c76036be2e5def158b02.jpg",
        },
        {
          id: 5,
          title: "Soft Pastel Girl",
          desc: "Original Character",
          image:
            "https://i.pinimg.com/736x/b1/1b/28/b11b28e99d63dc22d6d2ff2a05a860cd.jpg",
        },
        {
          id: 6,
          title: "Cyber Sakura",
          desc: "Anime Style Portrait",
          image:
            "https://i.pinimg.com/736x/a2/91/af/a291af69d304d1e58fb1abe2896a69da.jpg",
        },
        {
          id: 7,
          title: "Valorant Duelist",
          desc: "Fan Art",
          image:
            "https://i.pinimg.com/1200x/4b/4f/fd/4b4ffdaa5a9c7d6ef841f26b0ce3854e.jpg",
        },
        {
          id: 8,
          title: "Dreamy Aesthetic",
          desc: "Artwork",
          image:
            "https://i.pinimg.com/736x/72/2b/8a/722b8a193f25cad3117d47904956a39b.jpg",
        },
        {
          id: 9,
          title: "Glassy Girl",
          desc: "Artwork",
          image:
            "https://i.pinimg.com/736x/f3/b2/b8/f3b2b8c671788f14d081f57dacbfd1d0.jpg",
        },
        {
          id: 10,
          title: "Glassy Girl",
          desc: "Artwork",
          image:
            "https://i.pinimg.com/736x/fb/52/3e/fb523ee9c66f951c15c62f9fa6901227.jpg",
        },
        {
          id: 11,
          title: "Glassy Girl",
          desc: "Artwork",
          image:
            "https://i.pinimg.com/736x/7c/b7/94/7cb794cde0c90cc66f32680488aa6ba4.jpg",
        },
        {
          id: 12,
          title: "Glassy Girl",
          desc: "Artwork",
          image:
            "https://i.pinimg.com/1200x/c1/a2/a9/c1a2a9935d9a3af2aee26feec457efca.jpg",
        },
      ];
    }
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
        <div style="border:2px solid var(--accent); padding:18px; margin-bottom:20px; border-radius:16px; background:rgba(255,255,255,0.6); position:relative;">
          <h4>Ảnh ${i + 1}</h4>
          
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:15px; margin-bottom:12px;">
            <div>
              <label>Title</label>
              <input type="text" class="config-input gallery-input" data-index="${i}" data-field="title" value="${item.title || ""}">
            </div>
            <div>
              <label>Description</label>
              <input type="text" class="config-input gallery-input" data-index="${i}" data-field="desc" value="${item.desc || ""}">
            </div>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
            <div>
              <label>Image URL</label>
              <input type="text" class="config-input gallery-input" 
                     data-index="${i}" data-field="image" 
                     value="${item.image || ""}" style="width:100%;">
            </div>
            <div id="gallery-preview-${i}" 
                 style="background: #f8f1eb; border: 2px dashed var(--accent); border-radius: 12px; 
                        min-height: 180px; display: flex; align-items: center; justify-content: center; overflow: hidden;">
              <!-- Preview ảnh sẽ hiện ở đây -->
            </div>
          </div>

          <!-- Nút Xóa Ảnh -->
          <button class="config-btn secondary" 
                  onclick="ConfigManager.modules.gallery.removeItem(${i})" 
                  style="margin-top:15px; background:#ff6b6b; color:white; position:absolute; top:15px; right:15px;">
            Xóa Ảnh
          </button>
        </div>`;
    });

    container.innerHTML = html;
    this.bindInputEvents();
    this.bindPreviewListeners();

    // Force update preview sau khi render
    setTimeout(() => {
      ConfigManager.galleryItems.forEach((_, i) => this.updatePreview(i));
    }, 300);
  },

  bindInputEvents() {
    document.querySelectorAll(".gallery-input").forEach((input) => {
      input.addEventListener("input", (e) => {
        const i = parseInt(e.target.dataset.index);
        const f = e.target.dataset.field;
        if (ConfigManager.galleryItems[i]) {
          ConfigManager.galleryItems[i][f] = e.target.value.trim();
        }
      });
    });
  },

  // ====================== PREVIEW ẢNH ======================
  bindPreviewListeners() {
    document
      .querySelectorAll('.gallery-input[data-field="image"]')
      .forEach((input) => {
        input.addEventListener("input", () => {
          const index = parseInt(input.dataset.index);
          this.updatePreview(index);
        });
      });
  },

  updatePreview(index) {
    const input = document.querySelector(
      `.gallery-input[data-index="${index}"][data-field="image"]`,
    );
    const previewDiv = document.getElementById(`gallery-preview-${index}`);
    if (!input || !previewDiv) return;

    const url = input.value.trim();

    if (!url) {
      previewDiv.innerHTML = `<p style="color:#888; text-align:center; padding:40px 10px;">Chưa có URL ảnh</p>`;
      return;
    }

    previewDiv.innerHTML = `
      <img src="${url}" 
           style="max-width:100%; max-height:170px; border-radius:10px; object-fit:contain; box-shadow:0 4px 15px rgba(0,0,0,0.1);" 
           onerror="this.style.display='none'; 
                    this.parentElement.innerHTML = '<p style=\'color:#ff6b6b; text-align:center; padding:30px 10px;\'>❌ Không tải được ảnh</p>'">
    `;
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
    if (confirm("Xóa ảnh này khỏi Gallery?")) {
      ConfigManager.galleryItems.splice(index, 1);
      this.render();
    }
  },

  save() {
    return ConfigManager.galleryItems;
  },

  load(data) {
    ConfigManager.galleryItems = Array.isArray(data) ? data : [];
    if (ConfigManager.galleryItems.length === 0) {
      this.ensureDefaultData();
    }
    this.render();
  },
};
