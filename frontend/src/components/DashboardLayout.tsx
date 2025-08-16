import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Menu } from 'lucide-react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';
import SearchBar from './SearchBar';

// Context is passed via Outlet without local type alias here

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // This logic applies the dark mode class to the root HTML element
  React.useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      {/* Fixed SearchBar under Navbar (same z-index as Navbar) with separator */}
      <div className={`fixed top-16 left-0 right-0 z-50 h-16 border-b ${
        darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <div className="w-full h-full px-4 sm:px-6 lg:px-8">
          {/* 3-column grid: left toggle, centered search, right spacer to keep true center */}
          <div className="grid grid-cols-[2.5rem_1fr_2.5rem] items-center h-full">
            <button
              aria-label="Toggle filters"
              onClick={() => setSidebarOpen((v) => !v)}
              className={`h-10 w-10 flex items-center justify-center rounded-md border transition ${
                darkMode ? 'border-gray-700 hover:bg-gray-800 text-gray-300' : 'border-gray-200 hover:bg-gray-100 text-gray-600'
              }`}
            >
              <Menu className="h-5 w-5" />
            </button>
            <div className="flex justify-center">
              <SearchBar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                darkMode={darkMode}
              />
            </div>
            <div />
          </div>
        </div>
      </div>

      {/* Page content: spacers for navbar and searchbar, then row, then footer */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Spacer for fixed Navbar height */}
        <div className="pt-16" />
        {/* Spacer for fixed SearchBar height */}
        <div className="h-16" />

        {/* Row with sidebar and main content */}
        <div className="flex flex-1 overflow-hidden">
          <Sidebar
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
            darkMode={darkMode}
          />

          {/* Main content area with its own independent scrollbar */}
          <main className="flex-1 overflow-y-auto">
            <div className="p-4 sm:p-6 lg:p-8">
              <Outlet context={{ searchQuery, darkMode }} />
            </div>
          </main>
        </div>
      </div>

      {/* Full-width footer below sidebar */}
      <Footer darkMode={darkMode} />
    </div>
  );
}