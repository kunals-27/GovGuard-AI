// Define the type of data this component expects to receive
type ClaimCardProps = {
  title: string;
  source: string;
  score: number | null;
  publishedAt: string;
};

export default function ClaimCard({ title, source, score, publishedAt }: ClaimCardProps) {
  // Determine the color of the score badge based on its value
  const getScoreColor = () => {
    if (score === null) return 'bg-gray-500'; // Gray for not-yet-analyzed
    if (score > 0.5) return 'bg-green-600'; // Green for high similarity
    if (score > 0.25) return 'bg-yellow-600'; // Yellow for medium
    return 'bg-red-600'; // Red for low
  };

  return (
    <div className="border border-slate-700 bg-slate-800 rounded-lg p-4 my-4 w-full max-w-4xl hover:border-slate-500 transition-colors">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <p className="text-xs text-slate-400">{new Date(publishedAt).toLocaleString()}</p>
          <h2 className="text-lg font-semibold text-slate-100 mt-1">{title}</h2>
          <p className="text-sm text-slate-400 mt-2">Source: {source}</p>
        </div>
        {score !== null && (
          <div className="ml-4">
            <span className={`text-white text-xs font-bold px-2.5 py-1 rounded-full ${getScoreColor()}`}>
              {`Score: ${score.toFixed(2)}`}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}