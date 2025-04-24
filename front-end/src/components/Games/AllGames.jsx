import { Link, Navigate } from "react-router-dom";
import GameCard from "./GameCard";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export default function AllGames() {
const [gameList, setGameList] = useState([])
const navigate = useNavigate()
console.log("gameList useState =>", gameList);

useEffect(() => {
  async function fetchGameList() {
    const response = await fetch('http://localhost:3000/games/all')
    const result = await response.json()
    setGameList(result.games)
  }
  fetchGameList()
},[])

function clickHandle(id) {
  console.log("tp to page :)")
  navigate(`../games/${id}`)
}

return (
  <div className="relative min-h-screen text-white overflow-hidden drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
    <div className="relative z-10 flex flex-col min-h-screen">
      <main className="flex-grow p-6">
        <h2 className="text-3xl font-bold mb-6 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
          All Games
        </h2>

        {gameList ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {gameList.map((game) => (
              <div key={game.id} onClick={() => clickHandle(game)}>
                <GameCard game={game} />
              </div>
            ))}
          </div>
        ) : (
          <h2>"loading . . ."</h2>
        )}
      </main>
    </div>
  </div>
);
}

