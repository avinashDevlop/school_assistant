import React, { useState, useEffect } from "react";
import { GrUserAdmin } from "react-icons/gr";

const ChatItem = ({ user, msg, animationDelay, timestamp }) => {
  const [timeAgo, setTimeAgo] = useState("");

  useEffect(() => {
    const calculateTimeAgo = () => {
      const now = new Date();
      const messageTime = new Date(timestamp);

      if (isNaN(messageTime)) {
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
      className={`chat__item ${user === "me" ? "" : "other"}`}
    >
      <div className="avatar">
        <GrUserAdmin />
      </div>
      <div className="chat__item__content">
        {msg && <p className="chat__msg" style={{ whiteSpace: 'pre-wrap' }}>{msg}</p>}
        <div className="chat__meta">
          <span>{timeAgo}</span>
        </div>
      </div>
    </div>
  );
};

export default ChatItem;