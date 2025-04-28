import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import SingleUserDetails from "./SingleUserDetails";
import SingleUserFollowers from "./SingleUserFollowers";
import SingleUserUploads from "./SingleUserUploads";
import SingleUserFavorites from "./SingleUserFavorites";
import Following from "../Account/Following";
import { toggleFollow } from "../../API/index";
import ReturnButton from "../ReturnButton";
import { X } from "lucide-react";
import { MoreHorizontal } from "lucide-react";

export default function SingleUser() {
  const [activeTab, setActiveTab] = useState("details");
  const navigate = useNavigate();
  const [isFollowing, setIsFollowing] = useState(false);
  const [showFollowOptions, setShowFollowOptions] = useState(false);
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);
  const [user, setUser] = useState(null);
  const { id } = useParams();
  const [currentUserId, setCurrentUserId] = useState(null);
  const [userPosts, setUserPosts] = useState(null)
  console.log('fer is a bad person', userPosts)
  const [followCounts, setFollowCounts] = useState({
    followers: 0,
    following: 0,
  });
  const [showOptions, setShowOptions] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false); //This isnt being used any more since moving the 3 dot button to Followers pop up. (Leaving here to use for something else)

  //SingleUserFollowers not being used here until we implement a search bar, then also add SingleUserFollowing for search purposes
  const tabComponents = {
    details: <SingleUserDetails />,

    uploads: <SingleUserUploads />,
    favorites: <SingleUserFavorites />,
  };

  useEffect(() => {
    async function fetchSelf() {
      const response = await fetch(`http://localhost:3000/user/info`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const result = await response.json();
      setCurrentUserId(result.user.id);
    }
    fetchSelf();
  }, []);

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch(`http://localhost:3000/user/${id}`);
        const data = await response.json();
        setUser(data.user);
      } catch (error) {
        console.error("Failed to load user:", error);
      }
    }

    fetchUser();
    fetchFollowCounts();
    checkIfFollowing();
  }, [id]);

  useEffect(() => {
    if(user){
      setUserPosts(user.posts)
    }
  }, [user])

  //For displaying a count number **WHAT I HAD TO ADD TO THE BACKEND FOR
  const fetchFollowCounts = async () => {
    try {
      const res = await fetch(`http://localhost:3000/user/follow/counts/${id}`);
      const data = await res.json();
      setFollowCounts({
        followers: data.followers,
        following: data.following,
      });
    } catch (err) {
      console.error("Failed to fetch follow counts", err);
    }
  };

  //For viewing Followers pop up
  const [followerList, setFollowerList] = useState([]);
  const openFollowersModal = async () => {
    setShowFollowers(true);
    try {
      const res = await fetch(`http://localhost:3000/user/followed/${id}`);
      const data = await res.json();
      setFollowerList(data.followers);
    } catch (err) {
      console.error("Error loading followers", err);
    }
  };

  //For viewing Following Pop up
  const [followingList, setFollowingList] = useState([]);
  const openFollowingModal = async () => {
    setShowFollowing(true);
    try {
      const res = await fetch(`http://localhost:3000/user/following/${id}`);
      const data = await res.json();
      setFollowingList(data.following);
    } catch (err) {
      console.error("Error loading following list", err);
    }
  };

  async function checkIfFollowing() {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:3000/user/isfollowing/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setIsFollowing(data.isFollowing);
    } catch (err) {
      console.error("Error checking follow status", err);
    }
  }

  const handleFollowToggle = async () => {
    const token = localStorage.getItem("token");
    const result = await toggleFollow(user.id, token);
    if (result) {
      setIsFollowing(result.isFollowed);
      fetchFollowCounts(); // updates the numbers
    }
  };


  const handleUserClick = (userId) => {
    setShowFollowers(false);
    setShowFollowing(false);

    setTimeout(() => {
      if (currentUserId === userId) {
        navigate("/account");
      } else {
        navigate(`/user/${userId}`);
      }
    }, 100);
  };

  if (!user) return <div className="text-white p-4">Loading user...</div>;

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
      <div className="flex flex-col items-center gap-3 mt-4 mb-6">
        <div className="flex gap-6 text-center justify-center">
          <button
            onClick={openFollowersModal}
            className="hover:text-orange-400 transition flex flex-col cursor-pointer"
          >
            <span className="text-lg font-bold">{followCounts.followers}</span>
            <span className="text-sm">Followers</span>
          </button>

          <button
            onClick={() => setShowFollowing(openFollowingModal)}
            className="hover:text-orange-400 transition flex flex-col cursor-pointer"
          >
            <span className="text-lg font-bold">{followCounts.following}</span>
            <span className="text-sm">Following</span>
          </button>
        </div>

        {/* Follow / Following button */}
        <div className="relative">
          {!isFollowing ? (
            <button
              onClick={handleFollowToggle}
              className="bg-orange-500 text-white px-4 py-1 rounded hover:bg-orange-600 transition"
            >
              Follow
            </button>
          ) : (
            <div className="relative inline-block">
              <button
                onClick={() => setShowFollowOptions((prev) => !prev)}
                className="bg-gray-800 border border-orange-400 text-white px-4 py-1 rounded hover:bg-orange-500 transition"
              >
                Following ⌄
              </button>
              {showFollowOptions && (
                <div className="absolute mt-1 w-32 bg-gray-900 border border-gray-700 rounded shadow-lg z-10">
                  <div
                    onClick={() => {
                      handleFollowToggle();
                      setShowFollowOptions(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700 cursor-pointer"
                  >
                    Unfollow
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="bg-gray-900 rounded-lg p-4 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
        <div className="border-b border-gray-700 pb-2 mb-4 ">
          {/* Desktop Tabs (??CHANGE TO ALWAYS DROP DOWN??*/}
          <div className="hidden sm:flex justify-center gap-3 text-sm sm:text-base  ">
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

          {/* Mobile Dropdown */}
          <div className="sm:hidden mt-2 ">
            <select
              value={activeTab}
              onChange={(e) => setActiveTab(e.target.value)}
              className="w-full bg-gray-800 text-white border border-orange-500 rounded px-3 py-2 focus:outline-none focus:ring-2"
            >
              {["details", "uploads", "favorites"].map((tab) => (
                <option key={tab} value={tab}>
                  {tab[0].toUpperCase() + tab.slice(1)}
                </option>
              ))}
            </select>
          </div>
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
      <div className="flex justify-center mt-12 ">
        <ReturnButton />
      </div>
      {showFollowing && (
        <>
          {/* Backdrop blur */}
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40" />

          {/* Modal wrapper */}
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-cover bg-center bg-gray-800 text-white px-6 py-6 rounded-lg w-full max-w-md shadow-lg relative border border-orange-500 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] mx-4 sm:mx-auto"
              style={{ backgroundImage: "url('/images/forgexp-grid-bg.png')" }}
            >
              <div className="relative mb-4">
                <h3 className="text-2xl font-bold text-white">Following</h3>
                <button
                  className="absolute top-2 right-3 text-gray-400 hover:text-white"
                  onClick={() => setShowFollowing(false)}
                  title="Close"
                >
                  <X size={20} />
                </button>
              </div>

              {followingList.length > 0 ? (
                <ul className="text-white space-y-2 max-h-64 overflow-y-auto">
                  {followingList.map((followedUser) => (
                    <li
                      key={followedUser.id}
                      className="relative flex items-center justify-between cursor-pointer p-2 border-b border-blue-400 hover:border-orange-400"
                    >
                      <div
                        className="flex items-center gap-3"
                        onClick={() => handleUserClick(followedUser.id)}
                      >
                        <img
                          src={`http://localhost:3000${followedUser.avatar}`}
                          alt="avatar"
                          className="w-8 h-8 rounded-full object-cover border border-gray-500"
                        />
                        <span>{followedUser.username}</span>
                      </div>

                      <div className="relative">
                        <button
                          onClick={() =>
                            setFollowingList((prev) =>
                              prev.map((f) =>
                                f.id === followedUser.id
                                  ? { ...f, showOptions: !f.showOptions }
                                  : { ...f, showOptions: false }
                              )
                            )
                          }
                          className="text-gray-400 hover:text-white"
                        >
                          <MoreHorizontal size={20} />
                        </button>

                        {followedUser.showOptions && (
                          <div className="absolute right-0 mt-2 w-24 bg-gray-800 border border-gray-600 rounded shadow-lg z-50">
                            <div className="text-sm text-white px-4 py-2 hover:bg-red-600 rounded cursor-pointer">
                              Unfollow
                            </div>
                          </div>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-400 text-sm">No users followed.</p>
              )}
            </motion.div>
          </div>
        </>
      )}

      {showFollowers && (
        <>
          {/* Backdrop blur */}
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40" />

          {/* Modal wrapper */}
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-cover bg-center bg-gray-800 text-white px-6 py-6 rounded-lg w-full max-w-md shadow-lg relative border border-orange-500 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] mx-4 sm:mx-auto"
              style={{ backgroundImage: "url('/images/forgexp-grid-bg.png')" }}
            >
              <div className="relative mb-4">
                <h3 className="text-2xl font-bold text-white">Followers</h3>
                <button
                  className="absolute top-2 right-3 text-gray-400 hover:text-white"
                  onClick={() => setShowFollowers(false)}
                  title="Close"
                >
                  <X size={20} />
                </button>
              </div>
              {followerList.map((follower) => (
                <li
                  key={follower.id}
                  className="relative flex items-center justify-between cursor-pointer p-2 border-b border-blue-400 hover:border-orange-400"
                >
                  <div
                    className="flex items-center gap-3"
                    onClick={() => handleUserClick(follower.id)}
                  >
                    <img
                      src={`http://localhost:3000${follower.avatar}`}
                      alt="avatar"
                      className="w-8 h-8 rounded-full object-cover border border-gray-500"
                    />
                    <span>{follower.username}</span>
                  </div>

                  <div className="relative">
                    <button
                      onClick={() =>
                        setFollowerList((prev) =>
                          prev.map((f) =>
                            f.id === follower.id
                              ? { ...f, showOptions: !f.showOptions }
                              : { ...f, showOptions: false }
                          )
                        )
                      }
                      className="text-gray-400 hover:text-white"
                    >
                      <MoreHorizontal size={20} />
                    </button>

                    {follower.showOptions && (
                      <div className="absolute right-0 mt-2 w-24 bg-gray-800 border border-gray-600 rounded shadow-lg z-50">
                        <div className="text-sm text-white px-4 py-2 hover:bg-red-600 rounded cursor-pointer">
                          Remove
                        </div>
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </motion.div>
          </div>
        </>
      )}
    </div>
  );
}
