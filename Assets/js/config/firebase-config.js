// ====================== FIREBASE CONFIG HELPER ======================
// Assets/js/config/firebase-config.js

let isFirebaseReady = false;

function waitForFirebase(callback) {
  if (window.database && window.firebaseRef) {
    isFirebaseReady = true;
    callback();
    return;
  }

  let attempts = 0;
  const interval = setInterval(() => {
    attempts++;
    if (window.database && window.firebaseRef) {
      clearInterval(interval);
      isFirebaseReady = true;
      callback();
    } else if (attempts > 50) {
      // chờ khoảng 5 giây
      clearInterval(interval);
      console.warn(
        "%c⚠️ Firebase vẫn chưa sẵn sàng sau 5 giây, fallback localStorage",
        "color: orange",
      );
      callback();
    }
  }, 100);
}

// ====================== SAVE ======================
function saveConfigToFirebase(config) {
  waitForFirebase(() => {
    if (!isFirebaseReady || !window.database || !window.firebaseRef) {
      console.warn(
        "%c⚠️ Firebase chưa sẵn sàng → fallback localStorage",
        "color: orange",
      );
      localStorage.setItem("linhPortfolioConfig", JSON.stringify(config));
      return;
    }

    const configRef = window.firebaseRef(
      window.database,
      "portfolioConfig/lastConfig",
    );

    window
      .firebaseSet(configRef, {
        ...config,
        updatedAt: Date.now(),
        updatedBy: "Config Page",
      })
      .then(() =>
        console.log("%c✅ Config saved to Firebase", "color: #ff9edb"),
      )
      .catch((err) => {
        console.error("Save to Firebase failed:", err);
        localStorage.setItem("linhPortfolioConfig", JSON.stringify(config));
      });
  });
}

// ====================== LOAD ======================
function loadConfigFromFirebase(callback) {
  waitForFirebase(() => {
    if (!isFirebaseReady || !window.database || !window.firebaseRef) {
      const saved = localStorage.getItem("linhPortfolioConfig");
      callback(saved ? JSON.parse(saved) : {});
      return;
    }

    const configRef = window.firebaseRef(
      window.database,
      "portfolioConfig/lastConfig",
    );

    window.firebaseOnValue(
      configRef,
      (snapshot) => {
        const data = snapshot.val() || {};
        callback(data);
      },
      (error) => {
        console.error("Load from Firebase failed:", error);
        const saved = localStorage.getItem("linhPortfolioConfig");
        callback(saved ? JSON.parse(saved) : {});
      },
    );
  });
}

function resetConfigInFirebase() {
  waitForFirebase(() => {
    if (!isFirebaseReady || !window.database || !window.firebaseRef) {
      localStorage.removeItem("linhPortfolioConfig");
      return;
    }

    const configRef = window.firebaseRef(
      window.database,
      "portfolioConfig/lastConfig",
    );
    window
      .firebaseSet(configRef, null)
      .then(() => console.log("%c✅ Firebase config reset", "color: #ff9edb"));
  });
}

// Export
window.saveConfigToFirebase = saveConfigToFirebase;
window.loadConfigFromFirebase = loadConfigFromFirebase;
window.resetConfigInFirebase = resetConfigInFirebase;
