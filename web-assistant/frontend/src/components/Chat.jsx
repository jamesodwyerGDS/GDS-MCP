import { useState, useRef, useEffect } from 'react';
import MessageList from './MessageList';
import SourceCard from './SourceCard';

function Chat({ selectedComponent, onToggleSidebar, sidebarOpen }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [threadId, setThreadId] = useState(null);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle component selection
  useEffect(() => {
    if (selectedComponent) {
      setInput(`Tell me about the ${selectedComponent.name} component`);
    }
  }, [selectedComponent]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = {
      role: 'user',
      content: input,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: input,
          threadId
        })
      });

      const data = await response.json();

      if (response.ok) {
        setThreadId(data.threadId);

        const assistantMessage = {
          role: 'assistant',
          content: data.response,
          sources: data.sources || [],
          timestamp: data.timestamp
        };

        setMessages(prev => [...prev, assistantMessage]);
      } else {
        throw new Error(data.error || 'Failed to get response');
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, {
        role: 'error',
        content: `Error: ${error.message}`,
        timestamp: new Date().toISOString()
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/50">
      {/* Header with Gradient */}
      <header className="bg-gradient-to-r from-neptune to-blue-600 text-white px-6 py-5 shadow-lg">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <button
              onClick={onToggleSidebar}
              className="p-2 hover:bg-white/20 rounded-lg transition-all duration-200 backdrop-blur-sm"
              title={sidebarOpen ? 'Hide components' : 'Show components'}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                GDS Design Assistant
              </h1>
              <p className="text-sm text-blue-100 mt-0.5">Ask me about components, design tokens, and guidelines</p>
            </div>
          </div>
          {threadId && (
            <button
              onClick={() => {
                setMessages([]);
                setThreadId(null);
              }}
              className="px-4 py-2 text-sm bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg transition-all duration-200 flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              New Conversation
            </button>
          )}
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-8">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center px-4">
            {/* Decorative Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
              <div className="absolute top-20 left-10 w-72 h-72 bg-neptune/20 rounded-full blur-3xl"></div>
              <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-300/20 rounded-full blur-3xl"></div>
            </div>

            {/* Welcome Content */}
            <div className="relative z-10 max-w-3xl">
              <div className="bg-gradient-to-br from-neptune/20 to-indigo-500/20 backdrop-blur-sm rounded-3xl p-8 mb-6 shadow-xl border border-white/50">
                <div className="bg-white rounded-2xl p-6 mb-4 inline-block shadow-lg">
                  <svg className="w-16 h-16 text-neptune" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-cosmos mb-3">Welcome to GDS Design Assistant</h2>
                <p className="text-granite text-lg leading-relaxed">
                  Your AI-powered guide to the Global Design System. I can help you find component documentation,
                  design tokens, usage guidelines, and accessibility requirements.
                </p>
              </div>

              {/* Example Questions */}
              <div className="space-y-3">
                <p className="text-sm font-semibold text-granite uppercase tracking-wide mb-4">Try asking me:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    { icon: '🎨', text: 'Show me the button component' },
                    { icon: '🎯', text: 'What is the neptune color token?' },
                    { icon: '📝', text: 'How do I use input fields?' },
                    { icon: '📏', text: 'What spacing tokens are available?' }
                  ].map((example, i) => (
                    <button
                      key={i}
                      onClick={() => setInput(example.text)}
                      className="group px-5 py-4 text-left bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-xl hover:border-neptune hover:bg-white hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{example.icon}</span>
                        <span className="text-sm font-medium text-granite group-hover:text-neptune transition-colors">
                          {example.text}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Feature Pills */}
              <div className="flex flex-wrap justify-center gap-2 mt-8">
                {['Fast Responses', 'Source Citations', '180+ Components', 'Design Tokens'].map((feature, i) => (
                  <span key={i} className="px-4 py-2 bg-white/60 backdrop-blur-sm text-xs font-medium text-granite rounded-full border border-gray-200">
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <MessageList messages={messages} />
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Enhanced Input Area */}
      <div className="border-t border-gray-200 bg-white/80 backdrop-blur-lg px-6 py-5 shadow-2xl">
        <div className="max-w-4xl mx-auto">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about components, tokens, or guidelines..."
                className="w-full px-5 py-4 pr-12 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-neptune focus:border-transparent resize-none shadow-sm bg-white transition-all duration-200"
                rows="2"
                disabled={loading}
              />
              {input && (
                <button
                  onClick={() => setInput('')}
                  className="absolute right-3 top-3 p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
                  title="Clear"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              className="px-8 py-4 bg-gradient-to-r from-neptune to-blue-600 text-white rounded-xl hover:shadow-lg disabled:from-gray-300 disabled:to-gray-300 disabled:cursor-not-allowed transition-all duration-200 font-semibold transform hover:scale-105 disabled:transform-none flex items-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Thinking...</span>
                </>
              ) : (
                <>
                  <span>Send</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
