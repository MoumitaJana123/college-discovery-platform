import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CollegeList from './components/CollegeList';
import CollegeDetail from './components/CollegeDetail';
import ComparePage from './components/ComparePage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  const [search, setSearch] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [courseFilter, setCourseFilter] = useState("");
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(false);

  // Initialize selectedColleges from localStorage
  const [selectedColleges, setSelectedColleges] = useState(() => {
    const saved = localStorage.getItem("selectedColleges");
    return saved ? JSON.parse(saved) : [];
  });

  const cache = useRef({});

  // Save to localStorage whenever selectedColleges changes
  useEffect(() => {
    localStorage.setItem("selectedColleges", JSON.stringify(selectedColleges));
  }, [selectedColleges]);

  // FETCH & CACHE LOGIC
  useEffect(() => {
    const fetchColleges = async () => {
      const queryParams = new URLSearchParams({
        name: search.trim(),
        location: locationFilter,
        course: courseFilter,
        limit: 50
      }).toString();

      if (cache.current[queryParams]) {
        setColleges(cache.current[queryParams]);
        setLoading(false); 
        return; 
      }

      setLoading(true);
      try {
        //const response = await fetch(`http://localhost:5000/api/colleges?${queryParams}`);
        const response = await fetch(${process.env.REACT_APP_API_URL}/api/colleges?${queryParams});
        const data = await response.json();
        const arrayData = data.colleges || (Array.isArray(data) ? data : []);

        cache.current[queryParams] = arrayData;
        setColleges(arrayData);
      } catch (err) {
        console.error("Error fetching colleges:", err);
        setColleges([]);
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(() => {
      fetchColleges();
    }, 300); 

    return () => clearTimeout(timeoutId);
  }, [search, locationFilter, courseFilter]);

  const clearSelection = () => {
    setSelectedColleges([]);
  };

  return (
    <Router>
      <div className="App flex flex-col min-h-screen bg-slate-50">
        <Navbar 
          search={search} 
          setSearch={setSearch} 
          locationFilter={locationFilter} 
          setLocationFilter={setLocationFilter}
          courseFilter={courseFilter} 
          setCourseFilter={setCourseFilter}
          selectedCount={selectedColleges.length}
          selectedIds={selectedColleges}
          clearSelection={clearSelection} 
          colleges={colleges} 
        /> 

        <main className="flex-grow">
          {loading && (
            <div className="fixed top-0 left-0 w-full h-1 z-[70] overflow-hidden">
              <div className="h-full bg-blue-600 animate-pulse w-full"></div>
            </div>
          )}
          
          <Routes>
            <Route path="/" element={
              <CollegeList 
                colleges={colleges} 
                loading={loading} 
                selectedColleges={selectedColleges}
                setSelectedColleges={setSelectedColleges}
              />
            } />
            <Route path="/college/:id" element={<CollegeDetail />} />
            <Route path="/compare" element={
              <ComparePage 
                selectedIds={selectedColleges} 
                clearSelection={clearSelection} 
              />
            } />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
