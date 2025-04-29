import { useState, useEffect } from "react";
import { X } from "lucide-react";

export default function EditGameCoverModal({ isOpen, onClose, onSave }) {
  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    const acceptedTypes = ["image/png", "image/jpeg", "image/jpg"];

    if (selectedFile && !acceptedTypes.includes(selectedFile.type)) {
      setFileError("Unsupported file type. Please upload JPG or PNG.");
      return;
    }

    setFile(selectedFile);
    setFileError("");
  };

  const handleSave = () => {
    if (file) {
      onSave(file); // Backend can accept FormData
    }
  };

  useEffect(() => {
    const esc = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", esc);
    return () => document.removeEventListener("keydown", esc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40" />
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div
          className="bg-gray-800 text-white px-6 py-6 rounded-lg w-full max-w-md shadow-lg relative border border-orange-500 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] mx-4 sm:mx-auto"
          style={{ backgroundImage: "url('/images/forgexp-grid-bg.png')" }}
        >
          <button
            className="absolute top-2 right-3 text-gray-400 hover:text-white"
            onClick={onClose}
          >
            <X size={20} />
          </button>

          <h2 className="text-2xl font-bold mb-4">Edit Game Cover</h2>

          <div className="mb-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-700 file:text-white hover:file:bg-blue-400"
            />
            {fileError && <p className="text-red-400 mt-2">{fileError}</p>}
          </div>

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
