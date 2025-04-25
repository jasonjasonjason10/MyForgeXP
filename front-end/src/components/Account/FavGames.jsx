export default function FavoritePosts() {
  const dummyFavorites = [
    {
      id: 1,
      title: "Insane Boss Fight",
      description: "description",
      media: "https://i.ytimg.com/vi/D_iqjI2p7F4/maxresdefault.jpg",
      postType: "video",
    },
    {
      id: 2,
      title: "Baldur's Cutscene Glory",
      description: "description",
      media:
        "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1086940/header.jpg",
      postType: "image",
    },
    {
      id: 3,
      title: "Just Text",
      description: "description",
      postType: "text",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#0f172a] to-[#1a1a2e] text-white px-6 py-10 max-w-6xl mx-auto font-mono">
      <h3 className="text-4xl font-bold text-cyan-300 mb-10 border-b border-cyan-500 pb-2 drop-shadow-[0_0_10px_#22d3ee]">
        Favorite Posts
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {dummyFavorites.map((post) => (
          <div
            key={post.id}
            className="bg-[#111827] border border-cyan-500 rounded-2xl shadow-[0_0_15px_#22d3ee40] hover:shadow-cyan-400 transition duration-300"
          >
            {post.postType !== "text" && post.media && (
              <img
                src={post.media}
                alt={post.title}
                className="w-full h-40 object-cover rounded-t-2xl border-b border-cyan-600"
              />
            )}

            <div className="p-5">
              <span className="text-xs uppercase text-cyan-400 tracking-wider mb-1 block">
                {post.postType}
              </span>
              <h4 className="text-xl font-semibold text-cyan-200 mb-2 drop-shadow-sm">
                {post.title}
              </h4>
              <p className="text-cyan-100 text-sm">{post.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
