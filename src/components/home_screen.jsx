import io from "socket.io-client";
import React, { Component, useEffect } from "react";
import SearchBox from "./searchbox";
import Profile from "./profile";
import Logout from "./logout";
import Chatslist from "./chatslist";
import { getChats, getChat, updateMessages } from "../services/ChatService";
import ChatScreen from "./chatScreen";
import UserScreen from "./userprofile";
import AddChatScreen from "./addchatscreen";
import * as authService from "../services/authService";

class HomeScreen extends Component {
  state = {
    id: "home",
    chats: [],
    searchQuery: "",
    message: "",
    old_messages: [],
    displaybit: 0,
    addchatscreen: 0,
    socketId: null,
  };

  async componentDidMount() {
    const user = authService.getCurrentUser();
    this.socket = io("http://localhost:3000");

    this.socket.on("newMessage", ({ chatId, message }) => {
      if (chatId === this.state.id) {
        this.setState((prevState) => ({
          old_messages: [...prevState.old_messages, message],
          message: "",
        }));
      }
    });

    const id = this.props.match.params.id;
    const { data: chats } = await getChats(user._id);
    let old_messages = [];
    let currentChat;
    if (id !== "home") {
      const { data: chat } = await getChat(id);
      old_messages = chat.old_messages;
      currentChat = chat;
      this.socket.emit("joinRoom", id);
    }
    this.setState({ chats, id, old_messages, user, currentChat });
  }

  handleDisplayBit = () => {
    const displaybit = 1;
    this.setState({ displaybit });
  };

  handleaddchatscreen = () => {
    const addchatscreen = 1;
    this.setState({ addchatscreen });
  };

  handlebackbutton = (bit) => {
    if (bit === "addchatscreen") {
      const addchatscreen = 0;
      this.setState({ addchatscreen });
    } else if (bit === "displaybit") {
      const displaybit = 0;
      this.setState({ displaybit });
    }
  };

  handleSearch = (query) => {
    this.setState({
      searchQuery: query,
    });
  };

  handleChatitemClick = async (item) => {
    const id = item._id;
    const displaybit = 0;
    let old_messages = [];
    let currentChat;
    if (id !== "home") {
      const { data: chat } = await getChat(id);
      old_messages = chat.old_messages;
      currentChat = chat;
    }
    this.socket.emit("joinRoom", id);
    this.setState({
      searchQuery: "",
      id,
      old_messages,
      displaybit,
      currentChat,
    });
  };

  handleMessage = (message) => {
    this.setState({ message });
  };

  handleAddChat = () => {
    const chats = [...this.state.chats];
  };

  handleSubmit = async () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const seconds = currentDate.getSeconds();

    const current_message = {
      message: this.state.message,
      isSender: this.state.user._id,
      timestamp: `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`,
    };
    await updateMessages(this.state.id, current_message);
  };

  handleKeyDown = async (event) => {
    if (event.key === "Enter") {
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1;
      const day = currentDate.getDate();
      const hours = currentDate.getHours();
      const minutes = currentDate.getMinutes();
      const seconds = currentDate.getSeconds();

      const current_message = {
        message: this.state.message,
        isSender: this.state.user._id,
        timestamp: `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`,
      };
      await updateMessages(this.state.id, current_message);
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
          {this.state.addchatscreen === 0 ? (
            <div className="col-3 clearfix chat-col-1">
              <div
                className="row"
                style={{
                  marginBottom: "10px",
                  paddingLeft: "15px",
                  paddingRight: "15px",
                }}
              >
                <div className="profile">
                  <Profile handleDisplayBit={this.handleDisplayBit} />
                </div>
                <div className="logout">
                  <Logout />
                </div>
              </div>
              <SearchBox
                value={this.state.searchQuery}
                onChange={this.handleSearch}
                onClick={this.handleaddchatscreen}
              />
              <div className="row">
                <Chatslist items={data} onClick={this.handleChatitemClick} />
              </div>
            </div>
          ) : (
            <div className="col-3 clearfix chat-col-1">
              <AddChatScreen handlebackbutton={this.handlebackbutton} />
            </div>
          )}
          <div className="col clearfix chat-col-2">
            {this.state.displaybit === 1 ? (
              <UserScreen
                handlebackbutton={this.handlebackbutton}
                user={this.state.user}
              />
            ) : this.state.id === "home" ? null : (
              <ChatScreen
                message={this.state.message}
                handleMessage={this.handleMessage}
                handleSubmit={this.handleSubmit}
                old_messages={this.state.old_messages}
                handleKeyDown={this.handleKeyDown}
                currentChat={this.state.currentChat}
                user={this.state.user}
                socket={this.socket}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default HomeScreen;
