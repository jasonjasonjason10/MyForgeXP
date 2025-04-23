
const CommunityCard = ({ post, likeHandle, fetchHasLiked }) => {
  return (
    <div className="bg-[#13294b] border border-blue-500 rounded-2xl shadow-lg p-5 flex flex-col justify-between">
      <h3 className="text-xl font-semibold text-orange-400 mb-2 drop-shadow-[0_0_5px_rgba(255,165,0,0.3)]">
        {post.title}
      </h3>

      <div className="text-gray-300 mb-4 break-words whitespace-pre-wrap">
        {post.description}
      </div>

      <div
        className="text-sm text-blue-300 mt-auto cursor-pointer hover:underline"
        onClick={() => likeHandle(post.id)}
      >
        {fetchHasLiked(post.id) ? "liked" : "not liked"} | Likes:{" "}
        <span className="font-semibold text-white">{post.likes.length}</span>
      </div>
    </div>
  );
};

export default CommunityCard;
