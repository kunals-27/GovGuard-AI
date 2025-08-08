import random # <-- ADD THIS IMPORT
from celery_worker import celery_app
from app.db.session import SessionLocal
from app.db import models
from .nlp_tasks import analyze_claim_task
import requests
import os
from datetime import datetime

# A list of topics to cycle through
SEARCH_TOPICS = ["government", "politics", "international relations", "economic policy", "healthcare reform", "technology regulation"]

@celery_app.task
def fetch_and_store_articles_task():
    """
    A scheduled task to fetch new articles on a random topic.
    """
    # Choose a random topic from our list for each run
    topic = random.choice(SEARCH_TOPICS)
    print(f"Fetching articles for topic: {topic}")

    api_key = os.getenv("GNEWS_API_KEY")
    # Update the URL to use the random topic
    url = f"https://gnews.io/api/v4/search?q=\"{topic}\"&lang=en&max=10&apikey={api_key}"
    db = SessionLocal()

    try:
        # ... (the rest of the function is exactly the same)
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

        return f"Ingestion task for topic '{topic}' complete. Found and stored {len(new_claims_to_analyze)} new articles."

    except Exception as e:
        db.rollback()
        return f"An error occurred: {e}"

    finally:
        db.close()