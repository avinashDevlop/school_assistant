import React, { Component, createRef } from "react";
import "./chatContent.css";
import Avatar from "../chatList/Avatar";
import ChatItem from "./ChatItem";
import { BsSend } from "react-icons/bs";
import { LuRefreshCcw } from "react-icons/lu";
import axios from 'axios';

export default class ChatContent extends Component {
  messagesEndRef = createRef(null);

  constructor(props) {
    super(props);
    this.state = {
      chat: [],
      msg: "",
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.selectedChat !== this.props.selectedChat) {
      this.loadChatMessages(this.props.selectedChat?.name);
    }

    if (prevState.chat.length !== this.state.chat.length) {
      this.scrollToBottom();
    }
  }

  componentDidMount() {
    this.scrollToBottom();
  }

  scrollToBottom = () => {
    if (this.messagesEndRef.current) {
      this.messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  formatTimestamp = (date) => {
    const pad = (num) => (num < 10 ? `0${num}` : num);
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())},${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
  };

  handleSendMessage = async () => {
    const { selectedChat } = this.props;
    if (!selectedChat) return;

    const timestamp = new Date();
    const formattedTimestamp = this.formatTimestamp(timestamp);
    const newMessage = {
      msg: this.state.msg.trim(),
      timestamp: timestamp.toISOString() // Keep ISO format for sorting
    };

    try {
      await axios.put(`https://studentassistant-18fdd-default-rtdb.firebaseio.com/chats/${selectedChat.name}/${formattedTimestamp}.json`, newMessage);
      this.setState(
        (prevState) => ({
          chat: [...prevState.chat, { ...newMessage, key: formattedTimestamp }],
          msg: "",
        }),
        this.scrollToBottom
      );
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  loadChatMessages = async (chatName) => {
    if (!chatName) {
      this.setState({ chat: [] });
      return;
    }
  
    try {
      const response = await axios.get(`https://studentassistant-18fdd-default-rtdb.firebaseio.com/chats/${chatName}.json`);
      let chatData = response.data ? Object.entries(response.data).map(([key, value]) => ({ ...value, key })) : [];
      
      // Sort chat messages by timestamp
      chatData.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
  
      this.setState({ chat: chatData }, this.scrollToBottom);
    } catch (error) {
      console.error("Error loading chat messages:", error);
    }
  };

  refreshChat = () => {
    const { selectedChat } = this.props;
    if (!selectedChat) return;

    this.loadChatMessages(selectedChat.name);
  };

  onStateChange = (e) => {
    this.setState({ msg: e.target.value });
  };

  handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey && this.state.msg.trim() !== "") {
      e.preventDefault();
      this.handleSendMessage();
    }
  };

  render() {
    return (
      <div className="main__chatcontent">
        <div className="content__header">
          <div className="blocks">
            <div className="current-chatting-user">
              <Avatar isOnline="active" />
              <p>{this.props.selectedChat?.name || "Select a chat"}</p>
            </div>
          </div>

          <div className="blocks">
            <div className="settings">
              <button className="btn-nobg" onClick={this.refreshChat}>
                <LuRefreshCcw size={24} color="#004567" />
              </button>
            </div>
          </div>
        </div>
        <div className="content__body">
          <div className="chat__items">
            {this.state.chat.map((itm, index) => (
              <ChatItem
                animationDelay={index + 2}
                key={itm.key}
                user={itm.type ? itm.type : "me"}
                msg={itm.msg}
                timestamp={itm.timestamp}
              />
            ))}
            <div ref={this.messagesEndRef} />
          </div>
        </div>
        <div className="content__footer">
          <div className="sendNewMessage">
            <textarea
              placeholder="Type a message here"
              onChange={this.onStateChange}
              onKeyDown={this.handleKeyDown}
              value={this.state.msg}
              rows="3"
            />
            <button
              className="btnSendMsg"
              id="sendMsgBtn"
              onClick={this.handleSendMessage}
            >
              <BsSend />
            </button>
          </div>
        </div>
      </div>
    );
  }
}
