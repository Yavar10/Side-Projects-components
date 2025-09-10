import { useEffect, useState } from 'react';
import LavenderChatPopup from './components/LavenderChatPopup';
import './Home.css';

const App = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <div className="home">
      <div className={`home-content ${visible ? 'visible' : ''}`}>
        <h1>Lavender</h1>
        <p>Your AI Companion</p>
        <div className="arrow-hint">
          <p>Click to start chatting!</p>
        </div>
      </div>
      <LavenderChatPopup />
    </div>
  );
};

export default App;
