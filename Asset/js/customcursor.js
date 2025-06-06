const cursor = document.getElementById("custom-cursor");

document.addEventListener("mousemove", (e) => {
  // Lấy kích thước của viewport
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  // Vị trí con trỏ
  let cursorX = e.pageX - cursor.offsetWidth / 2;
  let cursorY = e.pageY - cursor.offsetHeight / 2;

  // Giới hạn con trỏ không ra khỏi màn hình
  cursorX = Math.max(0, Math.min(cursorX, viewportWidth - cursor.offsetWidth));
  cursorY = Math.max(
    0,
    Math.min(cursorY, viewportHeight - cursor.offsetHeight)
  );

  // Cập nhật vị trí con trỏ
  cursor.style.left = cursorX + "px";
  cursor.style.top = cursorY + "px";
});
