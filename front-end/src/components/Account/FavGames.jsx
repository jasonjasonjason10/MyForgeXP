export default function FavoritePosts() {
  const dummyFavorites = [
    {
      id: 1,
      title: "Insane Boss Fight",
      description: "description",
      media:
        "https://i.ytimg.com/vi/D_iqjI2p7F4/maxresdefault.jpg", 
      postType: "video",
    },
    {
      id: 2,
      title: "Baldur's Cutscene Glory",
      description:"description",
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
    <div className="text-white p-6">
      <h3 className="text-2xl font-bold text-orange-300 mb-6 drop-shadow-md">
        Favorite Posts
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {dummyFavorites.map((post) => (
          <div
            key={post.id}
            className="bg-[#1a1a2e] border border-orange-400 rounded-xl overflow-hidden shadow-md hover:shadow-orange-400 transition duration-300"
          >
            {post.postType !== "text" && post.media && (
              <img
                src={post.media}
                alt={post.title}
                className="w-full h-40 object-cover"
              />
            )}

            <div className="p-4">
              <span className="text-xs uppercase text-orange-400 tracking-widest mb-1 block">
                {post.postType}
              </span>
              <h4 className="text-lg font-semibold text-orange-200 mb-1">
                {post.title}
              </h4>
              <p className="text-gray-300 text-sm">{post.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
