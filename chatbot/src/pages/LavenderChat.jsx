import { useEffect, useRef, useState } from 'react';
import { FaRobot, FaUser } from 'react-icons/fa';
import './LavenderChat.css';

const LavenderChat = () => {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hello! How can I help you today?' }
  ]);
  const genBresponse = async (history) => {
    // Map your messages to Gemini's expected format
    const geminiHistory = history.map(msg => ({
      role: msg.sender === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }]
    }));

    const res = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: geminiHistory })
    };
    try {
      const response = await fetch(import.meta.env.VITE_API_KEY, res);
      const text = await response.text();
      const data = text ? JSON.parse(text) : {};
      if (!response.ok) throw new Error(data.error?.message || "Something went wrong");
      console.log(data);
    } catch (err) {
      console.log(err.message);
    }
  }
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { sender: 'user', text: input }]);
    setTimeout(() => {
      setMessages(msgs => [...msgs, { sender: 'bot', text: "Thinking...." }]);
        genBresponse([...messages, { sender: "user", text: input }]);
    }, 700);
   
    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className="lavender-bg">
      <div className="lavender-chatbot-container">
        <div className="chat-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5em' }}>
          <FaRobot style={{ fontSize: '1.4em', color: '#e0c3fc' }} />
          Lavender ChatBot
        </div>
        <div className="chat-messages">
          {messages.map((msg, idx) => (
            <div key={idx} className={`chat-message ${msg.sender}`} style={{ display: 'flex', alignItems: 'center', gap: '0.5em' }}>
              {msg.sender === 'bot' ? (
                <FaRobot style={{ fontSize: '1.1em', color: '#5f4b8b' }} />
              ) : (
                <FaUser style={{ fontSize: '1.1em', color: '#3a2956' }} />
              )}
              <span>{msg.text}</span>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="chat-input-row">
          <input
            className="chat-input"
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button className="chat-send" onClick={handleSend}>Send</button>
        </div>
      </div>
    </div>
  );
};


export default LavenderChat;
