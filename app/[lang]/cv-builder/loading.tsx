export default function Loading() {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Left side - PDF Preview skeleton */}
      <div className="w-full lg:w-1/2 hidden lg:flex flex-col bg-slate-200 h-screen">
        <div className="animate-pulse bg-slate-300 h-full m-4 rounded-lg"></div>
      </div>

      {/* Right side - Form skeleton */}
      <div className="w-full lg:w-1/2 h-screen overflow-y-auto p-2 lg:p-8">
        {/* Header skeleton */}
        <div className="flex justify-between items-center mb-6">
          <div className="h-8 w-32 bg-slate-200 rounded animate-pulse"></div>
          <div className="flex space-x-2">
            <div className="h-8 w-20 bg-slate-200 rounded animate-pulse"></div>
            <div className="h-8 w-20 bg-slate-200 rounded animate-pulse"></div>
          </div>
        </div>

        {/* Form sections skeleton */}
        {[...Array(6)].map((_, index) => (
          <div key={index} className="mb-8">
            <div className="h-6 w-40 bg-slate-200 rounded animate-pulse mb-4"></div>
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="h-10 bg-slate-200 rounded animate-pulse"
                ></div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Mobile preview button skeleton */}
      <div className="fixed bottom-4 right-4 lg:hidden z-10">
        <div className="h-10 w-32 bg-slate-200 rounded animate-pulse"></div>
      </div>
    </div>
  );
}
