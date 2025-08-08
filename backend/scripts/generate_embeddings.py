# in backend/scripts/generate_embeddings.py
import sys
import os
import numpy as np

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from app.db.session import SessionLocal
from app.db.models import FactCheck
# We import the model directly from the analysis service
from app.services.analysis import similarity_model

def generate_embeddings():
    db = SessionLocal()
    try:
        print("Fetching fact-checks that need embeddings...")
        # Find all records that haven't been processed yet
        fact_checks_to_process = db.query(FactCheck).filter(FactCheck.embedding == None).all()

        if not fact_checks_to_process:
            print("All fact-checks already have embeddings. Exiting.")
            return

        print(f"Found {len(fact_checks_to_process)} records to process.")

        # Extract the statements to be encoded
        statements = [fc.statement for fc in fact_checks_to_process]

        print("Generating embeddings with the AI model. This may take a while...")
        # Use the model to create embeddings in batches
        embeddings = similarity_model.encode(statements, show_progress_bar=True)

        print("Updating records in the database...")
        for fact_check, embedding in zip(fact_checks_to_process, embeddings):
            fact_check.embedding = embedding.tolist() # Store as a list

        # Commit the changes to the database
        db.commit()
        print(f"Successfully generated and stored embeddings for {len(fact_checks_to_process)} records.")

    except Exception as e:
        print(f"An error occurred: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    generate_embeddings()