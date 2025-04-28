function UserFavCard({post}) {
    return (
        <div className="flex flex-col space-y-2">
          <div className="text-xl text-orange-400 font-semibold drop-shadow-[0_0_5px_rgba(255,165,0,0.3)]">
            {post.title}
          </div>
  
          <div className="text-gray-300 break-words whitespace-pre-wrap">
            {post.description}
          </div>
  
          <div className="text-sm text-gray-500 mt-auto">
            Posted on:{" "}
            <span className="text-gray-400">
              {new Date(post.createdAt).toLocaleString()}
            </span>
          </div>
        </div>
    );
  }

export default UserFavCard;