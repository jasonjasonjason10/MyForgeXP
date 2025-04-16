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
    </div>
  );
}
