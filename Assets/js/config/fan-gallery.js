// ====================== FAN GALLERY CONFIG WITH PREVIEW + ADD/DELETE CARD ======================
// Assets/js/config/fan-gallery.js

window.ConfigFanGallery = {
  init() {
    console.log(
      "%c✅ Fan Gallery module initialized with Card Management",
      "color: #ff9edb",
    );
    this.ensureDefaultData();
  },

  ensureDefaultData() {
    if (!ConfigManager.fanDecks || ConfigManager.fanDecks.length === 0) {
      ConfigManager.fanDecks = [
        {
          id: "deck-sakura",
          title: "Sakura Series",
          subtitle: "Hoa anh đào và giấc mơ màu hồng",
          cards: [
            {
              id: 101,
              title: "Sakura Bloom",
              image:
                "https://cdn.discordapp.com/attachments/925810547931365386/1494439505053089812/IMG_2352.jpg",
            },
            {
              id: 102,
              title: "Pink Dream",
              image:
                "https://cdn.discordapp.com/attachments/925810547931365386/1494439506601054258/IMG_2347.jpg",
            },
            {
              id: 103,
              title: "Evening Sakura",
              image:
                "https://cdn.discordapp.com/attachments/925810547931365386/1494439506990993448/IMG_2346.jpg",
            },
            {
              id: 104,
              title: "Sakura Path",
              image:
                "https://cdn.discordapp.com/attachments/925810547931365386/1494439504336130089/IMG_2378.jpg",
            },
          ],
        },
        {
          id: "deck-character",
          title: "Character Series",
          subtitle: "Nhân vật anime yêu thích",
          cards: [
            {
              id: 201,
              title: "Raiden Shogun",
              image:
                "https://cdn.discordapp.com/attachments/925810547931365386/1494439623815069858/338130890_1383831845745695_8401370984217101373_n.jpg",
            },
            {
              id: 202,
              title: "Neon Waifu",
              image:
                "https://cdn.discordapp.com/attachments/925810547931365386/1494439503010599043/IMG_2380.jpg",
            },
            {
              id: 203,
              title: "Cyber Sakura",
              image:
                "https://cdn.discordapp.com/attachments/925810547931365386/1494439502587101204/IMG_2382.jpg",
            },
            {
              id: 204,
              title: "Soft Pastel",
              image:
                "https://cdn.discordapp.com/attachments/925810547931365386/1494439625459105843/356129126_797941415356408_3252222052169645057_n.jpg",
            },
          ],
        },
        {
          id: "deck-anime",
          title: "Anime Moments",
          subtitle: "Những khoảnh khắc anime đẹp nhất",
          cards: [
            {
              id: 301,
              title: "Midnight Gaming",
              image:
                "https://i.pinimg.com/736x/cc/e7/d1/cce7d13b3392c76036be2e5def158b02.jpg",
            },
            {
              id: 302,
              title: "Valorant Duelist",
              image:
                "https://i.pinimg.com/1200x/4b/4f/fd/4b4ffdaa5a9c7d6ef841f26b0ce3854e.jpg",
            },
            {
              id: 303,
              title: "Dreamy Aesthetic",
              image:
                "https://i.pinimg.com/736x/72/2b/8a/722b8a193f25cad3117d47904956a39b.jpg",
            },
            {
              id: 304,
              title: "Glassy Girl",
              image:
                "https://i.pinimg.com/736x/f3/b2/b8/f3b2b8c671788f14d081f57dacbfd1d0.jpg",
            },
          ],
        },
      ];
    }
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
          <div style="border:1px solid #ddd; padding:15px; margin:10px 0; border-radius:12px; background:rgba(255,255,255,0.8); position:relative;">
            <input type="text" class="config-input fan-input" 
                   data-deck="${dIndex}" data-card="${cIndex}" data-field="title" 
                   value="${card.title || ""}" placeholder="Tên card" style="width:100%; margin-bottom:10px;">

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
              <div>
                <label>URL Ảnh</label>
                <input type="text" class="config-input fan-input" 
                       data-deck="${dIndex}" data-card="${cIndex}" data-field="image" 
                       value="${card.image || ""}" placeholder="Dán URL ảnh vào đây" style="width:100%;">
              </div>
              <div id="fan-preview-${dIndex}-${cIndex}" 
                   style="background: #f8f1eb; border: 2px dashed var(--accent); border-radius: 10px; 
                          min-height: 160px; display: flex; align-items: center; justify-content: center; overflow: hidden;">
              </div>
            </div>

            <!-- Nút Xóa Card -->
            <button class="config-btn secondary" 
                    onclick="ConfigManager.modules.fan.removeCard(${dIndex}, ${cIndex})" 
                    style="position:absolute; top:10px; right:10px; background:#ff6b6b; color:white; padding:6px 12px; font-size:0.9rem;">
              Xóa Card
            </button>
          </div>`;
      });

      html += `
        <div style="border:2px solid var(--accent); padding:20px; margin-bottom:25px; border-radius:16px; background:rgba(255,255,255,0.6);">
          <h4>Deck ${dIndex + 1}</h4>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:15px; margin:15px 0;">
            <div><label>Title</label><input type="text" class="config-input fan-input" data-deck="${dIndex}" data-field="title" value="${deck.title || ""}"></div>
            <div><label>Subtitle</label><input type="text" class="config-input fan-input" data-deck="${dIndex}" data-field="subtitle" value="${deck.subtitle || ""}"></div>
          </div>
          <h5>Cards:</h5>
          ${cardsHtml}

          <div style="margin-top:15px;">
            <button class="config-btn secondary" onclick="ConfigManager.modules.fan.addCardToDeck(${dIndex})">+ Thêm Card Mới</button>
            <button class="config-btn secondary" onclick="ConfigManager.modules.fan.removeDeck(${dIndex})" style="background:#ff6b6b;color:white;margin-left:10px;">Xóa Toàn Bộ Deck</button>
          </div>
        </div>`;
    });

    container.innerHTML = html;
    this.bindInputEvents();
    this.bindPreviewListeners();

    // Force update preview sau render
    setTimeout(() => {
      ConfigManager.fanDecks.forEach((deck, dIndex) => {
        (deck.cards || []).forEach((_, cIndex) => {
          this.updatePreview(dIndex, cIndex);
        });
      });
    }, 300);
  },

  bindInputEvents() {
    document.querySelectorAll(".fan-input").forEach((inp) => {
      inp.addEventListener("input", (e) => {
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

  bindPreviewListeners() {
    document
      .querySelectorAll('.fan-input[data-field="image"]')
      .forEach((input) => {
        input.addEventListener("input", () => {
          const deckIndex = parseInt(input.dataset.deck);
          const cardIndex = parseInt(input.dataset.card);
          this.updatePreview(deckIndex, cardIndex);
        });
      });
  },

  updatePreview(deckIndex, cardIndex) {
    const input = document.querySelector(
      `.fan-input[data-deck="${deckIndex}"][data-card="${cardIndex}"][data-field="image"]`,
    );
    const previewDiv = document.getElementById(
      `fan-preview-${deckIndex}-${cardIndex}`,
    );
    if (!input || !previewDiv) return;

    const url = input.value.trim();

    if (!url) {
      previewDiv.innerHTML = `<p style="color:#888; text-align:center; padding:40px 10px; font-size:0.9rem;">Chưa có URL ảnh</p>`;
      return;
    }

    previewDiv.innerHTML = `
      <img src="${url}" 
           style="max-width:100%; max-height:170px; border-radius:8px; object-fit:contain; box-shadow:0 4px 15px rgba(0,0,0,0.1);" 
           onerror="this.style.display='none'; 
                    this.parentElement.innerHTML = '<p style=\'color:#ff6b6b; text-align:center; padding:30px 10px;\'>❌ Không tải được ảnh</p>'">
    `;
  },

  // ==================== QUẢN LÝ CARD ====================
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

  removeCard(deckIndex, cardIndex) {
    if (confirm("Xóa card này trong deck?")) {
      ConfigManager.fanDecks[deckIndex].cards.splice(cardIndex, 1);
      this.render();
    }
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

  removeDeck(index) {
    if (confirm("Xóa toàn bộ deck này?")) {
      ConfigManager.fanDecks.splice(index, 1);
      this.render();
    }
  },

  save() {
    return ConfigManager.fanDecks;
  },

  load(data) {
    ConfigManager.fanDecks = Array.isArray(data) ? data : [];
    if (ConfigManager.fanDecks.length === 0) {
      this.ensureDefaultData();
    }
    this.render();
  },
};
