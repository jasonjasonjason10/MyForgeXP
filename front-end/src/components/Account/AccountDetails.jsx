export default function AccountDetails({ user }) {
  return (
    <div className="min-h-screen text-white px-4 py-10 max-w-4xl mx-auto">
      {/* Profile Heading */}
      <h2 className="text-4xl font-bold text-center mb-10 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
        My Profile
      </h2>

      {/* Bio Section */}
      <div className="bg-[#0f172a] border border-blue-700 rounded-xl p-6 mb-10 shadow-[0_0_20px_#22d3ee60]">
        <h3 className="text-2xl font-semibold text-center mb-4 text-blue-400 drop-shadow-[0_0_5px_rgba(59,130,246,0.5)]">
          Bio
        </h3>
        <p className="text-gray-300 text-center whitespace-pre-wrap">
          {user.bio || "No bio available. Update your profile!"}
        </p>
      </div>

      {/* Settings Section */}
      <div className="bg-[#0f172a] border border-purple-700 rounded-xl p-6 shadow-[0_0_20px_#9333ea50]">
        <h3 className="text-2xl font-semibold text-center mb-6 text-purple-400 drop-shadow-[0_0_5px_rgba(147,51,234,0.5)]">
          Settings
        </h3>

        <div className="flex flex-col gap-6">
          <button className="px-5 py-3 border border-blue-700 rounded-lg text-white font-bold hover:bg-blue-700 hover:shadow-[0_0_10px_#22d3ee80] transition duration-300">
            Account Settings
          </button>

          <button className="px-5 py-3 border border-red-600 rounded-lg text-white font-bold hover:bg-red-700 hover:shadow-[0_0_10px_#f8717180] transition duration-300">
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}
