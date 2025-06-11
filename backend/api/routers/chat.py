import uuid
from fastapi import APIRouter, Depends, HTTPException
from backend.agents.orchestrator import AIOrchestratorAgent
from backend.models.chat_session import ChatSession
from backend.api.schemas import ChatRequest
from backend.services.tool_registry_service import ToolRegistryService
from backend.tools.n8n_tool_handler import N8NToolHandler

router = APIRouter()

# Dependency to get a ToolRegistryService instance
def get_tool_registry_service():
    return ToolRegistryService()

# Dependency to get an AIOrchestratorAgent instance
def get_orchestrator_agent(
    tool_registry: ToolRegistryService = Depends(get_tool_registry_service)
):
    # The N8NToolHandler is now instantiated within process_message, so we don't pass it here.
    # We only need the tool_registry for the orchestrator agent to find tools.
    return AIOrchestratorAgent(
        tool_registry=tool_registry
    )


@router.post("/message")
async def message_endpoint(chat_request: ChatRequest, 
                           orchestrator_agent: AIOrchestratorAgent = Depends(get_orchestrator_agent)):
    # For now, we'll assume a default session ID or create one if not provided
    session_id = chat_request.session_id or uuid.uuid4()

    response_message = await orchestrator_agent.process_message(
        chat_request.message, 
        session_id
    )
    return {"response": response_message}