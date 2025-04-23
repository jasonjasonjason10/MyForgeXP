//WHO DID THIS MIGHT NOT NEED THIS< WAS FOR DEV ONLY?????

// import { useParams } from "react-router-dom";
// import mockData from "../../data/mockData";

// export default function SingleGame() {
//   const { id } = useParams();
//   const game = mockData.find((game) => frameElement.id.toString() === id);

//   if (!game) return <p className="text-white p-4">Game Not Found.</p>;

//   return (
//     <div className="p-6 text-white">
//       <h2 className="text-3xl font-bold mb-4">{game.name}</h2>
//       <img
//         src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover}.jpg`}
//         alt={game.name}
//         className="w-full max-w-md mb-4 rounded"
//       />
//       <p>{game.summary}</p>
//       <a
//         href={game.url}
//         target="_blank"
//         rel="noopener noreferrer"
//         className="text-orange-400 underline mt-4 inline-block"
//       >
//         View on IGDB
//       </a>
//     </div>
//   );
// }

import { useParams } from "react-router-dom";
import mockData from "../../data/mockData";

export default function SingleGame() {
  const { id } = useParams();
  const game = mockData.find((g) => g.id === parseInt(id));

  if (!game) {
    return (
      <div className="text-center mt-20 text-white text-xl">
        Game not found.
      </div>
    );
  }

  return (
    <div className="relative min-h-screen text-white overflow-hidden px-4 pt-10 max-w-4xl mx-auto">
      <div className="bg-gray-900 rounded-lg p-6 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
        <h2 className="text-3xl font-bold mb-4">{game.name}</h2>
        {game.cover && (
          <img
            src={game.cover}
            alt={game.name}
            className="w-full h-64 object-cover object-center rounded-md mb-4"
          />
        )}
        <p className="text-gray-300 mb-4">{game.summary}</p>
        {/* Add more fields like rating, release date, etc if available in mockData */}
      </div>
    </div>
  );
}
