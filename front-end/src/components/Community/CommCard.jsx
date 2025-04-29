// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Check } from "lucide-react";

// const CommunityCard = ({
//   post,
//   setRefreshToggle,
//   refreshToggle,
//   username,
//   userAvatar,
// }) => {
//   const [postLiked, setPostLiked] = useState(false);
//   const [postFav, setPostFav] = useState(false);
//   const [favToggle, setFavToggle] = useState(false);
//   const address = "http://localhost:3000/";
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchHasLiked(post.id);
//   }, [refreshToggle]);

//   useEffect(() => {
//     fetchHasFav(post.id);
//   }, [favToggle]);

//   async function likeHandle(postId) {
//     await fetch(`${address}post/${postId}/like`, {
//       method: "POST",
//       headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//     });
//     setRefreshToggle(!refreshToggle);
//   }

//   async function fetchHasLiked(postId) {
//     const response = await fetch(`${address}post/hasliked/${postId}`, {
//       method: "POST",
//       headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//     });
//     const result = await response.json();
//     setPostLiked(result.boolean);
//   }

//   async function fetchHasFav(postId) {
//     const response = await fetch(`${address}user/hasfav/${postId}`, {
//       method: "POST",
//       headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//     });
//     const result = await response.json();
//     setPostFav(result.boolean);
//   }

//   async function favHandle(postId) {
//     const response = await fetch(`${address}user/favorite/${postId}`, {
//       method: "POST",
//       headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//     });
//     setFavToggle(!favToggle);
//   }

//   let favClass = "p-4 bg-red-700";
//   if (postFav) {
//     favClass = "p-4 bg-green-700";
//   } else {
//     favClass = "p-4 bg-red-700";
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
//         <div>
//           <iframe
//             className="h-[180px] w-[320px]"
//             src={`https://www.youtube.com/embed/${videoId}`}
//             allowFullScreen
//           ></iframe>
//           <a
//             href={contentPath}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="text-sm"
//           >
//             {contentPath}
//           </a>
//         </div>
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
//     <div className="bg-gray-900   rounded-2xl shadow-lg p-5 flex flex-col justify-between drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
//       <div
//         onClick={() => navigate(`/user/${post.user.id}`)}
//         className="flex items-center gap-3 mb-4 cursor-pointer hover:opacity-80 transition"
//       >
//         <img
//           src={`http://localhost:3000${post.user.avatar}`}
//           alt="User Avatar"
//           className="w-10 h-10 rounded-full object-cover border-2 border-blue-500"
//         />
//         <h5 className="text-lg font-semibold text-white drop-shadow">
//           {post.user.username}
//         </h5>
//       </div>
//       {/* Post Title */}
//       <h3 className="text-xl font-semibold text-white mb-2 drop-shadow-[0_0_5px_rgba(255,165,0,0.3)] flex justify-center">
//         {post.title}
//       </h3>

//       {/* Post Description with fade-out */}
//       {post.description && (
//         <div className="relative mt-2 max-h-[190px] overflow-hidden text-sm text-gray-300 px-1 mb-4 text-left w-full">
//           <p className="whitespace-pre-wrap break-words">{post.description}</p>
//           <div className="absolute bottom-0 left-0 w-full h-10 bg-gradient-to-t from-gray-900 to-transparent pointer-events-none" />
//         </div>
//       )}

//       {post.PostType === "image" && (
//         <div>
//           <img
//             className="h-[180px] w-[320px]"
//             src={`http://localhost:3000${contentPath}`}
//             alt=""
//           />
//         </div>
//       )}

//       {post.PostType === "video" && <div>{postContent(contentPath)}</div>}

//       {/* Like Button */}
//       <div className="mt-4 flex justify-between items-center">
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

//         <span className="text-gray-400 text-xs">
//           Likes:{" "}
//           <span className="text-white font-bold">{post.likes.length}</span>
//         </span>
//       </div>

//       {/* Save Button */}
//       <div
//         onClick={() => favHandle(post.id)}
//         className={`mt-4 text-center text-xs font-semibold cursor-pointer rounded-md transition p-3 w-32 mx-auto
//     ${
//       postFav
//         ? "border border-blue-700"
//         : "border border-blue-700 shadow-[0_0_20px_#22d3ee60] hover:shadow-blue-700 duration-300"
//     }`}
//       >
//         {postFav ? (
//           <span className="flex items-center justify-center gap-1">
//             Favorited <Check size={14} className="text-green-400" />
//           </span>
//         ) : (
//           "Add to Favorites"
//         )}
//       </div>
//     </div>
//   );
// };

// export default CommunityCard;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check, Plus, X } from "lucide-react";

const CommunityCard = ({
  post,
  setRefreshToggle,
  refreshToggle,
  username,
  userAvatar,
}) => {
  const [postLiked, setPostLiked] = useState(false);
  const [postFav, setPostFav] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [favToggle, setFavToggle] = useState(false);
  const address = "http://localhost:3000/";
  const navigate = useNavigate();

  useEffect(() => {
    fetchHasLiked(post.id);
  }, [refreshToggle]);

  useEffect(() => {
    fetchHasFav(post.id);
  }, [favToggle]);

  async function likeHandle(postId) {
    await fetch(`${address}post/${postId}/like`, {
      method: "POST",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    setRefreshToggle(!refreshToggle);
  }

  async function fetchHasLiked(postId) {
    const response = await fetch(`${address}post/hasliked/${postId}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    const result = await response.json();
    setPostLiked(result.boolean);
  }

  async function fetchHasFav(postId) {
    const response = await fetch(`${address}user/hasfav/${postId}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    const result = await response.json();
    setPostFav(result.boolean);
  }

  async function favHandle(postId) {
    const response = await fetch(`${address}user/favorite/${postId}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    setFavToggle(!favToggle);
  }

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
        src={`http://localhost:3000${contentPath}`}
      ></video>
    );
  }

  return (
    <>
      {/* Blur background when expanded */}
      {isExpanded && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40" onClick={() => setIsExpanded(false)} />
      )}

      <div className={`relative z-50 ${isExpanded ? 'fixed inset-0 flex items-center justify-center p-4' : ''}`}>
        <div className={`bg-gray-900 rounded-2xl shadow-lg p-5 flex flex-col justify-between drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] 
          ${isExpanded ? 'w-full max-w-2xl mx-auto' : ''}`}>

          {/* Expand/Collapse Button */}
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="absolute top-3 right-3 bg-blue-700 hover:bg-blue-500 text-white p-1 rounded-full transition"
          >
            {isExpanded ? <X size={18} /> : <Plus size={18} />}
          </button>

          {/* User Info */}
          <div
            onClick={() => navigate(`/user/${post.user.id}`)}
            className="flex items-center gap-3 mb-4 cursor-pointer hover:opacity-80 transition"
          >
            <img
              src={`http://localhost:3000${post.user.avatar}`}
              alt="User Avatar"
              className="w-10 h-10 rounded-full object-cover border-2 border-blue-500"
            />
            <h5 className="text-lg font-semibold text-white drop-shadow">
              {post.user.username}
            </h5>
          </div>

          {/* Title */}
          <h3 className="text-xl font-semibold text-white mb-2 drop-shadow-[0_0_5px_rgba(255,165,0,0.3)] flex justify-center">
            {post.title}
          </h3>

          {/* Image/Video */}
          {post.PostType === "image" && (
            <img
              className="h-[180px] w-[320px] object-cover mx-auto rounded-lg mb-4"
              src={`http://localhost:3000${contentPath}`}
              alt=""
            />
          )}
          {post.PostType === "video" && (
            <div className="flex justify-center mb-4">{postContent(contentPath)}</div>
          )}

          {/* Description (shown only when expanded) */}
          {isExpanded && post.description && (
            <div className="relative mt-2 max-h-[200px] overflow-hidden text-sm text-gray-300 px-1 mb-4 text-left w-full">
              <p className="whitespace-pre-wrap break-words">{post.description}</p>
              <div className="absolute bottom-0 left-0 w-full h-10 bg-gradient-to-t from-gray-900 to-transparent pointer-events-none" />
            </div>
          )}

          {/* Like and Favorites (only in expanded) */}
          {isExpanded && (
            <>
              <div className="mt-4 flex justify-between items-center">
                <button
                  onClick={() => likeHandle(post.id)}
                  className={`px-3 py-1 rounded-md text-xs font-semibold transition 
                  ${postLiked ? "bg-orange-500 hover:bg-orange-400" : "bg-gray-600 hover:bg-gray-500 border border-orange-500"}`}
                >
                  {postLiked ? "Liked" : "🤍 Like"}
                </button>

                <span className="text-gray-400 text-xs">
                  Likes:{" "}
                  <span className="text-white font-bold">{post.likes.length}</span>
                </span>
              </div>

              <div
                onClick={() => favHandle(post.id)}
                className={`mt-4 text-center text-xs font-semibold cursor-pointer rounded-md transition p-3 w-32 mx-auto 
                  ${postFav ? "border border-blue-700" : "border border-blue-700 shadow-[0_0_20px_#22d3ee60] hover:shadow-blue-700 duration-300"}`}
              >
                {postFav ? (
                  <span className="flex items-center justify-center gap-1">
                    Favorited <Check size={14} className="text-green-400" />
                  </span>
                ) : (
                  "Add to Favorites"
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default CommunityCard;
