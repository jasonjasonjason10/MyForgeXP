import { useEffect, useState } from "react";
import UserFavCard from "./UserFavCard";

export default function Favorites({ user }) {
  const [favPosts, setFavPosts] = useState(null);
  const address = "http://localhost:3000/";

  useEffect(() => {
    async function fetchFavPosts() {
      const response = await fetch(`${address}user/favorites`, {
        method: "POST",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const result = await response.json();
      setFavPosts(result.posts);
    }
    fetchFavPosts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-800 text-white px-6 py-10 max-w-5xl mx-auto">
      <h2 className="text-4xl font-bold mb-8 flex justify-center drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
        Favorite Posts
      </h2>

      {/* Favorite Posts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {favPosts ? (
          favPosts.map((post) => (
            <div
              key={post.id}
              className="bg-[#111827] border border-blue-700 rounded-xl p-6 shadow-[0_0_20px_#9333ea50] hover:shadow-blue-700 transition duration-300"
            >
              <UserFavCard post={post} />
            </div>
          ))
        ) : (
          <div className="text-center text-gray-300">Loading...</div>
        )}
      </div>
    </div>
  );
}
