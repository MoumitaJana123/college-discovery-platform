import React from 'react';

const CollegeSkeleton = () => {
  return (
    <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 animate-pulse">
      {/* Image Placeholder */}
      <div className="w-full h-48 bg-slate-200 rounded-2xl mb-4"></div>
      
      {/* Title Placeholder */}
      <div className="h-6 bg-slate-200 rounded-full w-3/4 mb-3"></div>
      
      {/* Location Placeholder */}
      <div className="h-4 bg-slate-100 rounded-full w-1/2 mb-6"></div>
      
      {/* Button/Footer Placeholder */}
      <div className="flex justify-between items-center pt-4 border-t border-slate-50">
        <div className="h-4 bg-slate-100 rounded-full w-20"></div>
        <div className="h-8 bg-slate-200 rounded-xl w-24"></div>
      </div>
    </div>
  );
};

export default CollegeSkeleton;
