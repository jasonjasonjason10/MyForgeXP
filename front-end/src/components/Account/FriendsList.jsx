import { useEffect, useState } from "react";
import SearchUser from "../SearchUser";

export default function FriendsList() {
  const [users, setUsers] = useState([]);
  console.log("user list =>", users)
  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch("http://localhost:3000/user/usernames");
        const result = await response.json();
        if (!result.error) {
          setUsers(result.allUsers);
        }
      } catch (err) {
        console.error("Failed to fetch users:", err);
      }
    }

    fetchUsers();
  }, []);

  return (
    <div>
      <h3 className="text-lg font-bold mb-4">All Users</h3>
      <div className="mb-4 ">
        <SearchUser />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {users.map((user) => (
          <div
            key={user.id}
            className="flex items-center gap-4 bg-gray-800 rounded p-3 shadow hover:shadow-lg transition"
          >
            <img
              src={`http://localhost:3000${user.avatar}`}
              alt={user.username}
              className="w-12 h-12 rounded-full border border-orange-400 object-cover"
            />
            <span className="font-semibold text-white">@{user.username}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
