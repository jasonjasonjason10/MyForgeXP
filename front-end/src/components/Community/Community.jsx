import { useEffect, useState } from "react";

const Community = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch("http://localhost:3000/post");
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    }

    fetchPosts();
  }, []);

  return (
    <div className="bg-[#0a1a2f] min-h-screen p-6 text-white">
      <h1 className="text-3xl font-bold mb-6 text-orange-400">Community Hub</h1>
    </div>
  );
};

export default Community;

