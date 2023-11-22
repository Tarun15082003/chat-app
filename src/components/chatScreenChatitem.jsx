import React, { Component } from "react";

class ChatScreenItem extends Component {
  render() {
    const { data: item } = this.props;
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
        </div>
      </div>
    );
  }
}

export default ChatScreenItem;
