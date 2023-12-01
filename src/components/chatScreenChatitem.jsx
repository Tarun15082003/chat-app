import React, { Component } from "react";

class ChatScreenItem extends Component {
  render() {
    const { data: item, loggedInUsers, user, users } = this.props;
    let displaystate = null;
    if (item.users.length === 2 && loggedInUsers) {
      const { _id: userId } = item.users.find((u) => u._id !== user._id);
      if (Object.keys(loggedInUsers).includes(userId)) {
        displaystate = "User Online";
      } else {
        const { lastseen } = users.find((u) => u._id === userId);
        displaystate = `Last seen on ${lastseen}`;
      }
    }
    return (
      <div className="row" style={{ marginTop: "2px" }}>
        <div className="col-1">
          <img
            className="chat-screen-chat-proifle-image"
            src="https://bootdey.com/img/Content/avatar/avatar1.png"
            alt="avatar"
          />
        </div>
        <div className="col" style={{ paddingLeft: "20px", paddingTop: "5px" }}>
          {item.chatName}
          <div
            className="last-message"
            style={{
              width: "200px",
              overflowX: "auto",
              fontSize: "0.8rem",
              fontStyle: "italic",
            }}
          >
            {displaystate}
          </div>
        </div>
      </div>
    );
  }
}

export default ChatScreenItem;
