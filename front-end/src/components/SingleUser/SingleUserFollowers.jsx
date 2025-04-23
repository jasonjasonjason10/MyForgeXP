import { useState } from "react";

export default function SingleUserFollowers() {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="relative">
      <div className="flex justify-end mb-4">
        <div className="relative">
          <button
            onClick={() => setShowDropdown((prev) => !prev)}
            className="text-gray-400 hover:text-white text-xl px-2"
            title="More options"
          >
            ⋯
          </button>
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-40 bg-gray-800 border border-blue-500 rounded shadow-lg z-10">
              <p className="px-4 py-2 text-sm text-white hover:bg-gray-700 cursor-pointer transition">
                Edit Following: somehow select to remove
              </p>
            </div>
          )}
        </div>
      </div>

      <div>
        <p>This user's followers will be shown here.</p>
      </div>
    </div>
  );
}
