import { useEffect, useState } from "react";
import { Pencil } from "lucide-react";
import EditAvatar from "./EditAvatar";
import { motion, AnimatePresence } from "framer-motion";
import AccountDetails from "./AccountDetails";
import Following from "./Following"; //Not being used at the moment.
import Communities from "./Communities";
import Uploads from "./Uploads";
import FavGames from "./FavGames";

export default function Account() {
  const [activeTab, setActiveTab] = useState("details");
  const [showEditAvatar, setShowEditAvatar] = useState(false);
  const [user, setUser] = useState({});
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);
  const [followerList, setFollowerList] = useState([]);
  const [followingList, setFollowingList] = useState([]);
  const [followCounts, setFollowCounts] = useState({
    followers: 0,
    following: 0,
  });

  const tabComponents = {
    details: <AccountDetails />,
    communities: <Communities />,
    uploads: <Uploads />,
    favorites: <FavGames />,
  };

  console.log(user);

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
    fetchFollowCounts();
  }, []);
  //END useEffect

  const fetchFollowCounts = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:3000/user/follow/counts/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setFollowCounts({
        followers: data.followers,
        following: data.following,
      });
    } catch (err) {
      console.error("Error fetching follow counts", err);
    }
  };

  const openFollowersModal = async () => {
    setShowFollowers(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:3000/user/followed", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setFollowerList(data.followedBy);
    } catch (err) {
      console.error("Error loading followers", err);
    }
  };

  const openFollowingModal = async () => {
    setShowFollowing(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:3000/user/following", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setFollowingList(data.following);
    } catch (err) {
      console.error("Error loading following", err);
    }
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
            className="absolute bottom-0 right-0 bg-gray-800 text-white p-1 rounded-full border border-white hover:bg-orange-500 transition cursor-pointer"
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
      <div className="flex gap-6 mt-2 mb-6 text-center justify-center">
        <button
          onClick={openFollowersModal}
          className="hover:text-orange-400 transition flex flex-col"
        >
          <span className="text-lg font-bold cursor-pointer">
            {followCounts.followers}
          </span>
          <span className="text-sm cursor-pointer">Followers</span>
        </button>
        <button
          onClick={openFollowingModal}
          className="hover:text-orange-400 transition flex flex-col"
        >
          <span className="text-lg font-bold cursor-pointer">
            {followCounts.following}
          </span>
          <span className="text-sm cursor-pointer">Following</span>
        </button>
      </div>

      {/* Tabs (!!!remove "Uploads" tab and put that in Main Content section) */}
      <div className="bg-gray-900 rounded-lg p-4 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] mb-7 ">
        {/* Tabs Section - Responsive */}
        <div className="border-b border-gray-700 pb-2 mb-4">
          {/* Desktop Tabs */}
          <div className="hidden sm:flex justify-center gap-3 text-sm sm:text-base">
            {["details", "communities", "uploads", "favorites"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`hover:text-orange-400 cursor-pointer ${
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
              {["details", "communities", "uploads", "favorites"].map((tab) => (
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
      {showFollowing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-gray-900 p-6 rounded-lg border border-blue-500 max-w-lg w-full shadow-lg"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-white text-lg font-bold">Following</h3>
              <button
                onClick={() => setShowFollowing(false)}
                className="text-white hover:text-red-500"
              >
                ✖
              </button>
            </div>
            {followingList.length > 0 ? (
              <ul className="text-white space-y-2 max-h-64 overflow-y-auto">
                {followingList.map((user) => (
                  <li key={user.id} className="flex items-center gap-3">
                    <img
                      src={`http://localhost:3000${user.avatar}`}
                      alt="avatar"
                      className="w-8 h-8 rounded-full object-cover border border-gray-500"
                    />
                    <span>{user.username}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-300 text-sm">Not following anyone yet.</p>
            )}
          </motion.div>
        </div>
      )}

      {showFollowers && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-gray-900 p-6 rounded-lg border border-blue-500 max-w-lg w-full shadow-lg"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-white text-lg font-bold">Followers</h3>
              <button
                onClick={() => setShowFollowers(false)}
                className="text-white hover:text-red-500"
              >
                ✖
              </button>
            </div>
            {followerList.length > 0 ? (
              <ul className="text-white space-y-2 max-h-64 overflow-y-auto">
                {followerList.map((user) => (
                  <li key={user.id} className="flex items-center gap-3">
                    <img
                      src={`http://localhost:3000${user.avatar}`}
                      alt="avatar"
                      className="w-8 h-8 rounded-full object-cover border border-gray-500"
                    />
                    <span>{user.username}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-300 text-sm">No followers yet.</p>
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
}
