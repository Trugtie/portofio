// ====================== GAMING.JS ========================

const gamingData = [
  // Card 1: League of Legends
  {
    gameName: "League of Legends",
    summonerName: "Gia Hân",
    tag: "Japan",
    rank: "Master",
    winRate: "70%",
    totalMatches: "109",
    kda: "2.33 : 1",
    mostPlayed: "Briar",
    playstyle: "Jungle — Chuyên Briar và tướng sát thủ",
    favoriteChamps: ["Briar", "Jinx", "Pantheon"],
    media:
      "https://media.discordapp.net/attachments/925810547931365386/1494410718433509447/IMG_2401.jpg?ex=69e281f0&is=69e13070&hm=7db4d799ab1b7e21c5997728160513c104b5d07b97ff51311d7f911f49cf3e5e&=&format=webp&width=448&height=793",
    accentColor: "#ff9edb",
    cardColor: "#ff9edb4b",
  },
  // Card 2: Genshin Impact
  {
    gameName: "Genshin Impact",
    summonerName: "Gia Hân",
    tag: "AR 58",
    rank: "Exploration 100%",
    winRate: "",
    totalMatches: "",
    kda: "",
    mostPlayed: "Raiden Shogun",
    playstyle: "Main Electro & Story Enjoyer",
    favoriteChamps: ["Raiden Shogun", "Yae Miko", "Furina"],
    media:
      "https://i.pinimg.com/736x/82/ad/df/82addfe72478ad9bf2b697802a8d27ed.jpg",
    accentColor: "#c084fc",
    cardColor: "#c084fc4d",
  },
  // Card 3: Teamfight Tactics
  {
    gameName: "Teamfight Tactics",
    summonerName: "Gia Hân",
    tag: "TFT",
    rank: "Diamond 4",
    winRate: "51%",
    totalMatches: "129",
    kda: "",
    mostPlayed: "Reroll Comp",
    playstyle: "Hyper Roll & Reroll Main",
    favoriteChamps: ["Reroll", "Fast 8", "Fast 9"],
    media:
      "https://i.pinimg.com/736x/26/81/3d/26813d91b4e058584cd5e1a2e36a258f.jpg",
    accentColor: "#eab308",
    cardColor: "#eab2085e",
  },
  // Card 4: Steam
  {
    gameName: "Steam",
    summonerName: "Gia Hân",
    tag: "JiaHan",
    rank: "6.4 years",
    winRate: "",
    totalMatches: "",
    kda: "",
    mostPlayed: "RPG & ARPG",
    playstyle: "Chơi mọi thể loại nhưng đặc biệt yêu thích Story-rich games",
    favoriteChamps: [
      "Eldering",
      "Monster Hunter World",
      "Granblue Fantasy: Relink",
    ],
    media:
      "https://i.pinimg.com/736x/f0/38/67/f03867ae5306631a0e744e6e97562984.jpg", // ← thay bằng link ảnh Steam thực tế của bạn
    accentColor: "#08ea26",
    cardColor: "#08ea2659",
  },
];

function renderGamingCards(data) {
  const grid = document.querySelector(".gaming-grid");
  if (!grid) return;

  let html = "";

  data.forEach((game) => {
    html += `
      <div class="gaming-card" style="--accent-color: ${game.accentColor}; --card-color: ${game.cardColor};">
        <div class="card-left">
          <img src="${game.media}" 
               alt="${game.gameName}" 
               class="character-image">
        </div>
        <div class="card-right">
          <h2 class="game-name">${game.gameName}</h2>

          <div class="summoner-info">
            <h3>${game.summonerName} <span class="tag">#${game.tag}</span></h3>
            <p class="rank">${game.rank}</p>
          </div>

          <div class="favorite-champs">
            ${game.favoriteChamps.map((champ) => `<span class="champ">${champ}</span>`).join("")}
          </div>

          <div class="stats-grid">
            ${game.winRate ? `<div class="stat-item"><span class="label">Win Rate:</span><span class="value">${game.winRate}</span></div>` : ""}
            ${game.totalMatches ? `<div class="stat-item"><span class="label">Total Matches:</span><span class="value">${game.totalMatches}</span></div>` : ""}
            ${game.kda ? `<div class="stat-item"><span class="label">KDA:</span><span class="value">${game.kda}</span></div>` : ""}
            <div class="stat-item"><span class="label">Most Played:</span><span class="value">${game.mostPlayed}</span></div>
          </div>

          <div class="playstyle">${game.playstyle}</div>
        </div>
      </div>
    `;
  });

  grid.innerHTML = html;
}

window.initGaming = () => renderGamingCards(gamingData);
