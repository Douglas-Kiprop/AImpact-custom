from pydantic import BaseModel
from typing import Optional, Dict, Any
import uuid
from datetime import datetime

class MessageBase(BaseModel):
    content: str
    role: str # e.g., "user", "assistant", "system"

class MessageCreate(MessageBase):
    session_id: Optional[uuid.UUID] = None

class Message(MessageBase):
    id: uuid.UUID
    session_id: uuid.UUID
    created_at: datetime
    metadata: Optional[Dict[str, Any]] = None

    class Config:
        orm_mode = True # Changed from from_attributes for Pydantic v2

class ChatSessionBase(BaseModel):
    pass # Potentially add user_id or other session-specific info later

class ChatSessionCreate(ChatSessionBase):
    pass

class ChatSession(ChatSessionBase):
    id: uuid.UUID
    created_at: datetime
    updated_at: datetime
    # user_id: Optional[uuid.UUID] = None # If linking to users

    class Config:
        orm_mode = True # Changed from from_attributes for Pydantic v2

# Example for a tool input, e.g., SEO Keyword Generation
class SEOKeywordRequest(BaseModel):
    topic: str
    target_audience: Optional[str] = None
    # Add other relevant fields for your n8n workflow

# Example for a tool output
class SEOKeywordResponse(BaseModel):
    keywords: list[str]
    # Add other relevant fields from your n8n workflow output


class ChatMessageBase(BaseModel):
    content: str
    role: str # e.g., "user", "assistant", "system"

class ChatMessageCreate(ChatMessageBase):
    session_id: Optional[uuid.UUID] = None

class ChatMessage(ChatMessageBase):
    id: uuid.UUID
    session_id: uuid.UUID
    created_at: datetime
    metadata: Optional[Dict[str, Any]] = None

    class Config:
        orm_mode = True # Changed from from_attributes for Pydantic v2

class ChatRequest(BaseModel):
    message: str
    session_id: Optional[uuid.UUID] = None