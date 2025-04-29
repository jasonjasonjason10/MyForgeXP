export default function UserFavCard({ post }) {
  const contentPath = post.content;

  return (
    <div className="flex flex-col justify-between h-full text-white">
      {/* Top section: title + media */}
      <div className="flex flex-col gap-3 items-center">
        <h3 className="text-xl font-semibold text-white drop-shadow-[0_0_5px_rgba(255,165,0,0.3)] text-center">
          {post.title}
        </h3>

        {post.PostType === "image" && (
          <img
            className="h-[180px] w-[320px] rounded-lg object-cover mx-auto"
            src={`http://localhost:3000${contentPath}`}
            alt="Post content"
          />
        )}

        {post.PostType === "video" && (
          <video
            className="h-[180px] w-[320px] rounded-lg mx-auto"
            controls
            src={`http://localhost:3000${contentPath}`}
          />
        )}

        {/* Description with fade */}
        {post.description && (
          <div className="relative mt-2 max-h-[190px] overflow-hidden text-sm text-gray-300 px-2 text-left w-full">
            <p className="whitespace-pre-wrap break-words">
              {post.description}
            </p>
            <div className="absolute bottom-0 left-0 w-full h-10 bg-gradient-to-t from-[#111827] to-transparent pointer-events-none" />
          </div>
        )}
      </div>

      {/* Bottom section: Likes */}
      <div className="mt-4 text-center text-xs text-gray-400">
        Likes:{" "}
        <span className="text-white font-bold">
          {Array.isArray(post.likes) ? post.likes.length : 0}
        </span>
      </div>
    </div>
  );
}
