// ====================== NAVBAR.JS - LOGO LÀ ẢNH + DYNAMIC ======================

const NavbarConfig = {
  logoImage: "./Assets/Images/logo.png", // ← Đường dẫn ảnh logo
  logoAlt: "GiaHan Logo",
  menuItems: [
    { text: "Home", href: "#home" },
    { text: "About", href: "#about" },
    { text: "Gaming", href: "#gaming" },
    { text: "Gallery", href: "#fan-gallery" },
    { text: "Contact", href: "#footer" },
  ],
  contactText: "Settings ⚙️",
  contactHref: "#",
};

function initNavbar() {
  const navbarContainer = document.getElementById("navbar");
  if (!navbarContainer) {
    console.error("❌ Element #navbar không tồn tại");
    return;
  }

  let menuHTML = "";
  NavbarConfig.menuItems.forEach((item) => {
    menuHTML += `<a href="${item.href}" class="nav-link">${item.text}</a>`;
  });

  const navbarHTML = `
    <nav class="navbar">
      <div class="nav-container">
        <!-- Logo là ảnh -->
        <a href="#home" class="logo">
          <img src="${NavbarConfig.logoImage}" alt="${NavbarConfig.logoAlt}" style="height: 32px; width: auto; object-fit: contain;">
        </a>

        <!-- Desktop Menu -->
        <div class="nav-menu">
          ${menuHTML}
        </div>

        <!-- Contact Button (mở Settings) -->
        <a href="${NavbarConfig.contactHref}" id="contact-btn" class="contact-btn">
          ${NavbarConfig.contactText}
        </a>

        <!-- Mobile Button -->
        <button class="mobile-btn">☰</button>
      </div>
    </nav>
  `;

  navbarContainer.innerHTML = navbarHTML;

  initNavbarEvents();
}

function initNavbarEvents() {
  const mobileBtn = document.querySelector(".mobile-btn");
  if (!mobileBtn) return;

  let mobileMenu = document.querySelector(".mobile-menu");
  if (!mobileMenu) {
    mobileMenu = document.createElement("div");
    mobileMenu.className = "mobile-menu";
    mobileMenu.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(12px);
      padding: 30px 24px;
      display: none;
      flex-direction: column;
      gap: 24px;
      z-index: 999;
      border-top: 1px solid rgba(224, 187, 255, 0.3);
    `;
    document.body.appendChild(mobileMenu);

    let mobileMenuHTML = "";
    NavbarConfig.menuItems.forEach((item) => {
      mobileMenuHTML += `<a href="${item.href}" class="nav-link">${item.text}</a>`;
    });
    mobileMenu.innerHTML = mobileMenuHTML;
  }

  mobileBtn.addEventListener("click", () => {
    if (mobileMenu.style.display === "flex") {
      mobileMenu.style.display = "none";
      mobileBtn.textContent = "☰";
    } else {
      mobileMenu.style.display = "flex";
      mobileBtn.textContent = "✕";
    }
  });
}

// Export
window.initNavbar = initNavbar;
