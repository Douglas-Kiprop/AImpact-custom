import time
from collections import defaultdict

class RateLimiterService:
    def __init__(self, limit: int = 5, window_seconds: int = 60):
        self.limit = limit
        self.window_seconds = window_seconds
        self.session_requests = defaultdict(lambda: {'count': 0, 'last_reset_time': time.time()})

    def check_and_increment(self, session_id: str) -> bool:
        current_time = time.time()
        session_data = self.session_requests[session_id]

        # If the window has passed, reset the count
        if current_time - session_data['last_reset_time'] > self.window_seconds:
            session_data['count'] = 0
            session_data['last_reset_time'] = current_time

        # Check if the limit is exceeded
        if session_data['count'] >= self.limit:
            return False
        
        # Increment the count and allow the request
        session_data['count'] += 1
        return True