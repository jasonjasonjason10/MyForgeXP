// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import GamePostCard from "./GamePostCard";

// export default function SingleGame() {
//   const { id } = useParams();
//   const [game, setGame] = useState(null)
//   const [posts, setPost] = useState(null)
//   const [userComm, setUserComms] = useState(null)
//   const [isUserSubbed, setIsUserSubbed] = useState(null)
//   const [clickCheck, setClickCheck] = useState(false)
//   console.log('user useState => ', isUserSubbed)
//   const address = 'http://localhost:3000/'

//   useEffect(() => {
//     async function fetchGame() {
//       const response = await fetch(`${address}games/${id}`)
//       const result = await response.json()
//       setGame(result.game)
//     }
//     async function fetchPost() {
//       const response = await fetch(`${address}post/game/${id}`)
//       const result = await response.json()
//       setPost(result.posts)
//     }
//     async function fetchUser() {
//       const response = await fetch(`${address}user/info`, {
//         headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}
//       })
//       const result = await response.json()
//       setUserComms(result.user.communities)
//     }
//     fetchGame()
//     fetchPost()
//     fetchUser()
//   },[clickCheck])

//   useEffect(() => {
//     if(userComm){
//       const subCheck = userComm.some(com => com.id === game.id)
//       setIsUserSubbed(subCheck)
//     }
//   },[userComm])

//   async function subHandle() {
//     const response = await fetch(`${address}user/join-game/${game.id}`, {
//       method: 'POST',
//       headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
//     })
//     const result = await response.json()
//     console.log(result)
//     setClickCheck(!clickCheck)
//   }
//   let subClass = 'p-6 bg-red-800'
//   if(isUserSubbed){
//     subClass = 'p-6 bg-green-800'
//   } else {
//     subClass = 'p-6 bg-red-800'
//   }

//   if (!game) {
//     return (
//       <div className="text-center mt-20 text-white text-xl">
//         Game not found.
//       </div>
//     );
//   }

//   return (
//     <div className="relative min-h-screen text-white overflow-hidden px-4 pt-10 max-w-4xl mx-auto">
//       <div className="bg-gray-900 rounded-lg p-6 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
//         <h2 className="text-3xl font-bold mb-4">{game.gameName}</h2>
//         <div className={subClass} onClick={subHandle}>
//           ~~FAVORITE GAME~~
//         </div>
//         <div>
//           <img src={`http://localhost:3000${game.coverImage}`} alt="" />
//         </div>
//         <div>
//           {game.description}
//         </div>
//       </div>
//         {posts ?
//         posts.map((post) => (
//           <div key={post.id}>
//             <GamePostCard post={post}/>
//           </div>
//         ))
//         : "loading . . ."
//       }
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import GamePostCard from "./GamePostCard";

export default function SingleGame() {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [posts, setPosts] = useState(null);
  const [userComm, setUserComms] = useState(null);
  const [isUserSubbed, setIsUserSubbed] = useState(null);
  const [clickCheck, setClickCheck] = useState(false);
  const [favorited, setFavorited] = useState(false);
  const [liked, setLiked] = useState(false);
  const navigate = useNavigate()
  const address = "http://localhost:3000/";

  useEffect(() => {
    async function fetchGame() {
      const response = await fetch(`${address}games/${id}`);
      const result = await response.json();
      setGame(result.game);
    }
    async function fetchPost() {
      const response = await fetch(`${address}post/game/${id}`);
      const result = await response.json();
      setPosts(result.posts);
    }
    async function fetchUser() {
      const response = await fetch(`${address}user/info`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const result = await response.json();
      setUserComms(result.user.communities);
    }
    fetchGame();
    fetchPost();
    fetchUser();
  }, [clickCheck]);

  useEffect(() => {
    if (userComm && game) {
      const subCheck = userComm.some((com) => com.id === game.id);
      setIsUserSubbed(subCheck);
    }
  }, [userComm, game]);

  async function subHandle() {
    const response = await fetch(`${address}user/join-game/${game.id}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    const result = await response.json();
    console.log(result);
    setClickCheck(!clickCheck);
  }

  if (!game) {
    return (
      <div className="text-center mt-20 text-white text-xl">
        Game not found.
      </div>
    );
  }

  return (
    <div className="relative min-h-screen text-white overflow-hidden px-4 pt-10 max-w-5xl mx-auto">
      <div className="bg-gray-900 rounded-lg p-8 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          {/* Cover Image */}
          <div className="flex-shrink-0">
            <img
              src={`http://localhost:3000${game.coverImage}`}
              alt="Game Cover"
              className="w-48 h-64 object-cover rounded-lg shadow-md transition-transform duration-300 hover:scale-110"
            />
          </div>

          {/* Game Info + Buttons */}
          <div className="flex flex-col justify-center gap-4">
            <h2 className="text-4xl font-bold">{game.gameName}</h2>

            <div className="flex flex-wrap gap-4">
              {/* Subscribe Button */}
              <button
                onClick={subHandle}
                className={`px-6 py-2 rounded-lg font-semibold transition
      ${
        isUserSubbed
          ? "bg-orange-500 hover:bg-orange-400 border border-blue-700 hover:border-blue-700"
          : " hover:bg-orange-500 border border-blue-700"
      }`}
              >
                {isUserSubbed ? " Subscribed" : " Subscribe"}
              </button>

              {/* Create Post Button */}
              <button className="px-6 py-2 bg-blue-500 hover:bg-blue-400 rounded-lg font-semibold transition">
                Create Post
              </button>
            </div>
          </div>
        </div>

        {/* Game Description */}
        <div className="mt-8">
          <h3 className="text-2xl font-semibold mb-2">About This Game</h3>
          <p className="text-gray-300">{game.description}</p>
        </div>
      </div>

      {/* Posts Section */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts ? (
          posts.map((post) => <GamePostCard key={post.id} post={post} />)
        ) : (
          <p className="text-center text-lg mt-6">Loading posts...</p>
        )}
      </div>
    </div>
  );
}
