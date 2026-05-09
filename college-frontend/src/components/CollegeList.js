

import React from 'react';
import { Link } from 'react-router-dom';
import CollegeSkeleton from './CollegeSkeleton'; 

function CollegeList({ 
  colleges, 
  loading, 
  selectedColleges, 
  setSelectedColleges 
}) {

  const handleCompareSelect = (id) => {
    setSelectedColleges((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }
      if (prev.length < 3) {
        return [...prev, id];
      }
      return prev;
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12">
      {/* Results Header */}
      <div className="max-w-7xl mx-auto mb-8 flex justify-between items-center">
        <p className="text-slate-500 font-medium">
          {loading ? (
            "Finding the best colleges..."
          ) : (
            <>Showing <span className="text-slate-900 font-bold">{colleges.length}</span> results</>
          )}
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* LOADING STATE: Show Skeletons */}
        {loading ? (
          [...Array(6)].map((_, i) => <CollegeSkeleton key={i} />)
        ) : colleges.length > 0 ? (
          /*  Show Cards */
          colleges.map((c) => (
            <div
              key={c.id}
              className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 hover:shadow-2xl hover:shadow-blue-200/50 hover:border-blue-100 transition-all duration-500 hover:-translate-y-2 group flex flex-col"
            >
              <Link to={`/college/${c.id}`} className="flex-grow">
                <div className="flex flex-col h-full">
                  <div className="mb-6">
                    <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                      <span className="text-3xl">🏫</span>
                    </div>
                    <h2 className="text-2xl font-bold text-slate-800 mb-3 group-hover:text-blue-600 transition-colors">
                      {c.name}
                    </h2>
                    <div className="flex flex-wrap gap-2 text-sm font-bold">
                      <span className="px-3 py-1.5 bg-slate-100 text-slate-500 rounded-xl">📍 {c.location}</span>
                      <span className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-xl">🎓 {c.course}</span>
                    </div>
                  </div>

                  <div className="mt-auto pt-6 border-t border-slate-50 flex justify-between items-center">
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Annual Fees</p>
                      <p className="text-2xl font-black text-slate-900">
                        ₹{Number(c.fees).toLocaleString('en-IN')}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-700 px-4 py-2 rounded-2xl font-black border border-amber-100">
                        {c.rating} ★
                      </div>
                    </div>
                  </div>
                </div>
              </Link>

              <div className="mt-5 pt-4 border-t border-slate-100">
                <label className="flex items-center gap-3 text-sm font-bold text-slate-700 cursor-pointer group/label">
                  <input
                    type="checkbox"
                    checked={selectedColleges.includes(c.id)}
                    onChange={() => handleCompareSelect(c.id)}
                    className="w-5 h-5 rounded-lg border-slate-300 text-blue-600 focus:ring-blue-500 transition-all cursor-pointer"
                  />
                  <span className={`transition-colors ${selectedColleges.includes(c.id) ? "text-blue-600" : "text-slate-500 group-hover/label:text-slate-800"}`}>
                    {selectedColleges.includes(c.id) ? "Added to Compare" : "Compare College"}
                  </span>
                </label>
              </div>
            </div>
          ))
        ) : (
          /* 3. EMPTY STATE: Show Error Message */
          <div className="col-span-full bg-white rounded-[3rem] p-20 border-4 border-dashed border-slate-100 text-center">
            <div className="text-6xl mb-6">🏜️</div>
            <p className="text-slate-400 text-2xl font-bold">No colleges match your criteria.</p>
            <p className="text-slate-400 mt-2">Try adjusting the filters in the search bar above.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default CollegeList;
