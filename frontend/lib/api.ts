import useSWR from 'swr';

// Define the data types
export type Claim = {
  id: number;
  title: string;
  source_name: string;
  similarity_score: number | null;
  published_at: string;
  summary: string | null;
  nli_label: string | null;
  contradiction_score: number | null;
};

export type TrendData = {
  date: string;
  count: number;
};

// A single, reusable fetcher function that SWR will use
const fetcher = (url: string) => fetch(url).then((res) => res.json());

// A custom hook to fetch the claims data with a 10-second refresh interval
export function useClaims() {
  const { data, error, isLoading } = useSWR<Claim[]>('http://127.0.0.1:8000/claims/', fetcher, {
    refreshInterval: 10000 // Re-fetch every 10 seconds
  });
  return {
    claims: data,
    isLoading,
    isError: error,
  };
}

// A custom hook to fetch the trends data with a 10-second refresh interval
export function useTrendData() {
    const { data, error, isLoading } = useSWR<TrendData[]>('http://127.0.0.1:8000/dashboard/trends/', fetcher, {
      refreshInterval: 10000 // Re-fetch every 10 seconds
    });
    return {
      trendData: data,
      isLoading,
      isError: error,
    };
  }