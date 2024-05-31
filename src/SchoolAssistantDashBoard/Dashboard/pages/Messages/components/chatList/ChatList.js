import React, { Component } from "react";
import axios from 'axios';
import "./chatList.css";
import ChatListItems from "./ChatListItems";

class ChatList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allChats: [],
      searchTerm: "",
      loadingSections: false,
    };
  }

  componentDidMount() {
    const allChatClasses = [
      { id: 0, name: "All Classes", isOnline: true },
      { id: 1, name: "All Teachers", isOnline: true },
      { id: 2, name: "10th Class", isOnline: true },
      { id: 3, name: "9th Class", isOnline: true },
      { id: 4, name: "8th Class", isOnline: false },
      { id: 5, name: "7th Class", isOnline: true },
      { id: 6, name: "6th Class", isOnline: false },
      { id: 7, name: "5th Class", isOnline: true },
      { id: 8, name: "4th Class", isOnline: true },
      { id: 9, name: "3rd Class", isOnline: false },
      { id: 10, name: "2nd Class", isOnline: true },
      { id: 11, name: "1st Class", isOnline: false },
      { id: 12, name: "UKG", isOnline: true },
      { id: 13, name: "LKG", isOnline: false },
      { id: 14, name: "Pre-K", isOnline: true }
    ];
    this.setState({ allChats: allChatClasses });
    this.fetchSections(allChatClasses);
  }

  fetchSections = async (allChatClasses) => {
    try {
      this.setState({ loadingSections: true });
      const updatedChats = [];
      
      for (const chatClass of allChatClasses) {
        const response = await axios.get(
          `https://studentassistant-18fdd-default-rtdb.firebaseio.com/admissionForms/${chatClass.name}.json`
        );
        const data = response.data || {};
        const sections = Object.keys(data);

        for (const section of sections) {
          updatedChats.push({
            id: `${chatClass.id}-${section}`,
            name: `${chatClass.name} / ${section}`,
            isOnline: chatClass.isOnline,
            timestamp: new Date().toISOString()
          });
        }
        if(chatClass.id===0){
          updatedChats.push({
            id: `${chatClass.id}`,
            name: `${chatClass.name}`,
            isOnline: chatClass.isOnline,
            timestamp: new Date().toISOString()
          });
        }
        if(chatClass.id===1){
          updatedChats.push({
            id: `${chatClass.id}`,
            name: `${chatClass.name}`,
            isOnline: chatClass.isOnline,
            timestamp: new Date().toISOString()
          });
        }
        
      }

      this.setState({
        allChats: updatedChats,
        loadingSections: false
      });
    } catch (error) {
      console.error("Error fetching sections:", error);
      this.setState({ loadingSections: false });
    }
  };

  handleSearch = (event) => {
    this.setState({ searchTerm: event.target.value });
  };

  handleChatSelect = (chat) => {
    const updatedChats = this.state.allChats.map((item) =>
      item.id === chat.id ? { ...item, active: true } : { ...item, active: false }
    );
    this.setState({ allChats: updatedChats });
    if (this.props.onChatSelect) {
      this.props.onChatSelect(chat);
    }
  };

  getFilteredChats = () => {
    const { allChats, searchTerm } = this.state;

    const searchTermLower = searchTerm.toLowerCase();

    const filteredChats = allChats.filter((chat) =>
      chat.name.toLowerCase().includes(searchTermLower)
    );

    const includesAllClasses = filteredChats.some(chat => chat.name.toLowerCase() === "all classes");
    const includesAllTeachers = filteredChats.some(chat => chat.name.toLowerCase() === "all teachers");

    if (!includesAllClasses) {
      const allClasses = allChats.find(chat => chat.name.toLowerCase() === "all classes");
      if (allClasses) {
        filteredChats.unshift(allClasses);
      }
    }

    if (!includesAllTeachers) {
      const allTeachers = allChats.find(chat => chat.name.toLowerCase() === "all teachers");
      if (allTeachers) {
        filteredChats.unshift(allTeachers);
      }
    }

    return filteredChats;
  };

  render() {
    const { loadingSections } = this.state;
    const filteredChats = this.getFilteredChats();

    return (
      <div className="main__chatlist">
        <div className="chatlist__heading">
          <h2 className="studchat">Class Chats</h2>
        </div>
        <div className="chatList__search">
          <div className="search_wrap">
            <input
              type="text"
              placeholder="Search Here"
              value={this.state.searchTerm}
              onChange={this.handleSearch}
              required
            />
          </div>
        </div>
        <div className="chatlist__items">
          {loadingSections ? (
            <p>Loading chats...</p>
          ) : (
            filteredChats.map((item, index) => (
              <ChatListItems
                name={item.name}
                key={item.id}
                animationDelay={index + 1}
                active={item.active ? "active" : ""}
                isOnline={item.isOnline ? "active" : ""}
                onClick={() => this.handleChatSelect(item)}
                timestamp={item.timestamp}
              />
            ))
          )}
        </div>
      </div>
    );
  }
}

export default ChatList;