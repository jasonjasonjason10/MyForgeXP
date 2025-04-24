function GameCard({ game }) {
    return (
      <div className="relative rounded-xl shadow-lg p-4 bg-transparent backdrop-blur-sm flex flex-col items-center">
        <div className="relative w-full flex justify-center transition-transform duration-300 hover:scale-110">
          <img
            src={`http://localhost:3000${game.coverImage}`}
            alt="Game cover"
            className="h-60 w-auto object-contain rounded-xl"/>
          <div className="absolute bottom-2 bg-blue-300 text-white text-xs px-2 py-1 rounded-md shadow">
            Posts #
          </div>
        </div>
      </div>
    );
  }
  
  export default GameCard;
  
  