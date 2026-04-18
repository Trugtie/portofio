// ====================== ABOUT CONFIG ======================
// Assets/js/config/about.js

window.ConfigAbout = {
  defaultData: {
    aboutText:
      "Linh là một Digital Artist & Gamer người Việt Nam yêu thích sự kết hợp giữa nghệ thuật anime và gaming. Tôi tạo ra những thiết kế hiện đại, trẻ trung với chút vibe Nhật Bản.",
    profileImage: "./Assets/Images/Avatar.gif",
    aboutMeBg:
      "https://i.pinimg.com/736x/74/60/a1/7460a1cae8d0a02eb59933ddea60df29.jpg",
    hobbyBg:
      "https://i.pinimg.com/736x/a6/fe/52/a6fe52829cdcdeb359cb810445f45dbe.jpg",
    hobbies: [
      "Watching Anime",
      "Anime Drawing",
      "Cosplay",
      "League of Legends",
      "Gaming",
      "Chilling With Friends",
    ],
    hobbyStyles: [
      { background: "#ff9edb", borderColor: "#ff6ec4" },
      { background: "#c79fff", borderColor: "#a46dff" },
      { background: "#9be4ff", borderColor: "#5ab8ff" },
      { background: "#ffcc80", borderColor: "#ff9e40" },
      { background: "#b5ff9e", borderColor: "#7be85e" },
      { background: "#ff9edb", borderColor: "#e0bbff" },
    ],
  },

  hobbiesData: [],

  init() {
    console.log("%c✅ About module initialized", "color: #ff9edb");
    this.resetToDefault();
  },

  resetToDefault() {
    this.hobbiesData = this.defaultData.hobbies.map((text, i) => ({
      text: text,
      background: this.defaultData.hobbyStyles[i].background,
      borderColor: this.defaultData.hobbyStyles[i].borderColor,
    }));
  },

  render() {
    this.loadDefaultToForm();
    this.renderHobbyList();
  },

  // ====================== SAVE ======================
  save() {
    const hobbies = [];
    const hobbyStyles = [];

    document.querySelectorAll(".hobby-item").forEach((item) => {
      const text = item.querySelector(".hobby-text").value.trim();
      const bg = item.querySelector(".hobby-bg").value.trim();
      const border = item.querySelector(".hobby-border").value.trim();

      if (text) {
        hobbies.push(text);
        hobbyStyles.push({
          background: bg || "#ff9edb",
          borderColor: border || "#ff6ec4",
        });
      }
    });

    return {
      aboutText:
        document.getElementById("about-text")?.value.trim() ||
        this.defaultData.aboutText,
      profileImage:
        document.getElementById("about-profile-image")?.value.trim() ||
        this.defaultData.profileImage,
      hobbies: hobbies,
      hobbyStyles: hobbyStyles,
      aboutMeBg:
        document.getElementById("about-me-bg")?.value.trim() ||
        this.defaultData.aboutMeBg,
      hobbyBg:
        document.getElementById("hobby-bg")?.value.trim() ||
        this.defaultData.hobbyBg,
    };
  },

  // ====================== LOAD ======================
  load(data) {
    if (!data) {
      this.resetToDefault();
      this.loadDefaultToForm();
      this.renderHobbyList();
      return;
    }

    // Load các trường cơ bản
    document.getElementById("about-text").value =
      data.aboutText || this.defaultData.aboutText;
    document.getElementById("about-profile-image").value =
      data.profileImage || this.defaultData.profileImage;
    if (document.getElementById("about-me-bg"))
      document.getElementById("about-me-bg").value =
        data.aboutMeBg || this.defaultData.aboutMeBg;
    if (document.getElementById("hobby-bg"))
      document.getElementById("hobby-bg").value =
        data.hobbyBg || this.defaultData.hobbyBg;

    // Load hobby list
    if (Array.isArray(data.hobbies) && data.hobbies.length > 0) {
      this.hobbiesData = data.hobbies.map((text, i) => ({
        text: text,
        background:
          (data.hobbyStyles &&
            data.hobbyStyles[i] &&
            data.hobbyStyles[i].background) ||
          "#ff9edb",
        borderColor:
          (data.hobbyStyles &&
            data.hobbyStyles[i] &&
            data.hobbyStyles[i].borderColor) ||
          "#ff6ec4",
      }));
    } else {
      this.resetToDefault();
    }

    this.renderHobbyList();
  },

  loadDefaultToForm() {
    document.getElementById("about-text").value = this.defaultData.aboutText;
    document.getElementById("about-profile-image").value =
      this.defaultData.profileImage;
    if (document.getElementById("about-me-bg"))
      document.getElementById("about-me-bg").value = this.defaultData.aboutMeBg;
    if (document.getElementById("hobby-bg"))
      document.getElementById("hobby-bg").value = this.defaultData.hobbyBg;
  },

  renderHobbyList() {
    const container = document.getElementById("hobby-list-container");
    if (!container) return;

    let html = "";

    this.hobbiesData.forEach((item, index) => {
      html += `
        <div class="hobby-item" style="border: 2px solid var(--accent); padding: 16px; margin-bottom: 16px; border-radius: 12px; background: rgba(255,255,255,0.6);">
          <input type="text" class="config-input hobby-text" value="${item.text}" style="width: 100%; margin-bottom: 12px;" placeholder="Tên hobby">

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
            <div>
              <label>Background Color</label>
              <div class="color-picker" style="display:flex; gap:8px; align-items:center;">
                <input type="color" class="hobby-bg-color" value="${item.background}" style="width:50px; height:40px; padding:3px; border:2px solid var(--border);">
                <input type="text" class="config-input hobby-bg" value="${item.background}" style="flex:1;">
              </div>
            </div>
            <div>
              <label>Border Color</label>
              <div class="color-picker" style="display:flex; gap:8px; align-items:center;">
                <input type="color" class="hobby-border-color" value="${item.borderColor}" style="width:50px; height:40px; padding:3px; border:2px solid var(--border);">
                <input type="text" class="config-input hobby-border" value="${item.borderColor}" style="flex:1;">
              </div>
            </div>
          </div>

          <button class="config-btn secondary" onclick="ConfigManager.modules.about.removeHobby(${index})" 
                  style="margin-top: 12px; background:#ff6b6b; color:white;">Xóa Hobby</button>
        </div>
      `;
    });

    container.innerHTML =
      html ||
      `<p style="opacity:0.6; text-align:center; padding:50px;">Chưa có hobby nào</p>`;

    this.bindColorSync();
  },

  bindColorSync() {
    document.querySelectorAll(".hobby-item").forEach((item) => {
      const colorPicker = item.querySelector(".hobby-bg-color");
      const textInput = item.querySelector(".hobby-bg");
      const borderPicker = item.querySelector(".hobby-border-color");
      const borderInput = item.querySelector(".hobby-border");

      // Background color sync
      if (colorPicker && textInput) {
        colorPicker.addEventListener("input", () => {
          textInput.value = colorPicker.value;
        });
        textInput.addEventListener("input", () => {
          colorPicker.value = textInput.value;
        });
      }

      // Border color sync
      if (borderPicker && borderInput) {
        borderPicker.addEventListener("input", () => {
          borderInput.value = borderPicker.value;
        });
        borderInput.addEventListener("input", () => {
          borderPicker.value = borderInput.value;
        });
      }
    });
  },

  addNewHobby() {
    this.hobbiesData.push({
      text: "New Hobby",
      background: "#ff9edb",
      borderColor: "#ff6ec4",
    });
    this.renderHobbyList();
  },

  removeHobby(index) {
    if (confirm("Xóa hobby này?")) {
      this.hobbiesData.splice(index, 1);
      this.renderHobbyList();
    }
  },
};
