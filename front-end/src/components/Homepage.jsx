export default function Homepage() {
  return (
    <div className="bg-gray-900 min-h-[calc(100vh-64px)] flex flex-col justify-center items-center text-center px-6">
      <h2 className="text-4xl md:text-6xl font-extrabold md-6">
        Welcome to ForgeXP
      </h2>
      <p className="color-red text-lg md:text-xl max-w-2xl mb-8">
        {" "}
        Dive into game reviews, connect with fellow players, and explore the
        ultimate gaming experience hub.
      </p>
    </div>
  );
}
