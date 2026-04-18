// ====================== FAN GALLERY CONFIG ======================
// Assets/js/config/fan-gallery.js

window.ConfigFanGallery = {
  init() {
    console.log("%c✅ Fan Gallery module initialized", "color: #ff9edb");
    this.ensureDefaultData();
  },

  // ==================== DỮ LIỆU MẶC ĐỊNH (3 DECK) ====================
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
                "https://cdn.discordapp.com/attachments/925810547931365386/1494439505053089812/IMG_2352.jpg?ex=69e29cbf&is=69e14b3f&hm=35e89faeccad747431d05867cafd9101db1725231f6e4269fc09195bb858a46e&",
            },
            {
              id: 102,
              title: "Pink Dream",
              image:
                "https://cdn.discordapp.com/attachments/925810547931365386/1494439506601054258/IMG_2347.jpg?ex=69e29cbf&is=69e14b3f&hm=0baeb0b7db27e4206b729a5adf5c4ba8d0936f58f2ff81b7982836f0b2e14e77&",
            },
            {
              id: 103,
              title: "Evening Sakura",
              image:
                "https://cdn.discordapp.com/attachments/925810547931365386/1494439506990993448/IMG_2346.jpg?ex=69e29cbf&is=69e14b3f&hm=c1b396cd1fa0dc8b9c5d21af1f7b435050009af57fdd40852f200bde53e7fcf5&",
            },
            {
              id: 104,
              title: "Sakura Path",
              image:
                "https://cdn.discordapp.com/attachments/925810547931365386/1494439504336130089/IMG_2378.jpg?ex=69e29cbf&is=69e14b3f&hm=3a6dc8d8437935b7dff5a3b17f90bbe12746041cc8f0f02acc4e4c75d70a56d2&",
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
                "https://cdn.discordapp.com/attachments/925810547931365386/1494439623815069858/338130890_1383831845745695_8401370984217101373_n.jpg?ex=69e29cdb&is=69e14b5b&hm=036361b3d27b308486c3a6f239bb094a2dfda50724799d60d82e4cfa31b8f7a0&",
            },
            {
              id: 202,
              title: "Neon Waifu",
              image:
                "https://cdn.discordapp.com/attachments/925810547931365386/1494439503010599043/IMG_2380.jpg?ex=69e29cbe&is=69e14b3e&hm=567ba3790eb903bd6d3903b6c2a4422444ff82aae1f3e06867df9f6f034b99d3&",
            },
            {
              id: 203,
              title: "Cyber Sakura",
              image:
                "https://cdn.discordapp.com/attachments/925810547931365386/1494439502587101204/IMG_2382.jpg?ex=69e29cbe&is=69e14b3e&hm=39bcb52b4937fcfecb1f44aa4e753e002244f0918ae3ce188ad9d34626f92a67&",
            },
            {
              id: 204,
              title: "Soft Pastel",
              image:
                "https://cdn.discordapp.com/attachments/925810547931365386/1494439625459105843/356129126_797941415356408_3252222052169645057_n.jpg?ex=69e29cdc&is=69e14b5c&hm=c8a5880108e4784e871c766b06adc0e89bfe91e9124024bd2c80435ef9bb8f30&",
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
    if (ConfigManager.fanDecks.length === 0) {
      this.ensureDefaultData();
    }
    this.render();
  },
};
