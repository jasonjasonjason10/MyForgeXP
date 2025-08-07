import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { address } from "../../../address";

export default function EditAvatar({ isOpen, onClose, onSave }) {
  const [avatarUrl, setAvatarUrl] = useState("");
  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState("");
  const [preview, setPreview] = useState("");

  // build a preview whenever the file or avatarUrl changes
  useEffect(() => {
    let objectUrl;

    if (file) {
      objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
    } else {
      setPreview(avatarUrl);
    }

    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [file, avatarUrl]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    const accepted = ["image/png", "image/jpeg", "image/jpg"];

    if (selectedFile && !accepted.includes(selectedFile.type)) {
      setFileError("Unsupported file type. Please upload JPG or PNG.");
      setFile(null);
      return;
    }

    setFileError("");
    setFile(selectedFile);
    setAvatarUrl("");
  };

  const handleSave = async () => {
    try {
      let payload;
      let headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      };

      if (file) {
        payload = new FormData();
        payload.append("avatar", file);
        // Do NOT set headers manually for multipart/form-data
      } else if (avatarUrl) {
        payload = JSON.stringify({ avatarUrl });
        headers["Content-Type"] = "application/json";
      } else {
        setFileError("Please supply either a URL or choose a file.");
        return;
      }

      const res = await fetch(`${address}/user/avatar`, {
        method: "PATCH",
        ...(file
          ? { body: payload, headers: { Authorization: headers.Authorization } }
          : { body: payload, headers }),
      });

      const result = await res.json();

      if (!res.ok) {
        console.error("Avatar update failed:", result.error || result);
        setFileError(result.error || "Upload failed");
        return;
      }

      onSave(result.avatar || avatarUrl); // Use correct property
      onClose();
    } catch (err) {
      console.error(err);
      setFileError("Unexpected error. Please try again.");
    }
  };

  // Close on ESC
  useEffect(() => {
    const handler = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40" />
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div
          className="bg-cover bg-center bg-gray-800 text-white p-6 rounded-lg w-full max-w-md shadow-lg relative border border-orange-500 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]"
          style={{ backgroundImage: "url('/images/forgexp-grid-bg.png')" }}
        >
          <button
            className="absolute top-2 right-3 text-gray-400 hover:text-white"
            onClick={onClose}
          >
            <X size={20} />
          </button>
          <h2 className="text-2xl font-bold mb-4 drop-shadow-lg">
            Edit Avatar
          </h2>

          {/* Preview */}
          {preview && (
            <div className="mb-4">
              <img
                src={preview}
                alt="Avatar preview"
                className="w-24 h-24 rounded-full object-cover mx-auto"
              />
            </div>
          )}

          {/* URL input */}
          <div className="mb-4">
            <label className="block mb-2 font-semibold">Avatar URL</label>
            <input
              type="text"
              value={avatarUrl}
              onChange={(e) => {
                setAvatarUrl(e.target.value);
                setFile(null);
              }}
              placeholder="Paste image URL..."
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-700"
            />
          </div>

          {/* File upload */}
          <div className="mb-4">
            <label className="block mb-2 font-semibold">Upload Image</label>
            <input
              type="file"
              accept="image/png,image/jpeg"
              onChange={handleFileChange}
              className="w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-700 file:text-white hover:file:bg-blue-400"
            />
            {fileError && (
              <p className="text-red-400 text-sm mt-2">{fileError}</p>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-4">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-orange-500 hover:bg-orange-400 rounded"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
