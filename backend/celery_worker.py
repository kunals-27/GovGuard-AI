import os
from celery import Celery
from dotenv import load_dotenv

load_dotenv() # Load environment variables from .env file

# Get the Redis URL from the environment variables
redis_url = os.getenv("REDIS_URL", "redis://localhost:6379/0")

# Initialize the Celery app
celery_app = Celery(
    "tasks",
    broker=redis_url,
    backend=redis_url,
    include=[
        "app.tasks.nlp_tasks",
        "app.tasks.ingestion_tasks"
    ]  # Point to our future tasks file
)

celery_app.conf.beat_schedule={
    'fetch-articles-every-hour':{
        'task': 'app.tasks.ingestion_tasks.fetch_and_store_articles_task',
        'schedule': 60.0,  # Every hour
    },
}

celery_app.conf.update(
    task_track_started=True,
)