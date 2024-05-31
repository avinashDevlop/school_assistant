import React, { useState, useEffect } from "react";
import Avatar from "./Avatar";
import "./chatListItems.css";

const ChatListItems = ({ name, animationDelay, active, isOnline, onClick, timestamp }) => {
  const [timeAgo, setTimeAgo] = useState("");

  useEffect(() => {
    const calculateTimeAgo = () => {
      const now = new Date();
      const messageTime = new Date(timestamp);

      if (isNaN(messageTime.getTime())) {
        console.error("Invalid timestamp:", timestamp);
        setTimeAgo("Invalid date");
        return;
      }

      const differenceInMinutes = Math.floor((now - messageTime) / (1000 * 60));

      if (differenceInMinutes < 1) {
        setTimeAgo("Just now");
      } else if (differenceInMinutes < 60) {
        setTimeAgo(`${differenceInMinutes} minutes ago`);
      } else {
        const differenceInHours = Math.floor(differenceInMinutes / 60);
        if (differenceInHours < 24) {
          setTimeAgo(`${differenceInHours} hours ago`);
        } else {
          const differenceInDays = Math.floor(differenceInHours / 24);
          setTimeAgo(`${differenceInDays} days ago`);
        }
      }
    };

    calculateTimeAgo();
    const intervalId = setInterval(calculateTimeAgo, 60000);

    return () => clearInterval(intervalId);
  }, [timestamp]);

  return (
    <div
      style={{ animationDelay: `0.${animationDelay}s` }}
      onClick={onClick}
      className={`chatlist__item ${active ? "active" : ""}`}
    >
      <Avatar isOnline={isOnline} />
      <div className="userMeta">
        <p>{name}</p>
        <span className="activeTime">{timeAgo}</span>
      </div>
    </div>
  );
};

export default ChatListItems;