# in backend/app/tasks/ingestion_tasks.py
from celery_worker import celery_app
from app.db.session import SessionLocal
from app.db import models
from .nlp_tasks import analyze_claim_task
import requests
import os
from datetime import datetime

@celery_app.task
def fetch_and_store_articles_task():
    """
    A scheduled task to fetch new articles from GNews, store them,
    and trigger analysis tasks.
    """
    api_key = os.getenv("GNEWS_API_KEY")
    url = f"https://gnews.io/api/v4/search?q=government&lang=en&max=10&apikey={api_key}"
    db = SessionLocal()

    try:
        response = requests.get(url)
        response.raise_for_status()
        articles = response.json().get("articles", [])

        new_claims_to_analyze = []
        for article in articles:
            exists = db.query(models.Claim).filter(models.Claim.source_url == article["url"]).first()
            if not exists:
                claim = models.Claim(
                    title=article["title"],
                    source_name=article["source"]["name"],
                    source_url=article["url"],
                    content=article["content"],
                    published_at=datetime.fromisoformat(article["publishedAt"].replace("Z", "+00:00"))
                )
                db.add(claim)
                db.flush()
                new_claims_to_analyze.append(claim)

        db.commit()

        for claim in new_claims_to_analyze:
            analyze_claim_task.delay(claim.id, claim.title, claim.content)

        return f"Ingestion task complete. Found and stored {len(new_claims_to_analyze)} new articles."

    except Exception as e:
        db.rollback()
        return f"An error occurred: {e}"

    finally:
        db.close()