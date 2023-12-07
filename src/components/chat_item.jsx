import React, { Component } from "react";

class ChatItem extends Component {
  render() {
    const { data: item, onClick, user } = this.props;
    return (
      <div
        className="row profile-box"
        onClick={() => onClick(item)}
        style={{ cursor: "pointer" }}
      >
        <div className="col-md-auto">
          {item.isGroupChat === false ? (
            <img
              className="profile-image"
              src={`http://localhost:3000/api/profileImages/${
                item.users.find((u) => u._id !== user._id).profileImage
              }`}
              alt="avatar"
            />
          ) : (
            <h4 style={{ marginLeft: "15px" }}>GC</h4>
          )}
        </div>

        <div className="col-md-auto">
          {item.isGroupChat === false
            ? item.users.find((u) => u._id !== user._id).name
            : item.chatName}
          <div
            className="last-message"
            style={{
              width: "100px",
              overflowX: "auto",
              fontSize: "0.8rem",
              fontStyle: "italic",
            }}
          >
            {item.old_messages.length > 0 &&
              item.old_messages[item.old_messages.length - 1].message}
          </div>
        </div>
      </div>
    );
  }
}

export default ChatItem;
