// const [avatar, setAvatar] = useState();

// async function avatarHandle(e) {
//   e.preventDefault();

//       <div>
//         <form onSubmit={avatarHandle} >
//           <input type="file" accept="images/*" onChange={(e) => {e.target.files[0]}} className="border-solid border bg-amber-700"/>
//           <button type="submit" className="border-solid -PostId/border m-25">Submit</button>
//         </form>
//       </div>

import { useEffect, useState } from "react";
import { Pencil } from "lucide-react";
import EditAvatar from "./EditAvatar";
import { motion, AnimatePresence } from "framer-motion";
import AccountDetails from "./AccountDetails";
import FriendsList from "./FriendsList";
import Communities from "./Communities";
import Uploads from "./Uploads";
import FavGames from "./FavGames";

export default function Account() {
  const [activeTab, setActiveTab] = useState("details");
  const [showEditAvatar, setShowEditAvatar] = useState(false);
  const [user, setUser] = useState({});
  console.log(user);
  // const user = {
  //   username: "",
  //   avatar: "/images/pfp/defaultavatar1.png", //IS THIS CORRECT??
  // };

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await fetch("http://localhost:3000/user/info", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const user = await res.json();

        setUser(user.user);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    fetchUserData();
  }, []);

  const tabComponents = {
    details: <AccountDetails />,
    friends: <FriendsList />,
    communities: <Communities />,
    uploads: <Uploads />,
    favorites: <FavGames />,
  };

  {
    /* Remember that a version of this is needed to display an admin dashboard for when logged in as admin */
  }
  return (
    <div className="relative min-h-screen text-white overflow-hidden px-4 pt-10 max-w-4xl mx-auto ">
      {/* Avatar + Username !!!Add functionality later */}
      <div className="flex flex-col items-center mb-8">
        <div className="relative">
          <img
            src={`http://localhost:3000${user.avatar}`}
            alt="User avatar"
            className="w-32 h-32 rounded-full border-4 border-orange-500 object-cover shadow-lg drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]"
          />
          <button
            onClick={() => setShowEditAvatar(true)}
            className="absolute bottom-0 right-0 bg-gray-800 text-white p-1 rounded-full border border-white hover:bg-orange-500 transition"
            title="Edit Profile Picture"
          >
            <Pencil size={16} />
          </button>

          <EditAvatar
            isOpen={showEditAvatar}
            onClose={() => setShowEditAvatar(false)}
            onSave={() => {
              // Hook up save logic later
              setShowEditAvatar(false);
            }}
          />
        </div>
        <h2 className="text-xl mt-4 font-bold ">@{user.username}</h2>
      </div>

      {/* Tabs (!!!remove "Uploads" tab and put that in Main Content section) */}
      <div className="bg-gray-900 rounded-lg p-4 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] mb-7">
        {/* Tabs Section - Responsive */}
        <div className="border-b border-gray-700 pb-2 mb-4">
          {/* Desktop Tabs */}
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

        {/* Animated content section: !!!Fix exit animation */}
        <div className="bg-gray-800 rounded-md p-4 min-h-[200px]  ">
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
