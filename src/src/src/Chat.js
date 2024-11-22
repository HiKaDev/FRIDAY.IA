import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, MessageCircle } from 'lucide-react';
import MessageBubble from './MessageBubble';

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    setLoading(true);
    setError(null);
    setMessages((prev) => [...prev, { text: input, sender: 'user' }]);
    setInput('');

    try {
      const response = await fetch('/analisar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ texto: input }),
      });

      if (!response.ok) {
        throw new Error(`Erro: ${response.statusText}`);
      }

      const data = await response.json();
      setMessages((prev) => [...prev, {
        text: data.resposta || 'Resposta não disponível no momento.',
        sender: 'bot',
      }]);
    } catch (error) {
      console.error('Erro:', error);
      setError('Falha na conexão com o servidor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-cream-100 to-cream-50">
      <header className="p-6 bg-gradient-to-b from-cream-100 to-cream-50 shadow-md">
        <h1 className="text-2xl font-bold text-amber-900 text-center">Assistente IA</h1>
      </header>

      <main className="flex-1 overflow-y-auto p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.map((msg, idx) => (
            <MessageBubble key={idx} message={msg.text} sender={msg.sender} />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </main>

      {error && (
        <div className="p-4 max-w-4xl mx-auto">
          <div className="bg-red-200 text-red-800 p-4 rounded-lg shadow-md">
            <strong>Erro:</strong> {error}
          </div>
        </div>
      )}

      <form
        onSubmit={handleSend}
        className="p-6 bg-gradient-to-b from-cream-50 to-cream-100 shadow-lg"
      >
        <div className="max-w-4xl mx-auto flex gap-3 items-center bg-white rounded-2xl p-2 shadow-inner">
          <MessageCircle size={24} className="text-amber-700 ml-2" />
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 p-3 bg-transparent focus:outline-none"
            placeholder="Digite sua mensagem..."
            aria-label="Digite sua mensagem"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading}
            className="p-3 bg-amber-700 text-white rounded-xl hover:bg-amber-800 
              transform hover:scale-105 transition-all duration-200"
            aria-label="Enviar mensagem"
          >
            {loading ? (
              <Loader2 className="animate-spin w-6 h-6" />
            ) : (
              <Send className="w-6 h-6" />
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
