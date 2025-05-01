import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { X } from "lucide-react";
import { address } from "../../../address";

export default function CreatePost() {
  const [title, setTitle]         = useState("");
  const [description, setDescription] = useState("");
  const [PostType, setPostType]   = useState("text");
  const [content, setContent]     = useState(null);
  const [error, setError]         = useState("");
  const {id} = useParams();
  const navigate = useNavigate();

  async function handleSubmit(e, id, title, description, PostType, content) {
    e.preventDefault();
    setError("");

    // 1) If it's a File (image or video), upload to S3 first
    if ((PostType === "image" || PostType === "video") && content instanceof File) {
      try {
        console.log('CONTENT:', content);
        console.log('ID:' ,id);
        // ask backend for presigned URL
        const res1 = await fetch(
          `${address}/post/generate-upload-url?` +
            new URLSearchParams({
              filename: encodeURIComponent(content.name),
              fileType: encodeURIComponent(content.type),
            })
        );
        if (!res1.ok) throw new Error("Failed to get upload URL");
        const { uploadUrl, key } = await res1.json();

        // PUT the file into S3
        const res2 = await fetch(uploadUrl, {
          method: "PUT",
          headers: { "Content-Type": content.type },
          body: content,
        });
        if (!res2.ok) throw new Error("Upload to S3 failed");

        // use the S3 key as the content pointer
        let contentValue = key;
      } catch (err) {
        console.error(err);
        setError(err.message);
        return;
      }
    }

    // 2) Build FormData for your create-post endpoint
    // const formData = new FormData();
    // formData.append("communityId", id);
    // formData.append("title", title);
    // formData.append("description", description);
    // formData.append("PostType", PostType);
    // formData.append("content", contentValue);

    // 3) Send to your API
    try {
      const res = await fetch(`${address}/post/create`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({title, description, PostType, content, communityId: id}),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Create failed");
    } catch (err) {
      console.error(err);
      setError(err.message);
      return;
    }

    // 4) Navigate away on success
    navigate("/community");
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="relative z-10 flex justify-center items-center min-h-screen px-4 py-10">
        <form
          onSubmit={(e) =>handleSubmit(e,id, title, description, PostType, content)}
          className="bg-cover bg-center border border-blue-500 p-8 rounded-lg shadow-xl w-full max-w-2xl backdrop-blur-md"
          style={{ backgroundImage: "url('/images/forgexp-grid-bg.png')" }}
        >
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="absolute top-4 right-5 text-gray-400 hover:text-white z-20"
          >
            <X size={24} />
          </button>
          <h1 className="text-3xl font-bold text-center mb-6 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
            Create a New Post
          </h1>

          {error && (
            <p className="text-red-400 text-center mb-4">{error}</p>
          )}

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
                setError("");
              }}
              className="p-3 bg-gray-900 border border-orange-400 rounded text-white"
            >
              <option value="text">Text</option>
              <option value="image">Image</option>
              <option value="video">Video</option>
            </select>

            {PostType === "text" && (
              <textarea
                placeholder="Your text..."
                value={content || ""}
                onChange={(e) => setContent(e.target.value)}
                required
                className="p-3 bg-gray-900 border border-orange-400 rounded placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-orange-300 min-h-[100px]"
              />
            )}

            {PostType === "image" && (
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setContent(e.target.files[0])}
                className="file:bg-white file:text-black file:rounded file:px-4 file:py-1 text-sm text-white"
                required
              />
            )}

            {PostType === "video" && (
              <div className="flex flex-col gap-4">
                <input
                  type="file"
                  accept="video/*"
                  onChange={(e) => setContent(e.target.files[0])}
                  className="file:bg-white file:text-black file:rounded file:px-4 file:py-1 text-sm text-white"
                  required
                />
                <span className="text-center text-white mt-2">— OR —</span>
                <input
                  type="text" value={typeof content === "string" ? content : ""}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Paste YouTube link..."
                  className="p-3 bg-gray-900 border border-orange-400 rounded placeholder-white text-white w-full"
                />
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