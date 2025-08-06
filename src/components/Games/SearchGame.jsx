import { useState } from "react";

export default function SearchGame({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <div className="flex justify-center mb-6">
      <input
        type="text"
        placeholder="Search games..."
        value={query}
        onChange={handleInputChange}
        className="px-4 py-2 w-80 border border-gray-400 rounded-md shadow focus:outline-none focus:ring-2 focus:ring-gray-400 bg-gray-900 text-white text-base"
      />
    </div>
  );
}
