import os
import json
import uuid
from backend.services.tool_registry_service import ToolRegistryService
from backend.tools.n8n_tool_handler import N8NToolHandler
from backend.api.schemas import SEOKeywordRequest, SEOKeywordResponse
from google.cloud import aiplatform
from vertexai.preview.generative_models import GenerativeModel, Part, Tool as VertexTool, FunctionDeclaration
from backend.models.tool_definition import N8NToolDefinition

class AIOrchestratorAgent:
    def __init__(self, tool_registry: ToolRegistryService):
        self.tool_registry = tool_registry
        
        # Initialize Vertex AI with environment variables
        aiplatform.init(
            project=os.getenv("GCP_PROJECT_ID"),
            location=os.getenv("GCP_LOCATION")
        )
        
        self.model_tools = []
        self.model = GenerativeModel("gemini-2.0-flash-lite-001", tools=self.model_tools)
        
        self.system_prompt = """
        You are an AI assistant specialized in marketing and business intelligence. Your goal is to assist users by orchestrating various tools to fulfill their requests.
        You can generate SEO keywords, extract Google Trends data, and perform other tasks as tools become available.
        Always try to understand the user's intent and use the most appropriate tool. If a tool requires specific information not provided, ask the user for it.
        Be conversational and helpful.
        """
        self._register_tools()

    def _register_tools(self):
        # Define the SEO keyword generator tool for the LLM
        seo_keyword_tool_declaration = FunctionDeclaration(
            name="seo_keyword_generator",
            description="Generates SEO keywords based on product details, pain points, goals, current solutions, and customer expertise level.",
            parameters={
                "type": "object",
                "properties": {
                    "product": {"type": "string", "description": "Details of the intended product."},
                    "pain_points": {"type": "string", "description": "List of customer pain points."},
                    "goals": {"type": "string", "description": "List of customer key goals/objectives."},
                    "current_solutions": {"type": "string", "description": "How the ideal customer currently solves their pain points."},
                    "expertise_level": {"type": "string", "description": "Customer's level of expertise."}
                },
                "required": ["product", "pain_points", "goals", "current_solutions", "expertise_level"]
            },
        )
        
        # Create an N8NToolDefinition object
        seo_tool_definition = N8NToolDefinition(
            id="seo_keyword_generator",
            name="SEO Keyword Generator",
            description="Generates SEO keywords for a given topic and optional target audience.",
            webhook_url=os.getenv("N8N_WEBHOOK_URL"),
            input_schema=[]
        )

        # Register the tool with our internal ToolRegistryService
        self.tool_registry.register_tool(seo_tool_definition) # Pass the N8NToolDefinition object
        
        # Add the tool declaration to the model's tools
        self.model_tools.append(VertexTool(function_declarations=[seo_keyword_tool_declaration]))

    async def process_message(self, message_content: str, session_id: uuid.UUID) -> str:
        # Start a chat session with the model, providing the system prompt and tools
        chat = self.model.start_chat(history=[])
        
        # Send the user's message to the model
        response = chat.send_message(message_content) # Removed 'await'
        
        # Check if the model wants to call a tool
        if response.candidates and response.candidates[0].function_calls:
            function_call = response.candidates[0].function_calls[0]
            tool_name = function_call.name
            tool_args = {k: v for k, v in function_call.args.items()} # Convert to dict
            
            print(f"AI wants to call tool: {tool_name} with args: {tool_args}")
            
            try:
                # Retrieve the tool definition from the registry
                tool_definition = self.tool_registry.get_tool(tool_name)
                if not tool_definition:
                    return f"Error: Tool '{tool_name}' not found in registry."

                # Create an N8NToolHandler instance for this specific tool
                n8n_handler = N8NToolHandler(tool_definition)

                # Execute the tool via the N8NToolHandler
                tool_result = await n8n_handler.execute(input_data=tool_args) # Changed to .execute
                print(f"Tool execution result: {tool_result}")
                
                # Send the tool result back to the model to get a natural language response
                tool_response_part = Part.from_function_response(name=tool_name, response=tool_result)
                final_response = chat.send_message(tool_response_part) # REMOVED 'await' HERE
                
                return final_response.text
            except Exception as e:
                error_message = f"Error executing tool {tool_name}: {e}"
                print(error_message)
                # Optionally, send error back to model or return directly
                return f"I encountered an error while trying to fulfill your request: {error_message}"
        else:
            # If no tool call, the model generates a direct response
            return response.text