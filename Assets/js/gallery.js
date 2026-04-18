// ====================== GALLERY SECTION JS - SYNCED WITH CONFIG ======================
// Assets/js/gallery.js

function initGallery() {

  renderMasonryGallery();

  // Lắng nghe khi ConfigMain cập nhật data từ Firebase/Config Page
  document.addEventListener("configMainReady", () => {
   
    renderMasonryGallery();
  });
}

function renderMasonryGallery() {
  // Lấy data từ ConfigMain
  let galleryItems = ConfigMain.getGalleryItems();

  // Nếu chưa có data từ config → dùng dữ liệu mặc định
  if (!Array.isArray(galleryItems) || galleryItems.length === 0) {
    galleryItems = [
      {
        id: 1,
        title: "Sakura Bloom",
        desc: "Digital Painting • 2025",
        image:
          "https://i.pinimg.com/736x/98/07/9a/98079a9200ba4707c2f4be763bd81345.jpg",
      },
      {
        id: 2,
        title: "Neon Waifu",
        desc: "Character Illustration",
        image:
          "https://i.pinimg.com/736x/bc/13/98/bc139837af1b0971b891467675be83fd.jpg",
      },
      {
        id: 3,
        title: "Raiden Shogun",
        desc: "Genshin Impact Fanart",
        image:
          "https://i.pinimg.com/736x/25/52/80/25528003516c9984fe747a59553e460a.jpg",
      },
      {
        id: 4,
        title: "Midnight Gaming",
        desc: "League of Legends Scene",
        image:
          "https://i.pinimg.com/736x/cc/e7/d1/cce7d13b3392c76036be2e5def158b02.jpg",
      },
      {
        id: 5,
        title: "Soft Pastel Girl",
        desc: "Original Character",
        image:
          "https://i.pinimg.com/736x/b1/1b/28/b11b28e99d63dc22d6d2ff2a05a860cd.jpg",
      },
      {
        id: 6,
        title: "Cyber Sakura",
        desc: "Anime Style Portrait",
        image:
          "https://i.pinimg.com/736x/a2/91/af/a291af69d304d1e58fb1abe2896a69da.jpg",
      },
      {
        id: 7,
        title: "Valorant Duelist",
        desc: "Fan Art",
        image:
          "https://i.pinimg.com/1200x/4b/4f/fd/4b4ffdaa5a9c7d6ef841f26b0ce3854e.jpg",
      },
      {
        id: 8,
        title: "Dreamy Aesthetic",
        desc: "Artwork",
        image:
          "https://i.pinimg.com/736x/72/2b/8a/722b8a193f25cad3117d47904956a39b.jpg",
      },
      {
        id: 9,
        title: "Glassy Girl",
        desc: "Artwork",
        image:
          "https://i.pinimg.com/736x/f3/b2/b8/f3b2b8c671788f14d081f57dacbfd1d0.jpg",
      },
      {
        id: 10,
        title: "Glassy Girl",
        desc: "Artwork",
        image:
          "https://i.pinimg.com/736x/fb/52/3e/fb523ee9c66f951c15c62f9fa6901227.jpg",
      },
      {
        id: 11,
        title: "Glassy Girl",
        desc: "Artwork",
        image:
          "https://i.pinimg.com/736x/7c/b7/94/7cb794cde0c90cc66f32680488aa6ba4.jpg",
      },
      {
        id: 12,
        title: "Glassy Girl",
        desc: "Artwork",
        image:
          "https://i.pinimg.com/1200x/c1/a2/a9/c1a2a9935d9a3af2aee26feec457efca.jpg",
      },
    ];
  }

  const grid = document.getElementById("gallery-grid");
  if (!grid) return;

  let html = "";

  galleryItems.forEach((item) => {
    html += `
      <a href="#" class="gallery-item" data-id="${item.id}">
        <img src="${item.image}" alt="${item.title}">
        <div class="gallery-overlay">
          <div class="gallery-info">
            <h3>${item.title}</h3>
            <p>${item.desc}</p>
          </div>
        </div>
      </a>
    `;
  });

  grid.innerHTML = html;

  // Lightbox
  document.querySelectorAll(".gallery-item").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const id = parseInt(link.dataset.id);
      const artwork = galleryItems.find((g) => g.id === id);
      if (artwork) openLightbox(artwork.image, artwork.title);
    });
  });
}

function openLightbox(src, title) {
  let lightbox = document.getElementById("lightbox");

  if (!lightbox) {
    lightbox = document.createElement("div");
    lightbox.id = "lightbox";
    lightbox.className = "lightbox";
    lightbox.innerHTML = `
      <div class="lightbox-content">
        <img src="" alt="">
        <div class="lightbox-close">×</div>
      </div>
    `;
    document.body.appendChild(lightbox);

    lightbox.querySelector(".lightbox-close").addEventListener("click", () => {
      lightbox.classList.remove("active");
    });

    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) lightbox.classList.remove("active");
    });
  }

  const img = lightbox.querySelector("img");
  img.src = src;
  img.alt = title;
  lightbox.classList.add("active");
}

// Export
window.initGallery = initGallery;
