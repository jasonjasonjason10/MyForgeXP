import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GamePostCard from "./GamePostCard";

export default function SingleGame() {
  const { id } = useParams();
  const [game, setGame] = useState(null)
  const [posts, setPost] = useState(null)
  const [userComm, setUserComms] = useState(null)
  const [isUserSubbed, setIsUserSubbed] = useState(null)
  const [clickCheck, setClickCheck] = useState(false)
  console.log('user useState => ', isUserSubbed)
  const address = 'http://localhost:3000/'

  useEffect(() => {
    async function fetchGame() {
      const response = await fetch(`${address}games/${id}`)
      const result = await response.json()
      setGame(result.game)
    }
    async function fetchPost() {
      const response = await fetch(`${address}post/game/${id}`)
      const result = await response.json()
      setPost(result.posts)
    }
    async function fetchUser() {
      const response = await fetch(`${address}user/info`, {
        headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}
      })
      const result = await response.json()
      setUserComms(result.user.communities)
    }
    fetchGame()
    fetchPost()
    fetchUser()
  },[clickCheck])

  useEffect(() => {
    if(userComm){
      const subCheck = userComm.some(com => com.id === game.id)
      setIsUserSubbed(subCheck)
    }
  },[userComm])


  async function subHandle() {
    const response = await fetch(`${address}user/join-game/${game.id}`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
    const result = await response.json()
    console.log(result)
    setClickCheck(!clickCheck)
  }
  let subClass = 'p-6 bg-red-800'
  if(isUserSubbed){
    subClass = 'p-6 bg-green-800'
  } else {
    subClass = 'p-6 bg-red-800'
  }

  if (!game) {
    return (
      <div className="text-center mt-20 text-white text-xl">
        Game not found.
      </div>
    );
  }

  return (
    <div className="relative min-h-screen text-white overflow-hidden px-4 pt-10 max-w-4xl mx-auto">
      <div className="bg-gray-900 rounded-lg p-6 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
        <h2 className="text-3xl font-bold mb-4">{game.gameName}</h2>
        <div className={subClass} onClick={subHandle}>
          ~~FAVORITE GAME~~
        </div>
        <div>
          <img src={`http://localhost:3000${game.coverImage}`} alt="" />
        </div>
        <div>
          {game.description}
        </div>
      </div>
        {posts ? 
        posts.map((post) => (
          <div key={post.id}>
            <GamePostCard post={post}/>
          </div>
        ))
        : "loading . . ."
      }
    </div>
  );
}
