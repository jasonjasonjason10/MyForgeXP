import { useParams } from "react-router-dom";
import mockData from "../../data/mockData";

export default function SingleGame() {
  const { id } = useParams();
  const game = mockData.find((game) => frameElement.id.toString() === id);

  if (!game) return <p className="text-white p-4">Game Not Found.</p>;

  return (
    <div className="p-6 text-white">
      <h2 className="text-3xl font-bold mb-4">{game.name}</h2>
      <img
        src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover}.jpg`}
        alt={game.name}
        className="w-full max-w-md mb-4 rounded"
      />
      <p>{game.summary}</p>
      <a
        href={game.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-orange-400 underline mt-4 inline-block"
      >
        View on IGDB
      </a>
    </div>
  );
}
