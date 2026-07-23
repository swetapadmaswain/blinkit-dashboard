from fastapi import APIRouter
from app.tasks import scrape_google_play_task, scrape_app_store_task

router = APIRouter()

@router.post("/trigger")
async def trigger_ingestion():
    """Trigger review ingestion from all sources"""
    # Trigger Google Play scraping
    google_play_result = scrape_google_play_task.delay()
    
    # Trigger App Store scraping
    app_store_result = scrape_app_store_task.delay()
    
    return {
        "message": "Ingestion tasks triggered",
        "google_play_task_id": str(google_play_result.id),
        "app_store_task_id": str(app_store_result.id)
    }
