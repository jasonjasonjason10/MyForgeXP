import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check, Plus, X } from "lucide-react";
import { address } from "../../../address";

const CommunityCard = ({
  post,
  setRefreshToggle,
  refreshToggle,
  username,
  userAvatar,
}) => {
  const [postLiked, setPostLiked] = useState(false);
  const [postFav, setPostFav] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [favToggle, setFavToggle] = useState(false);
  const navigate = useNavigate();
  const [game, setGame] = useState(null);
  const [heroImage, setHeroImage] = useState(undefined);
  console.log(game);
  if (game) {
    console.log("HEYO", heroImage);
  }
  useEffect(() => {
    fetchHasLiked(post.id);
  }, [refreshToggle]);

  useEffect(() => {
    document.body.style.overflow = isExpanded ? "hidden" : "auto";
  }, [isExpanded]);

  useEffect(() => {
    fetchHasFav(post.id);
  }, [favToggle]);

  useEffect(() => {
    if (post.communityId) {
      const gameId = post.communityId;
      async function fetchGameDetails() {
        const response = await fetch(`${address}/games/${gameId}`);
        const result = await response.json();
        setGame(result.game);
      }
      fetchGameDetails();
    }
  }, [post.communityId]);

  useEffect(() => {
    if (game) {
      setHeroImage(game.heroImage);
    }
  }, [game]);

  async function likeHandle(postId) {
    await fetch(`${address}/post/${postId}/like`, {
      method: "POST",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    setRefreshToggle(!refreshToggle);
  }

  async function fetchHasLiked(postId) {
    const response = await fetch(`${address}/post/hasliked/${postId}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    const result = await response.json();
    setPostLiked(result.boolean);
  }

  async function fetchHasFav(postId) {
    const response = await fetch(`${address}/user/hasfav/${postId}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    const result = await response.json();
    setPostFav(result.boolean);
  }

  async function favHandle(postId) {
    const response = await fetch(`${address}/user/favorite/${postId}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    setFavToggle(!favToggle);
  }

  let contentPath = post.content;

  function extractId(contentPath) {
    const findId = /(?:youtube\.com.*(?:\?|&)v=|youtu\.be\/)([^&\n?#]+)/;
    const match = contentPath.match(findId);
    return match ? match[1] : null;
  }

  function postContent(contentPath) {
    if (
      contentPath.startsWith("http://") ||
      contentPath.startsWith("https://")
    ) {
      const videoId = extractId(contentPath);
      return (
        <iframe
          className="h-[180px] w-[320px]"
          src={`https://www.youtube.com/embed/${videoId}`}
          allowFullScreen
        ></iframe>
      );
    }

    return (
      <video
        className="h-[180px] w-[320px]"
        controls
        src={`${address}${contentPath}`}
      ></video>
    );
  }

  return (
    <>
      {/* Background blur overlay when expanded */}
      {isExpanded && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 "
          onClick={() => setIsExpanded(false)}
        />
      )}

      {/* Card Wrapper */}
      <div
        className={`transition-all duration-300 ${
          isExpanded
            ? "fixed inset-0 flex items-center justify-center bg-black/10 backdrop-blur-sm p-10 z-[100] "
            : "relative h-[300px] w-full"
        }`}
      >
        {/* Hero Image – your exact version, collapsed only */}
        {!isExpanded && heroImage && post.PostType === "text" && (
          <div
            className="h-[197px] w-full rounded-t -2xl overflow-hidden"
            style={{
              backgroundImage: `url(${address}${heroImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        )}

        {/* Card Content */}
        <div
          className={`relative z-10 bg-gray-900 rounded-b shadow-lg transition-all duration-300 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] flex flex-col  ${
            isExpanded
              ? "w-[1000px] h-[60vh]  overflow-y-auto p-10 border"
              : "px-3 p-2 justify-between"
          }`}
        >
          {/* Close Button */}
          {isExpanded && (
            <button
              onClick={() => setIsExpanded(false)}
              className="absolute top-4 right-4 text-white text-xl z-50"
            >
              ✕
            </button>
          )}

          {/* User Info */}
          <div className="flex items-center gap-3 mb-4 hover:opacity-80 transition">
            <img
              onClick={() => navigate(`/user/${post.user.id}`)}
              src={`${address}${post.user.avatar}`}
              alt="User Avatar"
              className="w-10 h-10 rounded-full object-cover border-2 border-blue-500 cursor-pointer"
            />
            <h5
              onClick={() => navigate(`/user/${post.user.id}`)}
              className="text-lg font-semibold text-white drop-shadow"
            >
              {post.user.username}
            </h5>
          </div>

          {/* Title */}
          <h3
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-xl font-semibold text-white mb-2 drop-shadow-[0_0_5px_rgba(255,165,0,0.3)] flex justify-center"
          >
            {post.title}
          </h3>
          {isExpanded && (
            <div
              className={`h-[200px] w-full rounded-xl overflow-hidden mb-4 ${
                !heroImage ? "bg-gray-800 animate-pulse" : ""
              }`}
              style={
                heroImage
                  ? {
                      backgroundImage: `url(${address}${heroImage})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }
                  : {}
              }
            />
          )}

          {/* Image/Video */}
          {post.PostType === "image" && (
            <img
              onClick={() => setIsExpanded(!isExpanded)}
              className="h-[180px] w-[320px] object-cover mx-auto rounded-lg mb-4"
              src={`${address}${contentPath}`}
              alt=""
            />
          )}
          {post.PostType === "video" && (
            <div className="flex justify-center mb-4">
              {postContent(contentPath)}
            </div>
          )}

          {/* Full Description */}
          {isExpanded && post.description && (
            <div className="mt-2 text-sm text-gray-300 px-1 mb-4 text-left w-full">
              <p className="whitespace-pre-wrap break-words">
                {post.description}
              </p>
            </div>
          )}

          {/* Like and Favorites (only in expanded) */}
          {isExpanded && (
            <>
              <div className="mt-4 flex justify-between items-center">
                <button
                  onClick={() => likeHandle(post.id)}
                  className={`px-3 py-1 rounded-md text-xs font-semibold transition ${
                    postLiked
                      ? "bg-orange-500 hover:bg-orange-400"
                      : "bg-gray-600 hover:bg-gray-500 border border-orange-500"
                  }`}
                >
                  {postLiked ? "Liked" : "🤍 Like"}
                </button>

                <span className="text-gray-400 text-xs">
                  Likes:{" "}
                  <span className="text-white font-bold">
                    {post.likes.length}
                  </span>
                </span>
              </div>

              <div
                onClick={() => favHandle(post.id)}
                className={`mt-4 text-center text-xs font-semibold cursor-pointer rounded-md transition p-3 w-32 mx-auto  ${
                  postFav
                    ? "border border-blue-700"
                    : "border border-blue-700 shadow-[0_0_20px_#22d3ee60] hover:shadow-blue-700 duration-300"
                }`}
              >
                {postFav ? (
                  <span className="flex items-center justify-center gap-1">
                    Favorited <Check size={14} className="text-green-400" />
                  </span>
                ) : (
                  "Add to Favorites"
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default CommunityCard;
