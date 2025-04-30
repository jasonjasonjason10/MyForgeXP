import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GameCard from "./GameCard";
import NewGameForm from "./NewGameForm";
import ReturnButton from "../ReturnButton";
import AddGameButton from "./AddGameButton";
import SearchGame from "./SearchGame";

export default function AllGames() {
  const [gameList, setGameList] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showGameForm, setShowGameForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const address = "http://localhost:3000/";

  useEffect(() => {
    async function fetchIsAdmin() {
      const response = await fetch(`${address}user/info`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const result = await response.json();
      setIsAdmin(result.user.isAdmin);
    }
    fetchIsAdmin();
  }, []);

  useEffect(() => {
    async function fetchGameList() {
      const response = await fetch(`${address}games/all`);
      const result = await response.json();
      setGameList(result.games);
    }
    fetchGameList();
  }, []);

  function clickHandle(id) {
    navigate(`../games/${id}`);
  }

  const filteredGames = gameList.filter((game) =>
    game.gameName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative min-h-screen text-white overflow-hidden ">
      <div className="relative z-10 flex flex-col min-h-screen">
        <main className="flex-grow p-6">
          {isAdmin && (
            <div className="mb-6">
              <AddGameButton onClick={() => setShowGameForm(true)} />
            </div>
          )}

          <h2 className="text-4xl font-bold mb-6 flex justify-center drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] pb-2">
            All Games
          </h2>

          <SearchGame onSearch={(query) => setSearchQuery(query)} />

          {filteredGames.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] cursor-pointer">
              {filteredGames.map((game) => (
                <div key={game.id} onClick={() => clickHandle(game.id)}>
                  <GameCard game={game} />
                </div>
              ))}
            </div>
          ) : (
            <h2 className="text-center text-white mt-6">No games found.</h2>
          )}
        </main>
      </div>

      <div className="flex justify-center">
        <ReturnButton />
      </div>

      <NewGameForm
        isOpen={showGameForm}
        onClose={() => setShowGameForm(false)}
      />
    </div>
  );
}
