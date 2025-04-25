export default function AccountDetails() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#0f172a] to-[#1a1a2e] text-white px-6 py-10 max-w-5xl mx-auto font-mono">
      <h2 className="text-4xl font-bold mb-10 text-cyan-300 tracking-wide drop-shadow-[0_0_10px_#22d3ee]">
        Your Profile
      </h2>

      {/* Bio Section */}
      <div className="bg-[#111827] border border-cyan-400 rounded-xl p-6 mb-10 shadow-[0_0_20px_#22d3ee50] hover:shadow-cyan-400 transition duration-300">
        <h3 className="text-2xl font-semibold text-cyan-200 mb-4 tracking-wider drop-shadow-[0_0_6px_#67e8f9]">
          Bio
        </h3>
        <p className="text-cyan-100 text-lg">
          creazy gammer.
        </p>
      </div>

      {/* Settings Section */}
      <div className="bg-[#111827] border border-purple-500 rounded-xl p-6 shadow-[0_0_20px_#9333ea50] hover:shadow-purple-400 transition duration-300">
        <h3 className="text-2xl font-semibold text-purple-300 mb-4 tracking-wider drop-shadow-[0_0_6px_#c084fc]">
          Settings
        </h3>
        <div className="flex flex-col gap-4 text-purple-100">
          <button className="hover:text-purple-400 transition duration-200">
          Change Password
          </button>
          <button className="hover:text-purple-400 transition duration-200">
          Account Settings
          </button>
          <hr className="border-purple-700 my-4" />
          <button className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-pink-600 hover:to-purple-500 px-5 py-2 rounded-md font-bold w-fit text-white tracking-wide transition duration-300">
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}
