export default function UserFavCard({ post }) {
  let contentPath = post.content;

  function extractId(contentPath) {
    const findId = /(?:youtube\.com.*(?:\?|&)v=|youtu\.be\/)([^&\n?#]+)/;
    const match = contentPath.match(findId);
    return match ? match[1] : null;
  }

  function postContent(contentPath) {
    if (contentPath.startsWith("http://") || contentPath.startsWith("https://")) {
      const videoId = extractId(contentPath);
      return (
        <div className="flex flex-col items-center">
          <iframe
            className="h-[180px] w-[320px] rounded-lg"
            src={`https://www.youtube.com/embed/${videoId}`}
            allowFullScreen
          ></iframe>
          <a
            href={contentPath}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-blue-400 mt-2 underline"
          >
            Watch on YouTube
          </a>
        </div>
      );
    }
  
    return (
      <video
        className="h-[180px] w-[320px] rounded-lg"
        controls
        src={`http://localhost:3000${contentPath}`}
      ></video>
    );
  }

  return (
    <div>
      {/* Title */}
      <h3 className="text-xl font-semibold text-orange-400 mb-2 drop-shadow-[0_0_5px_rgba(255,165,0,0.3)]">
        {post.title}
      </h3>

      {/* Description */}
      <div className="text-gray-300 mb-4 break-words whitespace-pre-wrap text-sm">
        {post.description}
      </div>

      {/* Media (Image or Video) */}
      {post.PostType === "image" && (
        <img
          className="h-[180px] w-[320px] rounded-lg object-cover"
          src={`http://localhost:3000${contentPath}`}
          alt="Favorite Post Image"
        />
      )}

      {post.PostType === "video" && (
        <div className="mt-4">
          {postContent(contentPath)}
        </div>
      )}

      {/* Timestamp */}
      <p className="text-gray-500 text-xs mt-4">
        Posted on: {new Date(post.createdAt).toLocaleString()}
      </p>
    </div>
  );
}
