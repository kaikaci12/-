import React from "react";

function Loading() {
  return (
    <div className="min-h-screen p-4">
      {/* Header mimicking the menu UI */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Menu</h1>
          <div className="w-24 h-8 bg-gray-200 rounded-md animate-pulse"></div>
        </div>

        {/* Category tabs */}
        <div className="flex space-x-4 mb-8">
          {["ALL", "Breakfast", "Lunch", "Dessert", "Drinks"].map(
            (category) => (
              <div
                key={category}
                className="px-3 py-1 bg-gray-200 rounded-full animate-pulse"
              >
                <span className="opacity-0">{category}</span>
              </div>
            )
          )}
        </div>
      </div>

      {/* Loading spinner and skeleton items */}
      <div className="flex flex-col items-center justify-center space-y-8">
        {/* Spinner */}
        <div className="w-12 h-12 border-4 border-gray-300 border-t-primary rounded-full animate-spin"></div>

        {/* Skeleton menu items */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="flex justify-between items-center p-4 bg-gray-100 rounded-lg"
            >
              <div className="space-y-2">
                <div className="w-32 h-6 bg-gray-200 rounded animate-pulse"></div>
                <div className="w-16 h-5 bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div className="w-16 h-8 bg-gray-200 rounded-md animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Loading;
