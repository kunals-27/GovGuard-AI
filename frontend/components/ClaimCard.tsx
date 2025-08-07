"use client";

import { useState } from 'react';

type ClaimCardProps = {
  title: string;
  source: string;
  score: number | null;
  publishedAt: string;
  summary: string | null;
  nli_label: string | null;
};

export default function ClaimCard({ title, source, score, publishedAt, summary, nli_label }: ClaimCardProps) {
  const [isSummaryVisible, setSummaryVisible] = useState(false);

  const getScoreColor = () => {
    if (score === null) return 'bg-gray-500';
    if (score > 0.5) return 'bg-green-600';
    if (score > 0.25) return 'bg-yellow-600';
    return 'bg-red-600';
  };

  return (
    <div className={`border rounded-lg p-4 my-4 w-full max-w-4xl transition-colors ${nli_label === 'contradiction' ? 'border-red-500 bg-red-900/20' : 'border-slate-700 bg-slate-800'}`}>
      <div className="flex justify-between items-start">
        <div className="flex-1 pr-4">
          {/* NEW: Contradiction Badge */}
          {nli_label === 'contradiction' && (
            <p className="text-sm font-bold text-red-400 mb-2">!! CONTRADICTION DETECTED</p>
          )}
          <p className="text-xs text-slate-400">{new Date(publishedAt).toLocaleString()}</p>
          <h2 className="text-lg font-semibold text-slate-100 mt-1">{title}</h2>
          <p className="text-sm text-slate-400 mt-2">Source: {source}</p>
        </div>
        {score !== null && (
          <div>
            <span className={`text-white text-xs font-bold px-2.5 py-1 rounded-full ${getScoreColor()}`}>
              {`Score: ${score.toFixed(2)}`}
            </span>
          </div>
        )}
      </div>
      {summary && (
        <div className="mt-4">
          <button onClick={() => setSummaryVisible(!isSummaryVisible)} className="text-xs text-blue-400 hover:text-blue-300">
            {isSummaryVisible ? 'Hide Summary' : 'Hide Summary'}
          </button>
          {isSummaryVisible && (
            <p className="text-sm text-slate-300 mt-2 border-l-2 border-slate-600 pl-4">{summary}</p>
          )}
        </div>
      )}
    </div>
  );
}