import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav className="bg-gray-900 text-white px-6 py-4 shadow-md flex justify-betweeen items-center">
      <Link
        to="/"
        className="text-3xl font-extrabold text-orange-400 hover:text-orange-300 transition"
      >
        ForgeXP
      </Link>
      <ul className="flex gap-6 text-lg">
        <li>
          <Link to="/community" className="hover:text-orange-400">
            Community
          </Link>
        </li>
        <li>
          <Link to="/reviews" className="hover:text-orange-400">
            All Games
          </Link>
        </li>
        <li>
          <Link to="/favorites" className="hover:text-orange-400">
            Favorites
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
    </nav>
  );
}
