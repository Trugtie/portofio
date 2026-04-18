// ====================== FAN-GALLERY.JS ======================
// Assets/js/config/fan-gallery.js

window.ConfigFanGallery = {
  init() {
    if (!ConfigManager.fanDecks) ConfigManager.fanDecks = [];
    console.log("%c✅ Fan Gallery module initialized", "color: #ff9edb");
  },

  render() {
    const container = document.getElementById("fan-decks-container");
    if (!container) return;

    if (ConfigManager.fanDecks.length === 0) {
      container.innerHTML = `<p style="opacity:0.6; text-align:center; padding:80px;">Chưa có deck nào.<br>Nhấn "+ Thêm Bộ Bài (Deck) Mới"</p>`;
      return;
    }

    let html = "";
    ConfigManager.fanDecks.forEach((deck, dIndex) => {
      let cardsHtml = "";
      (deck.cards || []).forEach((card, cIndex) => {
        cardsHtml += `
                    <div style="border:1px solid #ddd;padding:12px;margin:8px 0;border-radius:8px;">
                        <input type="text" class="config-input fan-input" 
                               data-deck="${dIndex}" data-card="${cIndex}" data-field="title" 
                               value="${card.title || ""}" placeholder="Tên card">
                        <input type="text" class="config-input fan-input" 
                               data-deck="${dIndex}" data-card="${cIndex}" data-field="image" 
                               value="${card.image || ""}" placeholder="URL ảnh" style="margin-top:6px;">
                    </div>`;
      });

      html += `
                <div style="border:2px solid var(--accent);padding:20px;margin-bottom:25px;border-radius:16px;background:rgba(255,255,255,0.6);">
                    <h4>Deck ${dIndex + 1}</h4>
                    <div style="display:grid;grid-template-columns:1fr 1fr;gap:15px;margin:15px 0;">
                        <div><label>Title</label><input type="text" class="config-input fan-input" data-deck="${dIndex}" data-field="title" value="${deck.title || ""}"></div>
                        <div><label>Subtitle</label><input type="text" class="config-input fan-input" data-deck="${dIndex}" data-field="subtitle" value="${deck.subtitle || ""}"></div>
                    </div>
                    <h5>Cards:</h5>
                    ${cardsHtml}
                    <button class="config-btn secondary" onclick="ConfigManager.modules.fan.addCardToDeck(${dIndex})">+ Thêm Card</button>
                    <button class="config-btn secondary" onclick="ConfigManager.modules.fan.removeDeck(${dIndex})" style="background:#ff6b6b;color:white;margin-left:10px;">Xóa Deck</button>
                </div>`;
    });

    container.innerHTML = html;
    this.bindInputEvents();
  },

  bindInputEvents() {
    document.querySelectorAll(".fan-input").forEach((inp) => {
      inp.addEventListener("change", (e) => {
        const d = parseInt(e.target.dataset.deck);
        const c =
          e.target.dataset.card !== undefined
            ? parseInt(e.target.dataset.card)
            : null;
        const f = e.target.dataset.field;

        if (c !== null) {
          ConfigManager.fanDecks[d].cards[c][f] = e.target.value.trim();
        } else {
          ConfigManager.fanDecks[d][f] = e.target.value.trim();
        }
      });
    });
  },

  addNewDeck() {
    if (!ConfigManager.fanDecks) ConfigManager.fanDecks = [];
    ConfigManager.fanDecks.push({
      id: "deck-" + Date.now(),
      title: "New Deck",
      subtitle: "Mô tả bộ bài",
      cards: [{ id: Date.now(), title: "Card 1", image: "" }],
    });
    this.render();
  },

  addCardToDeck(deckIndex) {
    if (!ConfigManager.fanDecks[deckIndex].cards)
      ConfigManager.fanDecks[deckIndex].cards = [];
    ConfigManager.fanDecks[deckIndex].cards.push({
      id: Date.now(),
      title: "New Card",
      image: "",
    });
    this.render();
  },

  removeDeck(index) {
    if (confirm("Xóa deck này?")) {
      ConfigManager.fanDecks.splice(index, 1);
      this.render();
    }
  },

  save() {
    return ConfigManager.fanDecks;
  },

  load(data) {
    ConfigManager.fanDecks = Array.isArray(data) ? data : [];
  },
};
