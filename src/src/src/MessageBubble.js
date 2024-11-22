import React from 'react';
import { User, Bot } from 'lucide-react';

const MessageBubble = ({ message, sender }) => (
  <div
    className={`flex items-start gap-3 animate-fadeIn ${
      sender === 'user' ? 'flex-row-reverse' : ''
    }`}
  >
    <div
      className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center 
      ${sender === 'user' ? 'bg-amber-700' : 'bg-amber-900'}
      shadow-lg transform hover:scale-105 transition-transform duration-200`}
    >
      {sender === 'user' ? (
        <User size={24} className="text-cream-50" />
      ) : (
        <Bot size={24} className="text-cream-50" />
      )}
    </div>
    <div
      className={`relative p-5 rounded-2xl shadow-xl max-w-[80%]
      ${
        sender === 'user'
          ? 'bg-gradient-to-r from-amber-700 to-amber-600 text-cream-50 rounded-tr-none'
          : 'bg-gradient-to-r from-cream-100 to-cream-50 text-gray-800 rounded-tl-none'
      }
      border border-opacity-10 backdrop-blur-sm`}
    >
      {message}
    </div>
  </div>
);

export default MessageBubble;
