import { useEffect, useState } from "react";
import UserCommCard from "./UserCommCard";

export default function Communities({ user }) {
  const [userCommunities, setUserCommunities] = useState(null);
  console.log("comm useState => ", userCommunities);

  useEffect(() => {
    setUserCommunities(user.communities);
  }, []);

  return (
    <div className="min-h-screen bg-gray-800 text-white px-6 py-10 max-w-5xl mx-auto">
      <h2 className="text-4xl font-bold mb-6 flex justify-center drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] pb-2">
        Your Communities
      </h2>

      <div className="flex flex-col gap-8">
        {userCommunities ? (
          userCommunities.map((comm) => (
            <div
              key={comm.id}
              className="bg-[#111827] border border-blue-700 rounded-xl p-6 shadow-[0_0_20px_#22d3ee60]"
            >
              <UserCommCard comm={comm} />
            </div>
          ))
        ) : (
          <div>Loading . . .</div>
        )}
      </div>
    </div>
  );
}
