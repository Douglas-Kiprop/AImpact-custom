import os
from typing import Dict, Optional, List
from backend.models.tool_definition import N8NToolDefinition, ToolParameter

class ToolRegistryService:
    def __init__(self):
        self._tools: Dict[str, N8NToolDefinition] = {}
        self._initialize_tools()

    def _initialize_tools(self):
        # Define the SEO Keyword Generator tool based on your input
        seo_keyword_tool = N8NToolDefinition(
            id="seo_keyword_generator",
            name="SEO Keyword Generator",
            description="Generates SEO keywords based on product details, pain points, goals, current solutions, and customer expertise level.",
            webhook_url=os.getenv("N8N_WEBHOOK_URL"), # Corrected to use environment variable
            input_schema=[
                ToolParameter(name="product", description="Details of the intended product.", type="string"),
                ToolParameter(name="pain_points", description="List of customer pain points.", type="string"),
                ToolParameter(name="goals", description="List of customer key goals/objectives.", type="string"),
                ToolParameter(name="current_solutions", description="How the ideal customer currently solves their pain points.", type="string"),
                ToolParameter(name="expertise_level", description="Customer's level of expertise.", type="string"),
            ]
        )
        self.register_tool(seo_keyword_tool)

        # Register other tools here in the future
        # Example:
        # other_tool = N8NToolDefinition(...)
        # self.register_tool(other_tool)

    def register_tool(self, tool: N8NToolDefinition):
        if tool.id in self._tools:
            # Handle duplicate tool registration if necessary (e.g., log a warning, raise an error)
            print(f"Warning: Tool with id '{tool.id}' is already registered. Overwriting.")
        self._tools[tool.id] = tool
        print(f"Tool '{tool.name}' registered.")

    def get_tool(self, tool_id: str) -> Optional[N8NToolDefinition]:
        return self._tools.get(tool_id)

    def list_tools(self) -> List[N8NToolDefinition]:
        return list(self._tools.values())

# Example of how it might be instantiated (e.g., in main.py or a dependencies file later)
# tool_registry = ToolRegistryService()
# seo_tool = tool_registry.get_tool("seo_keyword_generator")
# if seo_tool:
#     print(f"Found tool: {seo_tool.name}, Webhook: {seo_tool.webhook_url}")

    def register_n8n_tool(self, tool_definition: N8NToolDefinition):
        tool_info = {
            "id": tool_definition.id,
            "name": tool_definition.name,
            "description": tool_definition.description,
            "webhook_url": os.getenv("N8N_WEBHOOK_URL"),
            "input_schema": tool_definition.input_schema
        }