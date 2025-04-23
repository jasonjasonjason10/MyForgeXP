import { useEffect, useState } from "react";
import SearchUser from "../SearchUser";
import { useNavigate } from "react-router-dom";

export default function Following() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  console.log("user list =>", users);

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

  function clickHandle() {
    navigate("../user");
  }

  return (
    <div className="max-h-[500px] overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold">All Users</h3>
        <button
          className="text-gray-400 hover:text-white text-2xl"
          title="More options"
        >
          ⋯
        </button>
      </div>

      <div className="mb-4">
        <SearchUser />
      </div>

      <div className="flex flex-col gap-3">
        {users.map((user) => (
          <div
            key={user.id}
            className="flex items-center gap-4 bg-gray-800 rounded p-3 shadow hover:shadow-lg transition"
            onClick={clickHandle}
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
