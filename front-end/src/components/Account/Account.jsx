import { useState } from "react";
import { Pencil } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AccountDetails from "./AccountDetails";
import FriendsList from "./FriendsList";
import Communities from "./Communities";
import Uploads from "./Uploads";
import FavGames from "./FavGames";

export default function Account() {
  const [activeTab, setActiveTab] = useState("details");

  const user = {
    username: "username",
    avatar: "/images/defaultavatar1.png",
  };

  const tabComponents = {
    details: <AccountDetails />,
    friends: <FriendsList />,
    communities: <Communities />,
    uploads: <Uploads />,
    favorites: <FavGames />,
  };

  {/* Remember that a version of this is needed to display an admin dashboard for when logged in as admin */}
  return (
    <div className="relative min-h-screen text-white overflow-hidden px-4 pt-10 max-w-4xl mx-auto">

      {/* Avatar + Username !!!Add functionality later */}
      <div className="flex flex-col items-center mb-8">
        <div className="relative">
          <img
            src={user.avatar}
            alt="User avatar"
            className="w-32 h-32 rounded-full border-4 border-orange-500 object-cover shadow-lg"
          />
          <button
            className="absolute bottom-0 right-0 bg-gray-800 text-white p-1 rounded-full border border-white hover:bg-orange-500 transition"
            title="Edit Profile Picture"
          >
            <Pencil size={16} />
          </button>
        </div>
        <h2 className="text-xl mt-4 font-bold">@{user.username}</h2>
      </div>

      {/* Tabs (!!!remove "Uploads" tab and put that in Main Content section) */}
      <div className="bg-gray-900 rounded-lg p-4">
        <div className="flex flex-wrap gap-3 justify-center border-b border-gray-700 pb-2 mb-4 text-sm sm:text-base">
          <button
            onClick={() => setActiveTab("details")}
            className={`hover:text-orange-400 ${
              activeTab === "details" && "text-orange-500 font-semibold"
            }`}
          >
            Details
          </button>
          <button
            onClick={() => setActiveTab("friends")}
            className={`hover:text-orange-400 ${
              activeTab === "friends" && "text-orange-500 font-semibold"
            }`}
          >
            Friends
          </button>
          <button
            onClick={() => setActiveTab("communities")}
            className={`hover:text-orange-400 ${
              activeTab === "communities" && "text-orange-500 font-semibold"
            }`}
          >
            Communities
          </button>
          <button
            onClick={() => setActiveTab("uploads")}
            className={`hover:text-orange-400 ${
              activeTab === "uploads" && "text-orange-500 font-semibold"
            }`}
          >
            Uploads
          </button>
          <button
            onClick={() => setActiveTab("favorites")}
            className={`hover:text-orange-400 ${
              activeTab === "favorites" && "text-orange-500 font-semibold"
            }`}
          >
            Favorites
          </button>
        </div>

        {/* Animated content section: !!!Fix exit animation */}
        <div className="bg-gray-800 rounded-md p-4 min-h-[200px]">
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
    </div>
  );
}
