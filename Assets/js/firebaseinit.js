// ====================== FIREBASE INIT - PUBLIC READ ONLY ======================
// Assets/js/firebaseinit.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
  get,
  onValue,
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-database.js";

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

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

window.database = database;
window.firebaseRef = ref;
window.firebaseSet = set;
window.firebaseGet = get;
window.firebaseOnValue = onValue;

console.log(
  "%c✅ Firebase initialized (Public Read - Config Write Allowed)",
  "color: #ff9edb; font-weight: bold;",
);

function incrementVisitorCount() {
  const visitorRef = window.firebaseRef(database, "visitors/page_views");
  window.firebaseGet(visitorRef).then((snapshot) => {
    let count = snapshot.exists() ? snapshot.val() : 0;
    window.firebaseSet(visitorRef, count + 1);
  });
}

function updateVisitCounts(count) {
  const countEl = document.getElementById("visit-count");
  if (countEl) countEl.textContent = count;

  const countElTop = document.getElementById("visit-count-top");
  if (countElTop)
    countElTop.textContent = Number(count).toLocaleString("en-US");
}

function displayVisitorCount() {
  const visitorRef = window.firebaseRef(database, "visitors/page_views");

  window.firebaseOnValue(visitorRef, (snapshot) => {
    const count = snapshot.val() || 0;
    updateVisitCounts(count);
  });
}

incrementVisitorCount();
displayVisitorCount();

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    const visitorRef = window.firebaseRef(database, "visitors/page_views");
    window.firebaseGet(visitorRef).then((snapshot) => {
      const count = snapshot.val() || 0;
      updateVisitCounts(count);
    });
  }, 800);
});
