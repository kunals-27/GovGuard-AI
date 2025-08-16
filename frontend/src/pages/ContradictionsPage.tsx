// React import not required with automatic JSX runtime
import { useClaims, useTrendData } from '../lib/api';
import ClaimCard from '../components/ClaimCard';
import ContradictionsChart from '../components/ContradictionsChart';
import { useOutletContext } from 'react-router-dom';

interface OutletContextType {
  searchQuery: string;
  darkMode: boolean;
}

export default function ContradictionsPage() {
  const { claims, isLoading, isError } = useClaims();
  const { searchQuery, darkMode } = useOutletContext<OutletContextType>();
  const { trendData } = useTrendData();

  // Filter for contradictions first, then by search query
  const contradictedClaims = (claims || [])
    .filter(claim => claim.nli_label === 'contradiction')
    .filter(claim => claim.title.toLowerCase().includes(searchQuery.toLowerCase()));

  if (isLoading) return <div className="text-center p-8">Loading Contradictions...</div>;
  if (isError) return <div className="text-center p-8 text-red-600">Error: Could not connect to backend.</div>;

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <ContradictionsChart data={trendData || []} />
      <h2 className={`text-2xl font-bold mb-4 mt-8 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
        Contradiction Analysis
      </h2>
      {contradictedClaims.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {contradictedClaims.map((claim) => (
            <ClaimCard key={claim.id} article={claim} darkMode={darkMode} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-400">
          No contradictions found in the recent data.
        </div>
      )}
    </div>
  );
}