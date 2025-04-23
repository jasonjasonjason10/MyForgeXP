import { Link } from "react-router-dom";
import mockData from "../../data/mockData";

export default function AllGames() {
  return (
    <div className="relative min-h-screen text-white overflow-hidden drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
      <div className="relative z-10 flex flex-col min-h-screen">
        <main className="flex-grow p-6">
          <h2 className="text-3xl font-bold mb-6 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
            All Games
          </h2>

          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {mockData.map((game) => (
              <Link key={game.id} to={`/games/${game.id}`}>
                <div className="bg-gray-800 text-white p-4 rounded-lg shadow hover:shadow-xl transition  hover:border-blue-400 hover:scale-105">
                  {game.cover && (
                    <img
                      src={game.cover}
                      alt={game.name}
                      className="w-full h-48 object-cover object-center rounded-md"
                    />
                  )}
                  <h3 className="text-xl font-semibold mb-2">{game.name}</h3>
                  <p className="text-sm text-gray-300 mb-2">
                    {game.summary?.slice(0, 100)}...
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

