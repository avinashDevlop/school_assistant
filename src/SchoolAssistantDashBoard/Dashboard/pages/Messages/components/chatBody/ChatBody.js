import React, { Component } from "react";
import "./chatBody.css";
import ChatList from "../chatList/ChatList";
import ChatContent from "../chatContent/ChatContent";

export default class ChatBody extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedChat: null,
    };
  }

  handleChatSelect = (chat) => {
    this.setState({ selectedChat: chat });
  };

  render() {
    return (
      <div className="main__chatbody">
        <ChatList onChatSelect={this.handleChatSelect} />
        <ChatContent selectedChat={this.state.selectedChat} />
      </div>
    );
  }
}
