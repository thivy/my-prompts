import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6 px-6">
      <div className="text-center space-y-4">
        <h1 className="text-6xl font-bold text-gray-300">404</h1>
        <h2 className="text-2xl font-medium text-gray-700">Category Not Found</h2>
        <p className="text-gray-600 max-w-md">
          The category you're looking for doesn't exist or may have been moved.
        </p>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-center"
        >
          Back to Home
        </Link>
        <Link
          href="/#categories"
          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-center"
        >
          Browse Categories
        </Link>
      </div>
    </div>
  );
}