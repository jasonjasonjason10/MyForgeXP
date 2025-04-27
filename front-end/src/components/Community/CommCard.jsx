// import { useEffect, useState } from "react";

// const CommunityCard = ({ post, likeHandle, fetchHasLiked, setRefreshToggle, refreshToggle }) => {
//   const [postLiked, setPostLiked] = useState(false)
//   const [postFav, setPostFav] = useState(false)
//   const [favToggle, setFavToggle] = useState(false)
//   const address = 'http://localhost:3000/'
// console.log('post Fav => ', postFav)
// useEffect(() => {
//   fetchHasLiked(post.id)
// }, [refreshToggle])

// useEffect(() => {
//   fetchHasFav(post.id)
// },[favToggle])

// async function likeHandle(postId) {
//   const response = await fetch(`${address}post/${postId}/like`, {
//     method: "POST",
//     headers: {
//       Authorization: `Bearer ${localStorage.getItem("token")}`
//     }
//   })
//   setRefreshToggle(!refreshToggle)
// }

//   async function fetchHasLiked(postId) {
//     const response = await fetch(`${address}post/hasliked/${postId}`, {
//       method: 'POST',
//       headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}
//     })
//     const result = await response.json()
//     return setPostLiked(result.boolean)
//   }

//   async function fetchHasFav(postId) {
//     const response = await fetch(`${address}user/hasfav/${postId}`, {
//       method: 'POST',
//       headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}
//     })
//     const result = await response.json()
//     return setPostFav(result.boolean)
//   }

//   async function favHandle(postId) {
//     console.log("fav this mf")
//     const response = await fetch(`${address}user/favorite/${postId}`, {
//       method: 'POST',
//       headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}
//     })
//     setFavToggle(!favToggle)

//   }

//   let favClass = 'p-4 bg-red-700'
//   if(postFav){
//     favClass = 'p-4 bg-green-700'
//   } else {
//     favClass = 'p-4 bg-red-700'
//   }

//   return (
//     <div className="bg-[#13294b] border border-blue-500 rounded-2xl shadow-lg p-5 flex flex-col justify-between">
//       <h3 className="text-xl font-semibold text-orange-400 mb-2 drop-shadow-[0_0_5px_rgba(255,165,0,0.3)]">
//         {post.title}
//       </h3>

//       <div className="text-gray-300 mb-4 break-words whitespace-pre-wrap">
//         {post.description}
//       </div>

//       <div
//         className="text-sm text-blue-300 mt-auto cursor-pointer hover:underline"
//         onClick={() => likeHandle(post.id)}
//       >
//         {postLiked ? "liked" : "not liked"} | Likes:{" "}
//         <span className="font-semibold text-white">{post.likes.length}</span>
//       </div>
//       <div className={favClass} onClick={() => favHandle(post.id)}>
//         Save Post
//       </div>
//     </div>
//   );
// };

// export default CommunityCard;

import { useEffect, useState } from "react";

const CommunityCard = ({ post, setRefreshToggle, refreshToggle }) => {
  const [postLiked, setPostLiked] = useState(false);
  const [postFav, setPostFav] = useState(false);
  const [favToggle, setFavToggle] = useState(false);
  const address = "http://localhost:3000/";

  useEffect(() => {
    fetchHasLiked(post.id);
  }, [refreshToggle]);

  useEffect(() => {
    fetchHasFav(post.id);
  }, [favToggle]);

  async function likeHandle(postId) {
    const response = await fetch(`${address}post/${postId}/like`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
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
    console.log("fav this mf");
    const response = await fetch(`${address}user/favorite/${postId}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    setFavToggle(!favToggle);
  }

  return (
    <div className="bg-gray-900 border border-blue-700 rounded-2xl shadow-lg p-5 flex flex-col justify-between drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
      {/* Post Title */}
      <h3 className="text-xl font-semibold text-orange-400 mb-2 drop-shadow-[0_0_5px_rgba(255,165,0,0.3)]">
        {post.title}
      </h3>

      {/* Post Description */}
      <div className="text-gray-300 mb-4 break-words whitespace-pre-wrap text-sm">
        {post.description}
      </div>

      {/* Like Button */}
      <div className="mt-4 flex justify-between items-center">
        <button
          onClick={() => likeHandle(post.id)}
          className={`px-3 py-1 rounded-md text-xs font-semibold transition 
            ${
              postLiked
                ? "bg-orange-500 hover:bg-orange-400"
                : "bg-gray-600 hover:bg-gray-500 border border-orange-500"
            }`}
        >
          {postLiked ? " Liked" : "🤍 Like"}
        </button>

        <span className="text-gray-400 text-xs">
          Likes:{" "}
          <span className="text-white font-bold">{post.likes.length}</span>
        </span>
      </div>

      {/* Save Button */}
      <div
        onClick={() => favHandle(post.id)}
        className={`mt-4 text-center text-xs font-semibold cursor-pointer rounded-md transition p-3 w-32 mx-auto
    ${
      postFav
        ? "bg-orange-500 hover:bg-orange-400 border border-blue-700"
        : " border border-blue-700 shadow-[0_0_20px_#22d3ee60] hover:shadow-blue-700 duration-300"
    }`}
      >
        {postFav ? "Favorited" : "Add to Favorites"}
      </div>
    </div>
  );
};

export default CommunityCard;
