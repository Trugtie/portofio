// ====================== FIREBASE INIT ======================
// Assets/js/firebaseinit.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
  get,
  onValue,
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-database.js";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBKpFZz7nZWzky1Wjb8NYM6-CDVrW4JLaY",
  authDomain: "jiahanportofio.firebaseapp.com",
  projectId: "jiahanportofio",
  storageBucket: "jiahanportofio.firebasestorage.app",
  messagingSenderId: "615762014350",
  appId: "1:615762014350:web:be81719276b541604c99df",
  measurementId: "G-FQ0W8SK3PV",
  databaseURL:
    "https://jiahanportofio-default-rtdb.asia-southeast1.firebasedatabase.app",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// === PUBLIC RA WINDOW ĐỂ CÁC FILE KHÁC DÙNG ĐƯỢC ===
window.database = database;
window.firebaseRef = ref;
window.firebaseSet = set;
window.firebaseGet = get;
window.firebaseOnValue = onValue;



// Giữ nguyên chức năng visitor count
function incrementVisitorCount() {
  const visitorCountRef = window.firebaseRef(database, "visitors/page_views");
  window
    .firebaseGet(visitorCountRef)
    .then((snapshot) => {
      let count = snapshot.exists() ? snapshot.val() : 0;
      count++;
      window.firebaseSet(visitorCountRef, count);
    })
    .catch((error) => {
      console.error("Error incrementing visitor count:", error);
    });
}

function displayVisitorCount() {
  const visitorCountRef = window.firebaseRef(database, "visitors/page_views");
  const visitorCountElement = document.querySelector("#visit-count");

  window.firebaseOnValue(visitorCountRef, (snapshot) => {
    const count = snapshot.val() || 0;
    if (visitorCountElement) visitorCountElement.innerText = `${count}`;
  });
}

incrementVisitorCount();
displayVisitorCount();
