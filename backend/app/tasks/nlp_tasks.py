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
        similar_facts_with_distance = analysis.find_similar_fact_checks(title, db)

        top_label = "neutral"
        top_contradiction_score = 0.0
        similarity_score = 0.0

        if similar_facts_with_distance:
            most_similar_fact, distance = similar_facts_with_distance[0]

            # ADDED: A safety check to prevent the TypeError
            if distance is not None:
                # Cosine distance is 0 for identical, 2 for opposite.
                # 1 - distance maps this to a nice -1 to 1 similarity score.
                similarity_score = 1 - distance

            nli_result = analysis.detect_contradiction(
                premise=most_similar_fact.statement,
                hypothesis=title
            )
            top_label = nli_result["label"]
            top_contradiction_score = nli_result["contradiction_score"]

        claim_to_update = db.query(models.Claim).filter(models.Claim.id == claim_id).first()

        if claim_to_update:
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