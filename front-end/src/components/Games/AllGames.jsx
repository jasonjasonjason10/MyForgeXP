import mockData from "../../data/mockData";

export default function AllGames() {
  return (
    <div className="relative min-h-screen text-white overflow-hidden">
      {/* Blurred background image */}
      <div
        className="absolute inset-0 bg-center bg-cover scale-105 filter blur-md"
        style={{ backgroundImage: "url('/images/forgexp-bg.png')" }}
      ></div>

      {/* Overlay for darkening background */}
      <div className="absolute inset-0 bg-black opacity-60" />

      {/* Content wrapper */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Content area that grows (why footer wasnt going to bottom)*/}
        <main className="flex-grow p-6">
          <h2 className="text-3xl font-bold mb-6 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">All Games</h2>

          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {mockData.map((game) => (
              <div
                key={game.id}
                className="bg-gray-800 text-white p-4 rounded-lg shadow hover:shadow-xl transition  hover:border-blue-400 hover:scale-105"
              >
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
            ))}
          </div>
        </main>

        {/* Footer that stays at bottom */}
        <footer className="w-full bg-gray-900 text-white py-3 px-6 border-t border-gray-700">
          <div className="w-full text-left text-sm">
            © {new Date().getFullYear()} ForgeXP. All rights reserved.
          </div>
        </footer>
      </div>
    </div>
  );
}
