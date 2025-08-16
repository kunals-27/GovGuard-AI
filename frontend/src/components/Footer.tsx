import React from 'react';
import { Shield } from 'lucide-react';

interface FooterProps {
  darkMode: boolean;
}

const Footer: React.FC<FooterProps> = ({ darkMode }) => {
  return (
    <footer className={`border-t mt-12 ${
      darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand & Description */}
          <div>
            <div className="flex items-center space-x-2">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <span className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>GovGuardAI</span>
            </div>
            <p className={`mt-3 text-sm leading-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              AI-powered fact-checking and news validation platform helping you stay informed with
              verified, unbiased information from trusted sources.
            </p>
            <p className={`mt-4 text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
              &copy; 2025 GovGuardAI. All rights reserved.
            </p>
          </div>

          {/* Platform */}
          <div>
            <h4 className={`text-sm font-semibold tracking-wide ${darkMode ? 'text-white' : 'text-gray-900'}`}>Platform</h4>
            <ul className="mt-4 space-y-2">
              <li><a href="/about" className={`${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} text-sm`}>About</a></li>
              <li><a href="/how-it-works" className={`${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} text-sm`}>How It Works</a></li>
              <li><a href="/api" className={`${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} text-sm`}>API Access</a></li>
              <li><a href="/docs" className={`${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} text-sm`}>Documentation</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className={`text-sm font-semibold tracking-wide ${darkMode ? 'text-white' : 'text-gray-900'}`}>Support</h4>
            <ul className="mt-4 space-y-2">
              <li><a href="/contact" className={`${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} text-sm`}>Contact</a></li>
              <li><a href="/help" className={`${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} text-sm`}>Help Center</a></li>
              <li><a href="/privacy" className={`${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} text-sm`}>Privacy Policy</a></li>
              <li><a href="/terms" className={`${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} text-sm`}>Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className={`mt-10 pt-6 border-t text-center ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
            Powered by advanced AI models for fact-checking and sentiment analysis
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;