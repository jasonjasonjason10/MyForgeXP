import { useEffect, useState } from "react";
import UserCommCard from "./UserCommCard";

export default function Communities({user}) {
  const [userCommunities, setUserCommunities] = useState(null)
  console.log("comm useState => ", userCommunities);
  
  useEffect(() => {
    setUserCommunities(user.communities)
  },[])

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#0f172a] to-[#1a1a2e] text-white px-6 py-10 max-w-5xl mx-auto font-mono">
      <h3 className="text-4xl font-bold mb-10 text-cyan-300 tracking-wide drop-shadow-[0_0_10px_#22d3ee]">
        Your Communities
      </h3>

      <div className="space-y-8">
        {userCommunities ? 
        userCommunities.map((comm) => (
          <div
            key={comm.id}
            className="bg-[#111827] border border-cyan-500 rounded-2xl shadow-[0_0_15px_#22d3ee40] hover:shadow-cyan-400 transition duration-300 p-6"
          >
            <UserCommCard comm={comm} />
          </div>
        ))
        : <div>loading . . .</div>
      }
      </div>
    </div>
  );
}
