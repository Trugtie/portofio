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

const bgVideo = document.querySelector(".bg-video");

const soundPlay = document.querySelector(".soundPlay");
const soundPause = document.querySelector(".soundMute");

const audioBtn = document.querySelector(".audioBtn");
const musicPlayer = document.querySelector(".music-player");

const avatar = document.querySelector(".avatar");

const socialLinkImages = document.querySelectorAll(".social-img");

bgVideo.volume = 0.2;
var isPlaying = false;

soundPlay.style.display = "none";

audioBtn.addEventListener("click", (e) => {
  toggleSound();
});

musicPlayer.addEventListener("click", (e) => {
  toggleSound();
});

function toggleSound() {
  if (isPlaying) {
    musicPlayer.classList.remove("music-player-anim");
    audioBtn.classList.remove("popping-scale");

    avatar.classList.remove("popping-music");

    socialLinkImages.forEach((element) => {
      element.classList.remove("popping-music");
    });

    bgVideo.pause();
    soundPause.style.display = "block";
    soundPlay.style.display = "none";
    isPlaying = false;
  } else {
    musicPlayer.classList.add("music-player-anim");
    audioBtn.classList.add("popping-scale");

    avatar.classList.add("popping-music");

    socialLinkImages.forEach((element) => {
      element.classList.add("popping-music");
    });

    bgVideo.play();
    soundPlay.style.display = "block";
    soundPause.style.display = "none";
    isPlaying = true;
  }
}

export { toggleSound };
