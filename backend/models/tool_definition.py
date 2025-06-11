from typing import List, Dict, Any
from pydantic import BaseModel, HttpUrl

class ToolParameter(BaseModel):
    name: str
    description: str
    type: str # e.g., "string", "integer", "list[string]"
    required: bool = True

class N8NToolDefinition(BaseModel):
    id: str  # A unique identifier for the tool, e.g., "seo_keyword_generator"
    name: str  # A user-friendly name, e.g., "SEO Keyword Generator"
    description: str # A description of what the tool does
    webhook_url: HttpUrl
    input_schema: List[ToolParameter] # Defines the expected input parameters
    # We might add output_schema later