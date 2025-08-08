from celery_worker import celery_app # Or from celery_worker import celery_app
from app.db.session import SessionLocal
from app.db import models
from app.services import analysis

@celery_app.task
def analyze_claim_task(claim_id: int, title: str, content: str):
    """
    A background task to analyze a claim against the fact-check database.
    """
    db = SessionLocal()
    try:
        summary = analysis.generate_summary(content)

        # This now returns a list of (fact, distance) tuples
        similar_facts_with_distance = analysis.find_similar_fact_checks(title, db)

        top_label = "neutral"
        top_contradiction_score = 0.0
        similarity_score = 0.0

        if similar_facts_with_distance:
            # Get the top match and its distance
            most_similar_fact, distance = similar_facts_with_distance[0]

            # Run NLI on the most similar fact
            nli_result = analysis.detect_contradiction(
                premise=most_similar_fact.statement,
                hypothesis=title
            )
            top_label = nli_result["label"]
            top_contradiction_score = nli_result["contradiction_score"]

            # Convert distance to similarity score (0 distance = 1.0 similarity)
            similarity_score = 1 - distance

        # Find the original claim in the DB to update it
        claim_to_update = db.query(models.Claim).filter(models.Claim.id == claim_id).first()

        if claim_to_update:
            # Update the record with all analysis results
            claim_to_update.summary = summary
            claim_to_update.nli_label = top_label
            claim_to_update.contradiction_score = top_contradiction_score
            claim_to_update.similarity_score = similarity_score

            db.commit()
            return f"Successfully analyzed claim {claim_id}. Top label: {top_label}"
        else:
            return f"Could not find claim with id {claim_id} to update."
    finally:
        db.close()