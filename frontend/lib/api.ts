// Define a TypeScript type for our claim data to ensure type safety
export type Claim = {
  id: number;
  title: string;
  source_name: string;
  similarity_score: number | null;
  published_at: string;
};

export async function fetchClaims(): Promise<Claim[]> {
  try {
    // Fetch data from your FastAPI backend
    const res = await fetch('http://127.0.0.1:8000/claims/', {
      cache: 'no-store', // Ensures we get the latest data on every request
    });

    if (!res.ok) {
      throw new Error('Failed to fetch claims');
    }

    const claims: Claim[] = await res.json();
    return claims;
  } catch (error) {
    console.error('API Error:', error);
    // Return an empty array in case of an error
    return [];
  }
}