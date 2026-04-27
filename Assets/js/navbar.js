// ====================== NAVBAR.JS - FIXED MOBILE MENU ======================

const NavbarConfig = {
  logoImage: "./Assets/Images/logo.png",
  logoAlt: "Gia Hân Logo",
  menuItems: [
    { text: "Home", href: "#home" },
    { text: "About", href: "#about" },
    { text: "Gaming", href: "#gaming" },
    { text: "Fan Gallery", href: "#fan-gallery" },
    { text: "Gallery", href: "#gallery" },
  ],
  contactText: "Settings ⚙️",
  contactHref: "#",
};

function initNavbar() {
  const navbarContainer = document.getElementById("navbar");
  if (!navbarContainer) return;

  let menuHTML = "";
  NavbarConfig.menuItems.forEach((item) => {
    menuHTML += `<a href="${item.href}" class="nav-link">${item.text}</a>`;
  });

  const navbarHTML = `
    <div class="navbar-with-status">
      <!-- Status Bar -->
      <div class="status-bar">
        <div class="status-content">
          <div class="status-left">
            <i class="fa-solid fa-wifi"></i>
            <span class="font-medium">30%</span>
            <i class="fa-solid fa-battery-full"></i>
            <span class="font-medium">80%</span>
          </div>

          <div class="status-right">
            <div class="visit-count">
              <i class="fa-solid fa-eye"></i>
              <span id="visit-count-top" class="font-semibold">0</span>
              <span class="visit-text">lượt ghé thăm</span>
            </div>
            
            <div class="online-status">
              <i class="fa-solid fa-heart fa-beat"></i>
              <span>Online</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Navigation -->
      <nav class="main-nav">
        <div class="nav-container">
          <a href="#home" class="logo">
            <img src="${NavbarConfig.logoImage}" alt="${NavbarConfig.logoAlt}">
          </a>

          <div class="nav-menu">
            ${menuHTML}
          </div>

          <a href="${NavbarConfig.contactHref}" id="contact-btn" class="contact-btn">
            ${NavbarConfig.contactText}
          </a>

          <button class="mobile-btn">☰</button>
        </div>

        <!-- Mobile Menu -->
        <div class="mobile-menu">
          ${menuHTML}
        </div>
      </nav>
    </div>
  `;

  navbarContainer.innerHTML = navbarHTML;
  initNavbarEvents();
}

function initNavbarEvents() {
  const mobileBtn = document.querySelector(".mobile-btn");
  const mobileMenu = document.querySelector(".mobile-menu");

  if (!mobileBtn || !mobileMenu) return;

  mobileBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("active");
    mobileBtn.textContent = mobileMenu.classList.contains("active")
      ? "✕"
      : "☰";
  });
}

window.initNavbar = initNavbar;
