import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export default function Register({ setToken }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch("http://localhost:3000/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, username, fName, lName, password }),
      });

      const result = await response.json();

      if (response.ok) {
        setToken(result.token);
        localStorage.setItem("token", result.token);
        setSuccessMessage(result.successMessage);
        setTimeout(() => navigate("/"), 1500);
      } else {
        setError(result.error || "Registration failed.");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong.");
    }
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
          {error && (
            <p className="text-orange-400 text-sm mb-2 text-center">{error}</p>
          )}
          {successMessage && (
            <p className="text-blue-400 text-sm mb-2 text-center">
              {successMessage}
            </p>
          )}

          {/* Field for first name input*/}
          <label
            className="block mb-2 font-semibold text-white"
            htmlFor="fName"
          >
            First Name
          </label>
          <input
            className="w-full px-4 py-2 mb-4 bg-gray-900 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            id="fName"
            placeholder="First Name (optional)"
            value={fName}
            onChange={(e) => setFName(e.target.value)}
          />

          {/* field for Last name input */}
          <label
            className="block mb-2 font-semibold text-white"
            htmlFor="lName"
          >
            Last Name
          </label>
          <input
            className="w-full px-4 py-2 mb-4 bg-gray-900 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            id="lName"
            placeholder="Last Name (optional)"
            value={lName}
            onChange={(e) => setLName(e.target.value)}
          />

          {/* Field for username input */}
          <label
            className="block mb-2 font-semibold text-white"
            htmlFor="username"
          >
            Username
          </label>
          <input
            className="w-full px-4 py-2 mb-4 bg-gray-900 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
            type="text"
            id="username"
            placeholder="Choose a username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          {/* field for Email input */}
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
