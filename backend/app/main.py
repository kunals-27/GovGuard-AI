from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
import requests
import os
from datetime import datetime

# We now import our background task instead of the analysis service
from .tasks.nlp_tasks import analyze_claim_task 

# Import our database components
from .db import models, session

# This line creates the database tables if they don't exist on startup
models.Base.metadata.create_all(bind=session.engine)

app = FastAPI(title="GovGuardAI API")

@app.get("/")
def read_root():
    return {"message": "Welcome to the GovGuardAI API!"}

@app.post("/ingest/")
def ingest_data(db: Session = Depends(session.get_db)):
    """
    Fetches data from GNews, stores it, and triggers background analysis.
    """
    api_key = os.getenv("GNEWS_API_KEY")
    url = f"https://gnews.io/api/v4/search?q=government&lang=en&max=10&apikey={api_key}"

    try:
        response = requests.get(url)
        response.raise_for_status() # Raise an exception for bad status codes
        articles = response.json().get("articles", [])
        
        # We'll keep track of the new claims to analyze them later
        newly_added_claim_ids = []
        for article in articles:
            # Check if the article already exists by its URL
            exists = db.query(models.Claim).filter(models.Claim.source_url == article["url"]).first()
            if not exists:
                # Create the claim WITHOUT the score
                claim = models.Claim(
                    title=article["title"],
                    source_name=article["source"]["name"],
                    source_url=article["url"],
                    content=article["content"],
                    published_at=datetime.fromisoformat(article["publishedAt"].replace("Z", "+00:00"))
                )
                db.add(claim)
                db.flush() # Use flush to get the new claim's ID before we commit
                newly_added_claim_ids.append(claim.id)

        db.commit() # Commit all new claims to the database at once

        # Now, trigger the background task for each new claim we added
        for claim_id in newly_added_claim_ids:
            analyze_claim_task.delay(claim_id)

        return {"message": f"Successfully ingested {len(newly_added_claim_ids)} new articles. Analysis is running in the background."}

    except requests.exceptions.RequestException as e:
        return {"error": f"Failed to fetch data from GNews: {e}"}