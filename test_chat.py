import requests
import json

def test_chat_endpoint():
    base_url = "http://localhost:8000/api/v1/message"

    # Test case 1: Trigger SEO Keyword Generator tool
    payload_tool_call = {"message": "Generate SEO keywords for a blog post about 'sustainable living'."}
    headers = {"Content-Type": "application/json"}

    print("\n--- Testing Tool Call ---")
    try:
        response_tool_call = requests.post(base_url, data=json.dumps(payload_tool_call), headers=headers)
        response_tool_call.raise_for_status()  # Raise an exception for HTTP errors
        print("Tool Call Response:", response_tool_call.json())
    except requests.exceptions.RequestException as e:
        print(f"Tool Call Request failed: {e}")
        if response_tool_call.text:
            print("Tool Call Response Text (Error):\n" + response_tool_call.text)

    # Test case 2: General conversation
    payload_general = {"message": "Hello, how are you today?"}

    print("\n--- Testing General Conversation ---")
    try:
        response_general = requests.post(base_url, data=json.dumps(payload_general), headers=headers)
        response_general.raise_for_status()  # Raise an exception for HTTP errors
        print("General Conversation Response:", response_general.json())
    except requests.exceptions.RequestException as e:
        print(f"General Conversation Request failed: {e}")
        if response_general.text:
            print("General Conversation Response Text (Error):\n" + response_general.text)

if __name__ == "__main__":
    test_chat_endpoint()