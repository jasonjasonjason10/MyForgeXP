import { Link } from "react-router-dom";
import mockData from "../../data/mockData";
import GameCard from "./GameCard";
import { useEffect, useState } from "react";

export default function AllGames() {
const [gameList, setGameList] = useState([])

console.log("gameList useState =>", gameList);


useEffect(() => {
  async function fetchGameList() {
    const response = await fetch('http://localhost:3000/games/all')
    const result = await response.json()
    console.log("sec", result);
    setGameList(result.games)
  }
  fetchGameList()
},[])

function clickHandle() {
  console.log("tp to page :)")
}

  
  return (
    <div className="relative min-h-screen text-white overflow-hidden drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
      <div className="relative z-10 flex flex-col min-h-screen">
        <main className="flex-grow p-6">
          <h2 className="text-3xl font-bold mb-6 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
            All Games
          </h2>
          {gameList ? gameList.map((game) => (
            <div key={game.id} className="border-solid-4" onClick={clickHandle}>
              <GameCard game={game}/>
            </div>
          ))
        : <h2>"loading . . ."</h2>
        }
          <div>
          </div>
        </main>
      </div>
    </div>
  );
}

