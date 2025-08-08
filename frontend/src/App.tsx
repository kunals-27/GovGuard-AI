import React, { useState, useMemo } from 'react';
import { useClaims, useTrendData, Claim } from './lib/api'; 
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import Sidebar from './components/Sidebar';
import ContradictionsChart from './components/ContradictionsChart';
import ClaimCard from './components/ClaimCard';
import Footer from './components/Footer';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [darkMode, setDarkMode] = useState(false); // Your dark mode logic is great!

  // Fetch live data using our SWR hooks
  const { claims, isLoading, isError } = useClaims();
  const { trendData } = useTrendData();

  const filteredArticles = useMemo(() => {
    const articlesToFilter = claims || []; 
    if (!searchQuery.trim()) return articlesToFilter;

    const query = searchQuery.toLowerCase();
    return articlesToFilter.filter(article => 
      article.title.toLowerCase().includes(query) ||
      article.source_name.toLowerCase().includes(query)
    );
  }, [claims, searchQuery]);

  // Handle Loading and Error states
  if (isLoading) return <div className="flex justify-center items-center h-screen bg-gray-50">Loading...</div>;
  if (isError) return <div className="flex justify-center items-center h-screen bg-gray-50 text-red-600">Error: Could not connect to backend.</div>;

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <Navbar 
        activeTab={'Home'} 
        setActiveTab={() => {}}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />
      <div className="pb-8">
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} darkMode={darkMode} />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex">
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} darkMode={darkMode} />
          <div className="flex-1 lg:ml-6">
            <ContradictionsChart data={trendData || []} />
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Latest News Analysis</h2>
              </div>
              {filteredArticles.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {filteredArticles.map((article: Claim) => (
                    <ClaimCard key={article.id} article={article} darkMode={darkMode} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-gray-400">No articles found.</div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer darkMode={darkMode} />
    </div>
  );
}

export default App;