import ClaimCard from "@/components/ClaimCard";
import { fetchClaims, Claim } from "@/lib/api";

export default async function Home() {
  // 1. Fetch live data from the API instead of using mock data
  const claims = await fetchClaims();

  return (
    <main className="p-4 sm:p-8 md:p-12 flex flex-col items-center">
      <h1 className="text-4xl font-bold tracking-tight text-slate-200 mb-8">
        GovGuardAI Live Feed
      </h1>

      <div className="w-full max-w-4xl">
        {/* 2. Check if there are claims to display */}
        {claims.length > 0 ? (
          claims.map((claim: Claim) => (
            <ClaimCard
              key={claim.id}
              title={claim.title}
              source={claim.source_name} // 3. Use the correct property name from the API
              score={claim.similarity_score}
              publishedAt={claim.published_at}
            />
          ))
        ) : (
          // 4. Show a message if no data is returned
          <p className="text-slate-400 text-center">
            No claims found. Try ingesting some data from the backend!
          </p>
        )}
      </div>
    </main>
  );
}