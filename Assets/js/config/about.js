// ====================== ABOUT CONFIG - SYNC WITH CLIENT about.js ======================
window.ConfigAbout = {
  init() {
    if (!ConfigManager.about) ConfigManager.about = {};
    this.bindPreviewListeners();
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
  },

  loadFormFromData() {
    const data = ConfigManager.about || {};

    const fields = {
      "about-name": data.name || "Gia Hân",
      "about-title": data.title || "Digital Artist & Gamer",
      "about-profile-image":
        data.profileImage ||
        "https://i.pinimg.com/736x/74/60/a1/7460a1cae8d0a02eb59933ddea60df29.jpg",
      "about-bio":
        data.bio ||
        `Mình yêu thích sự kết hợp hoàn hảo giữa nghệ thuật anime dễ thương và thế giới gaming đầy màu sắc. Mỗi thiết kế mình tạo ra đều mang phong cách hiện đại, trẻ trung, và một chút vibe Nhật Bản ngọt ngào như hoa anh đào bay trong gió 🌸✨`,
      "hobby-subtitle":
        data.hobbySubtitle || "Những điều mình yêu thích mỗi ngày",
    };

    Object.keys(fields).forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.value = fields[id];
    });
  },

  save() {
    return {
      name: document.getElementById("about-name")?.value.trim() || "Gia Hân",
      title:
        document.getElementById("about-title")?.value.trim() ||
        "Digital Artist & Gamer",
      profileImage:
        document.getElementById("about-profile-image")?.value.trim() || "",
      bio: document.getElementById("about-bio")?.value.trim() || "",
      hobbySubtitle:
        document.getElementById("hobby-subtitle")?.value.trim() || "",
      // hobbies KHÔNG lưu vì client luôn dùng default
    };
  },

  load(data) {
    if (!data) return;
    ConfigManager.about = { ...data };
    this.render();
  },
};
