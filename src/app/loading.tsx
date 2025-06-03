export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 animate-gradient-x">
      <p className="text-4xl font-extrabold text-white tracking-wide animate-pulse">
        Loading <span className="text-yellow-300">...</span>
      </p>
    </div>
  );
}
