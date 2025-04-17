import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-700 text-white px-6 py-4 shadow-md">
      <div className="flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <img
            src="/images/minilogo.png"
            alt="ForgeXP Logo"
            className="h-8 w-auto drop-shadow-xl"
          />
          <span className="text-2xl font-extrabold text-orange-400 hover:text-orange-300 transition text-shadow-lg">
            ForgeXP
          </span>
        </Link>

        {/* Hamburger button */}
        <button
          className="lg:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Nav links (desktop not mobile) */}
        <ul className="hidden lg:flex gap-6 text-lg">
          <li>
            <Link to="/community" className="hover:text-orange-400">
              Community
            </Link>
          </li>
          <li>
            <Link to="/all-games" className="hover:text-orange-400">
              All Games
            </Link>
          </li>
          <li>
            <Link to="/login" className="hover:text-orange-400">
              Login
            </Link>
          </li>
          <li>
            <Link to="/register" className="hover:text-orange-400">
              Register
            </Link>
          </li>
        </ul>
      </div>

      {/* NavBar links WHEN mobile dropdown ("hamburger") using lucid-react. Others may have to install. Ask Jason for install command */}
      {isOpen && (
        <ul className="flex flex-col mt-4 space-y-3 lg:hidden text-lg">
          <li>
            <Link
              to="/community"
              className="hover:text-orange-400"
              onClick={() => setIsOpen(false)}
            >
              Community
            </Link>
          </li>
          <li>
            <Link
              to="/all-games"
              className="hover:text-orange-400"
              onClick={() => setIsOpen(false)}
            >
              All Games
            </Link>
          </li>
          <li>
            <Link
              to="/login"
              className="hover:text-orange-400"
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
          </li>
          <li>
            <Link
              to="/register"
              className="hover:text-orange-400"
              onClick={() => setIsOpen(false)}
            >
              Register
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
}
