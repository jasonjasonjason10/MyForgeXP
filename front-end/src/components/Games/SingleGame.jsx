import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GamePostCard from "./GamePostCard";

export default function SingleGame() {
  const { id } = useParams();
  const [game, setGame] = useState(null)
  const [posts, setPost] = useState(null)
  console.log('posts useState => ', posts)

  useEffect(() => {
    const address = 'http://localhost:3000/'
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
    fetchGame()
    fetchPost()
  },[])

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
