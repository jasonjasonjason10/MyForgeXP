export default function UserPostCard({ post }) {
  console.log("likes => ", post);
  

  let contentPath = post.content;

  function extractId(contentPath) {
    const findId = /(?:youtube\.com.*(?:\?|&)v=|youtu\.be\/)([^&\n?#]+)/;
    const match = contentPath.match(findId);
    return match ? match[1] : null;
  }

  function postContent(contentPath) {
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
      {/* Post Title */}
      <h3 className="text-xl font-semibold text-white drop-shadow-[0_0_5px_rgba(255,165,0,0.3)] flex justify-center">
        {post.title}
      </h3>

      {/* Image or Uploaded Video */}
      {post.PostType === "image" && (
        <img
          className="h-[180px] w-[320px] rounded-lg object-cover"
          src={`http://localhost:3000${contentPath}`}
          alt="Post content"
        />
      )}

      {post.PostType === "video" && <div>{postContent(contentPath)}</div>}

      {/* Description with extended fade effect */}
      {post.description && (
        <div className="relative mt-3 max-h-[199px] overflow-hidden text-sm text-gray-300 px-1">
          <p className="whitespace-pre-wrap break-words">{post.description}</p>
          <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-gray-900 to-transparent pointer-events-none" />
        </div>
      )}

      {/* Likes Count */}
      <div className="mt-4 text-center text-gray-400 text-xs">
        Likes:{" "}
        <span className="text-white font-bold">
          {post.likes && Array.isArray(post.likes) ? post.likes.length : 0}
        </span>
      </div>
    </div>
  );
}
