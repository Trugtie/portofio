// ====================== BACK TO TOP ======================

document.addEventListener("DOMContentLoaded", () => {
  const backToTopBtn = document.getElementById("backToTop");

  if (!backToTopBtn) return;

  /**
   * Hiển thị / ẩn nút khi cuộn
   */
  function handleScroll() {
    if (window.scrollY > 500) {
      backToTopBtn.classList.add("show");
    } else {
      backToTopBtn.classList.remove("show");
    }
  }

  /**
   * Cuộn mượt lên đầu trang
   */
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  // Event listeners
  window.addEventListener("scroll", handleScroll);
  backToTopBtn.addEventListener("click", scrollToTop);

  // Kiểm tra trạng thái ban đầu (trường hợp refresh ở giữa trang)
  handleScroll();
});
