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

  return (
    <div>
      <h1>Community page</h1>
      {/* {postList.map((post) => {
        if(post.postType === "text"){
          return <div>
            <h3>
              post.title
            </h3>
            <div>
              post.description
            </div>
          </div>
        }
      })} */}
    </div>
  );
}

export default Community;
