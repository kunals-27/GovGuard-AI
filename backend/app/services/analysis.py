from sentence_transformers import SentenceTransformer
from transformers import pipeline
from sqlalchemy.orm import Session
from app.db import models
from sqlalchemy import text

# RENAMED this variable for clarity
similarity_model = SentenceTransformer('sentence-transformers/paraphrase-albert-small-v2')

summarizer = pipeline("summarization", model="sshleifer/distilbart-cnn-6-6")
nli_pipeline = pipeline("zero-shot-classification", model="facebook/bart-large-mnli")

def calculate_similarity(sentence1: str, sentence2: str) -> float:
    """
    Calculates the cosine similarity between two sentences.
    """
    # UPDATED this function to use the new variable name
    embedding1 = similarity_model.encode(sentence1, convert_to_tensor=True)
    embedding2 = similarity_model.encode(sentence2, convert_to_tensor=True)

    from sentence_transformers.util import cos_sim
    cosine_score = cos_sim(embedding1, embedding2)

    return cosine_score.item()

# --- The rest of your functions (generate_summary, detect_contradiction) are perfect and stay the same ---

def generate_summary(text: str) -> str:
    """
    Generates a summary for a given block of text.
    """
    if not text or len(text.split()) < 20:
        return ""
    result = summarizer(text, max_length=150, min_length=30, do_sample=False)
    return result[0]['summary_text']

def detect_contradiction(premise: str, hypothesis: str) -> dict:
    """
    Uses an NLI model to check for contradiction.
    """
    labels = ["contradiction", "entailment", "neutral"]
    result = nli_pipeline(hypothesis, candidate_labels=labels)

    contradiction_score = 0.0
    for i, label in enumerate(result['labels']):
        if label == 'contradiction':
            contradiction_score = result['scores'][i]
            break

    return {
        "label": result['labels'][0],
        "contradiction_score": contradiction_score
    }
    
def find_similar_fact_checks(query_text: str, db: Session, limit: int = 3) -> list:
    """
    Finds the most similar fact-checks and their distances in the database.
    """
    query_embedding = similarity_model.encode(query_text)

    # This query now selects both the FactCheck object AND the distance
    results = db.query(
        models.FactCheck,
        models.FactCheck.embedding.l2_distance(query_embedding).label('distance')
    ).order_by(
        text('distance') # Order by the calculated distance
    ).limit(limit).all()

    # The result is a list of tuples: (FactCheck_object, distance_value)
    return results