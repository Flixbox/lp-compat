const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "My API",
    description: "Description",
  },
  schemes: ["http", "https"],
  definitions: {
    App: {
      dateModified: 1663837807701,
      appId: "com.time.trigger",
      features: ["iap"],
      title: "Johnny Trigger: Action Shooter",
      summary:
        "Jump and shoot! Kill your targets! Become the crazed secret agent!",
      installs: "100,000,000+",
      minInstalls: 100000000,
      price: 0,
      free: true,
      priceText: "Free",
      androidVersion: "7.0",
      androidVersionText: "7.0",
      score: 4.4823356,
      scoreText: "4.5",
      developer: "SayGames Ltd",
      developerId: "6392896734092635573",
      genre: "Action",
      genreId: "GAME_ACTION",
      icon: "http://placekitten.com/200/200",
      headerImage: "http://placekitten.com/200/300",
      screenshots: [
        "http://placekitten.com/200/301",
        "http://placekitten.com/200/302",
      ],
      adSupported: true,
      updated: 1657362669000,
      version: "1.12.18",
      recentChanges: "Buf fixes. ",
      url: "https://example.com",
    },
  },
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./src/backend/backend.ts"];

swaggerAutogen(outputFile, endpointsFiles, doc);
