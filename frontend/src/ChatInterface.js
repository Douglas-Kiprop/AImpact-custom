import React, { useState, useEffect } from 'react';

function ChatInterface() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [currentTaskDescription, setCurrentTaskDescription] = useState('');

  // Dynamic task descriptions that rotate
  const taskDescriptions = [
    "Generate SEO keywords for your content strategy",
    "Analyze Google Trends for market insights", 
    "Create compelling cold email campaigns",
    "Extract valuable data from any website",
    "Build comprehensive marketing strategies",
    "Research competitors and market opportunities",
    "Generate product descriptions and copy",
    "Analyze social media trends and engagement"
  ];

  // Rotate task descriptions every 3 seconds
  useEffect(() => {
    let index = 0;
    setCurrentTaskDescription(taskDescriptions[0]);
    
    const interval = setInterval(() => {
      index = (index + 1) % taskDescriptions.length;
      setCurrentTaskDescription(taskDescriptions[index]);
    }, 3000);

    return () => clearInterval(interval);
  }, [taskDescriptions]); // Fixed ESLint warning by adding taskDescriptions to dependency array

  const handleSendMessage = async () => {
    if (input.trim()) {
      const userMessage = { text: input, sender: 'user', timestamp: new Date() };
      setMessages(prev => [...prev, userMessage]);
      setInput('');
      
      // TODO: Integrate with backend API and agent
      // const response = await fetch('/api/v1/message', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ message: input })
      // });
      // const data = await response.json();
      // setMessages(prev => [...prev, { text: data.response, sender: 'ai', timestamp: new Date() }]);
    }
  };

  // Handler for n8n workflow buttons
  const handleWorkflowButton = (workflow, prompt) => {
    setInput(prompt);
    // Auto-send for better UX
    setTimeout(() => {
      handleSendMessage();
    }, 100);
  };

  if (messages.length > 0) {
    // Full chat interface when messages exist
    return (
      <div className="min-h-screen bg-black text-white relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-black to-slate-900"></div>
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10 flex flex-col h-screen">
          {/* Header */}
          <div className="bg-black/40 backdrop-blur-xl border-b border-white/10 p-4">
            <div className="flex items-center justify-between max-w-6xl mx-auto">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">AI</span>
                </div>
                <h2 className="text-xl font-semibold text-white">AImpact Super Agent</h2>
              </div>
              <button 
                onClick={() => setMessages([])}
                className="text-gray-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="max-w-4xl mx-auto space-y-6">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-3 max-w-2xl ${msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    {/* Avatar */}
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      msg.sender === 'user' 
                        ? 'bg-gradient-to-r from-blue-500 to-cyan-500' 
                        : 'bg-gradient-to-r from-purple-500 to-pink-500'
                    }`}>
                      <span className="text-white text-xs font-bold">
                        {msg.sender === 'user' ? 'U' : 'AI'}
                      </span>
                    </div>
                    
                    {/* Message */}
                    <div className={`px-6 py-4 rounded-2xl backdrop-blur-xl border ${
                      msg.sender === 'user'
                        ? 'bg-blue-500/20 border-blue-500/30 text-white'
                        : 'bg-white/10 border-white/20 text-white'
                    }`}>
                      <p className="text-sm leading-relaxed">{msg.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Input Area */}
          <div className="bg-black/40 backdrop-blur-xl border-t border-white/10 p-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center space-x-4">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    className="w-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl px-6 py-4 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200"
                    placeholder="Continue the conversation..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleSendMessage();
                      }
                    }}
                  />
                </div>
                <button 
                  onClick={handleSendMessage}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white p-4 rounded-2xl transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-blue-500/25"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Landing interface when no messages
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-black to-slate-900"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        {/* Main Title */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mr-4">
              <span className="text-white font-bold text-lg">AI</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
              AImpact Super Agent
            </h1>
          </div>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Your intelligent marketing companion powered by advanced AI workflows
          </p>
        </div>

        {/* Simple Rounded Glass Suggestion Pills */}
        <div className="flex flex-wrap justify-center gap-3 mb-12 max-w-4xl">
          <button
            onClick={() => handleWorkflowButton('seo', 'Help me generate SEO keywords for my content')}
            className="px-6 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full text-white text-sm font-medium hover:bg-white/20 hover:border-white/30 transition-all duration-200 hover:scale-105"
          >
            Generate SEO Keywords
          </button>
          <button
            onClick={() => handleWorkflowButton('trends', 'Analyze Google Trends data for market insights')}
            className="px-6 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full text-white text-sm font-medium hover:bg-white/20 hover:border-white/30 transition-all duration-200 hover:scale-105"
          >
            Google Trends Scraping
          </button>
          <button
            onClick={() => handleWorkflowButton('email', 'Create a cold email campaign strategy')}
            className="px-6 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full text-white text-sm font-medium hover:bg-white/20 hover:border-white/30 transition-all duration-200 hover:scale-105"
          >
            Cold Email
          </button>
          <button
            onClick={() => handleWorkflowButton('chat', 'Let\'s have a conversation about your business needs')}
            className="px-6 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full text-white text-sm font-medium hover:bg-white/20 hover:border-white/30 transition-all duration-200 hover:scale-105"
          >
            AI Chat
          </button>
        </div>

        {/* Main Chat Input */}
        <div className="w-full max-w-4xl mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 rounded-3xl blur-xl"></div>
            <div className="relative bg-black/40 backdrop-blur-2xl rounded-3xl p-8 border border-white/10">
              <div className="flex items-center space-x-4">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    className="w-full bg-white/5 backdrop-blur-xl border border-white/20 rounded-2xl px-8 py-6 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200 text-lg"
                    placeholder="Ask anything, create anything..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleSendMessage();
                      }
                    }}
                  />
                </div>
                
                {/* Voice Input Button */}
                <button className="bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/20 text-white p-4 rounded-2xl transition-all duration-200 hover:scale-105 group">
                  <svg className="w-6 h-6 group-hover:text-blue-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                </button>

                {/* Send Button */}
                <button 
                  onClick={handleSendMessage}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white p-4 rounded-2xl transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-blue-500/25 group"
                >
                  <svg className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>

              {/* Capabilities indicator */}
              <div className="flex items-center justify-center mt-6 space-x-3">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse delay-200"></div>
                  <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse delay-400"></div>
                </div>
                <p className="text-gray-400 text-sm">Powered by advanced AI workflows</p>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Task Description */}
        <div className="w-full max-w-3xl">
          <div className="bg-white/5 backdrop-blur-xl hover:bg-white/10 border border-white/10 rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02] group cursor-default">
            <div className="flex items-center justify-center space-x-3">
              <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
              <span className="text-gray-300 text-center font-medium group-hover:text-white transition-colors">
                "{currentTaskDescription}"
              </span>
              <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full animate-pulse delay-500"></div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
          <p className="text-gray-500 text-xs">
            Built with ❤️ for the bolt.new hackathon
          </p>
        </div>
      </div>
    </div>
  );
}

export default ChatInterface;