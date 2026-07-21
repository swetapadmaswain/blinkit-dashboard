from celery import Celery
from app.config import settings

celery_app = Celery(
    "app.tasks",
    broker=settings.redis_url,
    backend=settings.redis_url,
    include=["app.tasks"]
)

@celery_app.task
def example_task():
    return "Hello from Celery"
