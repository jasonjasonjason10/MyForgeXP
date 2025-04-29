export default function SingleUserPost({ post, onBack }) {
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
            src={`http://localhost:3000${contentPath}`}
            alt="Post content"
            className="w-full rounded-lg mb-4"
          />
        )}
  
        {post.PostType === "video" && (
          <video
            src={`http://localhost:3000${contentPath}`}
            controls
            className="w-full rounded-lg mb-4"
          />
        )}
  
        {/* YouTube embed (just in case) */}
        {post.PostType !== "image" && post.PostType !== "video" &&
          (post.content?.includes("youtube.com") || post.content?.includes("youtu.be")) && (
            <iframe
              className="w-full h-64 rounded-lg mb-4"
              src={`https://www.youtube.com/embed/${extractYouTubeId(contentPath)}`}
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
  
        <p className="text-xs text-gray-500 mt-2">
          Posted: {new Date(post.createdAt).toLocaleString()}
        </p>
      </div>
    );
  }
  
  // Utility function
  function extractYouTubeId(url) {
    if (!url || typeof url !== "string") return null;
    const match = url.match(/(?:youtube\.com.*(?:\?|&)v=|youtu\.be\/)([^&\n?#]+)/);
    return match ? match[1] : null;
  }
  