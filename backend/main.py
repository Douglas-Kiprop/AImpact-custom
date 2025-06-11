from fastapi import FastAPI
from dotenv import load_dotenv
import os

# Import the chat router
from backend.api.routers import chat
from backend.api.routers import webhook # Add this import

# Load environment variables from .env file
load_dotenv()

app = FastAPI(
    title="AImpact API",
    description="API for AImpact, integrating FastAPI with n8n and AI services.",
    version="0.1.0",
)

# Include the chat router
app.include_router(chat.router, prefix="/api/v1", tags=["Chat"])
app.include_router(webhook.router, prefix="/api/v1/webhooks", tags=["Webhooks"]) # Add this line

@app.get("/", tags=["Root"])
async def read_root():
    app_name = os.getenv("APP_NAME", "My FastAPI App") # Default if not found
    return {"message": f"Welcome to {app_name} API"}

# If you want to run this directly using `python backend/main.py` (though uvicorn is preferred for dev)
# import uvicorn
# if __name__ == "__main__":
#     uvicorn.run(app, host="0.0.0.0", port=8000)