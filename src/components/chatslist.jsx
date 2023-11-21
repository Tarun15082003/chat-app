import React, { Component } from "react";
import ChatItem from "./chat_item";
import { Link } from "react-router-dom";

class Chatslist extends Component {
  render() {
    const { items, onClick } = this.props;
    return (
      <div className="chat-list">
        {items.map((item) => (
          <Link
            to={`/chats/${item._id}`}
            key={item._id}
            style={{ color: "black", textDecoration: "none" }}
          >
            <ChatItem data={item} onClick={onClick} />
          </Link>
        ))}
      </div>
    );
  }
}

export default Chatslist;
