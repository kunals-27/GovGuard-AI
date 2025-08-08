# in backend/scripts/ingest_factchecks.py
import json
import sys
import os

# This allows the script to import from the 'app' module
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from app.db.session import SessionLocal
from app.db.models import FactCheck, Base
from app.db.session import engine

def ingest_data():
    print("Creating/checking fact_checks table...")
    Base.metadata.create_all(bind=engine)
    print("Table ready.")

    db = SessionLocal()

    json_file_path = os.path.join(os.path.dirname(__file__), '..', 'data', 'politifact_factcheck_data.json')

    try:
        with open(json_file_path, mode='r', encoding='utf-8') as f:
            count = 0
            # Read the file line by line
            for line in f:
                try:
                    # Parse each line as a separate JSON object
                    item = json.loads(line)

                    statement = item.get('statement')
                    source = item.get('source')
                    rating = item.get('rating')

                    fact_check = FactCheck(
                        statement=statement,
                        source=source,
                        rating=rating
                    )
                    db.add(fact_check)
                    count += 1
                    if count % 100 == 0:
                        print(f"Prepared {count} records for ingestion...")

                except json.JSONDecodeError:
                    print(f"Skipping malformed line: {line.strip()}")
                    continue

        print(f"Committing {count} records to the database...")
        db.commit()
        print(f"Successfully ingested a total of {count} fact-check records.")

    except Exception as e:
        print(f"An error occurred: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    ingest_data()