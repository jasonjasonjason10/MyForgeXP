import mockData from "../../data/mockData";

export default function AllGames() {
  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-white mb-6">All Games</h2>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {mockData.map((game) => (
          <div
            key={game.id}
            className="bg-gray-800 text-white p-4 rounded-lg shadow hover:shadow-xl transition"
          >
            {game.cover && (
              <img
                src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover}.jpg`}
                alt={`${game.name} Cover`}
                className="w-full h-64 object-cover mb-4 rounded"
              />
            )}
            <h3 className="text-xl font-semibold mb-2">{game.name}</h3>
            <p className="text-sm text-gray-300 mb-2">
              {game.summary?.slice(0, 100)}...
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
