export default function Loading() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00FF94] mx-auto"></div>
        <p className="text-[#00FF94] font-mono">Loading...</p>
      </div>
    </div>
  );
} 