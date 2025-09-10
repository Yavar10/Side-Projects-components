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
      const response = await fetch(import.meta.env.VITE_API_KEY, res);
      const text = await response.text();
      const data = text ? JSON.parse(text) : {};
      if (!response.ok) throw new Error(data.error?.message || "Something went wrong");
      // Gemini's response structure: data.candidates[0].content.parts[0].text
      return data.candidates?.[0]?.content?.parts?.[0]?.text || "No response.";
  }
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const updatedMessages = [...messages, { sender: 'user', text: input }];
    setMessages(updatedMessages);

    // Add a placeholder bot message
    setMessages(msgs => [...msgs, { sender: 'bot', text: "Thinking...." }]);
    setInput('');

    // Get the bot response
    try {
      const reply = await genBresponse(updatedMessages);
      setMessages(msgs => {
        // Replace the last "Thinking...." bot message with the real reply
        const msgsCopy = [...msgs];
        const lastBotIdx = msgsCopy.map(m => m.sender).lastIndexOf('bot');
        if (lastBotIdx !== -1) {
          msgsCopy[lastBotIdx] = { sender: 'bot', text: reply };
        }
        return msgsCopy;
      });
    } catch (err) {
      setMessages(msgs => {
        // Replace with error message
        const msgsCopy = [...msgs];
        const lastBotIdx = msgsCopy.map(m => m.sender).lastIndexOf('bot');
        if (lastBotIdx !== -1) {
          msgsCopy[lastBotIdx] = { sender: 'bot', text: "Sorry, I couldn't get a response." };
        }
        return msgsCopy;
      });
    }
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
