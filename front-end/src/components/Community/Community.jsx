import { useEffect, useState } from "react";

function Community() {
  const [postList, setPostList] = useState([])
  console.log(postList) // ----delete when complete----

  useEffect(() => {
    async function fetchPostList() {
      const response = await fetch('http://localhost:3000/post/all')
      const result = await response.json()
      setPostList(result.post)
    }
    fetchPostList()
  },[])

  async function likeHandle() {
    const response = await fetch(`http://localhost:3000/post/${}/like`)
  }

  return (
    <div className="min-h-screen text-white px-4 py-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-10 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
          Community Page
        </h1>
  
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-auto">
          {postList.map((post) => (
            <div
              key={post.id}
              className="bg-[#13294b] border border-blue-500 rounded-2xl shadow-lg p-5 flex flex-col justify-between">
              <h3 className="text-xl font-semibold text-orange-400 mb-2 drop-shadow-[0_0_5px_rgba(255,165,0,0.3)]">
                {post.title}
              </h3>
  
              <div className="text-gray-300 mb-4 break-words whitespace-pre-wrap">
                {post.description}
              </div>
  
              <div className="text-sm text-blue-300 mt-auto" onClick={likeHandle}>
                Likes: <span className="font-semibold text-white">{post.likes}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}  

export default Community;
