import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import SingleUserDetails from "./SingleUserDetails";
import SingleUserFollowers from "./SingleUserFollowers";
import SingleUserUploads from "./SingleUserUploads";
import SingleUserFavorites from "./SingleUserFavorites";

export default function SingleUser() {
  const [activeTab, setActiveTab] = useState("details");
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const user = {
    id: 2,
    username: "mockuser123",
    avatar: "/images/pfp/defaultavatar1.png",
    fName: "Mock",
    lName: "User",
    createdAt: "2023-10-01T00:00:00.000Z",
  };

  const tabComponents = {
    details: <SingleUserDetails />,
    friends: <SingleUserFollowers />,
    uploads: <SingleUserUploads />,
    favorites: <SingleUserFavorites />,
  };

  //!!!THis will be to pass the users info!!///
  // const tabComponents = {
  //   details: <SingleUserDetails user={user} />,
  //   friends: <SingleUserFollowers user={user} />,
  //   uploads: <SingleUserUploads user={user} />,
  //   favorites: <SingleUserFavorites user={user} />,
  // };

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
            {["details", "friends", "uploads", "favorites"].map((tab) => (
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

          {/* Mobile Dropdown */}
          <div className="sm:hidden mt-2">
            <select
              value={activeTab}
              onChange={(e) => setActiveTab(e.target.value)}
              className="w-full bg-gray-800 text-white border border-orange-500 rounded px-3 py-2 focus:outline-none focus:ring-2"
            >
              {["details", "friends", "uploads", "favorites"].map((tab) => (
                <option key={tab} value={tab}>
                  {tab[0].toUpperCase() + tab.slice(1)}
                </option>
              ))}
            </select>
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
        <button className="button" onClick={handleReturnClick}>
          Return
        </button>
      </div>
    </div>
  );
}
