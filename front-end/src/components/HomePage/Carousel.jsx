import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

const address = "http://localhost:3000";

export default function Carousel() {
  const [gameList, setGameList] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    slides: {
      perView: 5, // 👉 Show 5 games at once on desktop
      spacing: 16,
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel); // ✅ track current slide
    },
    breakpoints: {
      "(max-width: 1024px)": {
        slides: { perView: 3, spacing: 14 },
      },
      "(max-width: 768px)": {
        slides: { perView: 2, spacing: 12 },
      },
      "(max-width: 480px)": {
        slides: { perView: 1, spacing: 10 },
      },
    },
  });

  useEffect(() => {
    async function fetchGames() {
      const response = await fetch(`${address}/games/all`);
      const result = await response.json();
      setGameList(result.games);
    }
    fetchGames();
  }, []);

  return (
    <div className="relative bg-gray-900 rounded-lg p-4 shadow-lg">
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
          Featured Games
        </h3>
        <Link
          to="/all-games"
          className="text-sm px-3 py-1 bg-orange-500 hover:bg-orange-600 rounded text-white font-semibold shadow"
        >
          See More
        </Link>
      </div>

      {/* Left Arrow */}
      <button
        onClick={() => instanceRef.current?.prev()}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-black/70 p-2 rounded-full hover:bg-black"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>

      {/* Right Arrow */}
      <button
        onClick={() => instanceRef.current?.next()}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-black/70 p-2 rounded-full hover:bg-black"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      {/* Carousel Slides */}
      <div ref={sliderRef} className="keen-slider">
        {gameList.map((game) => (
          <div key={game.id} className="keen-slider__slide p-2">
            <Link to={`/games/${game.id}`}>
              <div className="bg-gray-800 rounded-lg border border-transparent hover:border-blue-400 hover:scale-105 transition duration-200 shadow p-2">
                <img
                  src={`${address}${game.coverImage}`}
                  alt={game.gameName}
                  className="w-full h-40 object-cover rounded-md"
                />
                <div className="pt-2">
                  <h4 className="text-white text-md font-semibold truncate">
                    {game.gameName}
                  </h4>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* Dot Indicators */}
      <div className="flex justify-center mt-4">
        {Array.from({ length: gameList.length }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => instanceRef.current?.moveToIdx(idx)}
            className={`w-3 h-3 rounded-full mx-1 transition ${
              currentSlide === idx ? "bg-orange-400" : "bg-gray-500"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
}
