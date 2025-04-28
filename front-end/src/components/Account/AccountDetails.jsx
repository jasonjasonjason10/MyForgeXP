export default function AccountDetails({ user }) {
  return (
    <div className="min-h-screen text-white px-4 py-10 max-w-4xl mx-auto">
      {/* Profile Heading */}
      <h2 className="border-b border-orange-500 text-4xl font-bold text-center mb-10 pb-4 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
        My Profile
      </h2>

      {/* Bio Section */}
      <div className="   p-6 mb-10 ">
        <h3 className="text-2xl font-semibold text-center mb-4 text-white drop-shadow-[0_0_5px_rgba(59,130,246,0.5)]">
          Bio
        </h3>
        <p className="text-gray-300 text-center whitespace-pre-wrap">
          {user.bio || "No bio available. Update your profile!"}
        </p>
      </div>
    </div>
  );
}
