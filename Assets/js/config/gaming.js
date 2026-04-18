// ====================== GAMING.JS ======================
// Assets/js/config/gaming.js

window.ConfigGaming = {
  init() {
    if (!ConfigManager.gamingCards) ConfigManager.gamingCards = [];
    console.log("%c✅ Gaming module initialized", "color: #ff9edb");
  },

  render() {
    const container = document.getElementById("gaming-cards-container");
    if (!container) return;

    if (!ConfigManager.gamingCards || ConfigManager.gamingCards.length === 0) {
      container.innerHTML = `<p style="opacity:0.6; text-align:center; padding:80px 20px;">Chưa có card nào.<br>Nhấn "+ Thêm Card Gaming Mới" để bắt đầu.</p>`;
      return;
    }

    let html = "";
    ConfigManager.gamingCards.forEach((card, index) => {
      html += `
                <div class="gaming-config-card" style="border:2px solid var(--accent); padding:20px; margin-bottom:25px; border-radius:16px; background:rgba(255,255,255,0.6);">
                    <h4>Card ${index + 1}: ${card.gameName || "New Game"}</h4>
                    <div style="display:grid; grid-template-columns:1fr 1fr; gap:15px;">
                        <div><label>Game Name</label><input type="text" class="config-input gaming-input" data-index="${index}" data-field="gameName" value="${card.gameName || ""}"></div>
                        <div><label>Summoner Name</label><input type="text" class="config-input gaming-input" data-index="${index}" data-field="summonerName" value="${card.summonerName || ""}"></div>
                        <div><label>Tag</label><input type="text" class="config-input gaming-input" data-index="${index}" data-field="tag" value="${card.tag || ""}"></div>
                        <div><label>Rank</label><input type="text" class="config-input gaming-input" data-index="${index}" data-field="rank" value="${card.rank || ""}"></div>
                        <div><label>Most Played</label><input type="text" class="config-input gaming-input" data-index="${index}" data-field="mostPlayed" value="${card.mostPlayed || ""}"></div>
                        <div><label>Media URL</label><input type="text" class="config-input gaming-input" data-index="${index}" data-field="media" value="${card.media || ""}"></div>
                    </div>
                    <div style="margin-top:15px;">
                        <label>Playstyle</label>
                        <textarea class="config-textarea gaming-input" data-index="${index}" data-field="playstyle" rows="2">${card.playstyle || ""}</textarea>
                    </div>
                    <button class="config-btn secondary" onclick="ConfigManager.modules.gaming.removeCard(${index})" style="margin-top:15px;background:#ff6b6b;color:white;">Xóa Card</button>
                </div>`;
    });

    container.innerHTML = html;
    this.bindInputEvents();
  },

  bindInputEvents() {
    document.querySelectorAll(".gaming-input").forEach((input) => {
      input.addEventListener("change", (e) => {
        const i = parseInt(e.target.dataset.index);
        const f = e.target.dataset.field;
        if (ConfigManager.gamingCards && ConfigManager.gamingCards[i]) {
          ConfigManager.gamingCards[i][f] = e.target.value.trim();
        }
      });
    });
  },

  addNewCard() {
    if (!ConfigManager.gamingCards) ConfigManager.gamingCards = [];
    ConfigManager.gamingCards.push({
      gameName: "New Game",
      summonerName: "Gia Hân",
      tag: "TAG",
      rank: "Unranked",
      mostPlayed: "Champion",
      playstyle: "Mô tả playstyle...",
      media:
        "https://i.pinimg.com/736x/82/ad/df/82addfe72478ad9bf2b697802a8d27ed.jpg",
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
  },
};
