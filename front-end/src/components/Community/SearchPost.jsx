import { useState } from "react";

export default function SearchPost({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <div className="flex justify-end mb-6">
      <input
        type="text"
        placeholder="Search posts..."
        value={query}
        onChange={handleChange}
        className="px-3 py-1 w-64 border border-gray-400 rounded-md shadow focus:outline-none focus:ring-2 focus:ring-gray-400 bg-gray-900 text-white text-sm"
      />
    </div>
  );
}
