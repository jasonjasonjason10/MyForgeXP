import HomeIntro from "./HomeIntro";
import Carousel from "./Carousel";

export default function Homepage() {
  return (
    <div className="relative min-h-screen flex flex-col text-white overflow-hidden">
      {/* Blurred background image */}
      <div
        className="absolute inset-0 bg-center bg-cover scale-105 filter blur-md"
        style={{ backgroundImage: "url('/images/forgexp-bg.png')" }}
      ></div>

      {/* Overlay for darkening background */}
      <div className="absolute inset-0 bg-black opacity-60" />

      {/* Content wrapper */}
      <div className="relative z-10 flex flex-col flex-grow">
        {/* Main content routing in homeIntro and Carousel */}
        <main className="flex-grow px-6 pt-12 w-full flex flex-col gap-8">
          <HomeIntro />

          <div className="w-full flex justify-between items-start gap-4 overflow-hidden px-6 sm:px-8 md:px-12 lg:px-20 mb-20">
            <div className="flex-1 min-w-[0]">
              <Carousel />
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="w-full bg-gray-900 text-white py-3 px-6 border-t border-gray-700">
          <div className="w-full flex flex-col md:flex-row justify-start items-center text-sm px-6">
            <span className="text-center md:text-left">
              © {new Date().getFullYear()} ForgeXP. All rights reserved.
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
}
