

import React, { useState } from 'react'; 
import { Link, useNavigate } from 'react-router-dom';

function Navbar({ 
  search, 
  setSearch, 
  locationFilter, 
  setLocationFilter, 
  courseFilter, 
  setCourseFilter,
  selectedCount,
  selectedIds,
  clearSelection,
  colleges = [] 
}) {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);

    if (value.trim().length > 1) {
      const filtered = colleges
        .filter(c => 
          c.name.toLowerCase().includes(value.toLowerCase()) ||
          c.location.toLowerCase().includes(value.toLowerCase())
        )
        .slice(0, 5);
      
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleLogoClick = () => {
    setSearch('');
    setLocationFilter('');
    setCourseFilter('');
    setShowSuggestions(false);
    if (clearSelection) {
      clearSelection();
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-slate-200 py-4 px-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Logo Section */}
        <Link 
          to="/" 
          onClick={handleLogoClick}
          className="flex items-center gap-3 min-w-max group transition-all"
        >
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-200 group-hover:rotate-12 transition-transform">
              <span className="text-xl text-white">🏫</span>
          </div>
          <div>
            <h1 className="text-xl font-black text-slate-900 tracking-tighter leading-none">CollegeDiscovery</h1>
            <p className="text-[10px] text-blue-600 font-black uppercase tracking-[0.2em] mt-1">Explore Top Campuses</p>
          </div>
        </Link>

        {/* Filter & Action Section */}
        <div className="flex flex-1 flex-col md:flex-row items-center gap-3 w-full">
          
          {/* SEARCH BAR WITH ICON */}
          <div className="relative w-full group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg 
                className="h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2.5} 
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                />
              </svg>
            </div>

            <input
              className="w-full pl-12 pr-10 py-3 rounded-2xl bg-slate-100 border-2 border-transparent 
              focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-sm font-medium text-slate-700 shadow-inner"
              placeholder="Search for Colleges..."
              value={search}
              spellCheck="false" 
              autoComplete="off" 
              onChange={handleSearchChange} 
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              onFocus={() => search.length > 1 && setShowSuggestions(true)}
            />

            {search && (
              <button 
                onClick={() => {
                  setSearch('');
                  setShowSuggestions(false);
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            )}

            {/* Autocomplete Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-50">
                {suggestions.map((college) => (
                  <div
                    key={college.id}
                    onMouseDown={(e) => {
                      // Using onMouseDown prevents the onBlur from firing first
                      e.preventDefault();
                      
                      // 1. Update states to isolate this college
                      setSearch(college.name); 
                      setLocationFilter(''); 
                      setCourseFilter('');
                      
                      // 2. Clear UI state
                      setShowSuggestions(false);
                      
                      // 3. Navigate home to trigger the fresh API call
                      navigate('/'); 
                    }}
                    className="px-5 py-3 hover:bg-blue-50 cursor-pointer flex justify-between items-center group/item transition-colors"
                  >
                    <div>
                      <div className="font-bold text-slate-800 group-hover/item:text-blue-600">
                        {college.name}
                      </div>
                      <div className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">
                        {college.location}
                      </div>
                    </div>
                    <span className="text-slate-300 group-hover/item:translate-x-1 transition-transform">→</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            {/* Location Select */}
            <select
              className="w-full md:w-40 px-4 py-3 rounded-2xl bg-slate-100 border-none text-[11px] font-black uppercase tracking-wider text-slate-500 outline-none cursor-pointer hover:bg-slate-200 transition-colors"
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
            >
              <option value="">All Locations</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Delhi">Delhi</option>
              <option value="Bangalore">Bangalore</option>
              <option value="Kolkata">Kolkata</option>
              <option value="Ahmedabad">Ahmedabad</option>
              <option value="Noida">Noida</option>
              <option value="Chennai">Chennai</option>
              
              <option value="Hyderabad">Hyderabad</option>
              <option value="Pune">Pune</option>
              

            </select>

            {/* Course Select */}
            <select
              className="w-full md:w-40 px-4 py-3 rounded-2xl bg-slate-100 border-none text-[11px] font-black uppercase tracking-wider text-slate-500 outline-none cursor-pointer hover:bg-slate-200 transition-colors"
              value={courseFilter}
              onChange={(e) => setCourseFilter(e.target.value)}
            >
              <option value="">All Courses</option>
              <option value="B.Tech">B.Tech</option>
              <option value="MBA">MBA</option>
              <option value="MBBS">MBBS</option>
              <option value="LLB">LLB</option>
              <option value="B.Des">B.Des</option>
              <option value="B.Com">B.Com</option>
            </select>

            {selectedCount >= 2 && (
              <Link
                to={`/compare?ids=${selectedIds.join(",")}`}
                className="relative overflow-hidden flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold text-xs shadow-xl shadow-blue-300/50 hover:bg-blue-700 hover:-translate-y-0.5 transition-all active:scale-95 whitespace-nowrap animate-in slide-in-from-right-8 duration-500 group"
              >
                <span className="relative z-10">Compare</span>
                <span className="relative z-10 bg-white/20 px-2 py-0.5 rounded-lg text-[10px]">
                  {selectedCount}
                </span>
                <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white/20 opacity-40 group-hover:animate-shine" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
