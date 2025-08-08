import React from 'react';
import { BarChart3 } from 'lucide-react';
import { TrendData } from '../lib/api'; // Import our data type

// The component now accepts `data` as a prop
const ContradictionsChart: React.FC<{ data: TrendData[] }> = ({ data }) => {
  if (!data || data.length === 0) {
    // You can return a loading state or a placeholder here if you want
    return <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6 h-72">Loading Chart...</div>;
  }

  const maxValue = Math.max(...data.map(d => d.count), 0);
  const total = data.reduce((sum, d) => sum + d.count, 0);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
      <div className="flex items-center space-x-2 mb-4">
        <BarChart3 className="h-5 w-5 text-blue-600" />
        <h2 className="text-lg font-semibold text-gray-900">Contradictions Detected Over 7 Days</h2>
      </div>

      <div className="flex items-end space-x-4 h-32">
        {data.map(({ date, count }) => (
          <div key={date} className="flex-1 flex flex-col items-center">
            <div className="w-full bg-gray-200 rounded-t-md relative">
              <div
                className="bg-gradient-to-t from-red-400 to-red-300 rounded-t-md transition-all duration-500 ease-out"
                style={{ 
                  height: `${(count / (maxValue || 1)) * 100}px`,
                  minHeight: '4px'
                }}
              />
            </div>
            <div className="mt-2 text-xs text-gray-600 font-medium">{date}</div>
            <div className="text-xs text-gray-500">{count}</div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex justify-between text-sm text-gray-500">
        <span>Total contradictions this week: {total}</span>
        <span>Average per day: {data.length > 0 ? Math.round(total / data.length) : 0}</span>
      </div>
    </div>
  );
};

export default ContradictionsChart;