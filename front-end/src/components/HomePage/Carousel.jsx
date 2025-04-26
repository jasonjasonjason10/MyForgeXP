import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useEffect, useState } from "react";
import mockData from "../../data/mockData";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
const address = "http://localhost:3000";

export default function Carousel() {
  const [gameList, setGameList] = useState([])
  console.log('game useState => ', gameList);
  
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    slides: {
      perView: 3, // default (desktop)
      spacing: 16,
    },
    breakpoints: {
      '(max-width: 768px)': {
        slides: {
          perView: 1, // mobile: only show 1
          spacing: 12,
        },
      },
      '(max-width: 1024px)': {
        slides: {
          perView: 2, // tablet: show 2
          spacing: 14,
        },
      },
    },
  });
  
  useEffect(() => {
    async function fetchGames() {
      const response = await fetch(`${address}/games/all`)
      const result = await response.json()
      setGameList(result.games)
    }
    fetchGames()
  }, [])


  
  return (
    <div className="relative bg-gray-900 rounded-lg p-4 shadow-lg ">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold flex items-center gap-2 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
          Featured Games
        </h3>
        <Link
          to="/all-games"
          className="text-sm px-3 py-1 bg-orange-500 hover:bg-orange-600 rounded text-white font-semibold shadow"
        >
          See More
        </Link>
      </div>

      {/* Arrows */}
      <button
        onClick={() => instanceRef.current?.prev()}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-black/70 p-2 rounded-full hover:bg-black"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>

      <button
        onClick={() => instanceRef.current?.next()}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-black/70 p-2 rounded-full hover:bg-black"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      {/* Carousel */}
      <div ref={sliderRef} className="keen-slider ">
        {gameList.map((game) => (
          <div key={game.id} className="keen-slider__slide p-4 sm:p-5 lg:p-6">
            <Link to={`/games/${game.id}`}>
              <div className="bg-gray-800 rounded-lg border border-transparent hover:border-blue-400 hover:scale-105 transition duration-200 shadow p-2">
                <img
                  src={`${address}${game.coverImage}`}
                  alt={game.gxameName}
                  className="w-full h-48 object-cover object-center rounded-md"
                />
                <div className="pt-3">
                  <h4 className="text-white text-md font-bold truncate">
                    {game.name}
                  </h4>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* section dot indicator */}
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
