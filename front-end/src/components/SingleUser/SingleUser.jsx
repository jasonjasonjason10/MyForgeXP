import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// Optional: lightweight local tab components (or replace with your existing ones)
function DetailsTab({ user }) {
  return (
    <div>
      <h2>Decide what to display </h2>
    </div>
  );
}
function FriendsTab() {
  return <p>This user's friends will be shown here.</p>;
}
function CommunitiesTab() {
  return <p>This user's communities will be shown here.</p>;
}
function UploadsTab() {
  return <p>This user's uploads will be shown here.</p>;
}
function FavoritesTab() {
  return <p>This user's favorite games will be shown here.</p>;
}

export default function SingleUser() {
  const [activeTab, setActiveTab] = useState("details");
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const user = {
    id: 2,
    username: "mockuser123",
    avatar: "/images/pfp/defaultavatar1.png",
    fName: "Mock",
    lName: "User",
    createdAt: "2023-10-01T00:00:00.000Z",
  };

  const tabComponents = {
    details: <DetailsTab user={user} />,
    friends: <FriendsTab />,
    communities: <CommunitiesTab />,
    uploads: <UploadsTab />,
    favorites: <FavoritesTab />,
  };

  const handleReturnClick = () => {
    navigate("/account");
  };

  return (
    <div className="relative min-h-screen text-white overflow-hidden px-4 pt-10 max-w-4xl mx-auto ">
      <div className="flex flex-col items-center mb-8">
        <div className="relative">
          <img
            src={`http://localhost:3000${user.avatar}`}
            alt="User avatar"
            className="w-32 h-32 rounded-full border-4 border-orange-500 object-cover shadow-lg drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]"
          />
        </div>
        <h2 className="text-xl mt-4 font-bold ">@{user.username}</h2>
      </div>

      <div className="bg-gray-900 rounded-lg p-4 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
        <div className="border-b border-gray-700 pb-2 mb-4">

          {/* Desktop Tabs (??CHANGE TO ALWAYS DROP DOWN??*/}
          <div className="hidden sm:flex justify-center gap-3 text-sm sm:text-base">
            {["details", "friends", "communities", "uploads", "favorites"].map(
              (tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`hover:text-orange-400 ${
                    activeTab === tab && "text-orange-500 font-semibold"
                  }`}
                >
                  {tab[0].toUpperCase() + tab.slice(1)}
                </button>
              )
            )}
          </div>

          {/* Mobile Dropdown */}
          <div className="sm:hidden mt-2">
            <select
              value={activeTab}
              onChange={(e) => setActiveTab(e.target.value)}
              className="w-full bg-gray-800 text-white border border-orange-500 rounded px-3 py-2 focus:outline-none focus:ring-2"
            >
              {[
                "details",
                "friends",
                "communities",
                "uploads",
                "favorites",
              ].map((tab) => (
                <option key={tab} value={tab}>
                  {tab[0].toUpperCase() + tab.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* three dots that need to be moved to friends */}
        <div className="flex justify-end mb-4">
          <div className="relative">
            <button
              onClick={() => setShowDropdown((prev) => !prev)}
              className="text-gray-400 hover:text-white text-xl px-2"
              title="More options"
            >
              ⋯
            </button>
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-40 bg-gray-800 border border-blue-500 rounded shadow-lg z-10">
                <p className="px-4 py-2 text-sm text-white hover:bg-gray-700 cursor-pointer transition">
                  Remove as Friend
                </p>
                <p className="px-4 py-2 text-sm text-white hover:bg-gray-700 cursor-pointer transition">
                  !MOVE THIS TO JUST FOLLOWERS!
                </p>
              </div>
            )}
          </div>
        </div>

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
      <div className="flex justify-center mt-12 ">
        <button class="button" onClick={handleReturnClick}>
          Return
        </button>
      </div>
    </div>
  );
}
