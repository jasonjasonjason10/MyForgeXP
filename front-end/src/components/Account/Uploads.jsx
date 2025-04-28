import { useEffect, useState } from "react";
import UserPostCard from "./UserPostCard";
import { Trash } from "lucide-react";

function Uploads({ user }) {
  const [userPosts, setUserPosts] = useState();
  console.log("posts useState ==> ", userPosts);

  useEffect(() => {
    setUserPosts(user.posts);
  }, []);

  // delete post function
  function handleDelete(postId) {
    const confirmDelete = window.confirm("Are you sure you want to delete this post?");
    if (!confirmDelete) return;
  
    fetch(`http://localhost:3000/user/post/${postId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then(response => {
        console.log("Delete response status:", response.status);
        if (response.ok) {
          setUserPosts(userPosts.filter(post => post.id !== postId));
          alert("Post deleted successfully.");
        } else {
          alert("Failed to delete post. Status: " + response.status);
        }
      })
      .catch(error => {
        console.error("Error deleting post:", error);
        alert("Something went wrong.");
      });
  }  

  return (
    <div className="min-h-screen bg-gray-800 text-white px-6 py-10 max-w-5xl mx-auto">
      <h2 className="text-4xl font-bold mb-8 flex justify-center drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
        Your Uploads
      </h2>

      {/* Posts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {userPosts ? (
          userPosts.map((post) => (
            <div
              key={post.id}
              className="bg-[#111827] border border-blue-700 rounded-xl p-6 shadow-[0_0_20px_#9333ea50] hover:shadow-blue-700 transition duration-300 relative"
            >
              {/* Trash button */}
              <button
                onClick={() => handleDelete(post.id)}
                className="absolute top-4 right-4 text-red-500 hover:text-red-700 transition"
                title="Delete Post"
              >
                <Trash size={20} />
              </button>

              <UserPostCard post={post} />
            </div>
          ))
        ) : (
          <div className="text-center text-gray-300">No posts</div>
        )}
      </div>
    </div>
  );
}

export default Uploads;
