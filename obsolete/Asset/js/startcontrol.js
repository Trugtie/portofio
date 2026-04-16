import { toggleSound } from "./text.js";

const startVisit = document.querySelector(".start-visit");
const portofio = document.querySelector(".portofio-section");
const startContainer = document.querySelector(".start-container");

startContainer.addEventListener("click", (e) => {
  openPortofio();
});

function openPortofio() {
  startVisit.style.display = "none";
  portofio.style.display = "block";
  toggleSound();
}
