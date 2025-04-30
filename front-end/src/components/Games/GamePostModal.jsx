import { useState, useEffect, useRef } from "react";
import { Check } from "lucide-react";
import { address } from "../../../address";
import { useNavigate } from "react-router-dom";

export default function GamePostModal({ post, game, onClose }) {
  const [postLiked, setPostLiked] = useState(false);
  const [postFav, setPostFav] = useState(false);
  const [descOverflow, setDescOverflow] = useState(false);
  const descRef = useRef(null);
  const navigate = useNavigate();

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
  }, []);

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
          className="w-[600px] h-[360px]"
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
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="fixed inset-0 flex items-center justify-center p-10 z-50">
        <div className="bg-gray-900 text-white rounded-xl shadow-lg w-[1000px] max-h-[90vh] overflow-y-auto border p-5 relative flex flex-col justify-between">
          {/* Hero Image */}
          {game?.heroImage && (
            <div
              className="relative h-[250px] w-full rounded-t-2xl overflow-hidden mb-6 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]"
              style={{
                backgroundImage: `url(http://localhost:3000${game.heroImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-white text-xl z-50 bg-black/50 rounded-full px-3 py-1 hover:bg-black/70"
              >
                ✕
              </button>

              {/* Avatar, Username, and Title Overlay */}
              <div className="absolute inset-0 flex justify-center items-center px-4">
                <div className="bg-black/10 backdrop-blur-sm rounded-xl p-4 flex flex-col items-center text-white max-w-[80%] drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] border">
                  <div
                    className="flex items-center gap-3 mb-2 cursor-pointer"
                    onClick={() => navigate(`/user/${post.user.id}`)}
                  >
                    <img
                      src={`http://localhost:3000${post.user.avatar}`}
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
            </div>
          )}

          {/* Media */}
          {post.PostType === "image" ||
          post.PostType === "video" ||
          post.PostType === "youtube" ? (
            <div className="flex justify-center mb-4">
              {postContent(post.content)}
            </div>
          ) : null}

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
