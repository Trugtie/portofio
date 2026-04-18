// ====================== FOOTER.JS ======================

function initFooter() {


  renderSocialLinks();

  document.addEventListener("configMainReady", () => {
    renderSocialLinks();
  });

  const form = document.querySelector(".newsletter-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Cảm ơn bạn đã đăng ký nhận tin từ Linh! 💌");
      form.reset();
    });
  }
}

function renderSocialLinks() {
  const container = document.querySelector(".footer-social");
  if (!container) return;

  const links = ConfigMain.getSocialLinks ? ConfigMain.getSocialLinks() : [];

  let html = "";
  links.forEach((link) => {
    html += `<a href="${link.url}" class="social-icon" target="_blank"><i class="${link.icon}"></i></a>`;
  });

  container.innerHTML = html;
}

window.initFooter = initFooter;
