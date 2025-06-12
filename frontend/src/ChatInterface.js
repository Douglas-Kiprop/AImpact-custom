import React, { useState } from 'react';

function ChatInterface() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: 'user' }]);
      setInput('');
      // TODO: Integrate with backend API to send message and receive AI response
      // This will connect to your FastAPI backend at /api/v1/message
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion);
  };

  // Handler for n8n workflow buttons - these will trigger specific AI agent capabilities
  const handleWorkflowButton = (workflow) => {
    console.log(`Triggering ${workflow} workflow`);
    // TODO: These buttons will integrate with your n8n workflows via the backend
    // Each button corresponds to a specific tool in your ToolRegistryService
    switch(workflow) {
      case 'seo':
        setInput('Generate SEO keywords for my content');
        break;
      case 'trends':
        setInput('Analyze Google Trends data');
        break;
      case 'email':
        setInput('Create a cold email campaign');
        break;
      default:
        break;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans relative overflow-hidden">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black opacity-50"></div>
      
      {/* Top-right browser tab */}
      <div className="absolute top-4 right-4 z-10">
        <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 shadow-lg hover:shadow-red-500/25">
          🔴 AImpact Browser
        </button>
      </div>

      {/* Hamburger menu */}
      <div className="absolute top-4 left-4 z-10">
        <button className="text-white hover:text-gray-300 transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        {/* Main Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight">
            AImpact Super Agent
          </h1>
          <div className="w-2 h-2 bg-red-600 rounded-full mx-auto animate-pulse"></div>
        </div>

        {/* Action Buttons Row */}
        <div className="flex flex-wrap justify-center gap-3 mb-8 max-w-4xl">
          <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 shadow-lg hover:shadow-red-500/25 hover:scale-105">
            New
          </button>
          <button 
            onClick={() => handleWorkflowButton('seo')}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 shadow-lg hover:shadow-red-500/25 hover:scale-105"
          >
            Generate SEO Keywords
          </button>
          <button 
            onClick={() => handleWorkflowButton('trends')}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 shadow-lg hover:shadow-red-500/25 hover:scale-105"
          >
            Google Trends Scraping
          </button>
          <button 
            onClick={() => handleWorkflowButton('email')}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 shadow-lg hover:shadow-red-500/25 hover:scale-105"
          >
            Cold Email
          </button>
          <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 shadow-lg hover:shadow-red-500/25 hover:scale-105">
            Download For Me
          </button>
          <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 shadow-lg hover:shadow-red-500/25 hover:scale-105">
            AI Chat
          </button>
          <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 shadow-lg hover:shadow-red-500/25 hover:scale-105">
            Call For Me
          </button>
          <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 shadow-lg hover:scale-105">
            All Agents
          </button>
        </div>

        {/* Chat Input Area */}
        <div className="w-full max-w-3xl mb-6">
          <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-gray-700/50">
            <div className="flex items-center space-x-4">
              <div className="flex-1 relative">
                <input
                  type="text"
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-xl px-6 py-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 text-lg"
                  placeholder="Ask anything, create anything"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleSendMessage();
                    }
                  }}
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg transition-all duration-200 hover:scale-105">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
              
              {/* Voice Input Button */}
              <button className="bg-gray-700 hover:bg-gray-600 text-white p-4 rounded-xl transition-all duration-200 hover:scale-105 shadow-lg">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              </button>

              {/* Send Button */}
              <button 
                onClick={handleSendMessage}
                className="bg-red-600 hover:bg-red-700 text-white p-4 rounded-xl transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-red-500/25"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>

            {/* Info Text */}
            <div className="flex items-center justify-center mt-4 space-x-2">
              <div className="flex space-x-1">
                <div className="w-4 h-4 bg-red-500 rounded-sm"></div>
                <div className="w-4 h-4 bg-blue-500 rounded-sm"></div>
                <div className="w-4 h-4 bg-yellow-500 rounded-sm"></div>
                <div className="w-4 h-4 bg-green-500 rounded-sm"></div>
              </div>
              <p className="text-gray-400 text-sm">AImpact supports personalized tools</p>
              <button className="text-gray-500 hover:text-gray-400 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Suggestion Panel */}
        <div className="w-full max-w-3xl">
          <button 
            onClick={() => handleSuggestionClick('Select Perfect Gifts $100-$200 on Amazon')}
            className="w-full bg-gray-800/60 backdrop-blur-sm hover:bg-gray-700/60 border border-gray-700/50 rounded-2xl p-4 text-left transition-all duration-200 hover:scale-[1.02] shadow-lg group"
          >
            <div className="flex items-center justify-between">
              <span className="text-white text-lg font-medium group-hover:text-red-400 transition-colors">
                💝 Select Perfect Gifts $100-$200 on Amazon
              </span>
              <svg className="w-5 h-5 text-gray-400 group-hover:text-red-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </button>
        </div>

        {/* Messages Display Area - Hidden when no messages */}
        {messages.length > 0 && (
          <div className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex flex-col">
            {/* Header */}
            <div className="bg-gray-900/90 backdrop-blur-sm p-4 border-b border-gray-700/50">
              <div className="flex items-center justify-between max-w-4xl mx-auto">
                <h2 className="text-xl font-bold text-white">AImpact Super Agent</h2>
                <button 
                  onClick={() => setMessages([])}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4">
              <div className="max-w-4xl mx-auto space-y-4">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-6 py-4 rounded-2xl shadow-lg ${
                        msg.sender === 'user'
                          ? 'bg-red-600 text-white'
                          : 'bg-gray-800 text-white border border-gray-700'
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{msg.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Input Area in Chat Mode */}
            <div className="bg-gray-900/90 backdrop-blur-sm p-4 border-t border-gray-700/50">
              <div className="max-w-4xl mx-auto flex items-center space-x-4">
                <input
                  type="text"
                  className="flex-1 bg-gray-800 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Continue the conversation..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleSendMessage();
                    }
                  }}
                />
                <button 
                  onClick={handleSendMessage}
                  className="bg-red-600 hover:bg-red-700 text-white p-3 rounded-xl transition-all duration-200 hover:scale-105"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatInterface;