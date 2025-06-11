from fastapi import APIRouter, Request, HTTPException, BackgroundTasks, Depends
from typing import Any, Dict

from backend.services.webhook_handler_service import webhook_handler_service, WebhookHandlerService

router = APIRouter()

@router.post("/n8n-callback", tags=["Webhooks"])
async def n8n_webhook_callback(
    request: Request,
    background_tasks: BackgroundTasks,
    # If you need to secure this webhook, you might add an API key check here
    # api_key: str = Depends(get_api_key), # Example dependency
    webhook_service: WebhookHandlerService = Depends(lambda: webhook_handler_service) # Dependency injection
):
    """
    Receives asynchronous callbacks from n8n workflows.
    """
    try:
        payload = await request.json()
    except Exception as e:
        print(f"Error decoding JSON: {e}")
        raise HTTPException(status_code=400, detail="Invalid JSON payload")

    print(f"n8n webhook received payload: {payload}")
    
    # It's good practice to process webhooks in the background to respond quickly to n8n
    background_tasks.add_task(webhook_service.process_webhook_data, payload, background_tasks)
    
    return {"status": "received", "message": "Webhook data is being processed."}

# Example for API Key Security (you'd define get_api_key elsewhere, e.g., in a security.py)
# async def get_api_key(api_key_header: str = Security(api_key_header)):
#     if api_key_header == "YOUR_SECRET_N8N_WEBHOOK_KEY": # Store this in .env
#         return api_key_header
#     raise HTTPException(
#         status_code=status.HTTP_403_FORBIDDEN, detail="Could not validate credentials"
#     )