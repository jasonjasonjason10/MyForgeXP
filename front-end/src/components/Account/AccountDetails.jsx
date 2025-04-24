export default function AccountDetails() {
  return (
    <div className="min-h-screen bg-black text-white p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-orange-300 mb-6 border-b border-orange-400 pb-2">
        Your Profile Info
      </h2>

      {/* bio */}
      <div className="bg-[#1a1a2e] rounded-xl p-5 mb-6 border border-orange-400 shadow-md">
        <h3 className="text-xl font-semibold text-orange-300 mb-4">Bio</h3>
        <p className="text-orange-100 leading-relaxed">
          creazy gammer.
        </p>
      </div>

      {/* account setting */}
      <div className="bg-[#1a1a2e] rounded-xl p-5 border border-orange-400 shadow-md">
        <h3 className="text-xl font-semibold text-orange-300 mb-4">Settings</h3>
        <div className="flex flex-col gap-3 text-orange-100">
          <button className="hover:text-orange-400 text-left">Change Password</button>
          <button className="hover:text-orange-400 text-left">Account Settings</button>
          <hr className="border-gray-600 my-2" />
          <button className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded text-white font-semibold w-fit">
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}
