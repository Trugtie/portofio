// ====================== GAMING.JS ======================
// Assets/js/gaming.js - Đồng bộ data từ ConfigMain

function initGaming() {
  renderGaming();

  // Lắng nghe khi ConfigMain cập nhật data (sau khi save ở trang config)
  document.addEventListener("configMainReady", () => {
    renderGaming();
  });
}

function renderGaming() {
  // Lấy data từ ConfigMain
  let data = ConfigMain.getGamingCards();

  // Nếu chưa có data từ config thì dùng dữ liệu mặc định
  if (!Array.isArray(data) || data.length === 0) {
    data = [
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
        media: "/Assets/Images/briar.jpg",
        accentColor: "#ff9edb",
        cardColor: "#ff9edb4b",
      },
      {
        gameName: "Genshin Impact",
        summonerName: "Gia Hân",
        tag: "AR 58",
        rank: "Exploration 100%",
        mostPlayed: "Raiden Shogun",
        playstyle: "Main Electro & Story Enjoyer",
        favoriteChamps: ["Raiden Shogun", "Yae Miko", "Furina"],
        media: "/Assets/Images/samurai.jpg",
        accentColor: "#c084fc",
        cardColor: "#c084fc4d",
      },
      {
        gameName: "Teamfight Tactics",
        summonerName: "Gia Hân",
        tag: "TFT",
        rank: "Diamond 4",
        winRate: "51%",
        totalMatches: "129",
        mostPlayed: "Reroll Comp",
        playstyle: "Hyper Roll & Reroll Main",
        favoriteChamps: ["Reroll", "Fast 8", "Fast 9"],
        media:
          "https://i.pinimg.com/736x/26/81/3d/26813d91b4e058584cd5e1a2e36a258f.jpg",
        accentColor: "#eab308",
        cardColor: "#eab2085e",
      },
      {
        gameName: "Steam",
        summonerName: "Gia Hân",
        tag: "JiaHan",
        rank: "6.4 years",
        mostPlayed: "RPG & ARPG",
        playstyle:
          "Chơi mọi thể loại nhưng đặc biệt yêu thích Story-rich games",
        favoriteChamps: [
          "Eldering",
          "Monster Hunter World",
          "Granblue Fantasy: Relink",
        ],
        media:
          "https://i.pinimg.com/736x/f0/38/67/f03867ae5306631a0e744e6e97562984.jpg",
        accentColor: "#08ea26",
        cardColor: "#08ea2659",
      },
    ];
  }

  const grid = document.querySelector(".gaming-grid");
  if (!grid) return;

  let html = "";

  data.forEach((game) => {
    html += `
      <div class="gaming-card" style="--accent-color: ${game.accentColor || "#ff9edb"}; --card-color: ${game.cardColor || "#ff9edb4b"};">
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
            ${(game.favoriteChamps || []).map((champ) => `<span class="champ">${champ}</span>`).join("")}
          </div>

          <div class="stats-grid">
            ${game.winRate ? `<div class="stat-item"><span class="label">Win Rate:</span><span class="value">${game.winRate}</span></div>` : ""}
            ${game.totalMatches ? `<div class="stat-item"><span class="label">Total Matches:</span><span class="value">${game.totalMatches}</span></div>` : ""}
            ${game.kda ? `<div class="stat-item"><span class="label">KDA:</span><span class="value">${game.kda}</span></div>` : ""}
            <div class="stat-item"><span class="label">Most Played:</span><span class="value">${game.mostPlayed}</span></div>
          </div>

          <div class="playstyle">${game.playstyle || ""}</div>
        </div>
      </div>
    `;
  });

  grid.innerHTML = html;
}

// Export
window.initGaming = initGaming;
