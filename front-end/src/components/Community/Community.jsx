import { useEffect, useState } from "react";

function Community() {
  const [postList, setPostList] = useState([])
  console.log(postList)
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
      {/* Your account page content goes here */}
    </div>
  );
}

export default Community;
