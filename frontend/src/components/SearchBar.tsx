import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  darkMode: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, setSearchQuery, darkMode }) => {
  return (
    <div className={`shadow-sm border rounded-lg mx-4 sm:mx-6 lg:mx-8 -mt-6 relative z-40 ${
      darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
    }`}>
      <div className="flex items-center p-4">
        <div className="flex-1 relative">
          <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 ${
            darkMode ? 'text-gray-400' : 'text-gray-400'
          }`} />
          <input
            type="text"
            placeholder="Search news, topics, sources, or keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              darkMode 
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
            }`}
          />
        </div>
        <button className={`ml-4 px-4 py-2 rounded-md transition-colors flex items-center space-x-2 ${
          darkMode 
            ? 'bg-blue-600 hover:bg-blue-700 text-white' 
            : 'bg-blue-600 hover:bg-blue-700 text-white'
        }`}>
          <Filter className="h-4 w-4" />
          <span>Filters</span>
        </button>
      </div>
    </div>
  );
};

export default SearchBar;