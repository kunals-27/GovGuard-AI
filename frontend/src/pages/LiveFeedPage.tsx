import React, { useMemo } from 'react';
import { useClaims, Claim } from '../lib/api';

import ClaimCard from '../components/ClaimCard';
import { useOutletContext } from 'react-router-dom';

// Define the type for the context received from the layout
interface OutletContextType {
  searchQuery: string;
  darkMode: boolean;
}

export default function LiveFeedPage() {
  const { claims, isLoading, isError } = useClaims();
  const { searchQuery, darkMode } = useOutletContext<OutletContextType>();

  const filteredArticles = useMemo(() => {
    if (!claims) return [];
    if (!searchQuery.trim()) return claims;
    const query = searchQuery.toLowerCase();
    return claims.filter(article => 
      article.title.toLowerCase().includes(query) ||
      article.source_name.toLowerCase().includes(query)
    );
  }, [claims, searchQuery]);

  if (isLoading) return <div className="p-8 text-center text-gray-400">Loading Live Feed...</div>;
  if (isError) return <div className="p-8 text-center text-red-500">Error: Could not connect to backend.</div>;

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
        Latest News Analysis
      </h2>
      {filteredArticles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredArticles.map((article: Claim) => (
            <ClaimCard key={article.id} article={article} darkMode={darkMode} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-400">No articles found matching your criteria.</div>
      )}
    </div>
  );
}