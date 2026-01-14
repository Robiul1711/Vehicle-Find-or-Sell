const DasCarCardSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden animate-pulse">
      {/* Image */}
      <div className="w-full h-64 bg-gray-200" />

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Title row */}
        <div className="flex justify-between items-center">
          <div className="h-5 w-32 bg-gray-200 rounded" />
          <div className="flex gap-2">
            <div className="h-4 w-4 bg-gray-200 rounded-full" />
            <div className="h-4 w-4 bg-gray-200 rounded-full" />
            <div className="h-4 w-4 bg-gray-200 rounded-full" />
          </div>
        </div>

        {/* Subtitle */}
        <div className="h-4 w-48 bg-gray-200 rounded" />

        {/* Features */}
        <div className="flex justify-between border-t border-b py-3 mt-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <div className="h-6 w-6 bg-gray-200 rounded-full" />
              <div className="h-3 w-10 bg-gray-200 rounded" />
            </div>
          ))}
        </div>

        {/* Price */}
        <div className="h-6 w-24 bg-gray-200 rounded mt-2" />

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-2 mt-3">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-9 bg-gray-200 rounded-lg"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DasCarCardSkeleton;
