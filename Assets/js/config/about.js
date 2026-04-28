// ====================== ABOUT CONFIG - FULL SUPPORT + DEFAULT HOBBIES ======================
window.ConfigAbout = {
  init() {
    if (!ConfigManager.about) ConfigManager.about = {};
    this.ensureDefaultHobbies(); // ← Thêm dòng này
    this.bindPreviewListeners();
  },

  // ====================== DEFAULT HOBBIES ======================
  ensureDefaultHobbies() {
    if (
      !ConfigManager.about.hobbies ||
      ConfigManager.about.hobbies.length === 0
    ) {
      ConfigManager.about.hobbies = [
        {
          icon: "🎨",
          title: "Vẽ Anime",
          desc: "Mình thích vẽ những nhân vật dễ thương, màu sắc tươi sáng và đầy cảm xúc.",
        },
        {
          icon: "🎮",
          title: "Chơi Game",
          desc: "League of Legends (Master), Genshin Impact, Teamfight Tactics và nhiều game khác.",
        },
        {
          icon: "🌸",
          title: "Cosplay",
          desc: "Hóa thân thành các nhân vật anime yêu thích và chụp ảnh.",
        },
        {
          icon: "📺",
          title: "Xem Anime",
          desc: "Your Name, Weathering With You, Spy x Family, Jujutsu Kaisen...",
        },
        {
          icon: "☕",
          title: "Chill với bạn bè",
          desc: "Ngồi cà phê, trò chuyện và tạo ra những kỷ niệm đẹp.",
        },
        {
          icon: "🎵",
          title: "Nghe nhạc",
          desc: "Anime OST, nhạc Nhật Bản và những bản ballad nhẹ nhàng.",
        },
      ];
    }
  },

  bindPreviewListeners() {
    const profileInput = document.getElementById("about-profile-image");
    if (profileInput) {
      profileInput.addEventListener("input", () => this.updateProfilePreview());
    }
  },

  updateProfilePreview() {
    const url = document.getElementById("about-profile-image")?.value?.trim();
    const container = document.getElementById("profile-image-preview");
    if (!container) return;

    if (url) {
      container.innerHTML = `
        <img src="${url}" 
             style="max-width:100%; max-height:260px; border-radius:50%; box-shadow:0 10px 30px rgba(0,0,0,0.25); object-fit:cover;" 
             onerror="this.style.display='none'; this.parentElement.innerHTML += '<p style=\'color:#ff6b6b;text-align:center;\'>❌ Không tải được ảnh</p>'">
      `;
    } else {
      container.innerHTML = `<p style="color:#888; text-align:center;">Chưa có URL ảnh</p>`;
    }
  },

  render() {
    this.loadFormFromData();
    setTimeout(() => this.updateProfilePreview(), 100);
    this.renderHobbies();
  },

  loadFormFromData() {
    const data = ConfigManager.about || {};

    const fields = {
      "about-name": data.name || "Gia Hân",
      "about-title": data.title || "Digital Artist & Gamer",
      "about-profile-image":
        data.profileImage ||
        "https://i.pinimg.com/736x/74/60/a1/7460a1cae8d0a02eb59933ddea60df29.jpg",
      "about-greeting":
        data.greeting ||
        "❤️ Xin chào! Mình là Gia Hân — Digital Artist & Gamer nhó xíu đến từ Việt Nam ❤️",
      "about-bio":
        data.bio ||
        `Mình yêu thích sự kết hợp hoàn hảo giữa nghệ thuật anime dễ thương và thế giới gaming đầy màu sắc. Mỗi thiết kế mình tạo ra đều mang phong cách hiện đại, trẻ trung, và một chút vibe Nhật Bản ngọt ngào như hoa anh đào bay trong gió 🌸✨`,
      "about-invite":
        data.invite || "Hãy cùng mình lan tỏa những giấc mơ màu hồng nhé! 😊",
      "about-thanks": data.thanks || "Cảm ơn bạn đã ghé thăm! ❤️",
      "hobby-subtitle":
        data.hobbySubtitle || "Những điều mình yêu thích mỗi ngày",
    };

    Object.keys(fields).forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.value = fields[id];
    });
  },

  renderHobbies() {
    const container = document.getElementById("hobbies-container");
    if (!container) return;

    let html = "";
    (ConfigManager.about.hobbies || []).forEach((h, i) => {
      html += `
        <div style="border:2px solid var(--accent); padding:18px; margin-bottom:15px; border-radius:14px; background:rgba(255,255,255,0.6); display:grid; grid-template-columns:80px 1fr 1fr 60px; gap:12px; align-items:center;">
          <div>
            <label>Icon</label>
            <input type="text" class="config-input hobby-input" data-index="${i}" data-field="icon" value="${h.icon || "🎨"}" style="width:100%;">
          </div>
          <div>
            <label>Title</label>
            <input type="text" class="config-input hobby-input" data-index="${i}" data-field="title" value="${h.title || ""}">
          </div>
          <div>
            <label>Description</label>
            <input type="text" class="config-input hobby-input" data-index="${i}" data-field="desc" value="${h.desc || ""}">
          </div>
          <button class="config-btn secondary" onclick="ConfigManager.modules.about.removeHobby(${i})" 
                  style="background:#ff6b6b;color:white;">Xóa</button>
        </div>`;
    });

    container.innerHTML =
      html ||
      `<p style="opacity:0.6;text-align:center;padding:40px;">Chưa có hobby nào. Nhấn nút "+ Thêm Hobby Mới"</p>`;

    document.querySelectorAll(".hobby-input").forEach((inp) => {
      inp.addEventListener("input", (e) => {
        const i = parseInt(e.target.dataset.index);
        const f = e.target.dataset.field;
        if (ConfigManager.about.hobbies[i]) {
          ConfigManager.about.hobbies[i][f] = e.target.value.trim();
        }
      });
    });
  },

  addHobby() {
    if (!ConfigManager.about.hobbies) ConfigManager.about.hobbies = [];
    ConfigManager.about.hobbies.push({
      icon: "🎨",
      title: "New Hobby",
      desc: "Mô tả hobby...",
    });
    this.renderHobbies();
  },

  removeHobby(index) {
    if (confirm("Xóa hobby này?")) {
      ConfigManager.about.hobbies.splice(index, 1);
      this.renderHobbies();
    }
  },

  save() {
    return {
      name: document.getElementById("about-name")?.value.trim() || "Gia Hân",
      title:
        document.getElementById("about-title")?.value.trim() ||
        "Digital Artist & Gamer",
      profileImage:
        document.getElementById("about-profile-image")?.value.trim() || "",
      greeting: document.getElementById("about-greeting")?.value.trim() || "",
      bio: document.getElementById("about-bio")?.value.trim() || "",
      invite: document.getElementById("about-invite")?.value.trim() || "",
      thanks: document.getElementById("about-thanks")?.value.trim() || "",
      hobbySubtitle:
        document.getElementById("hobby-subtitle")?.value.trim() || "",
      hobbies: ConfigManager.about.hobbies || [],
    };
  },

  load(data) {
    if (!data) return;
    ConfigManager.about = { ...data };
    this.ensureDefaultHobbies(); //
    this.render();
  },
};
