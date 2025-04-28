export default function SinglePost({ post, goBack }) {
    let contentPath = post.content;
  
    function extractId(contentPath) {
      const findId = /(?:youtube\.com.*(?:\?|&)v=|youtu\.be\/)([^&\n?#]+)/;
      const match = contentPath.match(findId);
      return match ? match[1] : null;
    }
  
    function postContent(contentPath) {
      if (contentPath.startsWith("http://") || contentPath.startsWith("https://")) {
        const videoId = extractId(contentPath);
        return (
          <iframe
            className="w-full h-[400px] rounded-lg"
            src={`https://www.youtube.com/embed/${videoId}`}
            allowFullScreen
          ></iframe>
        );
      }
  
      return (
        <video
          className="w-full h-[400px] rounded-lg"
          controls
          src={`http://localhost:3000${contentPath}`}
        ></video>
      );
    }
  
    return (
      <div className="bg-[#111827] p-6 rounded-xl shadow-lg flex flex-col items-center">
        <button
          onClick={goBack}
          className="self-start mb-6 px-4 py-2 bg-orange-500 hover:bg-orange-400 rounded-md text-sm font-semibold"
        >
          ← Back to Uploads
        </button>
  
        <h2 className="text-3xl font-bold text-orange-400 mb-6">{post.title}</h2>
  
        <p className="text-gray-300 mb-6 text-center">{post.description}</p>
  
        {/* Media */}
        {post.PostType === "image" && (
          <img
            className="rounded-lg object-cover max-h-[400px] w-full"
            src={`http://localhost:3000${contentPath}`}
            alt="Post content"
          />
        )}
  
        {post.PostType === "video" && (
          <div className="w-full flex justify-center">
            {postContent(contentPath)}
          </div>
        )}
      </div>
    );
  }
  