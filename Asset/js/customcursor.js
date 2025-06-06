const cursor = document.getElementById("custom-cursor");
const body = document.body;

document.addEventListener("mousemove", (e) => {
  let cursorX = e.pageX - cursor.offsetWidth / 2;
  let cursorY = e.pageY - cursor.offsetHeight / 2;

  cursor.style.left = cursorX + "px";
  cursor.style.top = cursorY + "px";
});

body.addEventListener("mouseleave", (e) => {
  cursor.style.display = "none";
});

body.addEventListener("mouseenter", (e) => {
  cursor.style.display = "block";
});
