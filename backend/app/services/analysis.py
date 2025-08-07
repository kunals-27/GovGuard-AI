from sentence_transformers import SentenceTransformer
from transformers import pipeline

# This will download the model the first time it's run.
# We load it once here so it's ready to be used by the function.
model = SentenceTransformer('sentence-transformers/paraphrase-albert-small-v2')

summarizer = pipeline("summarization", model="sshleifer/distilbart-cnn-6-6")

def calculate_similarity(sentence1: str, sentence2: str) -> float:
    """
    Calculates the cosine similarity between two sentences.
    """
    # Encode sentences to get their embeddings
    embedding1 = model.encode(sentence1, convert_to_tensor=True)
    embedding2 = model.encode(sentence2, convert_to_tensor=True)

    # Compute cosine-similarity
    from sentence_transformers.util import cos_sim
    cosine_score = cos_sim(embedding1, embedding2)

    return cosine_score.item()

def generate_summary(text: str) -> str:
    """
    Generates a summary for a given block of text.
    """
    if not text or len(text.split()) < 50: # Don't summarize very short content
        return ""

    # The summarizer returns a list with a dictionary
    result = summarizer(text, max_length=150, min_length=30, do_sample=False)
    return result[0]['summary_text']