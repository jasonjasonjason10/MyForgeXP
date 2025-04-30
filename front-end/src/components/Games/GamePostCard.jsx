// import { useState, useEffect } from "react";
// import { address } from "../../../address";
// //JASON
// import { useRef } from "react";
// import { Check } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// function GamePostCard({ post }) {
//   const [postLiked, setPostLiked] = useState(false);
//   const [refreshToggle, setRefreshToggle] = useState(false);

//   //JASON
//   const [isExpanded, setIsExpanded] = useState(false);
//   const [postFav, setPostFav] = useState(false);
//   const [favToggle, setFavToggle] = useState(false);
//   const [descOverflow, setDescOverflow] = useState(false);
//   const descRef = useRef(null);
//   const navigate = useNavigate();

//   //JASON
//   useEffect(() => {
//     if (descRef.current) {
//       setDescOverflow(
//         descRef.current.scrollHeight > descRef.current.clientHeight
//       );
//     }
//   }, [post.description, isExpanded]);

//   useEffect(() => {
//     fetchHasLiked(post.id);
//   }, [refreshToggle]);

// //JASON
//   useEffect(() => {
//     fetchHasFav(post.id);
//   }, [favToggle]);

//   //JASON
//   async function fetchHasFav(postId) {
//     const response = await fetch(`${address}/user/hasfav/${postId}`, {
//       method: "POST",
//       headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//     });
//     const result = await response.json();
//     setPostFav(result.boolean);
//   }

//   async function favHandle(postId) {
//     const response = await fetch(`${address}/user/favorite/${postId}`, {
//       method: "POST",
//       headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//     });
//     setFavToggle(!favToggle);
//   }

//   async function likeHandle(postId) {
//     const response = await fetch(`${address}/post/${postId}/like`, {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//       },
//     });
//     setRefreshToggle(!refreshToggle);
//   }

//   async function fetchHasLiked(postId) {
//     const response = await fetch(`${address}/post/hasliked/${postId}`, {
//       method: "POST",
//       headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//     });
//     const result = await response.json();
//     setPostLiked(result.boolean);
//   }

//   let contentPath = post.content;

//   function extractId(contentPath) {
//     const findId = /(?:youtube\.com.*(?:\?|&)v=|youtu\.be\/)([^&\n?#]+)/;
//     const match = contentPath.match(findId);
//     return match ? match[1] : null;
//   }

//   function postContent(contentPath) {
//     if (
//       contentPath.startsWith("http://") ||
//       contentPath.startsWith("https://")
//     ) {
//       const videoId = extractId(contentPath);
//       return (
//         <iframe
//           className="h-[180px] w-[320px]"
//           src={`https://www.youtube.com/embed/${videoId}`}
//           allowFullScreen
//         ></iframe>
//       );
//     }

//     return (
//       <video
//         className="h-[180px] w-[320px]"
//         controls
//         src={`http://localhost:3000${contentPath}`}
//       ></video>
//     );
//   }

//   return (
//     <div className="bg-gray-800 rounded-lg shadow-md p-4 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)] w-full h-72 flex flex-col justify-between overflow-hidden">
//       {/* Post Title */}
//       <h1 className="text-lg font-bold mb-2  truncate drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
//         {post.title}
//       </h1>

//       {/* Post Content */}
//       <div className="mb-2 text-gray-300 text-sm line-clamp-3">
//         {contentPath ? postContent(contentPath) : ""}
//       </div>

//       {/* Post Description */}
//       <div className="text-gray-400 italic text-xs mb-2 truncate">
//         {post.description}
//       </div>

//       {/* Metadata Row */}
//       <div className="flex justify-between items-center text-[10px] text-gray-500">
//         <div>By: {post.userId}</div>
//         <div>{new Date(post.createdAt).toLocaleDateString()}</div>
//       </div>

//       {/* Like Button */}
//       <div className="mt-4 flex justify-end">
//         <button
//           onClick={() => likeHandle(post.id)}
//           className={`px-3 py-1 rounded-md text-xs font-semibold transition
//             ${
//               postLiked
//                 ? "bg-orange-500 hover:bg-orange-400"
//                 : "bg-gray-600 hover:bg-gray-500 border border-orange-500"
//             }`}
//         >
//           {postLiked ? " Liked" : "🤍 Like"}
//         </button>
//       </div>
//     </div>
//   );
// }

// export default GamePostCard;

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
    if (contentPath.startsWith("http://") || contentPath.startsWith("https://")) {
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

