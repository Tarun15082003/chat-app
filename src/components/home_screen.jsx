import _ from "lodash";
import io from "socket.io-client";
import React, { Component } from "react";
import SearchBox from "./searchbox";
import Profile from "./profile";
import Logout from "./logout";
import Chatslist from "./chatslist";
import {
  getChats,
  getChat,
  updateMessages,
  addNewChat,
} from "../services/ChatService";
import ChatScreen from "./chatScreen";
import UserScreen from "./userprofile";
import AddChatScreen from "./addchatscreen";
import * as authService from "../services/authService";
import * as userService from "../services/userService";

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

    const userId = user._id;
    this.socket.emit("loggedIn", userId);

    this.socket.on("newMessage", ({ chatId, message }) => {
      if (chatId === this.state.id) {
        this.setState((prevState) => ({
          old_messages: [...prevState.old_messages, message],
          message: "",
        }));
      }
    });

    this.socket.on("loggedInUsers", async (data) => {
      this.setState({ loggedInUsers: data });
      const { data: users } = await userService.getUsers();
      this.setState({ users });
    });

    this.socket.on("newMessageReceived", async ({ message, chat }) => {
      this.notifyUser(message, chat);
      const { data: chats } = await getChats(user._id);
      this.setState({ chats });
    });

    this.socket.on("RequestingVideoCall", ({ current_user, chatId }) => {
      const notification = new Notification(
        `Video call from ${current_user.name}`
      );
      notification.onclick = () =>
        window.open(`http://localhost:3001/chats/videocall/${chatId}`);
    });

    const id = this.props.match.params.id;
    const { data: chats } = await getChats(user._id);
    const { data: users } = await userService.getUsers();
    let old_messages = [];
    let currentChat;
    if (id !== "home") {
      const { data: chat } = await getChat(id);
      old_messages = chat.old_messages;
      currentChat = chat;
      this.socket.emit("joinRoom", id);
    }
    this.setState({ chats, id, old_messages, user, currentChat, users });
  }

  handleLogout = async () => {
    const logout = () => {
      return new Promise((resolve) => {
        this.socket.emit("logout", { userId: this.state.user._id });
        resolve();
      });
    };
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const seconds = currentDate.getSeconds();
    const lastseen = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    await userService.updateUser(this.state.user._id, { lastseen });
    logout().then(() => {
      authService.logout();
      window.location = "/";
    });
  };

  handleDisplayBit = () => {
    const displaybit = 1;
    this.setState({ displaybit });
  };

  handleaddchatscreen = () => {
    const addchatscreen = 1;
    this.setState({ addchatscreen });
  };

  handleaddnewchat = async (event, data) => {
    event.preventDefault();
    let users = [];
    for (let i = 0; i < data.users.length; i++) {
      users.push(data.users[i]._id);
    }
    const body = {
      isGroupChat: data.isGroupChat,
      chatName: data.chatName,
      old_messages: [],
      users,
    };
    await addNewChat(body);
    this.props.history.replace("/");
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
      message: "",
    });
  };

  handleMessage = (message) => {
    this.setState({ message });
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
      timestamp: `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`,
    };
    updateMessages(this.state.id, current_message).then(async () => {
      this.socket.emit("messageSent", {
        chat: this.state.currentChat,
        user: this.state.user,
        message: current_message.message,
      });
      const { data: chats } = await getChats(this.state.user._id);
      this.setState({ chats });
    });
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
        timestamp: `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`,
      };
      updateMessages(this.state.id, current_message).then(async () => {
        this.socket.emit("messageSent", {
          chat: this.state.currentChat,
          user: this.state.user,
          message: current_message.message,
        });
      });
      const { data: chats } = await getChats(this.state.user._id);
      this.setState({ chats });
    }
  };

  sendNotification = (message, chat) => {
    if (document.hidden) {
      const notification = new Notification(
        `New message from ${chat.chatName}`,
        {
          body: `${message}`,
        }
      );
      notification.onclick = () =>
        window.focus(`http://localhost:3001/chats/${chat._id}`);
    }
  };

  notifyUser = (message, chat) => {
    if (!("Notification" in window)) {
      alert("This browser does not support system notifications!");
    } else if (Notification.permission === "granted") {
      this.sendNotification(message, chat);
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission((permission) => {
        if (permission === "granted") {
          this.sendNotification(message, chat);
        }
      });
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

    const getLastMessageDate = (chat) => {
      if (chat.old_messages.length === 0) return new Date(0);
      const lastMessage = _.last(chat.old_messages);
      return new Date(lastMessage.timestamp);
    };

    const chatsWithDate = filtered.map((chat) => ({
      ...chat,
      lastMessageDate: getLastMessageDate(chat),
    }));

    const sortedChats = _.orderBy(chatsWithDate, ["lastMessageDate"], ["desc"]);
    return { data: sortedChats };
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
                  <Logout onClick={this.handleLogout} />
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
              <AddChatScreen
                handlebackbutton={this.handlebackbutton}
                users={this.state.users}
                onSubmit={this.handleaddnewchat}
                current_user={this.state.user}
              />
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
                loggedInUsers={this.state.loggedInUsers}
                users={this.state.users}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default HomeScreen;
