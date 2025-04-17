import HomeIntro from "./HomeIntro";
import Carousel from "./Carousel";
import TopRanked from "./TopRanked";
import TopRated from "./TopRated";

export default function Homepage() {
  return (
    <div className="relative min-h-screen text-white px-6 pt-12 overflow-hidden">
      {/*div for blurred background imag */}
      <div
        className="absolute inset-0 bg-center bg-cover scale-105 filter blur-md"
        style={{ backgroundImage: "url('/images/forgexp-bg.png')" }}
      ></div>

      {/* overlay div for bg image for good UX */}
      <div className="absolute inset-0 bg-black opacity-60" />

      {/* main container section */}
      <section className="relative z-10 flex flex-col items-center gap-8">
        <HomeIntro />

        <div className="w-full flex flex-row justify-between items-start gap-4 overflow-hidden px-2">
          {/* scroll list on LEFT */}
          <TopRanked />

          <div className="flex-1 min-w-[0]">
            <Carousel />
          </div>

          {/* scroll list on RIGHT*/}
          <TopRated />
        </div>
      </section>
    </div>
  );
}


