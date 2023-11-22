import React, { Component } from "react";
import SearchBox from "./searchbox";
import Profile from "./profile";
import Logout from "./logout";
import Chatslist from "./chatslist";
import { getChats, getMessages } from "../services/ChatService";
import ChatScreen from "./chatScreen";
import Settings from "./settings_button";

class HomeScreen extends Component {
  state = {
    id: "home",
    chats: [],
    searchQuery: "",
    message: "",
    old_messages: [],
  };

  componentDidMount() {
    const chats = getChats();
    const id = this.props.match.params.id;
    let old_messages = [];
    if (id !== "home") {
      old_messages = getMessages(id);
    }
    this.setState({ chats, id, old_messages });
  }

  handleSearch = (query) => {
    this.setState({
      searchQuery: query,
    });
  };

  handleChatitemClick = (item) => {
    const id = item._id;
    let old_messages = [];
    if (id !== "home") {
      old_messages = getMessages(id);
    }
    this.setState({ searchQuery: "", id, old_messages });
  };

  handleMessage = (message) => {
    this.setState({ message });
  };

  handleSubmit = () => {
    const old_messages = [...this.state.old_messages];

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // Note: Months are zero-based
    const day = currentDate.getDate();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();

    const current_message = {
      message: this.state.message,
      isSender: true,
      timestamp: `${day}-${month}-${year} ${hours}:${minutes}`,
    };
    old_messages.push(current_message);
    this.setState({ message: "", old_messages });
  };

  handleKeyDown = (event) => {
    if (event.key === "Enter") {
      const old_messages = [...this.state.old_messages];

      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1; // Note: Months are zero-based
      const day = currentDate.getDate();
      const hours = currentDate.getHours();
      const minutes = currentDate.getMinutes();

      const current_message = {
        message: this.state.message,
        isSender: true,
        timestamp: `${day}-${month}-${year} ${hours}:${minutes}`,
      };
      old_messages.push(current_message);
      this.setState({ message: "", old_messages });
    }
  };

  getFilteredData = () => {
    let filtered = this.state.chats;
    if (this.state.searchQuery) {
      filtered = this.state.chats.filter((m) =>
        m.chatName
          .toLowerCase()
          .startsWith(this.state.searchQuery.toLowerCase())
      );
    }
    return { data: filtered };
  };

  render() {
    const { data } = this.getFilteredData();
    return (
      <div className="container-fluid">
        <div className="row clearfix">
          <div className="col-1">
            <div className="chat-col-3">
              <div className="row-md-auto profile">
                <Profile />
              </div>
              <div className="row-md-auto settings">
                <Settings />
              </div>
              <div className="row-md-auto logout">
                <Logout />
              </div>
            </div>
          </div>
          <div className="col-3 clearfix chat-col-1">
            <SearchBox
              value={this.state.searchQuery}
              onChange={this.handleSearch}
            />
            <div className="row">
              <Chatslist items={data} onClick={this.handleChatitemClick} />
            </div>
          </div>
          <div className="col clearfix chat-col-2">
            {this.state.id === "home" ? null : (
              <ChatScreen
                data={this.state.id}
                message={this.state.message}
                handleMessage={this.handleMessage}
                handleSubmit={this.handleSubmit}
                old_messages={this.state.old_messages}
                handleKeyDown={this.handleKeyDown}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default HomeScreen;
