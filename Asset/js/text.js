// Wrap every letter in a span
var textWrappera = document.querySelector(".description .letters");
textWrappera.innerHTML = textWrappera.textContent.replace(
  /\S/g,
  "<span class='letter'>$&</span>"
);

anime.timeline({ loop: false }).add({
  targets: ".description .letter",
  scale: [0, 1],
  duration: 600,
  elasticity: 600,
  delay: (el, i) => 60 * (i + 1),
});

const audio = document.querySelector(".audio");
const soundPlay = document.querySelector(".soundPlay");
const soundPause = document.querySelector(".soundMute");
const audioBtn = document.querySelector(".audioBtn");

audio.volume = 0.2;
var isPlaying = false;

soundPlay.style.display = "none";

audioBtn.addEventListener("click", (e) => {
  console.log("Click " + isPlaying);
  if (isPlaying) {
    audio.pause();
    soundPause.style.display = "block";
    soundPlay.style.display = "none";
    isPlaying = false;
  } else {
    audio.play();
    soundPlay.style.display = "block";
    soundPause.style.display = "none";
    isPlaying = true;
  }
});
