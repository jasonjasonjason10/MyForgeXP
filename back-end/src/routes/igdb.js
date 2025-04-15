const IGDB_GAMES_URL = "https://api.igdb.com/v4/games";

const endpoints = [];

export default async function getImages() {
  try {
    const response = await fetch(IGDB_GAMES_URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Client-ID": "n1rw74f6gu7z0vp1mwnnjcnjxhydem",
        Authorization: "Bearer f60jxqdw7dh89x91z1wwgzvi94inzu",
      },
      body: "fields name,cover; limit 10;",
    });
    const tenGames = await response.json();
    console.log(tenGames);
    return tenGames;
  } catch (error) {
    console.log(error);
  }
}

getImages();
