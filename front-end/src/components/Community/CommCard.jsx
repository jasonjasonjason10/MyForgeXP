import { useEffect, useState } from "react";

const CommunityCard = ({ post, likeHandle, fetchHasLiked, setRefreshToggle, refreshToggle }) => {
  const [postLiked, setPostLiked] = useState(false)
  const [postFav, setPostFav] = useState(false)
  const [favToggle, setFavToggle] = useState(false)
  const address = 'http://localhost:3000/'
console.log('post Fav => ', postFav)
useEffect(() => {
  fetchHasLiked(post.id)
}, [refreshToggle])

useEffect(() => {
  fetchHasFav(post.id)
},[favToggle])

async function likeHandle(postId) {
  const response = await fetch(`${address}post/${postId}/like`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  })
  setRefreshToggle(!refreshToggle)
}

  async function fetchHasLiked(postId) {
    const response = await fetch(`${address}post/hasliked/${postId}`, {
      method: 'POST',
      headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}
    })
    const result = await response.json()
    return setPostLiked(result.boolean)
  }

  async function fetchHasFav(postId) {
    const response = await fetch(`${address}user/hasfav/${postId}`, {
      method: 'POST',
      headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}
    })
    const result = await response.json()
    return setPostFav(result.boolean)
  }

  async function favHandle(postId) {
    console.log("fav this mf")
    const response = await fetch(`${address}user/favorite/${postId}`, {
      method: 'POST',
      headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}
    })
    setFavToggle(!favToggle)

  }

  let favClass = 'p-4 bg-red-700'
  if(postFav){
    favClass = 'p-4 bg-green-700'
  } else {
    favClass = 'p-4 bg-red-700'
  }

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
        {postLiked ? "liked" : "not liked"} | Likes:{" "}
        <span className="font-semibold text-white">{post.likes.length}</span>
      </div>
      <div className={favClass} onClick={() => favHandle(post.id)}>
        Save Post
      </div>
    </div>
  );
};

export default CommunityCard;
