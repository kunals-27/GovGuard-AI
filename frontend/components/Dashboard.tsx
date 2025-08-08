"use client";

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { Claim, TrendData } from "@/lib/api";
import ClaimCard from "@/components/ClaimCard";

const ContradictionChart = dynamic(
  () => import('@/components/ContradictionChart'),
  { ssr: false }
);

type DashboardProps = {
  claims: Claim[];
  trendData: TrendData[];
};

// CHANGE 1: Add 'Entailment' to our list of possible filter types
type FilterType = 'All' | 'Contradiction' | 'Neutral' | 'Entailment';

export default function Dashboard({ claims, trendData }: DashboardProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterType>('All');

  const filteredClaims = (claims || [])
    .filter((claim) => {
      if (activeFilter === 'All') {
        return true;
      }
      return claim.nli_label?.toLowerCase() === activeFilter.toLowerCase();
    })
    .filter((claim) =>
      claim.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <>
      <ContradictionChart data={trendData || []} />

      <h2 className="text-2xl font-bold tracking-tight text-slate-800 mb-4 self-start max-w-4xl w-full">
        Live Feed
      </h2>

      <div className="w-full max-w-4xl mb-4 flex flex-col sm:flex-row gap-4">
        <div className="flex items-center gap-2">
          {/* CHANGE 2: Add 'Entailment' to the array of buttons to be created */}
          {(['All', 'Contradiction', 'Neutral', 'Entailment'] as FilterType[]).map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors ${
                activeFilter === filter
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <input
          type="text"
          placeholder="Search by keyword in title..."
          className="w-full sm:flex-1 bg-white border border-gray-300 rounded-md px-4 py-2 text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="w-full max-w-4xl">
        {filteredClaims.length > 0 ? (
          filteredClaims.map((claim) => (
            <ClaimCard
              key={claim.id}
              {...claim}
              source={claim.source_name}
              publishedAt={claim.published_at}
              score={claim.similarity_score}
            />
          ))
        ) : (
          <p className="text-slate-600 text-center">
            No claims found matching your criteria.
          </p>
        )}
      </div>
    </>
  );
}