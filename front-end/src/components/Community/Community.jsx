import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchUser from "../SearchUser";
import CommCard from "../Community/CommCard"

function Community() {
  const navigate = useNavigate();
  const [refreshToggle, setRefreshToggle] = useState(false)
  const [postList, setPostList] = useState([])

  useEffect(() => {
    async function fetchPostList() {
      const response = await fetch("http://localhost:3000/post/all");
      const result = await response.json();
      setPostList(result.post);
    }
    fetchPostList();
  }, [refreshToggle]);

  return (
<<<<<<< Updated upstream
    <div className="min-h-screen text-white px-4 py-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-bold drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
            Community Page
          </h1>
          <button
            onClick={() => navigate("/createpost")}
            className="bg-orange-500 hover:bg-orange-400 text-white font-semibold py-2 px-4 rounded shadow-md transition duration-300">
            + New Post
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-auto">
          {postList.map((post) => (
            <CommCard
              key={post.id}
              post={post}
              setRefreshToggle={setRefreshToggle}
              refreshToggle={refreshToggle}
            />
          ))}
        </div>
      </div>
=======
    <div>
      <h1>Community page</h1>
      
>>>>>>> Stashed changes
    </div>
  );
}

export default Community;
