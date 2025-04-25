import { useEffect, useState } from "react";
import UserFavCard from "./UserFavCard";
export default function Favorites({user}) {
  const [favPosts, setFavPosts] = useState(null)
  console.log("fav useState", favPosts)
  useEffect(() => {
    setFavPosts(user.favorites)
  },[])
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#0f172a] to-[#1a1a2e] text-white px-6 py-10 max-w-6xl mx-auto font-mono">
      <h3 className="text-4xl font-bold text-cyan-300 mb-10 border-b border-cyan-500 pb-2 drop-shadow-[0_0_10px_#22d3ee]">
        Favorite Posts
      </h3>
        {favPosts ? 
        favPosts.map((post) => (
          <div key={post.id}>
            <UserFavCard post={post}/>
          </div>
        )) : 
        <div>loading . . .</div>
      }
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        
      </div>
    </div>
  );
}
