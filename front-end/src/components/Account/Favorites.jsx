import { useEffect, useState } from "react";
import UserFavCard from "./UserFavCard";

export default function Favorites({ user }) {
  const [favPosts, setFavPosts] = useState([]);
  const address = "http://localhost:3000/";

  useEffect(() => {
    async function fetchFavPosts() {
      try {
        const response = await fetch(`${address}user/favorites`, {
          method: "POST",
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        const result = await response.json();
        setFavPosts(result.posts);
      } catch (error) {
        console.error("Error fetching favorite posts:", error);
      }
    }
    fetchFavPosts();
  }, []);

  return (
    <div className="text-white px-6 py-10 max-w-5xl mx-auto">
      {/* Heading */}
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold pb-4 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
          Favorite Posts
        </h2>
       
      </div>

      {/* Favorite Posts Section */}
      {favPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favPosts.map((post) => (
            <div
              key={post.id}
              className="bg-[#111827] rounded-xl p-6 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] border border-transparent hover:scale-105 transition-transform duration-300 cursor-pointer"
            >
              <UserFavCard post={post} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-400 mt-20">
          <p className="text-lg">No favorite posts yet!</p>
        </div>
      )}
    </div>
  );
}
