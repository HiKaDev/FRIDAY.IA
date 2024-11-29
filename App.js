import React, { useState } from 'react';
import './App.css';
import BotMessage from './components/BotMessage';
import UserMessage from './components/UserMessage';
import { FaRobot } from 'react-icons/fa';

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSendMessage = () => {
    if (input.trim()) {
      const userMessage = { sender: 'user', text: input };
      setMessages([...messages, userMessage]);
      setInput('');
      
      // Simula a resposta do agente (pode ser substituído por uma chamada à API)
      setTimeout(() => {
        const botResponse = { sender: 'bot', text: 'Estou aqui para ajudar com o Monday!' };
        setMessages((prevMessages) => [...prevMessages, botResponse]);
      }, 1000);
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <FaRobot className="bot-icon" />
        <h1>Monday Bot</h1>
      </header>
      <div className="chat-window">
        {messages.map((msg, index) => (
          msg.sender === 'user' ? <UserMessage key={index} text={msg.text} /> : <BotMessage key={index} text={msg.text} />
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Digite sua mensagem..."
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <button onClick={handleSendMessage}>Enviar</button>
      </div>
    </div>
  );
}

export default App;
