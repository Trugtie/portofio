// ====================== GAMING CONFIG WITH FIXED MEDIA PREVIEW ======================
// Assets/js/config/gaming.js

window.ConfigGaming = {
  init() {
    console.log(
      "%c✅ Gaming module initialized with Fixed Media Preview",
      "color: #ff9edb",
    );
    this.ensureDefaultData();
  },

  ensureDefaultData() {
    if (!ConfigManager.gamingCards || ConfigManager.gamingCards.length === 0) {
      ConfigManager.gamingCards = [
        {
          gameName: "League of Legends",
          summonerName: "Gia Hân",
          tag: "Japan",
          rank: "Master",
          winRate: "70%",
          totalMatches: "109",
          kda: "2.33 : 1",
          mostPlayed: "Briar",
          playstyle: "Jungle — Chuyên Briar và tướng sát thủ",
          favoriteChamps: ["Briar", "Jinx", "Pantheon"],
          media:
            "https://media.discordapp.net/attachments/925810547931365386/1494410718433509447/IMG_2401.jpg",
          accentColor: "#ff9edb",
          cardColor: "#ff9edb4b",
        },
        {
          gameName: "Genshin Impact",
          summonerName: "Gia Hân",
          tag: "AR 58",
          rank: "Exploration 100%",
          mostPlayed: "Raiden Shogun",
          playstyle: "Main Electro & Story Enjoyer",
          favoriteChamps: ["Raiden Shogun", "Yae Miko", "Furina"],
          media:
            "https://i.pinimg.com/736x/82/ad/df/82addfe72478ad9bf2b697802a8d27ed.jpg",
          accentColor: "#c084fc",
          cardColor: "#c084fc4d",
        },
        {
          gameName: "Teamfight Tactics",
          summonerName: "Gia Hân",
          tag: "TFT",
          rank: "Diamond 4",
          winRate: "51%",
          totalMatches: "129",
          mostPlayed: "Reroll Comp",
          playstyle: "Hyper Roll & Reroll Main",
          favoriteChamps: ["Reroll", "Fast 8", "Fast 9"],
          media:
            "https://i.pinimg.com/736x/26/81/3d/26813d91b4e058584cd5e1a2e36a258f.jpg",
          accentColor: "#eab308",
          cardColor: "#eab2085e",
        },
        {
          gameName: "Steam",
          summonerName: "Gia Hân",
          tag: "JiaHan",
          rank: "6.4 years",
          mostPlayed: "RPG & ARPG",
          playstyle:
            "Chơi mọi thể loại nhưng đặc biệt yêu thích Story-rich games",
          favoriteChamps: [
            "Eldering",
            "Monster Hunter World",
            "Granblue Fantasy: Relink",
          ],
          media:
            "https://i.pinimg.com/736x/f0/38/67/f03867ae5306631a0e744e6e97562984.jpg",
          accentColor: "#08ea26",
          cardColor: "#08ea2659",
        },
      ];
    }
  },

  render() {
    const container = document.getElementById("gaming-cards-container");
    if (!container) return;

    let html = "";
    ConfigManager.gamingCards.forEach((card, index) => {
      const champsHTML = Array.isArray(card.favoriteChamps)
        ? card.favoriteChamps
            .map(
              (champ, cIndex) => `
            <div style="display:flex; gap:8px; margin-bottom:6px;">
              <input type="text" class="config-input gaming-input" 
                     data-index="${index}" data-champ-index="${cIndex}" data-field="favoriteChamps" 
                     value="${champ}" style="flex:1;">
              <button class="config-btn secondary" 
                      onclick="ConfigManager.modules.gaming.removeFavoriteChamp(${index}, ${cIndex})" 
                      style="background:#ff6b6b;color:white;padding:0 12px;">X</button>
            </div>`,
            )
            .join("")
        : "";

      html += `
        <div class="gaming-config-card" style="border:2px solid var(--accent); padding:20px; margin-bottom:25px; border-radius:16px; background:rgba(255,255,255,0.6);">
          <h4>Card ${index + 1}: ${card.gameName || "New Game"}</h4>
          
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:15px;">
            <div><label>Game Name</label><input type="text" class="config-input gaming-input" data-index="${index}" data-field="gameName" value="${card.gameName || ""}"></div>
            <div><label>Summoner Name</label><input type="text" class="config-input gaming-input" data-index="${index}" data-field="summonerName" value="${card.summonerName || ""}"></div>
            <div><label>Tag</label><input type="text" class="config-input gaming-input" data-index="${index}" data-field="tag" value="${card.tag || ""}"></div>
            <div><label>Rank</label><input type="text" class="config-input gaming-input" data-index="${index}" data-field="rank" value="${card.rank || ""}"></div>
            <div><label>Win Rate</label><input type="text" class="config-input gaming-input" data-index="${index}" data-field="winRate" value="${card.winRate || ""}"></div>
            <div><label>Total Matches</label><input type="text" class="config-input gaming-input" data-index="${index}" data-field="totalMatches" value="${card.totalMatches || ""}"></div>
            <div><label>KDA</label><input type="text" class="config-input gaming-input" data-index="${index}" data-field="kda" value="${card.kda || ""}"></div>
            <div><label>Most Played</label><input type="text" class="config-input gaming-input" data-index="${index}" data-field="mostPlayed" value="${card.mostPlayed || ""}"></div>
          </div>

          <div style="margin-top:15px;">
            <label>Playstyle</label>
            <textarea class="config-textarea gaming-input" data-index="${index}" data-field="playstyle" rows="3">${card.playstyle || ""}</textarea>
          </div>

          <div style="margin-top:15px;">
            <label>Favorite Champs</label>
            <div id="favorite-champs-container-${index}">${champsHTML}</div>
            <button class="config-btn secondary" onclick="ConfigManager.modules.gaming.addFavoriteChamp(${index})" style="margin-top:8px;">+ Thêm Champion</button>
          </div>

          <!-- Media URL + Preview (Fixed) -->
          <div style="margin-top:20px; display: grid; grid-template-columns: 1fr 1fr; gap: 20px; align-items: start;">
            <div>
              <label>Media URL (Ảnh Card)</label>
              <input type="text" class="config-input gaming-input" 
                     data-index="${index}" data-field="media" 
                     value="${card.media || ""}" style="width:100%;">
            </div>
            <div id="media-preview-${index}" 
                 style="background: rgba(255,255,255,0.7); padding: 12px; border-radius: 12px; 
                        border: 2px dashed var(--accent); min-height: 180px; display: flex; 
                        align-items: center; justify-content: center; overflow: hidden;">
              <!-- Preview -->
            </div>
          </div>

          <!-- Color Pickers -->
          <div style="margin-top:20px; display:grid; grid-template-columns:1fr 1fr; gap:15px;">
            <div>
              <label>Accent Color</label>
              <div style="display:flex; gap:8px; align-items:center;">
                <input type="color" class="gaming-color-picker accent-picker" data-index="${index}" value="${card.accentColor || "#ff9edb"}" style="width:50px; height:40px; padding:3px;">
                <input type="text" class="config-input gaming-input accent-text" data-index="${index}" data-field="accentColor" value="${card.accentColor || "#ff9edb"}" style="flex:1;">
              </div>
            </div>
            <div>
              <label>Card Color</label>
              <div style="display:flex; gap:8px; align-items:center;">
                <input type="color" class="gaming-color-picker card-picker" data-index="${index}" value="${card.cardColor || "#ff9edb4b"}" style="width:50px; height:40px; padding:3px;">
                <input type="text" class="config-input gaming-input card-text" data-index="${index}" data-field="cardColor" value="${card.cardColor || "#ff9edb4b"}" style="flex:1;">
              </div>
            </div>
          </div>

          <button class="config-btn secondary" onclick="ConfigManager.modules.gaming.removeCard(${index})" 
                  style="margin-top:15px;background:#ff6b6b;color:white;">Xóa Card</button>
        </div>`;
    });

    container.innerHTML = html;

    this.bindInputEvents();
    this.bindColorSync();
    this.bindMediaPreviewListeners();

    // Force update all previews after render
    setTimeout(() => {
      ConfigManager.gamingCards.forEach((_, index) =>
        this.updateMediaPreview(index),
      );
    }, 300);
  },

  // ====================== FIXED MEDIA PREVIEW ======================
  bindMediaPreviewListeners() {
    document
      .querySelectorAll('.gaming-input[data-field="media"]')
      .forEach((input) => {
        input.addEventListener("input", () => {
          const index = parseInt(input.dataset.index);
          this.updateMediaPreview(index);
        });
      });
  },

  updateMediaPreview(index) {
    const input = document.querySelector(
      `.gaming-input[data-index="${index}"][data-field="media"]`,
    );
    const container = document.getElementById(`media-preview-${index}`);
    if (!input || !container) return;

    const url = input.value.trim();

    if (!url) {
      container.innerHTML = `<p style="color:#888; text-align:center; padding:20px;">Chưa có URL ảnh</p>`;
      return;
    }

    container.innerHTML = `
      <img src="${url}" 
           style="max-width:100%; max-height:220px; border-radius:12px; box-shadow:0 8px 25px rgba(0,0,0,0.2); object-fit:contain;" 
           onerror="this.style.display='none'; 
                    this.parentElement.innerHTML = '<p style=\'color:#ff6b6b; text-align:center; padding:20px;\'>❌ Không tải được ảnh<br><small>URL có thể bị chặn hoặc không tồn tại</small></p>'">
    `;
  },

  // Các hàm còn lại giữ nguyên (bindInputEvents, bindColorSync, add/remove functions, save, load)
  bindInputEvents() {
    document.querySelectorAll(".gaming-input").forEach((input) => {
      input.addEventListener("change", (e) => {
        const i = parseInt(e.target.dataset.index);
        const f = e.target.dataset.field;
        if (
          ConfigManager.gamingCards &&
          ConfigManager.gamingCards[i] &&
          f !== "favoriteChamps"
        ) {
          ConfigManager.gamingCards[i][f] = e.target.value.trim();
        }
      });
    });
  },

  bindColorSync() {
    // Accent
    document.querySelectorAll(".accent-picker").forEach((picker) => {
      const index = parseInt(picker.dataset.index);
      const text = picker.parentElement.querySelector(".accent-text");
      picker.addEventListener("input", () => {
        if (text) text.value = picker.value;
        if (ConfigManager.gamingCards[index])
          ConfigManager.gamingCards[index].accentColor = picker.value;
      });
      if (text)
        text.addEventListener("input", () => {
          picker.value = text.value;
          if (ConfigManager.gamingCards[index])
            ConfigManager.gamingCards[index].accentColor = text.value;
        });
    });

    // Card Color
    document.querySelectorAll(".card-picker").forEach((picker) => {
      const index = parseInt(picker.dataset.index);
      const text = picker.parentElement.querySelector(".card-text");
      picker.addEventListener("input", () => {
        if (text) text.value = picker.value;
        if (ConfigManager.gamingCards[index])
          ConfigManager.gamingCards[index].cardColor = picker.value;
      });
      if (text)
        text.addEventListener("input", () => {
          picker.value = text.value;
          if (ConfigManager.gamingCards[index])
            ConfigManager.gamingCards[index].cardColor = text.value;
        });
    });
  },

  addFavoriteChamp(cardIndex) {
    if (!ConfigManager.gamingCards[cardIndex].favoriteChamps)
      ConfigManager.gamingCards[cardIndex].favoriteChamps = [];
    ConfigManager.gamingCards[cardIndex].favoriteChamps.push("New Champion");
    this.render();
  },

  removeFavoriteChamp(cardIndex, champIndex) {
    if (confirm("Xóa champion này?")) {
      ConfigManager.gamingCards[cardIndex].favoriteChamps.splice(champIndex, 1);
      this.render();
    }
  },

  addNewCard() {
    if (!ConfigManager.gamingCards) ConfigManager.gamingCards = [];
    ConfigManager.gamingCards.push({
      gameName: "New Game",
      summonerName: "Gia Hân",
      tag: "TAG",
      rank: "Unranked",
      winRate: "",
      totalMatches: "",
      kda: "",
      mostPlayed: "Champion",
      playstyle: "Mô tả playstyle...",
      favoriteChamps: [],
      media:
        "https://i.pinimg.com/736x/82/ad/df/82addfe72478ad9bf2b697802a8d27ed.jpg",
      accentColor: "#ff9edb",
      cardColor: "#ff9edb4b",
    });
    this.render();
  },

  removeCard(index) {
    if (confirm(`Xóa Card ${index + 1}?`)) {
      ConfigManager.gamingCards.splice(index, 1);
      this.render();
    }
  },

  save() {
    return ConfigManager.gamingCards || [];
  },

  load(data) {
    ConfigManager.gamingCards = Array.isArray(data) ? data : [];
    if (ConfigManager.gamingCards.length === 0) this.ensureDefaultData();
    this.render();
  },
};
