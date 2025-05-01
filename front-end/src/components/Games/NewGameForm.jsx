import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { address } from "../../../address";

export default function NewGameForm({ isOpen, onClose }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState("");

  const handleFileChange = (e) => {
    const f = e.target.files[0];
    const allowed = ["image/png", "image/jpeg", "image/jpg"];
    if (f && !allowed.includes(f.type)) {
      setFileError("Please upload a JPG or PNG.");
      return;
    }
    setFileError("");
    setFile(f);
  };

  const handleSubmit = async () => {
    if (!title || !description || !file) {
      alert("All fields + an image are required.");
      return;
    }

    try {
      // ─── 1) Get presigned URL ─────────────────────────────────
      // Your Express route is GET /generate-upload-url?filename=…&fileType=…
      const url = new URL(`${address}/games/generate-upload-url`);
      url.searchParams.append("filename", file.name);
      url.searchParams.append("fileType", file.type);

      const presignedRes = await fetch(url.toString(), {
        method: "GET",
        headers: { "Accept": "application/json" },
      });
      if (!presignedRes.ok) {
        const err = await presignedRes.json();
        throw new Error(err.error || "Failed to get upload URL");
      }
      const { uploadUrl, key } = await presignedRes.json();
      // ↑ note we pull out the `key` (S3 object key), not just publicUrl

      // ─── 2) Upload file to S3 ─────────────────────────────────
      const uploadRes = await fetch(uploadUrl, {
        method: "PUT",
        headers: { "Content-Type": file.type },
        body: file,
      });
      if (!uploadRes.ok) {
        throw new Error(`S3 upload failed: ${uploadRes.status}`);
      }

      // ─── 3) Create the game in your API ────────────────────────
      // Your Express POST /create expects JSON with gameName, description, coverImageKey
      const createRes = await fetch(`${address}/games/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          gameName: title,
          description,
          coverImageKey: key,
        }),
      });
      if (!createRes.ok) {
        const err = await createRes.json();
        throw new Error(err.error || "Failed to create game");
      }

      // ─── Success! ───────────────────────────────────────────────
      alert("Game added successfully!");
      setTitle("");
      setDescription("");
      setFile(null);
      onClose();

    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  //useEffect just to use Escspe key to get out of modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop overlay wraps everything */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40" />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div
          className="bg-cover bg-center bg-gray-800 text-white px-6 py-6 rounded-lg w-full max-w-md shadow-lg relative border border-orange-500 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] mx-4 sm:mx-auto"
          style={{ backgroundImage: "url('/images/forgexp-grid-bg.png')" }}
        >
          <button
            className="absolute top-2 right-3 text-gray-400 hover:text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]"
            onClick={onClose}
          >
            <X size={20} />
          </button>
          <h2 className="text-2xl font-bold mb-4 text-white">Add New Game</h2>
          <h3 className="text-sm font-bold mb-4 text-red-500">Make sure cover image is in vertical format</h3>
          <div className="mb-4">
            <label className="block mb-2 font-semibold">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Game title..."
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-700"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-semibold">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Game description..."
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-700"
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-semibold">
              Upload Game Image
            </label>
            <input
              type="file"
              accept="image/png, image/jpeg, image/jpg"
              onChange={handleFileChange}
              className="w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-700 file:text-white hover:file:bg-blue-600"
            />
            {fileError && (
              <p className="text-red-400 text-sm mt-2">{fileError}</p>
            )}
          </div>

          <div className="flex justify-end gap-4">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-orange-500 hover:bg-orange-400 rounded"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
