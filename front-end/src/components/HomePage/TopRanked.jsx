import mockData from "../../data/mockData";
import { Link } from "react-router-dom";

export default function TopRanked() {
  return (
    <div className="bg-gray-900 rounded-lg p-3 shadow-lg h-[calc(100vh-250px)] w-[70px] sm:w-[90px] md:w-[100px] lg:w-[120px] overflow-y-auto space-y-4 shrink-0">
      <h4 className="text-white text-xs font-semibold text-center mb-2">
        Top Ranked
      </h4>
      {mockData.slice(0, 8).map((game) => (
        <Link
          to={`/games/${game.id}`}
          key={game.id}
          className="block bg-gray-800 rounded-lg overflow-hidden shadow hover:scale-105 hover:ring-2 hover:ring-orange-400 transition duration-200"
        >
          <img
            src={`https://images.igdb.com/igdb/image/upload/t_cover_small/${game.cover}.jpg`}
            alt={game.name}
            className="w-full h-auto object-cover"
          />
        </Link>
      ))}
    </div>
  );
}
