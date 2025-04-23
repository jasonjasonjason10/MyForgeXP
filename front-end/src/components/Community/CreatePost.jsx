import { useState } from "react";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [postType, setPostType] = useState("image");
  const [mediaFile, setMediaFile] = useState(null);
  const [mediaLink, setMediaLink] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    console.log("Submitting Post:");
    console.log("Title:", title);
    console.log("Description:", description);
    console.log("Post Type:", postType);
    console.log("Media File:", mediaFile);
    console.log("YouTube Link:", mediaLink);

    setTitle("");
    setDescription("");
    setPostType("image");
    setMediaFile(null);
    setMediaLink("");
  }

  return (
    <div className="min-h-screen text-white p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Create New Post</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Optional Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-2 rounded bg-gray-800 text-white placeholder-gray-400"
        />

        <textarea
          placeholder="Text (required)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="p-2 rounded bg-gray-800 text-white placeholder-gray-400"
        />

        <select
          value={postType}
          onChange={(e) => {
            setPostType(e.target.value);
            setMediaFile(null);
            setMediaLink("");
          }}
          className="p-2 rounded bg-gray-800 text-white"
        >
          <option value="image">Image</option>
          <option value="video">Video</option>
        </select>

        {postType === "image" && (
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setMediaFile(e.target.files[0])}
            className="text-white"
          />
        )}

        {postType === "video" && (
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-300">Upload video file:</label>
            <input
              type="file"
              accept="video/*"
              onChange={(e) => setMediaFile(e.target.files[0])}
              className="text-white"
            />

            <label className="text-sm text-gray-300">Or paste YouTube link:</label>
            <input
              type="text"
              value={mediaLink}
              onChange={(e) => setMediaLink(e.target.value)}
              placeholder="https://youtube.com/..."
              className="p-2 rounded bg-gray-800 text-white placeholder-gray-400"
            />
          </div>
        )}

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-500 rounded px-4 py-2 text-white"
        >
          Submit Post
        </button>
      </form>
    </div>
  );
}

export default CreatePost;
