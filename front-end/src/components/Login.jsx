import { useState } from 'react';
import { useNavigate } from "react-router-dom";

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (!email && !password) {
      setError("Both fields are required.");
      console.error(error);
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();
      if (!response.ok) {
        setError(result.message || "Login failed.");
        return;
      }
      setToken(result.token);
      localStorage.setItem("token", result.token);
      localStorage.setItem("isAdmin", result.isAdmin);
      setSuccessMessage(`Success!`);
      setEmail("");
      setPassword("");
      setTimeout(() => {
        if (result.isAdmin) {
          navigate("/admin");
        } else {
          navigate("/");
        }
      }, 1500);

    } catch (error) {
      setError("Something went wrong. Please try again.");
      console.error("Login error:", error);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a1a2f] p-4">
      <div className="w-full max-w-md bg-[#13294b] text-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-semibold text-center mb-6 text-white">Sign In</h2>
  
        {error && <p className="text-red-400 text-sm mb-4 text-center">{error}</p>}
        {successMessage && <p className="text-green-400 text-sm mb-4 text-center">{successMessage}</p>}
  
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block mb-1 text-sm text-blue-300">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-[#0f1e36] text-white border border-blue-400 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required/>
          </div>
          <div>
            <label htmlFor="password" className="block mb-1 text-sm text-blue-300">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength="8"
              className="w-full px-4 py-2 rounded-lg bg-[#0f1e36] text-white border border-blue-400 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required/>
          </div>
          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-orange-500 hover:bg-orange-600 transition-all text-white font-semibold">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;