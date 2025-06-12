import requests
import json
import os

def test_chat_endpoint():
    # Configuration
    base_url = os.getenv("API_BASE_URL")
    headers = {"Content-Type": "application/json"}
    session_id = None  # Initialize session_id

    # --- Turn 1: Initial request to trigger SEO Keyword Generator tool ---
    print("\n--- Turn 1: Initial Tool Call Request ---")
    payload_turn1 = {"message": "Generate SEO keywords for a blog post about 'sustainable living'."}
    try:
        response_turn1 = requests.post(base_url, data=json.dumps(payload_turn1), headers=headers)
        response_turn1.raise_for_status()  # Raise an exception for HTTP errors
        response_data_turn1 = response_turn1.json()
        print("Turn 1 Response:", response_data_turn1)
        if 'session_id' in response_data_turn1:
            session_id = response_data_turn1['session_id']
            print(f"Captured Session ID: {session_id}")
    except requests.exceptions.RequestException as e:
        print(f"Turn 1 Request failed: {e}")
        if response_turn1.text:
            print("Turn 1 Response Text (Error):\n" + response_turn1.text)
        return # Exit if initial request fails

    if not session_id:
        print("Error: No session_id received in Turn 1. Cannot continue multi-turn conversation.")
        return

    # --- Turn 2: Provide answers to follow-up questions ---
    print("\n--- Turn 2: Providing Follow-up Answers ---")
    follow_up_message = (
        "The blog post is about eco-friendly practices for daily life. "
        "Goals are to educate readers and encourage adoption of sustainable habits. "
        "Pain points include confusion about what to do and perceived high costs. "
        "Current solutions involve recycling and reducing plastic. "
        "Target audience is beginners interested in sustainability."
    )
    payload_turn2 = {"message": follow_up_message, "session_id": session_id}
    try:
        response_turn2 = requests.post(base_url, data=json.dumps(payload_turn2), headers=headers)
        response_turn2.raise_for_status()  # Raise an exception for HTTP errors
        response_data_turn2 = response_turn2.json()
        print("Turn 2 Response:", response_data_turn2)
    except requests.exceptions.RequestException as e:
        print(f"Turn 2 Request failed: {e}")
        if response_turn2.text:
            print("Turn 2 Response Text (Error):\n" + response_turn2.text)

    # --- Test case 3: General conversation (optional, for separate testing) ---
    

if __name__ == "__main__":
    test_chat_endpoint()