// ====================== LOCK INSPECT KEYS ONLY ======================
// Assets/js/lockcommand.js

document.addEventListener("keydown", function (event) {
  // Danh sách phím tắt thường dùng để mở DevTools / Inspect
  const forbiddenKeys = [
    "F12", // F12
    { key: "I", ctrlKey: true, shiftKey: true }, // Ctrl + Shift + I
    { key: "C", ctrlKey: true, shiftKey: true }, // Ctrl + Shift + C
    { key: "J", ctrlKey: true, shiftKey: true }, // Ctrl + Shift + J
    { key: "U", ctrlKey: true }, // Ctrl + U (View Source)
    { key: "S", ctrlKey: true }, // Ctrl + S
    { key: "P", ctrlKey: true }, // Ctrl + P
  ];

  // Kiểm tra từng tổ hợp phím
  for (let forbidden of forbiddenKeys) {
    if (typeof forbidden === "string") {
      // Trường hợp F12
      if (event.key === forbidden) {
        event.preventDefault();
        console.log(
          "%c🚫 DevTools bị chặn",
          "color: #ff9edb; font-weight: bold;",
        );
        return;
      }
    } else {
      // Trường hợp Ctrl + Shift + ...
      if (
        event.key.toUpperCase() === forbidden.key &&
        event.ctrlKey === (forbidden.ctrlKey || false) &&
        event.shiftKey === (forbidden.shiftKey || false)
      ) {
        event.preventDefault();
        console.log(
          "%c🚫 DevTools bị chặn",
          "color: #ff9edb; font-weight: bold;",
        );
        return;
      }
    }
  }
});

// Bonus: Ngăn chuột phải + Inspect (tùy chọn, có thể bỏ nếu không muốn)
document.addEventListener("contextmenu", function (e) {
  e.preventDefault();
});
