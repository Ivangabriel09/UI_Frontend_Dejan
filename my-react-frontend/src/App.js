import React, { useState } from 'react';
import './App.css';

function App() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    // add user message
    setMessages(prev => [...prev, { from: 'user', text: input }]);
    try {
      const res = await fetch('http://localhost:5000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input })
      });
      const data = await res.json();
      setMessages(prev => [...prev, { from: 'bot', text: data.reply }]);
    } catch (err) {
      setMessages(prev => [...prev, { from: 'bot', text: 'Error contacting server.' }]);
    }
    setInput('');
  };

  return (
    <div className="chat-container">
      <h2>Chat with Flask Bot</h2>
      <div className="messages">
        {messages.map((m, i) => (
          <div key={i} className={`message ${m.from}`}>{m.text}</div>
        ))}
      </div>
      <form className="input-form" onSubmit={sendMessage}>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default App;
