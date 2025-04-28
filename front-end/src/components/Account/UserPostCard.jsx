export default function UserPostCard({ post }) {
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
        <div>
          <iframe
            className="h-[180px] w-[320px]"
            src={`https://www.youtube.com/embed/${videoId}`}
            allowFullScreen
          ></iframe>
          <a
            href={contentPath}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm"
          >
            {contentPath}
          </a>
        </div>
      );
    }

    return (
      <video
        className="h-[180px] w-[320px]"
        controls
        src={`http://localhost:3000${contentPath}`}
      ></video>
    );
  }

  return (
    <div>
      <h3 className="text-xl font-semibold text-orange-400 mb-2 drop-shadow-[0_0_5px_rgba(255,165,0,0.3)]">
        {post.title}
      </h3>

      <div className="text-gray-300 mb-4 break-words whitespace-pre-wrap text-sm">
        {post.description}
      </div>

      {post.PostType === "image" && (
        <img
          className="h-[180px] w-[320px]"
          src={`http://localhost:3000${contentPath}`}
          alt=""
        />
      )}

      {post.PostType === "video" && <div>{postContent(contentPath)}</div>}
    </div>
  );
}
