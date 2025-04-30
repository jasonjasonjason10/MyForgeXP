import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CommCard from "../Community/CommCard";
import SearchPost from "./SearchPost";
import { address } from "../../../address";

function Community() {
  const navigate = useNavigate();
  const [refreshToggle, setRefreshToggle] = useState(false);
  const [postList, setPostList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState('recent')

  useEffect(() => {
    async function fetchPostList() {
      const response = await fetch(`${address}/post/all`);
      const result = await response.json();
      setPostList(result.post);
    }
    fetchPostList();
  }, [refreshToggle]);

  const filteredPosts = postList.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.user?.username?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (sortBy === "alphabetical") {
      return a.title.localeCompare(b.title);
    } else if (sortBy === "likes") {
      return (b.likes?.length || 0) - (a.likes?.length || 0);
    } else {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
  });

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  return (
    <div className="min-h-screen text-white px-4 py-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-bold drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
            All Community Posts
          </h1>
        </div>

        <SearchPost onSearch={(query) => setSearchQuery(query)} />

        <div className="flex justify-end mb-6">
          <div className="relative">
            <select
              value={sortBy}
              onChange={handleSortChange}
              className="text-black rounded px-2 py-1"
            >

        <div className="flex justify-end mb-6">
          <div className="relative">
            <select value={sortBy} onChange={handleSortChange} className="...">
              <option value="recent">Recent</option>
              <option value="alphabetical">A - Z</option>
              <option value="likes">Most Likes</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-auto">
          {sortedPosts.map((post) => (
            <CommCard
              key={post.id}
              post={post}
              setRefreshToggle={setRefreshToggle}
              refreshToggle={refreshToggle}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Community;
