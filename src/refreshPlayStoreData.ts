const gplay = require("google-play-scraper");

gplay
  .app({ appId: "com.google.android.apps.translate" })
  .then(console.log, console.log);
