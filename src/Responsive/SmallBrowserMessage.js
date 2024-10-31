import React, { useState, useEffect } from 'react';
import { BsArrowsFullscreen } from 'react-icons/bs';
import './SmallBrowserMessage.css'; // CSS file for styling

const SmallBrowserMessage = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={`small-browser-message ${windowWidth < 500 ? 'visible' : 'hidden'}`}>
      <div className="message-container">
      <BsArrowsFullscreen className="fullscreen-icon" />
        <div className="message">Your browser window is too small. Please resize to at least 1100px wide.</div>
      </div>
    </div>
  );
};

export default SmallBrowserMessage;
