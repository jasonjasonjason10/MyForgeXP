import { useKeenSlider } from "keen-slider/react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Homepage() {
  const [games, setGames] = useState([]);
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 15,
    },
    loop: true,
  });

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/igdb/games");
        const data = await res.json();
        setGames(data);
      } catch (err) {
        console.error("Failed to fetch games:", err);
      }
    };

    fetchGames();
  }, []);

  return (
    <div className="relative min-h-screen text-white px-6 pt-12 overflow-hidden">
      {/* Blurred background image without text, just hammer flame and anvil */}
      <div
        className="absolute inset-0 bg-center bg-cover scale-105 filter blur-md"
        style={{ backgroundImage: "url('/images/forgexp-bg.png')" }}
      ></div>

      {/* Overlay to darken the background image for a good UX */}
      <div className="absolute inset-0 bg-black opacity-60" />

      {/* Main content; come back to add carousel, other "about" refer to steam for ideas*/}
      <section className="relative z-10 min-h-[calc(100vh-64px)] flex flex-col justify-center items-center text-center">
        <img
          src="/images/forgexp-logo.png"
          alt="ForgeXP Logo"
          className="w-32 h-auto mb-6 drop-shadow-xl"
        />

        <h2 className="text-4xl md:text-6xl font-extrabold mb-6">
          Welcome to ForgeXP
        </h2>
        <p className="text-gray-300 text-lg md:text-xl max-w-2xl mb-12">
          Dive into game reviews, connect with fellow players, and explore the
          ultimate gaming experience hub.
        </p>
      </section>

      {/* CAROUSEL THAT IS NOT WORKING COME BACK AND FIX!*/}
      <section className="w-full max-w-6xl mx-auto">
        <h3 className="text-2xl font-bold mb-4">Featured Games</h3>
        <div ref={sliderRef} className="keen-slider">
          {games.map((game) => (
            <div key={game.id} className="keen-slider__slide p-2">
              <Link to={`/games/${game.id}`}>
                <img
                  src={
                    game.cover?.url
                      ? `https:${game.cover.url}`
                      : "https://via.placeholder.com/264x374?text=No+Image"
                  }
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
