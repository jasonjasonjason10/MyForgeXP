import { useState } from "react";
import GamePostModal from "./GamePostModal";
import { address } from "../../../address";

function GamePostCard({ post, game }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
        <iframe
          className="h-[180px] w-[320px]"
          src={`https://www.youtube.com/embed/${videoId}`}
          allowFullScreen
        ></iframe>
      );
    }

    return (
      <video
        className="h-[180px] w-[320px]"
        controls
        src={`${address}${post.content}`}
      ></video>
    );
  }

  return (
    <>
      <div
        onClick={() => setIsModalOpen(true)}
        className="bg-gray-800 rounded-lg shadow-md p-4 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)] w-full h-72 flex flex-col justify-between overflow-hidden cursor-pointer"
      >
        {/* Title */}
        <h1 className="text-lg font-bold mb-2 truncate drop-shadow">
          {post.title}
        </h1>

        {/* Content */}
        <div className="mb-2 text-gray-300 text-sm line-clamp-3">
          {post.content ? postContent(post.content) : ""}
        </div>

        {/* Description */}
        <div className="text-gray-400 italic text-xs mb-2 truncate">
          {post.description}
        </div>

        {/* Metadata */}
        <div className="flex justify-between items-center text-[10px] text-gray-500">
          <div>By: {post.user?.username || post.userId}</div>
          <div>{new Date(post.createdAt).toLocaleDateString()}</div>
        </div>
      </div>

      {isModalOpen && (
        <GamePostModal
          post={post}
          game={game}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}

export default GamePostCard;
