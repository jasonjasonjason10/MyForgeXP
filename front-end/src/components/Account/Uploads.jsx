import { useState, useEffect } from "react";
import UserPostCard from "./UserPostCard";
import { Trash } from "lucide-react";
import SinglePost from "../Account/MySinglePost";

function Uploads({ user }) {
  const [userPosts, setUserPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    if (user?.posts) {
      setUserPosts(user.posts);
    }
  }, [user]);

  // delete post function
  function handleDelete(postId) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (!confirmDelete) return;

    fetch(`http://localhost:3000/user/post/${postId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        console.log("Delete response status:", response.status);
        if (response.ok) {
          setUserPosts(userPosts.filter((post) => post.id !== postId));
          alert("Post deleted successfully.");
        } else {
          alert("Failed to delete post. Status: " + response.status);
        }
      })
      .catch((error) => {
        console.error("Error deleting post:", error);
        alert("Something went wrong.");
      });
  }

  return (
    <div className="text-white px-6 py-10 max-w-5xl mx-auto">
      {/* Heading */}
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold pb-4 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
          Your Uploads
        </h2>
        <div className="mx-auto w-48 h-0.5 bg-blue-700 shadow-[0_0_10px_2px_rgba(29,78,216,0.7)] rounded-full"></div>
      </div>

      {/* Either show SinglePost or Grid */}
      {selectedPost ? (
        <SinglePost post={selectedPost} goBack={() => setSelectedPost(null)} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userPosts.map((post) => (
            <div
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className="cursor-pointer bg-[#111827] rounded-xl p-6 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] border border-transparent hover:scale-105 transition-transform duration-300"
            >
              <UserPostCard post={post} />
            </div>
          ))}
        </div>
      )}
      <button
        onClick={() => handleDelete(post.id)}
        className="absolute top-4 right-4 text-red-500 hover:text-red-700 transition"
        title="Delete Post"
      >
        <Trash size={20} />
      </button>
    </div>
  );
}

export default Uploads;
