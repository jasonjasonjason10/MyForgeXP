import { address } from "../../../address";
import { useState } from "react";

export default function EditPost({ post, onCancel, onUpdate }) {
  const [title, setTitle] = useState(post.title);
  const [description, setDescription] = useState(post.description);
  const [newFile, setNewFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setNewFile(file);
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setPreviewUrl(null);
    }
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("postId", post.id);
      formData.append("title", title);
      formData.append("description", description);
      if (newFile) {
        formData.append("content", newFile);
      }

      const res = await fetch(`${address}/post/edit`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      if (res.ok) {
        const updatedPost = await res.json();
        alert("Post updated successfully!");
        onUpdate(updatedPost);
      } else {
        alert("Failed to update post.");
      }
    } catch (err) {
      console.error("Error updating post:", err);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#0b1120] p-6 rounded-xl shadow-[0_0_30px_#38bdf8] text-[#e0f2fe] font-mono">
      <h2 className="text-2xl font-bold mb-4 text-[#60a5fa] drop-shadow-[0_0_5px_#3b82f6]">
        Edit Your Post
      </h2>

      {previewUrl && (
        <div className="mb-6">
          <label className="block mb-2 text-sky-300">New Upload Preview</label>
          {newFile?.type.startsWith("image") ? (
            <img
              src={previewUrl}
              alt="Preview"
              className="max-h-64 rounded border border-sky-400 shadow-[0_0_15px_#38bdf8]"
            />
          ) : (
            <video
              src={previewUrl}
              controls
              className="w-full max-h-64 rounded border border-sky-400 shadow-[0_0_15px_#38bdf8]"
            />
          )}
        </div>
      )}

      {!previewUrl && post.PostType === "image" && (
        <div className="mb-6">
          <label className="block mb-2 text-sky-300">Current Image</label>
          <img
            src={`${post.content}`}
            alt="Post"
            className="max-h-64 rounded border border-blue-500 shadow-[0_0_15px_#3b82f6]"
          />
        </div>
      )}

      {!previewUrl && post.PostType === "video" && (
        <div className="mb-6">
          <label className="block mb-2 text-sky-300">Current Video</label>
          <video
            src={`${post.content}`}
            controls
            className="w-full max-h-64 rounded border border-blue-500 shadow-[0_0_15px_#3b82f6]"
          />
        </div>
      )}

      <div className="mb-4">
        <label className="block mb-1 text-sm text-sky-300">Replace Image/Video</label>
        <input
          type="file"
          accept="image/*,video/*"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-100 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-sky-600 file:text-white hover:file:bg-sky-700"
        />
      </div>

      <label className="block mb-2 text-sky-200">Title</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 rounded bg-[#1e293b] border border-sky-500 mb-4 text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
        placeholder="Enter new title"
      />

      <label className="block mb-2 text-sky-200">Description</label>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 rounded bg-[#1e293b] border border-sky-500 mb-4 text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
        placeholder="Enter new description"
        rows="4"
      />

      <div className="flex justify-end gap-4">
        <button
          onClick={onCancel}
          className="px-4 py-2 border border-gray-500 text-gray-300 rounded hover:text-white hover:border-white transition"
          disabled={loading}
        >
          Cancel
        </button>

        <button
          onClick={handleUpdate}
          disabled={loading}
          className="px-4 py-2 bg-[#0ea5e9] hover:bg-[#0284c7] text-white rounded shadow-[0_0_10px_#38bdf8] disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
}
