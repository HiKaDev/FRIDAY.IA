import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, Loader2, Sparkles, Mic, Square } from 'lucide-react';

const ChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const chatEndRef = useRef(null);
  const [thinking, setThinking] = useState(false);

  const sendMessage = async (content) => {
    try {
      const response = await fetch('https://seu-backend.replit.app/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: content })
      });
      return (await response.json()).message;
    } catch (error) {
      return 'Desculpe, ocorreu um erro ao processar sua mensagem.';
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const simulateThinking = async () => {
    setThinking(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setThinking(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = {
      role: 'user',
      content: input,
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);
    
    await simulateThinking();
    const aiResponse = await sendMessage(input);
    
    const aiMessage = {
      role: 'assistant',
      content: aiResponse,
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, aiMessage]);
    setLoading(false);
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-blue-50 to-purple-50">
      <div className="max-w-4xl w-full mx-auto p-4 flex-1 flex flex-col">
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl flex-1 flex flex-col overflow-hidden border border-gray-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Bot className="w-8 h-8" />
                  <Sparkles className="w-4 h-4 absolute -top-1 -right-1 text-yellow-300 animate-pulse" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">AssistenteGPT</h1>
                  <p className="text-sm text-blue-100">Alimentado por IA avançada</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${thinking ? 'bg-green-400 animate-pulse' : 'bg-green-500'}`} />
                <span className="text-sm">{thinking ? 'Pensando...' : 'Online'}</span>
              </div>
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.length === 0 && (
              <div className="text-center">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <Bot className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Bem-vindo ao AssistenteGPT</h2>
                <p className="text-gray-600">Como posso ajudar você hoje?</p>
              </div>
            )}
            
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex items-start space-x-3 ${
                  message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                }`}
              >
                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                  message.role === 'user' 
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600' 
                    : 'bg-gradient-to-r from-purple-500 to-purple-600'
                }`}>
                  {message.role === 'user' ? 
                    <User className="w-6 h-6 text-white" /> : 
                    <Bot className="w-6 h-6 text-white" />
                  }
                </div>
                <div className={`flex flex-col space-y-1 max-w-[80%]`}>
                  <div className={`rounded-2xl p-4 shadow-sm ${
                    message.role === 'user' 
                      ? 'bg-blue-500 text-white rounded-tr-none' 
                      : 'bg-white text-gray-800 rounded-tl-none'
                  }`}>
                    {message.content}
                  </div>
                  <span className="text-xs text-gray-400">{message.timestamp}</span>
                </div>
              </div>
            ))}
            
            {loading && (
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div className="bg-white rounded-2xl rounded-tl-none p-4 shadow-sm">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input Form */}
          <div className="p-6 bg-white border-t border-gray-200">
            <form onSubmit={handleSubmit} className="flex space-x-3">
              <button
                type="button"
                onClick={toggleRecording}
                className={`p-3 rounded-full transition-colors duration-200 ${
                  isRecording 
                    ? 'bg-red-500 hover:bg-red-600' 
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                {isRecording ? <Square className="w-5 h-5 text-white" /> : <Mic className="w-5 h-5 text-gray-600" />}
              </button>
              
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Digite sua mensagem..."
                className="flex-1 bg-gray-100 rounded-full px-6 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow duration-200"
              />
              
              <button
                type="submit"
                disabled={loading}
                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-3 rounded-full hover:opacity-90 disabled:opacity-50 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                {loading ? 
                  <Loader2 className="w-5 h-5 animate-spin" /> :
                  <Send className="w-5 h-5" />
                }
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
