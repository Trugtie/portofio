// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
  get,
  onValue,
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBKpFZz7nZWzky1Wjb8NYM6-CDVrW4JLaY",
  authDomain: "jiahanportofio.firebaseapp.com",
  projectId: "jiahanportofio",
  storageBucket: "jiahanportofio.firebasestorage.app",
  messagingSenderId: "615762014350",
  appId: "1:615762014350:web:be81719276b541604c99df",
  measurementId: "G-FQ0W8SK3PV",
  databaseURL:
    "https://jiahanportofio-default-rtdb.asia-southeast1.firebasedatabase.app", // Updated URL
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the database
const database = getDatabase(app);

function incrementVisitorCount() {
  const visitorCountRef = ref(database, "visitors/page_views");

  get(visitorCountRef)
    .then((snapshot) => {
      let count = snapshot.exists() ? snapshot.val() : 0;
      count++;
      set(visitorCountRef, count);
    })
    .catch((error) => {
      console.error("Error incrementing visitor count:", error);
    });
}

function displayVisitorCount() {
  const visitorCountRef = ref(database, "visitors/page_views");
  const visitorCountElement = document.querySelector(".viewer-count");

  onValue(visitorCountRef, (snapshot) => {
    const count = snapshot.val() || 0;
    visitorCountElement.innerText = `Visited: ${count}`;
  });
}

incrementVisitorCount();
displayVisitorCount();
