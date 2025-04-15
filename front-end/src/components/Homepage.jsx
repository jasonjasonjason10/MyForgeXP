import { useKeenSlider } from "keen-slider/react";
import mockData from "../data/mockData";
import { Link } from "react-router-dom";

export default function Homepage() {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 15,
    },
    loop: true,
  });

  return (
    <div className="bg-gray-900 text-white px-6 pt-12">
      {/* Hero Section */}
      <section className="min-h-[calc(100vh-64px)] flex flex-col justify-center items-center text-center">
        <h2 className="text-4xl md:text-6xl font-extrabold mb-6">
          Welcome to ForgeXP
        </h2>
        <p className="text-gray-300 text-lg md:text-xl max-w-2xl mb-12">
          Dive into game reviews, connect with fellow players, and explore the
          ultimate gaming experience hub.
        </p>
      </section>

      {/* Carousel Section */}
      <section className="w-full max-w-6xl mx-auto">
        <h3 className="text-2xl font-bold mb-4">Featured Games</h3>
        <div ref={sliderRef} className="keen-slider">
          {mockData.map((game) => (
            <div key={game.id} className="keen-slider__slide p-2">
              <Link to={`/games/${game.id}`}>
                <img
                  src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover}.jpg`}
                  alt={game.name}
                  className="rounded shadow-lg hover:scale-105 transition duration-300 w-full h-64 object-cover"
                />
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
