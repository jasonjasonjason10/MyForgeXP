import { useState, useEffect } from "react";
import { X } from "lucide-react";

export default function EditGameDescriptionModal({ isOpen, onClose, currentDescription, onSave, game }) {
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (currentDescription) setDescription(currentDescription);
  }, [currentDescription]);

  const handleSave = async () => {
    onSave(description);
  };

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

          <h2 className="text-2xl font-bold mb-4">Edit Game Description</h2>

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Update description..."
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-700"
            rows="5"
          />

          <div className="flex justify-end gap-4 mt-4">
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
