import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Homepage from './components/Homepage';
import AllGames from './components/All-Games/AllGames';


function App() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <NavBar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/all-games" element={<AllGames />} />
        {/* Add other routes later, set "/" to Homepage so that when user goes to forgexp.com it routes to HomePage */}
      </Routes>
    </div>
  );
}

export default App;
