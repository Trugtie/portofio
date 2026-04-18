// ====================== MULTI FAN GALLERY - GRID ======================
// Assets/js/gallery-fan.js - Đồng bộ từ ConfigMain

function initFanGallery() {
  console.log(
    "%c🃏 Fan Gallery init - Syncing from ConfigMain",
    "color: #ff9edb",
  );

  renderFanGallery();

  // Lắng nghe khi ConfigMain cập nhật data
  document.addEventListener("configMainReady", () => {
    console.log(
      "%c🔄 ConfigMainReady - Re-rendering Fan Gallery",
      "color: #ff9edb",
    );
    renderFanGallery();
  });
}

function renderFanGallery() {
  // Lấy data từ ConfigMain
  let decks = ConfigMain.getFanDecks();

  // Nếu chưa có data từ config thì dùng dữ liệu mặc định
  if (!Array.isArray(decks) || decks.length === 0) {
    decks = [
      {
        id: "sakura",
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
        id: "character",
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
        id: "anime",
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

  const container = document.getElementById("fan-gallery-container");
  if (!container) return;

  let html = "";
  decks.forEach((deck) => {
    html += createFanDeck(deck);
  });

  container.innerHTML = html;

  // Click mở lightbox
  document.querySelectorAll(".fan-card").forEach((card) => {
    card.addEventListener("click", (e) => {
      e.stopImmediatePropagation();
      const id = parseInt(card.dataset.id);

      let foundCard = null;
      decks.forEach((deck) => {
        const match = deck.cards.find((c) => c.id === id);
        if (match) foundCard = match;
      });

      if (foundCard) openFanLightbox(foundCard.image, foundCard.title);
    });
  });
}

function createFanDeck(deckData) {
  let html = `
    <div class="fan-section">
      <div class="fan-header">
        <h2 class="fan-title">${deckData.title}</h2>
        <p class="fan-subtitle">${deckData.subtitle}</p>
      </div>
      <div class="fan-deck" id="deck-${deckData.id}">
  `;

  deckData.cards.forEach((card) => {
    html += `
      <div class="fan-card" data-id="${card.id}">
        <img src="${card.image}" alt="${card.title}">
      </div>
    `;
  });

  html += `</div></div>`;
  return html;
}

function openFanLightbox(src, title) {
  let lightbox = document.getElementById("fan-lightbox");
  if (!lightbox) {
    lightbox = document.createElement("div");
    lightbox.id = "fan-lightbox";
    lightbox.className = "lightbox";
    lightbox.innerHTML = `
      <div class="lightbox-content">
        <img src="" alt="">
        <div class="lightbox-close">×</div>
      </div>
    `;
    document.body.appendChild(lightbox);

    lightbox
      .querySelector(".lightbox-close")
      .addEventListener("click", () => lightbox.classList.remove("active"));
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) lightbox.classList.remove("active");
    });
  }

  const img = lightbox.querySelector("img");
  img.src = src;
  img.alt = title;
  lightbox.classList.add("active");
}

window.initFanGallery = initFanGallery;
