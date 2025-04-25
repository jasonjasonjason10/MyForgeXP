export default function Communities() {
  const communities = [
    {
      gameName: "Elden Ring",
      description: "description",
      coverImage: "https://i.ebayimg.com/images/g/9owAAOSww4RiKBzU/s-l400.jpg",
    },
    {
      gameName: "Baldur's Gate 3",
      description: "description",
      coverImage:
        "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1086940/7f3af383a3afa12f0835db4496c7630f62ab6369/capsule_616x353.jpg",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#0f172a] to-[#1a1a2e] text-white px-6 py-10 max-w-5xl mx-auto font-mono">
      <h3 className="text-4xl font-bold mb-10 text-cyan-300 tracking-wide drop-shadow-[0_0_10px_#22d3ee]">
        Your Communities
      </h3>

      <div className="space-y-8">
        {communities.map((comm, index) => (
          <div
            key={index}
            className="bg-[#111827] border border-cyan-500 rounded-2xl shadow-[0_0_15px_#22d3ee40] hover:shadow-cyan-400 transition duration-300 p-6"
          >
            <div className="flex gap-6 items-start">
              <img
                src={comm.coverImage}
                alt={comm.gameName}
                className="w-28 h-28 object-cover rounded-lg border border-cyan-300 shadow-inner"
              />

              <div className="flex-1">
                <h4 className="text-2xl font-semibold text-cyan-200 mb-2 drop-shadow-[0_0_6px_#67e8f9]">
                  {comm.gameName}
                </h4>
                <p className="text-cyan-100 text-sm mb-3">
                  {comm.description || "No description available."}
                </p>

                <p className="text-sm text-cyan-200 font-light">
                  Posts: 3 · Likes: 12 · Comments: 5
                </p>

                <button className="mt-4 text-sm font-bold text-cyan-300 hover:text-white hover:underline tracking-wide transition">
                  Enter Community →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
