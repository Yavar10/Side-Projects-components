import { useState } from 'react';
import { FaRobot } from 'react-icons/fa';
import LavenderChat from '../pages/LavenderChat';
import './LavenderChatPopup.css';

const LavenderChatPopup = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className={`lavender-popup-modal${open ? ' open' : ''}`} style={{ pointerEvents: open ? 'auto' : 'none' }}>
        <div style={{ display: open ? 'block' : 'none', position: 'relative' }}>
          <LavenderChat />
          <button className="lavender-popup-close" onClick={() => setOpen(false)}>×</button>
        </div>
      </div>
      <button className="lavender-popup-btn" onClick={() => setOpen(true)}>
        <FaRobot style={{ fontSize: '1.5em' }} />
      </button>
    </>
  );
};

export default LavenderChatPopup;