import React from "react";

function Loading() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-cream-200">
      <div className="w-16 h-16 border-8 border-cream-300 border-t-cream-500 rounded-full animate-spin"></div>
    </div>
  );
}

export default Loading;
