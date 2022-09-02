const dirtyAppIds = [
  "jp.pokemon.pokemonquest",
  "net.apex_designs.payback2",
  "com.hasbro.beybladesenterprise",
  "air.SiftHeadsRebornAndroid",
  "com.bulkypix.deadeffect&gl=US",
  "com.wb.goog.legoswtfa",
  "com.wb.lego.tcs",
  "com.aspyr.swkotor&hl=en_US&gl=US",
  "com.ea.games.r3_na",
  "com.olzhas.carparking.multyplayer",
  "com.pokemon.pokemonplayhouse",
  "jp.pokemon.pokemonsmile",
  "jp.pokemon.koiking&hl=en_US&gl=US",
  "com.and.games505.TerrariaPaid",
  "com.ea.games.nfs13_na",
  "org.dashnet.cookieclicker",
  "com.rovio.BadPiggies",
  "com.rockstargames.gtalcs",
  "com.rockstargames.gtavc",
  "com.rockstar.gta3",
  "com.rockstargames.gtasa",
];

const cleanAppIds = dirtyAppIds.map((i) => i.split("&")[0]);

const result = {};

for (const id in cleanAppIds) {
  result[cleanAppIds[id]] = {
    category: "root",
    features: ["no-iap", "root-patch"],
  };
}

console.log(result);
