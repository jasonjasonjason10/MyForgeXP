import { useState } from "react";
import UserPostCard from "../Account/UserPostCard";
import SingleUserPost from "./SingleUserPost";
import SingleUserYoutubeCarousel from "./SingleUserYoutubeCarousel";

export default function SingleUserUploads({ userPosts, isAdmin }) {
  const [selectedPost, setSelectedPost] = useState(null);

  if (!userPosts) {
    return (
      <div className="text-center text-gray-300 mt-8">Loading uploads...</div>
    );
  }

  const youtubePosts = userPosts.filter(
    (post) =>
      post.content?.includes("youtube.com") ||
      post.content?.includes("youtu.be")
  );

  const nonYoutubePosts = userPosts.filter(
    (post) =>
      !post.content?.includes("youtube.com") &&
      !post.content?.includes("youtu.be")
  );

  return (
    <div className="min-h-screen bg-gray-800 text-white px-6 py-10 max-w-5xl mx-auto">
      <h2 className="text-4xl font-bold mb-8 flex justify-center drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
        Uploaded Posts
      </h2>

      {/* Single Post View */}
      {selectedPost ? (
        <SingleUserPost
        isAdmin={isAdmin}
          post={selectedPost}
          onBack={() => setSelectedPost(null)}
        />
      ) : (
        <>
          {/* YouTube Carousel */}
          {youtubePosts.length > 0 && (
            <SingleUserYoutubeCarousel
              youtubePosts={youtubePosts}
              setSelectedPost={setSelectedPost}
            />
          )}

          {/* Upload Grid */}
          {nonYoutubePosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {nonYoutubePosts.map((post) => (
                <div
                  key={post.id}
                  onClick={() => setSelectedPost(post)}
                  className="bg-[#111827] rounded-xl p-6 min-h-[320px] flex flex-col justify-between  cursor-pointer drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]"

                >
                  
                    <UserPostCard post={post} />
                
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-400 text-lg">
              No uploads yet!
            </div>
          )}
        </>
      )}
    </div>
  );
}
