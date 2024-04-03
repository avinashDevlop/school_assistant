import React, { useState, useEffect} from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { GoDotFill } from 'react-icons/go';
import { BiAlignLeft, BiAlignRight } from 'react-icons/bi';
import './navBarCSS.css';

const TopHeader = ({ onToggleSidebar }) => {
  
  const [dateTime, setDateTime] = useState(getCurrentDateTime());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDateTime(getCurrentDateTime());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  function getCurrentDateTime() {
    const now = new Date();
    const formattedTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const formattedDate = now.toLocaleDateString('en-US', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
    });
    return { time: formattedTime, date: ` ${formattedDate}` };
  }
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const handleToggleSidebar = () => {
    onToggleSidebar();
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <>
      <div className="header">
        <div className="left">
      <div className="title">School Assistant</div>
        <div className="icon1" onClick={handleToggleSidebar}>
        {isSidebarOpen ? <BiAlignLeft /> : <BiAlignRight />}
        </div>
        </div>

        <div className="center">
          Vignan Joel School, Koduru
        </div>
        <div className="right">
          <span className="icon2">
            <FaUserCircle />
          </span>
          <div className="dateTime">
            <div className="live">
              <span>
                <GoDotFill className="liveDot" />
              </span>
              <span className="time">{dateTime.time}</span>
            </div>
            <span className="date">{dateTime.date}</span>
          </div>
        </div>
      </div>
    </>
  );
};
export default TopHeader;
