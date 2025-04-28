import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import SingleUserDetails from "./SingleUserDetails";
import SingleUserUploads from "./SingleUserUploads";
import SingleUserFavorites from "./SingleUserFavorites";
import ReturnButton from "../ReturnButton";
import { toggleFollow } from "../../API/index";
import { X } from "lucide-react";
import { MoreHorizontal } from "lucide-react";

export default function SingleUser() {
  const [activeTab, setActiveTab] = useState("details");
  const [user, setUser] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);
  const [followCounts, setFollowCounts] = useState({ followers: 0, following: 0 });
  const [showEditAvatar, setShowEditAvatar] = useState(false);
  const [newAvatar, setNewAvatar] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  const tabComponents = {
    details: <SingleUserDetails />,
    uploads: <SingleUserUploads />,
    favorites: <SingleUserFavorites />,
  };

  useEffect(() => {
    async function fetchSelf() {
      const response = await fetch(`http://localhost:3000/user/info`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const result = await response.json();
      setCurrentUserId(result.user.id);
    }
    fetchSelf();
  }, []);

  useEffect(() => {
    async function fetchUser() {
      const response = await fetch(`http://localhost:3000/user/${id}`);
      const data = await response.json();
      setUser(data.user);
    }
    fetchUser();
  }, [id]);

  if (!user) return <div className="text-white p-4">Loading user...</div>;

  return (
    <div className="relative min-h-screen text-white overflow-hidden px-4 pt-10 max-w-4xl mx-auto">
      {/* Avatar and Username */}
      <div className="flex flex-col items-center mb-8">
        <div className="relative">
          <img
            src={newAvatar ? URL.createObjectURL(newAvatar) : `http://localhost:3000${user.avatar}`}
            alt="User avatar"
            className="w-32 h-32 rounded-full border-4 border-orange-500 object-cover shadow-lg"
          />
          <button
            onClick={() => setShowEditAvatar(true)}
            className="absolute bottom-0 right-0 bg-gray-800 hover:bg-orange-500 text-white p-1 rounded-full border border-white transition"
            title="Edit Profile Picture"
          >
            ✏️
          </button>
        </div>

        <h2 className="text-xl mt-4 font-bold mt-4">@{user.username}</h2>

        {/* Admin action buttons */}
        <div className="flex flex-wrap gap-2 mt-6 justify-center">
          <button className="px-4 py-2 border border-gray-500 text-red-400 rounded-md text-sm bg-transparent">
          Delete User
          </button>
          <button className="px-4 py-2 border border-gray-500 text-blue-400 rounded-md text-sm bg-transparent">
          Promote to Admin
          </button>
          <button className="px-4 py-2 border border-gray-500 text-orange-400 rounded-md text-sm bg-transparent">
          Edit User Info
          </button>
        </div>
      </div>

      {/* Edit Avatar */}
      {showEditAvatar && (
        <div className="bg-gray-800 border border-orange-400 rounded-lg p-6 mb-6 text-center">
          <h3 className="text-lg mb-4 font-semibold text-orange-400">Change Profile Picture</h3>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setNewAvatar(e.target.files[0])}
            className="text-white text-sm mb-4"
          />
          <div className="flex justify-center gap-4 mt-4">
            <button
              onClick={() => setShowEditAvatar(false)}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded"
            >
            Cancel
            </button>
            <button
              onClick={() => {
                setShowEditAvatar(false);
              }}
              className="bg-orange-500 hover:bg-orange-400 text-white px-4 py-2 rounded"
            >
            Save New Avatar
            </button>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="bg-gray-900 rounded-lg p-4 mb-7">
        <div className="flex justify-center gap-6 border-b border-gray-700 pb-2 mb-4">
          {["details", "uploads", "favorites"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`hover:text-orange-400 ${
                activeTab === tab && "text-orange-500 font-semibold"
              }`}
            >
              {tab[0].toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <div className="bg-gray-800 rounded-md p-4 min-h-[200px] border border-blue-600">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
            >
              {tabComponents[activeTab]}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Return button */}
      <div className="flex justify-center mt-10">
        <ReturnButton />
      </div>
    </div>
  );
}
