// ====================== FOOTER JS ======================

function initFooter() {
  console.log("%cFooter initialized 🌸", "color: #ff9edb;");

  // Newsletter demo
  const form = document.querySelector(".newsletter-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Cảm ơn bạn đã đăng ký nhận tin từ Linh! 💌");
      form.reset();
    });
  }
}

window.initFooter = initFooter;
