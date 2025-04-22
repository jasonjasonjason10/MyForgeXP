import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";


export default function SearchUser() {
  //==============fetch function====================
  const [user, setUser] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filtered, setFiltered] = useState([]);
  const navigate = useNavigate();
  console.log("User Array", user);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch("http://localhost:3000/user/usernames");
        const result = await response.json();
        if (!result.error) {
          setUser(result.allUsers);
          setFiltered(result.allUsers);
        } else {
          console.error("Error fetching users:", result.error);
        }
      } catch (err) {
        console.error("Fetch error:", err);
      }
    }
    fetchUsers();
  }, []);

  function clickHandle() {
    navigate("../user");
  }

  useEffect(() => {
    const lower = searchTerm.toLowerCase();
    const filteredResults = user.filter((user) =>
      user.username.toLowerCase().includes(lower)
    );
    setFiltered(filteredResults);
  }, [searchTerm, user]);

  //!!!NOTE: when this search bar component is moved to the Community page. Styling will need to change!!!
  return (
    <div className="relative w-64">
      <div className="flex items-center bg-gray-800 text-white rounded-full px-4 py-2 shadow-sm border border-blue-500 focus-within:ring-2 focus-within:ring-blue-600">
        <Search className="mr-2 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Search Users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-transparent text-white placeholder-gray-400 outline-none w-full"
        />
      </div>

      {searchTerm && filtered.length > 0 && (
        <ul className="absolute mt-2 w-full bg-gray-900 rounded shadow-lg z-50 max-h-60 overflow-y-auto border border-gray-700"
        >
          {filtered.map((user) => (
            <li
              key={user.id}
              className="flex items-center gap-3 px-4 py-2 hover:bg-gray-700 cursor-pointer transition"
              onClick={clickHandle}
              
            >
              <img
                src={`http://localhost:3000${user.avatar}`}
                alt="avatar"
                className="w-6 h-6 rounded-full object-cover border border-gray-600"
              />
              <span>{user.username}</span>
            </li>
          ))}
        </ul>
      )}
      {searchTerm && filtered.length === 0 && (
        <div className="absolute mt-2 w-full bg-gray-900 text-gray-400 text-sm px-4 py-2 rounded shadow border border-gray-700">
          No users found.
        </div>
      )}
    </div>
  );
}
