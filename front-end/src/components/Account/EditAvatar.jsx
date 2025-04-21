import { useEffect, useState } from "react";
import { X } from "lucide-react";

export default function EditAvatar({ isOpen, onClose, onSave }) {
  const [avatarUrl, setAvatarUrl] = useState("");
  const [file, setFile] = useState(null);

  // Close modal with ESC key!
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center bg-center bg-cover"
      style={{ backgroundImage: "url('/images/forgexp-grid-bg.png')" }}
    >
      <div className="bg-gray-800 text-white p-6 rounded-lg w-full max-w-md shadow-lg relative drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
        {/* Close button with Lucide icon */}
        <button
          className="absolute top-2 right-3 text-gray-400 hover:text-white"
          onClick={onClose}
        >
          <X size={20} />
        </button>

        <h2 className="text-2xl font-bold mb-4 text-orange-400">Edit Avatar</h2>

        {/* Avatar URL input */}
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Avatar URL</label>
          <input
            type="text"
            value={avatarUrl}
            onChange={(e) => setAvatarUrl(e.target.value)}
            placeholder="Paste image URL..."
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        {/* File upload input */}
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-400"
          />
        </div>

        {/* Action buttons */}
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave({ avatarUrl, file })}
            className="px-4 py-2 bg-orange-500 hover:bg-orange-400 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
