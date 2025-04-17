import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export default function Register({ setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Registering:", email, password);

    // CHANGE THIS TO A SIMPLE YET STYLED SUCCESS MESSAGE ONCE WE HAVE HOOKED UP TO BACK END
    alert("Registered! (You can hook this up to the backend later)");
    navigate("/login");
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background image and overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center blur-md scale-105"
        style={{ backgroundImage: "url('/images/forgexp-bg.png')" }}
      />
      <div className="absolute inset-0 bg-black opacity-60" />

      {/* Form container */}
      <div className="relative z-10 flex justify-center items-center min-h-screen px-4">
        <form
          onSubmit={handleSubmit}
          className="bg-cover bg-center border border-blue-500 p-8 rounded-lg shadow-xl w-full max-w-md"
          style={{ backgroundImage: "url('/images/forgexp-grid-bg.png')" }}
        >
          <h2 className="text-3xl font-bold text-center mb-6">Register</h2>
          <div className="flex justify-center my-4">
            <img
              src="/images/minilogo.png"
              alt="ForgeXP Logo"
              className="h-20 w-auto drop-shadow-xl"
            />
          </div>

          <label className="block mb-2 font-semibold" htmlFor="email">
            Email
          </label>
          <input
            className="w-full px-4 py-2 mb-4 bg-gray-900 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label className="block mb-2 font-semibold" htmlFor="password">
            Password
          </label>
          <div className="relative">
            <input
              className="w-full px-4 py-2 mb-4 bg-gray-900 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength="8"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-3 right-4 text-xl cursor-pointer text-gray-300 hover:text-white"
            >
              {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </span>
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-orange-500 hover:bg-orange-400 text-white font-bold rounded mt-2 transition"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
