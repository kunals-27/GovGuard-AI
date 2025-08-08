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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <span className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>GovGuardAI</span>
          </div>

          {/* Links */}
          <div className="flex space-x-6">
            <a
              href="/about"
              className={`text-sm font-medium transition-colors ${
                darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              About
            </a>
            <a
              href="/contact"
              className={`text-sm font-medium transition-colors ${
                darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Contact
            </a>
            <a
              href="/privacy"
              className={`text-sm font-medium transition-colors ${
                darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Privacy
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className={`mt-6 pt-6 border-t text-center ${
          darkMode ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            © 2025 GovGuardAI. All rights reserved. Powered by advanced AI for transparent governance.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;