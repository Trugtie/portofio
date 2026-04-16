// ====================== MULTI FAN GALLERY - GRID ======================

const fanDecks = [
  {
    id: "sakura",
    title: "Sakura Series",
    subtitle: "Hoa anh đào và giấc mơ màu hồng",
    cards: [
      {
        id: 101,
        title: "Sakura Bloom",
        image: "./Assets/Images/gallery/sakura1.jpg",
      },
      {
        id: 102,
        title: "Pink Dream",
        image: "./Assets/Images/gallery/sakura2.jpg",
      },
      {
        id: 103,
        title: "Evening Sakura",
        image: "./Assets/Images/gallery/sakura3.jpg",
      },
      {
        id: 104,
        title: "Sakura Path",
        image: "./Assets/Images/gallery/sakura4.jpg",
      },
    ],
  },
  {
    id: "character",
    title: "Sakura Series",
    subtitle: "Nhân vật anime yêu thích",
    cards: [
      {
        id: 201,
        title: "Raiden Shogun",
        image: "./Assets/Images/gallery/raiden.jpg",
      },
      {
        id: 202,
        title: "Neon Waifu",
        image: "./Assets/Images/gallery/neon.jpg",
      },
      {
        id: 203,
        title: "Cyber Sakura",
        image: "./Assets/Images/gallery/cyber.jpg",
      },
      {
        id: 204,
        title: "Soft Pastel",
        image: "./Assets/Images/gallery/pastel.jpg",
      },
    ],
  },
  {
    id: "character",
    title: "Sakura Series",
    subtitle: "Nhân vật anime yêu thích",
    cards: [
      {
        id: 201,
        title: "Raiden Shogun",
        image: "./Assets/Images/gallery/raiden.jpg",
      },
      {
        id: 202,
        title: "Neon Waifu",
        image: "./Assets/Images/gallery/neon.jpg",
      },
      {
        id: 203,
        title: "Cyber Sakura",
        image: "./Assets/Images/gallery/cyber.jpg",
      },
      {
        id: 204,
        title: "Soft Pastel",
        image: "./Assets/Images/gallery/pastel.jpg",
      },
    ],
  },
  // Thêm bộ bài mới ở đây
];

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

function initFanGallery() {
  const container = document.getElementById("fan-gallery-container");
  if (!container) return;

  let html = "";
  fanDecks.forEach((deck) => {
    html += createFanDeck(deck);
  });

  container.innerHTML = html;

  // Click mở lightbox
  document.querySelectorAll(".fan-card").forEach((card) => {
    card.addEventListener("click", (e) => {
      e.stopImmediatePropagation();
      const id = parseInt(card.dataset.id);

      let foundCard = null;
      fanDecks.forEach((deck) => {
        const match = deck.cards.find((c) => c.id === id);
        if (match) foundCard = match;
      });

      if (foundCard) openFanLightbox(foundCard.image, foundCard.title);
    });
  });
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
