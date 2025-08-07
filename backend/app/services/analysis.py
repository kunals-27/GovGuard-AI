from sentence_transformers import SentenceTransformer

# This will download the model the first time it's run.
# We load it once here so it's ready to be used by the function.
model = SentenceTransformer('sentence-transformers/paraphrase-albert-small-v2')

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