import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { X } from "lucide-react";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [PostType, setPostType] = useState("text");
  const [content, setContent] = useState(null);

  const params = useParams();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    await fetchCreatePost();
    navigate("/community");
  }

  async function fetchCreatePost() {
    const formData = new FormData();
    formData.append("communityId", params.id);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("PostType", PostType);
    formData.append("content", content);

    const response = await fetch("http://localhost:3000/post/create", {
      method: "POST",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      body: formData,
    });
    const result = await response.json();
    return result;
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Centered form container with blur behind it */}
      <div className="relative z-10 flex justify-center items-center min-h-screen px-4 py-10">
        <form
          onSubmit={handleSubmit}
          className="bg-cover bg-center border border-blue-500 p-8 rounded-lg shadow-xl w-full max-w-2xl backdrop-blur-md"
          style={{ backgroundImage: "url('/images/forgexp-grid-bg.png')" }}
          encType="multipart/form-data"
        >
          <button
            type="button"
            onClick={() => navigate(-1)} // Go back one page
            className="absolute top-4 right-5 text-gray-400 hover:text-white z-20"
          >
            <X size={24} />
          </button>
          <h1 className="text-3xl font-bold text-center mb-6 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
            Create a New Post
          </h1>

          <div className="flex flex-col gap-5">
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="p-3 bg-gray-900 border border-orange-400 rounded placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-orange-300"
            />

            <textarea
              placeholder="Description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="p-3 bg-gray-900 border border-orange-400 rounded placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-orange-300 min-h-[100px]"
            />

            <select
              value={PostType}
              onChange={(e) => {
                setPostType(e.target.value);
                setContent(null);
              }}
              className="p-3 bg-gray-900 border border-orange-400 rounded text-white"
            >
              <option value="image">Image</option>
              <option value="video">Video</option>
              <option value="text">Text</option>
            </select>

            {PostType === "image" && (
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setContent(e.target.files[0])}
                className="file:bg-white file:text-black file:rounded file:px-4 file:py-1 text-sm text-white"
              />
            )}

            {PostType === "video" && (
              <div className="flex flex-col gap-4">
                <div>
                  <label className="block mb-1 text-white font-medium">
                    Upload Video
                  </label>
                  <input
                    type="file"
                    accept="video/*"
                    onChange={(e) => setContent(e.target.files[0])}
                    className="file:bg-white file:text-black file:rounded file:px-4 file:py-1 text-sm text-white"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-white font-medium">
                    Or Paste YouTube Link
                  </label>
                  <input
                    type="text"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="https://youtube.com/..."
                    className="p-3 bg-gray-900 border border-orange-400 rounded placeholder-white text-white w-full"
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 mt-2 bg-orange-500 hover:bg-orange-400 text-white font-bold rounded transition"
            >
              Submit Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreatePost;
