import { useEffect, useState } from "react";
import { Search } from "lucide-react";

export default function SearchUser() {
  //==============fetch function====================
  const [user, setUser] = useState([]);
  console.log("User Array", user);

  useEffect(() => {
    async function fetchUsers() {
      const response = await fetch("http://localhost:3000/user/usernames");
      const result = await response.json();
      if (result.error) {
        return console.log("error => ", result.error);
      }
      setUser(result.allUsers);
    }

    fetchUsers();
  }, []);

  //================================================
  return (
    <div>
      <input
        type="text"
        placeholder="Search Users..."
        className="w-64 px-4 py-2 rounded-full bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-500 transition duration-200 shadow-sm"
      />
      <span>🔍</span>
    </div>
  );
}
