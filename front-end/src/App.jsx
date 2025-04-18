import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Homepage from "./components/HomePage/Homepage";
import AllGames from "./components/Games/AllGames";
import SingleGame from "./components/Games/SingleGame";
import Login from "./components/Login";
import Register from "./components/Register";
import Account from "./components/Account/Account";

function App() {
  const [token, setToken] = useState(null);

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* <div className="max-w-[2900px] mx-auto px-4"> */}
      <NavBar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route
          path="/register"
          element={<Register setToken={setToken} token={token} />}
        />
        <Route path="/all-games" element={<AllGames />} />
        <Route path="/games/:id" element={<SingleGame />} />
        <Route path="/account" element={<Account />} />

        {/* Add other routes later, set "/" to Homepage so that when user goes to forgexp.com it routes to HomePage */}
      </Routes>
      {/* </div> */}
    </div>
  );
}

export default App;
