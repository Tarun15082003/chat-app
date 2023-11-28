import React, { Component } from "react";

class ChatItem extends Component {
  render() {
    const { data: item, onClick } = this.props;
    return (
      <div
        className="row profile-box"
        onClick={() => onClick(item)}
        style={{ cursor: "pointer" }}
      >
        <div className="col-md-auto">
          <img
            className="profile-image"
            src="https://bootdey.com/img/Content/avatar/avatar1.png"
            alt="avatar"
          />
        </div>
        <div className="col-md-auto">
          {item.chatName}
          <div
            className="last-message"
            style={{
              width: "100px",
              overflowX: "auto",
              fontSize: "0.8rem",
              fontStyle: "italic",
            }}
          >
            {item.old_messages[item.old_messages.length - 1].message}
          </div>
        </div>
      </div>
    );
  }
}

export default ChatItem;
