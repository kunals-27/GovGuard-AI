import React, { useState } from 'react';
import { ChevronDown, ChevronUp, ExternalLink, AlertTriangle, Clock, Smile, Meh, Frown } from 'lucide-react';
import { Claim } from '../lib/api'; // We now import the data type from our API file

// The component expects a single `article` prop of type `Claim` from our API
interface ArticleCardProps {
  article: Claim;
  darkMode: boolean;
}

const ClaimCard: React.FC<ArticleCardProps> = ({ article, darkMode }) => {
  const [summaryExpanded, setSummaryExpanded] = useState(false);

  const contradictionColors = {
    contradiction: darkMode ? 'bg-yellow-900 text-yellow-300 border-yellow-800' : 'bg-yellow-100 text-yellow-800 border-yellow-200',
    entailment: darkMode ? 'bg-green-900 text-green-300 border-green-800' : 'bg-green-100 text-green-800 border-green-200',
    neutral: darkMode ? 'bg-gray-800 text-gray-300 border-gray-700' : 'bg-gray-100 text-gray-800 border-gray-200'
  };

  const sentimentEmojis = {
    Positive: '😊',
    Neutral: '😐',
    Negative: '😟'
  };

  const formatTimestamp = (timestamp: string) => new Date(timestamp).toLocaleString();

  return (
    <div className={`rounded-lg shadow-sm border hover:shadow-md transition-shadow duration-200 ${
      darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
    }`}>
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className={`text-lg font-semibold mb-2 line-clamp-2 leading-tight ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              {article.title}
            </h3>
            <div className={`flex items-center space-x-4 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              {/* USE a.source_name FROM THE API */}
              <span className="font-medium">{article.source_name}</span>
              <div className="flex items-center space-x-1">
                <Clock className="h-3 w-3" />
                {/* USE a.published_at FROM THE API */}
                <span>{formatTimestamp(article.published_at)}</span>
              </div>
            </div>
          </div>
          <a href="#" target="_blank" rel="noopener noreferrer" className={`ml-4 p-2 rounded-md transition-colors ${
              darkMode ? 'text-gray-400 hover:text-gray-300 hover:bg-gray-700' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
          }`}>
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>

        {/* Contradiction Label */}
        {article.nli_label === 'contradiction' && (
          <div className="mb-4">
            <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-md text-xs font-medium border ${contradictionColors.contradiction}`}>
              <AlertTriangle className="h-3 w-3" />
              {/* USE a.nli_label and check it exists */}
              <span>{article.nli_label?.toUpperCase()}</span>
            </div>
          </div>
        )}

        {/* AI Summary */}
        <div className="mb-4">
          <button
            onClick={() => setSummaryExpanded(!summaryExpanded)}
            className={`flex items-center space-x-2 text-sm font-medium mb-2 ${
              darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'
            }`}>
            <span>AI Summary</span>
            {summaryExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
          {summaryExpanded && (
            <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {article.summary || "No summary available."}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          {/* Topics */}
          <div className="flex flex-wrap gap-2">
            {article.topic && (
              <span className={`inline-block px-2 py-1 text-xs rounded-md font-medium ${
                  darkMode ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-700'
              }`}>
                {article.topic}
              </span>
            )}
          </div>

          {/* Sentiment */}
          {article.sentiment && (
            <div className="flex items-center space-x-2">
              <span className="text-lg">{sentimentEmojis[article.sentiment as keyof typeof sentimentEmojis]}</span>
              <span className={`text-xs capitalize ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{article.sentiment}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClaimCard;