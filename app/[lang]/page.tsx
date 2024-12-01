import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="text-center space-y-6">
        <p className="text-lg text-gray-600 max-w-md mx-auto">
          Click below to visit our new and improved website
        </p>
        <Link
          href="https://www.tealcv.com"
          className="inline-block px-8 py-3 text-lg font-medium text-white bg-teal-600 rounded-lg hover:bg-teal-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
        >
          Visit www.tealcv.com
        </Link>
      </div>
    </main>
  );
}
