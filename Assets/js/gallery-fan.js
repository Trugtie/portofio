// ====================== MULTI FAN GALLERY - GRID ======================
// Assets/js/gallery-fan.js - Đồng bộ từ ConfigMain

function initFanGallery() {
  renderFanGallery();

  // Lắng nghe khi ConfigMain cập nhật data
  document.addEventListener("configMainReady", () => {
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
            image: "/Assets/Images/sakura1.jpg",
          },
          {
            id: 102,
            title: "Pink Dream",
            image: "/Assets/Images/sakura2.jpg",
          },
          {
            id: 103,
            title: "Evening Sakura",
            image: "/Assets/Images/sakura3.jpg",
          },
          {
            id: 104,
            title: "Sakura Path",
            image: "/Assets/Images/sakura4.jpg",
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
            image: "/Assets/Images/samurai.jpg",
          },
          {
            id: 202,
            title: "Neon Waifu",
            image: "/Assets/Images/miko.jpg",
          },
          {
            id: 203,
            title: "Cyber Sakura",
            image: "/Assets/Images/sheep.jpg",
          },
          {
            id: 204,
            title: "Soft Pastel",
            image: "/Assets/Images/noel.jpg",
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
