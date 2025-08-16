import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, Menu, Moon, Sun } from 'lucide-react';

interface NavbarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({ sidebarOpen, setSidebarOpen, darkMode, setDarkMode }) => {
  const location = useLocation();
  const tabs = [
    { name: 'Home', path: '/' },
    { name: 'Live Feed', path: '/live-feed' },
    { name: 'Contradictions', path: '/contradictions' },
    { name: 'Bias', path: '/bias' },
    { name: 'Topics', path: '/topics' },
  ];

  return (
    // z-50 ensures it's on top, fixed ensures it stays at the top
    <nav className={`fixed top-0 left-0 right-0 z-50 ${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} shadow-sm border-b`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className={`lg:hidden p-2 rounded-md ${darkMode ? 'text-gray-400 hover:bg-gray-800' : 'text-gray-400 hover:bg-gray-100'}`}
            >
              <Menu className="h-5 w-5" />
            </button>
            <Link to="/" className="flex items-center space-x-2">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <h1 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>GovGuardAI</h1>
            </Link>
          </div>
          <div className="hidden md:flex space-x-1">
            {tabs.map((tab) => (
              <Link to={tab.path} key={tab.name}>
                <button className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === tab.path
                    ? darkMode ? 'bg-gray-800 text-white' : 'bg-blue-100 text-blue-700'
                    : darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-500 hover:bg-gray-100'
                }`}>
                  {tab.name}
                </button>
              </Link>
            ))}
          </div>
          <div className="flex items-center">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-md ${darkMode ? 'text-gray-400 hover:bg-gray-800' : 'text-gray-500 hover:bg-gray-100'}`}>
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;