"""
Celery worker for background task execution
Run this to start the Celery worker process
"""
from app.tasks import celery_app

if __name__ == "__main__":
    celery_app.start()
