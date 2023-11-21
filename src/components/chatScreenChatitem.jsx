import React, { Component } from "react";

class ChatScreenItem extends Component {
  render() {
    const { data: item } = this.props;
    return (
      <div className="row-md-auto" style={{ marginTop: "2px" }}>
        <div className="col-md-auto">
          <img
            className="chat-screen-chat-proifle-image"
            src="https://bootdey.com/img/Content/avatar/avatar1.png"
            alt="avatar"
            onClick={null}
            style={{ cursor: "pointer" }}
          />
        </div>
        <div
          className="col-md-auto"
          onClick={null}
          style={{ cursor: "pointer" }}
        >
          {item.chatName}
        </div>
      </div>
    );
  }
}

export default ChatScreenItem;
