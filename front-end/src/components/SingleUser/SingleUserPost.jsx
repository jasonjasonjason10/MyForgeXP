import { address } from "../../../address";
export default function SingleUserPost({ post, onBack, isAdmin }) {
  const contentPath = post.content;

  return (
    <div className="text-white max-w-3xl mx-auto p-6 bg-[#111827] rounded-xl shadow-lg">
      <button
        onClick={onBack}
        className="self-start mb-6 px-4 py-2 border border-blue-700 rounded-md text-sm font-semibold hover:shadow-[0_0_10px_2px_rgba(29,78,216,0.7)] transition-shadow duration-300"
      >
        ← Back to Uploads
      </button>

      <h2 className="text-2xl font-bold text-center mb-4">{post.title}</h2>

      {/* Media */}
      {post.PostType === "image" && (
        <img
          src={`${address}${contentPath}`}
          alt="Post content"
          className="w-full rounded-lg mb-4"
        />
      )}

      {post.PostType === "video" && (
        <video
          src={`${address}${contentPath}`}
          controls
          className="w-full rounded-lg mb-4"
        />
      )}

      {/* YouTube embed (just in case) */}
      {post.PostType !== "image" &&
        post.PostType !== "video" &&
        (post.content?.includes("youtube.com") ||
          post.content?.includes("youtu.be")) && (
          <iframe
            className="w-full h-64 rounded-lg mb-4"
            src={`https://www.youtube.com/embed/${extractYouTubeId(
              contentPath
            )}`}
            allowFullScreen
          ></iframe>
        )}

      {/* Description */}
      <p className="text-gray-300 text-sm whitespace-pre-wrap mb-4">
        {post.description || "No description."}
      </p>

      {/* Likes + Timestamp */}
      <p className="text-sm text-gray-400">
        Likes:{" "}
        <span className="text-white font-bold">
          {Array.isArray(post.likes)
            ? post.likes.length
            : typeof post.likes === "number"
            ? post.likes
            : 0}
        </span>
      </p>

      {isAdmin && (
        <div className="flex justify-center my-6">
          <button
            onClick={() => {
              const confirmed = window.confirm(
                "Are you sure you want to delete this post?"
              );
              if (confirmed) {
                // Your delete logic here
                console.log("Deleting post...");
              }
            }}
            className="flex items-center gap-2 px-4 py-2 border border-red-500 text-red-400 rounded hover:text-red-300 hover:border-red-400 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            Delete Post
          </button>
        </div>
      )}

      <p className="text-xs text-gray-500 mt-2">
        Posted: {new Date(post.createdAt).toLocaleString()}
      </p>
    </div>
  );
}

// Utility function
function extractYouTubeId(url) {
  if (!url || typeof url !== "string") return null;
  const match = url.match(
    /(?:youtube\.com.*(?:\?|&)v=|youtu\.be\/)([^&\n?#]+)/
  );
  return match ? match[1] : null;
}
