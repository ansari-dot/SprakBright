import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#0098da]"></div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default LoadingSpinner;
