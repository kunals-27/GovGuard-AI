from celery_worker import celery_app
from app.db.session import SessionLocal
from app.db import models
from app.services import analysis

# The task now accepts the data it needs to perform the analysis
@celery_app.task
def analyze_claim_task(claim_id: int, title: str, content: str):
    """
    A background task to analyze a claim.
    Receives the data directly to avoid race conditions.
    """
    db = SessionLocal()
    try:
        # First, perform the analysis using the data we received
        known_fact = "The government announced new infrastructure projects today."
        score = analysis.calculate_similarity(title, known_fact)
        summary = analysis.generate_summary(content)

        # Now, find the claim in the DB using the ID
        claim_to_update = db.query(models.Claim).filter(models.Claim.id == claim_id).first()

        if claim_to_update:
            # Update the record with the analysis results
            claim_to_update.similarity_score = score
            claim_to_update.summary = summary
            db.commit()
            return f"Successfully analyzed claim {claim_id}. Score: {score}"
        else:
            return f"Could not find claim with id {claim_id} to update."
    finally:
        db.close()