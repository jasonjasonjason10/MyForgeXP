import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GameCard from "./GameCard";
import NewGameForm from "./NewGameForm";
import ReturnButton from "../ReturnButton";
import AddGameButton from "./AddGameButton";
import { address } from "../../../address";

export default function AllGames() {
  const [gameList, setGameList] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showGameForm, setShowGameForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("alphabetical");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchIsAdmin() {
      const response = await fetch(`${address}/user/info`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const result = await response.json();
      setIsAdmin(result.user.isAdmin);
    }
    fetchIsAdmin();
  }, []);

  useEffect(() => {
    async function fetchGameList() {
      const response = await fetch(`${address}/games/all`);
      const result = await response.json();
      setGameList(result.games);
    }
    fetchGameList();
  }, []);

  function clickHandle(id) {
    navigate(`../games/${id}`);
  }

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const filteredGames = gameList
    .filter((game) =>
      game.gameName.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "popular") {
        return (b.posts?.length || 0) - (a.posts?.length || 0);
      } else {
        return a.gameName.localeCompare(b.gameName);
      }
    });

  return (
    <div className="min-h-screen text-white px-4 py-10">
      <div className="max-w-6xl mx-auto">

        {/* Centered Title & Button */}
        <div className="flex flex-col items-center text-center mb-6">
          <h1 className="text-4xl font-bold mb-4 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
            All Games
          </h1>
          {isAdmin && (
            <AddGameButton onClick={() => setShowGameForm(true)} />
          )}
        </div>

        <div className="flex flex-col items-center gap-2 mb-8">
          <input
            type="text"
            placeholder="Search games..."
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent border border-gray-400 text-white px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-white w-full sm:w-64"
          />
          <select
            value={sortBy}
            onChange={handleSortChange}
            className="bg-transparent border border-gray-400 text-white px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-white w-full sm:w-64"
          >
            <option value="alphabetical">A - Z</option>
            <option value="popular">Most Posts</option>
          </select>
        </div>

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
      </div>

      <NewGameForm
        isOpen={showGameForm}
        onClose={() => setShowGameForm(false)}
      />
    </div>
  );
}
