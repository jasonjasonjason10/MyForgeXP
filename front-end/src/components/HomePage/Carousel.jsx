import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useState } from "react";
import mockData from "../../data/mockData";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    slides: {
      perView: 3,
      spacing: 15,
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
  });

  return (
    <div className="relative bg-gray-900 rounded-lg p-4 shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold flex items-center gap-2">
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
      <div ref={sliderRef} className="keen-slider">
        {mockData.map((game) => (
          <div
            key={game.id}
            className="keen-slider__slide p-2"
          >
            <Link to={`/games/${game.id}`}>
              <div className="block bg-gray-800 rounded-lg overflow-hidden shadow hover:scale-105 hover:ring-2 hover:ring-orange-400 transition duration-200"
              >
                <img
                  src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover}.jpg`}
                  alt={game.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-3">
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
        {Array.from({ length: mockData.length }).map((_, idx) => (
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
