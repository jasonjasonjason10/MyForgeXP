import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";

export default function Layout() {
  return (
    <div className="relative min-h-screen flex flex-col text-white overflow-hidden">
      {/* Blurred background image */}
      <div
        className="absolute inset-0 bg-center bg-cover scale-105 filter blur-md"
        style={{ backgroundImage: "url('/images/forgexp-bg.png')" }}
      ></div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-60" />

      <div className="relative z-10 flex flex-col flex-grow">
        <NavBar />
        <main className="flex-grow">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}
