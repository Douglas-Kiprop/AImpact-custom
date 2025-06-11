import httpx
from typing import Dict, Any, Optional

from backend.models.tool_definition import N8NToolDefinition

class N8NToolHandler:
    def __init__(self, tool_definition: N8NToolDefinition):
        self.tool_definition = tool_definition

    async def execute(self, input_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Executes the n8n tool by sending a POST request to its webhook URL.

        Args:
            input_data: A dictionary containing the data to be sent to the n8n workflow.
                        The keys should match the expected parameters of the n8n workflow.

        Returns:
            A dictionary containing the JSON response from the n8n webhook.
            Returns an error structure if the request fails.
        """
        # Validate input_data against self.tool_definition.input_schema (optional but recommended for robustness)
        # For now, we'll assume input_data is correctly structured.

        async with httpx.AsyncClient() as client:
            try:
                print(f"Executing tool: {self.tool_definition.name}")
                print(f"Webhook URL: {self.tool_definition.webhook_url}")
                print(f"Input data: {input_data}")
                
                response = await client.post(str(self.tool_definition.webhook_url), json=input_data, timeout=30.0) # 30 second timeout
                response.raise_for_status()  # Raises an HTTPStatusError for 4xx/5xx responses
                
                response_data = response.json()
                print(f"Tool '{self.tool_definition.name}' executed successfully. Response: {response_data}")
                return response_data
            except httpx.HTTPStatusError as e:
                print(f"HTTP error occurred while executing tool '{self.tool_definition.name}': {e.response.status_code} - {e.response.text}")
                return {"error": True, "status_code": e.response.status_code, "message": e.response.text}
            except httpx.RequestError as e:
                print(f"Request error occurred while executing tool '{self.tool_definition.name}': {str(e)}")
                return {"error": True, "message": f"Request failed: {str(e)}"}
            except Exception as e:
                print(f"An unexpected error occurred while executing tool '{self.tool_definition.name}': {str(e)}")
                return {"error": True, "message": f"An unexpected error occurred: {str(e)}"}

# Example Usage (conceptual - this would typically be called by an orchestrator/agent):
# async def main_example():
#     from backend.services.tool_registry_service import ToolRegistryService 
#     tool_registry = ToolRegistryService()
#     seo_tool_def = tool_registry.get_tool("seo_keyword_generator")

#     if seo_tool_def:
#         handler = N8NToolHandler(seo_tool_def)
#         # This data would come from user interaction via the AI agent
#         example_input = {
#             "product": "A new AI-powered writing assistant",
#             "pain_points": "Writer's block, time-consuming content creation",
#             "goals": "Increase writing productivity, improve content quality",
#             "current_solutions": "Manual research, existing basic grammar checkers",
#             "expertise_level": "Intermediate bloggers"
#         }
#         result = await handler.execute(example_input)
#         print("Execution Result:", result)
#     else:
#         print("SEO Keyword Generator tool not found.")

# if __name__ == "__main__":
#     import asyncio
#     asyncio.run(main_example())