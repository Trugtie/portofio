// ====================== FIREBASE CONFIG HELPER - PUBLIC READ ======================
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
    } else if (attempts > 60) {
      clearInterval(interval);
      console.warn(
        "%c⚠️ Firebase not ready → fallback to localStorage",
        "color: orange",
      );
      callback();
    }
  }, 100);
}

// ====================== SAVE (chỉ cho phép ghi vào portfolioConfig) ======================
function saveConfigToFirebase(config) {
  waitForFirebase(() => {
    if (!isFirebaseReady || !window.database || !window.firebaseRef) {
      localStorage.setItem("hanPortfolioConfig", JSON.stringify(config));
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
        console.error("Firebase save failed:", err);
        localStorage.setItem("hanPortfolioConfig", JSON.stringify(config));
      });
  });
}

// ====================== LOAD (public read) ======================
function loadConfigFromFirebase(callback) {
  waitForFirebase(() => {
    if (!isFirebaseReady || !window.database || !window.firebaseRef) {
      const saved = localStorage.getItem("hanPortfolioConfig");
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
        console.log("%c✅ Config loaded from Firebase", "color: #ff9edb");
        callback(data);
      },
      (error) => {
        console.error("Load failed:", error);
        const saved = localStorage.getItem("hanPortfolioConfig");
        callback(saved ? JSON.parse(saved) : {});
      },
    );
  });
}

function resetConfigInFirebase() {
  waitForFirebase(() => {
    if (!isFirebaseReady || !window.database || !window.firebaseRef) {
      localStorage.removeItem("hanPortfolioConfig");
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
