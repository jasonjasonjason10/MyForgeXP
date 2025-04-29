import EditPost from "./EditPost";
import { useState } from "react";
import { Trash, Pencil } from "lucide-react";

export default function SinglePost({ post, goBack }) {
  const [isEditing, setIsEditing] = useState(false);

  let contentPath = post.content;

  function extractId(contentPath) {
    const findId = /(?:youtube\.com.*(?:\?|&)v=|youtu\.be\/)([^&\n?#]+)/;
    const match = contentPath.match(findId);
    return match ? match[1] : null;
  }

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

  function postContent(contentPath) {
    if (
      contentPath.startsWith("http://") ||
      contentPath.startsWith("https://")
    ) {
      const videoId = extractId(contentPath);
      return (
        <iframe
          className="w-full h-[400px] rounded-lg"
          src={`https://www.youtube.com/embed/${videoId}`}
          allowFullScreen
        ></iframe>
      );
    }

    return (
      <video
        className="w-full h-[400px] rounded-lg"
        controls
        src={`http://localhost:3000${contentPath}`}
      ></video>
    );
  }

  if (isEditing) {
    return (
      <EditPost
        post={post}
        onCancel={() => setIsEditing(false)}
        onUpdate={() => {
          setIsEditing(false);
          window.location.reload();
        }}
      />
    );
  }

  return (
    <div className="bg-[#111827] p-6 rounded-xl shadow-lg flex flex-col items-center border">
      <button
        onClick={goBack}
        className="self-start mb-6 px-4 py-2 border border-blue-700 rounded-md text-sm font-semibold hover:shadow-[0_0_10px_2px_rgba(29,78,216,0.7)] transition-shadow duration-300"
      >
        ← All Uploaded Posts
      </button>

      <h2 className="text-3xl font-bold text-white mb-6">{post.title}</h2>

      <p className="text-gray-300 mb-6 text-center">{post.description}</p>

      {/* Media */}
      {post.PostType === "image" && (
        <img
          className="rounded-lg object-cover max-h-[400px] w-full"
          src={`http://localhost:3000${contentPath}`}
          alt="Post content"
        />
      )}

      {post.PostType === "video" && (
        <div className="w-full flex justify-center">
          {postContent(contentPath)}
        </div>
      )}

      <div className="mt-6 flex gap-4">
        <button
          onClick={() => setIsEditing(true)}
          className="flex items-center gap-2 px-4 py-2 text-sm text-blue-400 border border-blue-400 rounded-md hover:bg-blue-600 hover:text-white transition"
          title="Edit Post"
        >
          <Pencil size={18} />
          Edit Post
        </button>

        <button
          onClick={() => handleDelete(post.id)}
          className="flex items-center gap-2 px-4 py-2 text-sm text-red-500 border border-red-500 rounded-md hover:bg-red-500 hover:text-white transition"
          title="Delete Post"
        >
          <Trash size={18} />
          Delete Post
        </button>
      </div>
    </div>
  );
}
