from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import requests
import os
from datetime import datetime

from .tasks.nlp_tasks import analyze_claim_task 
from .db import models, session

models.Base.metadata.create_all(bind=session.engine)

app = FastAPI(title="GovGuardAI API")

origins = [
    "http://localhost:3000",  # The address of your frontend app
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Welcome to the GovGuardAI API!"}

@app.post("/ingest/")
def ingest_data(db: Session = Depends(session.get_db)):
    api_key = os.getenv("GNEWS_API_KEY")
    url = f"https://gnews.io/api/v4/search?q=government&lang=en&max=10&apikey={api_key}"

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
                # Store the whole object briefly so we can get its data after
                new_claims_to_analyze.append(claim)

        db.commit()

        # Now, trigger the background task with the required data
        for claim in new_claims_to_analyze:
            analyze_claim_task.delay(claim.id, claim.title, claim.content)

        return {"message": f"Successfully ingested {len(new_claims_to_analyze)} new articles. Analysis is running in the background."}

    except requests.exceptions.RequestException as e:
        return {"error": f"Failed to fetch data from GNews: {e}"}
    
@app.get("/claims/")
def get_claims(db: Session = Depends(session.get_db)):
    """
    Retrieves the 20 most recent claims from the database.
    """
    claims = db.query(models.Claim).order_by(models.Claim.published_at.desc()).limit(20).all()
    return claims