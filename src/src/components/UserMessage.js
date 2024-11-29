import React from 'react';
import './UserMessage.css';

function UserMessage({ text }) {
  return (
    <div className="user-message">
      <p>{text}</p>
    </div>
  );
}

export default UserMessage;
