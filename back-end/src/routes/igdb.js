// const IGDB_GAMES_URL = "https://api.igdb.com/v4/games";

// const endpoints = [];

// export default async function getImages() {
//   try {
//     const response = await fetch(IGDB_GAMES_URL, {
//       method: "POST",
//       headers: {
//         Accept: "application/json",
//         "Client-ID": "n1rw74f6gu7z0vp1mwnnjcnjxhydem",
//         Authorization: "Bearer f60jxqdw7dh89x91z1wwgzvi94inzu",
//       },
//       body: "fields name,cover; limit 10;",
//     });
//     const tenGames = await response.json();
//     console.log(tenGames);
//     return tenGames;
//   } catch (error) {
//     console.log(error);
//   }
// }


// backend/routes/igdb.js
const express = require("express");
const fetch = require("node-fetch");
const router = express.Router();

router.get("/games", async (req, res) => {
  try {
    const response = await fetch("https://api.igdb.com/v4/games", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Client-ID": process.env.IGDB_CLIENT_ID,
        Authorization: `Bearer ${process.env.IGDB_ACCESS_TOKEN}`,
      },
      body: "fields name, cover.url; limit 10;",
    });

    const games = await response.json();
    res.json(games);
  } catch (error) {
    console.error("IGDB Fetch Error:", error);
    res.status(500).json({ error: "Failed to fetch games from IGDB" });
  }
});

module.exports = router;

