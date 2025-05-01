import { useState, useEffect, useRef } from "react";
import { Check } from "lucide-react";
import { address } from "../../../address";
import { useNavigate } from "react-router-dom";

export default function GamePostModal({ post, onClose, user }) {
  const [postLiked, setPostLiked] = useState(false);
  const [postFav, setPostFav] = useState(false);
  const [descOverflow, setDescOverflow] = useState(false);
  const [game, setGame] = useState(null);
  const descRef = useRef(null);
  const navigate = useNavigate();
  console.log('p[ostyi', post);
  

  useEffect(() => {
    if (descRef.current) {
      setDescOverflow(
        descRef.current.scrollHeight > descRef.current.clientHeight
      );
    }
  }, [post.description]);

  useEffect(() => {
    fetchHasLiked(post.id);
    fetchHasFav(post.id);

    async function fetchGame() {
      if (post.communityId) {
        const response = await fetch(`${address}/games/${post.communityId}`);
        const result = await response.json();
        setGame(result.game);c
      }
    }

    fetchGame();
  }, [post.communityId]);

  async function likeHandle(postId) {
    await fetch(`${address}/post/${postId}/like`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    fetchHasLiked(postId);
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
    fetchHasFav(postId);
  }

  function extractId(url) {
    const match = url.match(
      /(?:youtube\.com.*(?:\?|&)v=|youtu\.be\/)([^&\n?#]+)/
    );
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
          className="w-[320px] h-[200px]"
          src={`https://www.youtube.com/embed/${videoId}`}
          allowFullScreen
        ></iframe>
      );
    }
    return (
      <video
        className="h-[180px] w-[320px]"
        controls
        src={`${contentPath}`}
      ></video>
    );
  }

  return (
    <>
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
        onClick={onClose}
      />
      <div className="fixed inset-0 flex items-center justify-center p-10 z-50">
        <div className="bg-gray-900 text-white  shadow-lg w-[1000px] max-h-[90vh] overflow-y-auto  border p-5 relative flex flex-col justify-between">
          {/* ✅ Hero Image */}
          {game?.heroImage && (
            <div
              className="relative h-[250px] w-full  overflow-hidden mb-6 rounded-xl drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]"
              style={{
                backgroundImage: `url(${address}{game.heroImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* X Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-white text-xl z-50 cursor-pointer"
              >
                ✕
              </button>

              {/* Overlay Content */}
              <div className="absolute inset-0 flex justify-center items-center px-4">
                <div className="bg-black/10 backdrop-blur-sm rounded-xl p-4 flex flex-col items-center text-white max-w-[80%] drop-shadow border">
                  <div
                    className="flex items-center gap-3 mb-2 cursor-pointer"
                    onClick={() =>
                      navigate(`/user/${post?.userId || "unknown"}`)
                    }
                  >
                    {post?.user?.avatar && (
                      <img
                        src={`${user.avatar}`}
                        alt="User Avatar"
                        className="w-10 h-10 rounded-full object-cover border-2"
                      />
                    )}
                    <h5 className="text-sm font-semibold drop-shadow">
                      {user.username || "Unknown"}
                    </h5>
                  </div>
                  <h3 className="text-3xl font-bold text-center drop-shadow-lg">
                    {post.title}
                  </h3>
                </div>
              </div>
            </div>
          )}

          {/* Media */}
          {["image", "video", "youtube"].includes(post.PostType) && (
            <div className="flex justify-center mb-4">
              {postContent(post.content)}
            </div>
          )}

          {/* Description */}
          {post.description && (
            <div
              ref={descRef}
              className={`relative max-h-[150px] overflow-y-auto px-4 text-sm text-gray-300 mb-4 w-full description-scroll ${
                descOverflow ? "overflowing" : ""
              }`}
            >
              <p className="whitespace-pre-wrap break-words text-center">
                {post.description}
              </p>
              {descOverflow && (
                <div className="absolute bottom-0 left-0 w-full h-6 bg-gradient-to-t from-gray-900 to-transparent pointer-events-none" />
              )}
            </div>
          )}

          {/* Buttons Row */}
          <div className="mt-6 px-4 flex justify-between items-end w-full">
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
                  {Array.isArray(post.likes) ? post.likes.length : 0}
                </span>
              </span>
            </div>

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
        </div>
      </div>
    </>
  );
}
