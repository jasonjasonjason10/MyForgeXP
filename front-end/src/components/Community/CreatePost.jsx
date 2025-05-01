import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { X } from "lucide-react";
import { address } from "../../../address";

export default function CreatePost() {
  const [title, setTitle]             = useState("");
  const [description, setDescription] = useState("");
  const [PostType, setPostType]       = useState("text");
  const [content, setContent]         = useState(null);
  const [error, setError]             = useState("");
  const { id }                        = useParams();
  const navigate                      = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // 1) If image/video file, upload to S3 first and get back the key
    let contentValue = content;
    if ((PostType === "image" || PostType === "video") && content instanceof File) {
      try {
        const params = new URLSearchParams({
          filename: encodeURIComponent(content.name),
          fileType: encodeURIComponent(content.type),
        });
        const res1 = await fetch(`${address}/post/generate-upload-url?${params}`, {
          headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}
        });
        if (!res1.ok) throw new Error("Failed to get upload URL");
        const { uploadUrl, key } = await res1.json();

        const res2 = await fetch(uploadUrl, {
          method: "PUT",
          headers: { "Content-Type": content.type, 'Authorization': `Bearer ${localStorage.getItem('token')}` },
          body: content,
        });
        if (!res2.ok) throw new Error("Upload to S3 failed");

        contentValue = key;
      } catch (err) {
        console.error(err);
        setError(err.message);
        return;
      }
    }

    // 2) Build JSON payload
    const payload = {
      communityId: id,
      title,
      description,
      PostType,
      content: contentValue,
    };

    // 3) Send to your API with proper JSON header
    try {
      const res = await fetch(`${address}/post/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:  `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(payload),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Create failed");
      // 4) Navigate on success
      navigate("/community");
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  return (
    <div className="relative min-h-screen">
      <div className="flex justify-center items-center min-h-screen px-4">
        <form
          onSubmit={handleSubmit}
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

          <h1 className="text-3xl font-bold text-center mb-6">
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
              className="p-3 bg-gray-900 border border-orange-400 rounded text-white"
            />

            <textarea
              placeholder="Description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="p-3 bg-gray-900 border border-orange-400 rounded text-white min-h-[100px]"
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
              <></>
            )}

            {PostType === "image" && (
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setContent(e.target.files[0])}
                required
                className="file:bg-white file:text-black file:rounded file:px-4 file:py-1"
              />
            )}

            {PostType === "video" && (
              <div className="flex flex-col gap-4">
                <input
                  type="file"
                  accept="video/*"
                  onChange={(e) => setContent(e.target.files[0])}
                  required
                  className="file:bg-white file:text-black file:rounded file:px-4 file:py-1"
                />
                <span className="text-center text-white">— OR —</span>
                <input
                  type="text"
                  value={typeof content === "string" ? content : ""}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Paste YouTube link..."
                  className="p-3 bg-gray-900 border border-orange-400 rounded text-white"
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-orange-500 hover:bg-orange-400 text-white font-bold rounded"
            >
              Submit Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}