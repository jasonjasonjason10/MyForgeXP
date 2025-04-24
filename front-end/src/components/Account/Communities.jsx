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
    <div className="text-white p-6 max-w-4xl mx-auto">
      <h3 className="text-3xl font-bold mb-6 text-orange-300 border-b border-orange-400 pb-2">
        Communities You've Joined
      </h3>

      <div className="space-y-6">
        {communities.map((comm) => (
            <div
            key={comm.id}
            className="bg-[#1a1a2e] rounded-xl p-5 border border-orange-500 shadow-md"
          >
            <div className="flex gap-4 items-start">
              <img
                src={comm.coverImage}
                alt={comm.gameName}
                className="w-24 h-24 object-cover rounded-md border border-orange-300"
              />

              <div className="flex-1">
                <h4 className="text-xl font-semibold text-orange-200 mb-1">
                  {comm.gameName}
                </h4>
                <p className="text-orange-100 text-sm mb-2">
                  {comm.description || "No description available."}
                </p>


                <p className="text-sm text-orange-100">
                  Posts: 3 · Likes: 12 · Comments: 5
                </p>

                <button className="mt-3 text-sm font-semibold text-orange-400 hover:text-orange-300 hover:underline transition">
                  View Community Page →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
