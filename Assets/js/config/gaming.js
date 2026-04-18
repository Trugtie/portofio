// ====================== GAMING CONFIG ======================
// Assets/js/config/gaming.js

window.ConfigGaming = {
  init() {
    console.log("%c✅ Gaming module initialized", "color: #ff9edb");
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
            "https://media.discordapp.net/attachments/925810547931365386/1494410718433509447/IMG_2401.jpg?ex=69e281f0&is=69e13070&hm=7db4d799ab1b7e21c5997728160513c104b5d07b97ff51311d7f911f49cf3e5e&=&format=webp&width=448&height=793",
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
              <input type="text" class="config-input gaming-input" data-index="${index}" data-champ-index="${cIndex}" data-field="favoriteChamps" value="${champ}" style="flex:1;">
              <button class="config-btn secondary" onclick="ConfigManager.modules.gaming.removeFavoriteChamp(${index}, ${cIndex})" style="background:#ff6b6b;color:white;padding:0 12px;">X</button>
            </div>
          `,
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
            <div id="favorite-champs-container-${index}">
              ${champsHTML}
            </div>
            <button class="config-btn secondary" onclick="ConfigManager.modules.gaming.addFavoriteChamp(${index})" style="margin-top:8px;">+ Thêm Champion</button>
          </div>

          <div style="margin-top:15px;">
            <label>Media URL</label>
            <input type="text" class="config-input gaming-input" data-index="${index}" data-field="media" value="${card.media || ""}" style="width:100%;">
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

          <button class="config-btn secondary" onclick="ConfigManager.modules.gaming.removeCard(${index})" style="margin-top:15px;background:#ff6b6b;color:white;">Xóa Card</button>
        </div>`;
    });

    container.innerHTML = html;
    this.bindInputEvents();
    this.bindColorSync();
  },

  bindInputEvents() {
    document.querySelectorAll(".gaming-input").forEach((input) => {
      input.addEventListener("change", (e) => {
        const i = parseInt(e.target.dataset.index);
        const f = e.target.dataset.field;
        if (ConfigManager.gamingCards && ConfigManager.gamingCards[i]) {
          if (f === "favoriteChamps") {
            // Không dùng cho favorite vì dùng cách riêng
          } else {
            ConfigManager.gamingCards[i][f] = e.target.value.trim();
          }
        }
      });
    });
  },

  bindColorSync() {
    document.querySelectorAll(".accent-picker").forEach((picker) => {
      const index = parseInt(picker.dataset.index);
      const textInput = picker.parentElement.querySelector(".accent-text");

      picker.addEventListener("input", () => {
        if (textInput) textInput.value = picker.value;
        if (ConfigManager.gamingCards[index])
          ConfigManager.gamingCards[index].accentColor = picker.value;
      });

      if (textInput) {
        textInput.addEventListener("input", () => {
          picker.value = textInput.value;
          if (ConfigManager.gamingCards[index])
            ConfigManager.gamingCards[index].accentColor = textInput.value;
        });
      }
    });

    document.querySelectorAll(".card-picker").forEach((picker) => {
      const index = parseInt(picker.dataset.index);
      const textInput = picker.parentElement.querySelector(".card-text");

      picker.addEventListener("input", () => {
        if (textInput) textInput.value = picker.value;
        if (ConfigManager.gamingCards[index])
          ConfigManager.gamingCards[index].cardColor = picker.value;
      });

      if (textInput) {
        textInput.addEventListener("input", () => {
          picker.value = textInput.value;
          if (ConfigManager.gamingCards[index])
            ConfigManager.gamingCards[index].cardColor = textInput.value;
        });
      }
    });
  },

  // ==================== FAVORITE CHAMPS ====================
  addFavoriteChamp(cardIndex) {
    if (!ConfigManager.gamingCards[cardIndex].favoriteChamps) {
      ConfigManager.gamingCards[cardIndex].favoriteChamps = [];
    }
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
    if (ConfigManager.gamingCards.length === 0) {
      this.ensureDefaultData();
    }
    this.render();
  },
};
