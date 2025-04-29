import UserFavCard from "./UserFavCard";

export default function Favorites({ user }) {
  const favoritePosts = user?.favorites || [];

  if (favoritePosts.length === 0) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-400">
        No favorites yet.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
      {favoritePosts.map((post) => (
        <div key={post.id} className="bg-gray-900 border border-blue-700 rounded-2xl shadow-lg p-5 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
          <UserFavCard post={post} />
        </div>
      ))}
    </div>
  );
}



