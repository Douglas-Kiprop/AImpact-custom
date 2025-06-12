import React, { useState } from 'react';

function ChatInterface() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: 'user' }]);
      setInput('');
      // In a real application, you would send this message to a backend
      // and receive a response, then add the AI's message to the state.
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-gray-100">
      {/* Header */}
      <div className="bg-black p-4 text-center text-xl font-bold border-b border-gray-700">
        AImpact Super Agent
      </div>

      {/* Messages Display Area */}
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-2 p-3 rounded-lg max-w-xs ${msg.sender === 'user' ? 'bg-gray-700 ml-auto' : 'bg-gray-800 mr-auto'}`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      {/* Input and Suggestions Area */}
      <div className="p-4 border-t border-gray-700 bg-black flex justify-center">
        {/* Suggestions will go here later */}
        <div className="flex w-full max-w-2xl">
          <input
            type="text"
            className="flex-1 p-3 rounded-l-lg bg-gray-700 border border-gray-600 focus:outline-none focus:border-gray-500 text-gray-100 placeholder-gray-400"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSendMessage();
              }
            }}
          />
          <button
            className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-r-lg focus:outline-none focus:shadow-outline"
            onClick={handleSendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatInterface;