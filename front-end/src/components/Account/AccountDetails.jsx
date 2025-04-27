export default function AccountDetails({ user }) {
  return (
    <div className="min-h-screen bg-gray-800 text-white px-6 py-10 max-w-5xl mx-auto ">
      <h2 className="text-4xl font-bold mb-6  flex justify-center drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] pb-2]">
        My Profile
      </h2>

      {/* Bio Section */}
      <div className="bg-[#111827] border border-blue-700 rounded-xl p-3 mb-10 shadow-[0_0_20px_#22d3ee60] ">
        <h3 className="text-xl  font-bold flex justify-center  ">Bio</h3>
        <br />
        <p className="text-white">{user.bio}</p>
      </div>

      {/* Settings Section */}
      <div className="bg-[#111827] border border-blue-700 rounded-xl p-6 shadow-[0_0_20px_#9333ea50] ">
        <h3 className="text-xl  font-bold flex justify-center mb-4  ">
          Settings
        </h3>
        <div className="flex flex-col gap-4 text-purple-100">
          <button className="hover:text-purple-400 transition duration-200">
            Account Settings
          </button>
          <hr className="border-orange-500 my-4" />
          <button className="border border-blue-700 shadow-[0_0_20px_#22d3ee60] hover:shadow-blue-700 duration-300 px-5 py-2 rounded-md font-bold w-fit text-white ">
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}
