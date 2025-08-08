import React from 'react';
import { X, Calendar, Tag, TrendingUp, AlertTriangle } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  darkMode: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, darkMode }) => {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed lg:static inset-y-0 left-0 z-30 w-80 shadow-lg transform transition-transform duration-300 ease-in-out ${
          darkMode ? 'bg-gray-900' : 'bg-white'
        } ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className={`flex items-center justify-between p-4 border-b lg:hidden ${
            darkMode ? 'border-gray-700' : 'border-gray-200'
          }`}>
            <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Filters</h2>
            <button
              onClick={onClose}
              className={`p-2 rounded-md transition-colors ${
                darkMode 
                  ? 'text-gray-400 hover:text-gray-300 hover:bg-gray-800' 
                  : 'text-gray-400 hover:text-gray-500 hover:bg-gray-100'
              }`}
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Filter Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {/* Time Range */}
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <Calendar className={`h-4 w-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                <h3 className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Time Range</h3>
              </div>
              <div className="space-y-2">
                {['Last 24 hours', 'Last 7 days', 'Last 30 days', 'Custom'].map((option) => (
                  <label key={option} className="flex items-center">
                    <input
                      type="radio"
                      name="timeRange"
                      className={`h-4 w-4 text-blue-600 focus:ring-blue-500 ${
                        darkMode ? 'border-gray-600 bg-gray-700' : 'border-gray-300 bg-white'
                      }`}
                      defaultChecked={option === 'Last 7 days'}
                    />
                    <span className={`ml-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{option}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Topics */}
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <Tag className={`h-4 w-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                <h3 className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Topics</h3>
              </div>
              <div className="space-y-2">
                {['Politics', 'Healthcare', 'Economy', 'Climate', 'Technology', 'Education'].map((topic) => (
                  <label key={topic} className="flex items-center">
                    <input
                      type="checkbox"
                      className={`h-4 w-4 text-blue-600 focus:ring-blue-500 rounded ${
                        darkMode ? 'border-gray-600 bg-gray-700' : 'border-gray-300 bg-white'
                      }`}
                    />
                    <span className={`ml-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{topic}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Sentiment */}
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <TrendingUp className={`h-4 w-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                <h3 className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Sentiment</h3>
              </div>
              <div className="space-y-2">
                {[
                  { label: 'Positive', emoji: '😊' },
                  { label: 'Neutral', emoji: '😐' },
                  { label: 'Negative', emoji: '😟' }
                ].map(({ label, emoji }) => (
                  <label key={label} className="flex items-center">
                    <input
                      type="checkbox"
                      className={`h-4 w-4 text-blue-600 focus:ring-blue-500 rounded ${
                        darkMode ? 'border-gray-600 bg-gray-700' : 'border-gray-300 bg-white'
                      }`}
                    />
                    <span className={`ml-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{emoji} {label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Contradiction Level */}
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <AlertTriangle className={`h-4 w-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                <h3 className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Contradiction Level</h3>
              </div>
              <div className="space-y-2">
                {['High', 'Medium', 'Low', 'None'].map((level) => (
                  <label key={level} className="flex items-center">
                    <input
                      type="checkbox"
                      className={`h-4 w-4 text-blue-600 focus:ring-blue-500 rounded ${
                        darkMode ? 'border-gray-600 bg-gray-700' : 'border-gray-300 bg-white'
                      }`}
                    />
                    <span className={`ml-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{level}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Sources */}
            <div>
              <h3 className={`text-sm font-medium mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Top Sources</h3>
              <div className="space-y-2">
                {['CNN', 'BBC News', 'Reuters', 'AP News', 'The Guardian'].map((source) => (
                  <label key={source} className="flex items-center">
                    <input
                      type="checkbox"
                      className={`h-4 w-4 text-blue-600 focus:ring-blue-500 rounded ${
                        darkMode ? 'border-gray-600 bg-gray-700' : 'border-gray-300 bg-white'
                      }`}
                    />
                    <span className={`ml-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{source}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Apply Filters Button */}
          <div className={`p-4 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;