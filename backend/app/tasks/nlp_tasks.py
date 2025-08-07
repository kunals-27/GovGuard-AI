from celery_worker import celery_app
from app.db.session import SessionLocal
from app.db import models
from app.services import analysis

@celery_app.task
def analyze_claim_task(claim_id: int):
    """
    A background task to analyze a claim's similarity score.
    """
    db = SessionLocal()
    try:
        claim = db.query(models.Claim).filter(models.Claim.id == claim_id).first()
        if not claim:
            return f"Claim with id {claim_id} not found."

        # This is our hard-coded "known fact" for now.
        known_fact = "The government announced new infrastructure projects today."

        # Call the analysis service from Day 4
        score = analysis.calculate_similarity(claim.title, known_fact)

        # Update the claim with the score and commit to the database
        claim.similarity_score = score
        db.commit()

        return f"Successfully analyzed claim {claim_id}. Score: {score}"
    finally:
        db.close()