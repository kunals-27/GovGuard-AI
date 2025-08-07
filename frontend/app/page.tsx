import ClaimCard from "@/components/ClaimCard";
import { fetchClaims, Claim } from "@/lib/api";

export default async function Home() {
  const claims = await fetchClaims();

  return (
    <main className="p-4 sm:p-8 md:p-12 flex flex-col items-center">
      <h1 className="text-4xl font-bold tracking-tight text-slate-200 mb-8">
        GovGuardAI Live Feed
      </h1>

      <div className="w-full max-w-4xl">
        {claims.length > 0 ? (
          claims.map((claim: Claim) => (
            <ClaimCard
              key={claim.id}
              title={claim.title}
              source={claim.source_name}
              score={claim.similarity_score}
              publishedAt={claim.published_at}
              summary={claim.summary}
              nli_label={claim.nli_label}
            />
          ))
        ) : (
          <p className="text-slate-400 text-center">
            No claims found. Try ingesting some data from the backend!
          </p>
        )}
      </div>
    </main>
  );
}