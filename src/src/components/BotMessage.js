import React from 'react';
import './BotMessage.css';

function BotMessage({ text }) {
  return (
    <div className="bot-message">
      <p>{text}</p>
    </div>
  );
}

export default BotMessage;
