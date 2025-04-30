import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
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

  const [isOverflowing, setIsOverflowing] = useState(false);
  const descriptionRef = useRef(null);

  const descRef = useRef(null);
  const [descOverflow, setDescOverflow] = useState(false);
  useEffect(() => {
    if (descRef.current) {
      setDescOverflow(
        descRef.current.scrollHeight > descRef.current.clientHeight
      );
    }
  }, [post.description, isExpanded]);

  useEffect(() => {
    if (isExpanded && descriptionRef.current) {
      const el = descriptionRef.current;
      setIsOverflowing(el.scrollHeight > el.clientHeight);
    }
  }, [isExpanded, post.description]);

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

  function clickHandle(id) {
    navigate(`../games/${id}`);
  }

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
          ///ADD ONCLICK FOR USER TO CLICK OUTSIDE OF POP UP
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 "
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
            className="relative h-[197px] w-full rounded-t overflow-hidden drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]"
            style={{
              backgroundImage: `url(${address}${heroImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <button
              onClick={() => clickHandle(game.id)}
              className="absolute bottom-2 right-2 text-xs px-3 py-1 bg-black/60 text-white rounded-full hover:bg-white hover:text-black transition cursor-pointer"
            >
              See Game
            </button>
          </div>
        )}

        {/* Card Content */}
        <div
          onClick={() => setIsExpanded(!isExpanded)}
          className={`relative z-10 bg-gray-900 rounded-b rounded-t shadow-lg transition-all duration-300 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] flex flex-col ${
            isExpanded
              ? "w-[1000px] h-[80vh] overflow-y-auto p-5 border justify-between"
              : "px-3 p-2 justify-between"
          }`}
        >
          {/* User Info */}

          {!isExpanded && (
            <div className="flex items-center gap-3 mb-4 hover:opacity-80 transition">
              <img
                onClick={() => navigate(`/user/${post.user.id}`)}
                src={`https://forgexp-server.onrender.com${post.user.avatar}`}
                alt="User Avatar"
                className="w-10 h-10 rounded-full object-cover border-2  cursor-pointer"
              />
              <h5
                onClick={() => navigate(`/user/${post.user.id}`)}
                className="text-lg font-semibold text-white drop-shadow cursor-pointer"
              >
                {post.user.username}
              </h5>
            </div>
          )}

          {/* Title */}
          {!isExpanded && (
            <h3
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-xl font-semibold text-white mb-2 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] flex justify-center cursor-pointer"
            >
              {post.title}
            </h3>
          )}
          {isExpanded && (
            <div
              className="relative h-[250px] w-full rounded-t-2xl overflow-hidden mb-6 rounded-b-2xl drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]"
              style={
                heroImage
                  ? {
                      backgroundImage: `url(${address}${heroImage})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }
                  : { backgroundColor: "#1f2937" }
              }
            >
              {/* X Button */}
              <button
                onClick={() => setIsExpanded(false)}
                className="absolute top-4 right-4 text-white text-xl z-50"
              >
                ✕
              </button>

              {/* Overlay Content (title, avatar) */}
              <div className="absolute inset-0 flex justify-center items-center px-4 ">
                <div className="bg-black/10 backdrop-blur-sm rounded-xl p-4 flex flex-col items-center text-white max-w-[80%] drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] border ">
                  <div
                    className="flex items-center gap-3 mb-2 cursor-pointer"
                    onClick={() => navigate(`/user/${post.user.id}`)}
                  >
                    <img
                      src={`https://forgexp-server.onrender.com${post.user.avatar}`}
                      alt="User Avatar"
                      className="w-10 h-10 rounded-full object-cover border-2"
                    />
                    <h5 className="text-sm font-semibold drop-shadow">
                      {post.user.username}
                    </h5>
                  </div>
                  <h3 className="text-3xl font-bold text-center drop-shadow-lg">
                    {post.title}
                  </h3>
                </div>
              </div>

              {/* ✅ See Game Button in bottom-right */}
              <button
                onClick={() => clickHandle(game.id)}
                className="absolute bottom-2 right-2 text-xs px-3 py-1 bg-black/60 text-white rounded-full hover:bg-white hover:text-black transition"
              >
                See Game
              </button>
            </div>
          )}

          {/* Image/Video */}
          {post.PostType === "image" && (
            <img
              onClick={() => setIsExpanded(!isExpanded)}
              className={`${
                isExpanded ? "h-[120px] w-[240px]" : "h-[180px] w-[320px]"
              } object-cover mx-auto rounded-lg mb-4`}
              src={`https://forgexp-server.onrender.com${contentPath}`}
              alt=""
            />
          )}
          {post.PostType === "video" && (
            <div
              className={`${
                isExpanded ? "w-[600px] h-[360px]" : "w-[320px] h-[180px]"
              } mx-auto mb-4 overflow-hidden rounded-lg flex justify-center items-center`}
            >
              {postContent(contentPath)}
            </div>
          )}

          {/* Full Description */}
          {isExpanded && post.description && (
            <div
              ref={descRef}
              className={`relative max-h-[150px] overflow-y-auto px-4 text-sm text-gray-300 mb-4 text-left w-full description-scroll ${
                descOverflow ? "overflowing" : ""
              }`}
            >
              <p className="whitespace-pre-wrap break-words flex justify-center">
                {post.description}
              </p>

              {/* Optional fading gradient at bottom */}
              {descOverflow && (
                <div className="absolute bottom-0 left-0 w-full h-6 bg-gradient-to-t from-gray-900 to-transparent pointer-events-none" />
              )}
            </div>
          )}

          {/* Like and Favorites (only in expanded) */}
          {isExpanded && (
            <div className="mt-6 px-4 flex justify-between items-end w-full">
              {/* Left: Like button and like count */}
              <div className="flex items-center gap-4">
                <button
                  onClick={() => likeHandle(post.id)}
                  className={`px-3 py-1 rounded-md text-xs font-semibold transition cursor-pointer ${
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

              {/* Right: Favorite button */}
              <div
                onClick={() => favHandle(post.id)}
                className={`text-center text-xs font-semibold cursor-pointer rounded-md transition p-3 w-32 ${
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
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CommunityCard;
