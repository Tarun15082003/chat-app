import React, { Component } from "react";
import ChatScreenItem from "./chatScreenChatitem";
import ChatBox from "./chatbox";
import VideoButton from "./video_button";
import MoreButton from "./more_button";
import DisplayMessages from "./displaymessages";

class ChatScreen extends Component {
  render() {
    return (
      <div>
        <div className="row chat-heading">
          <div className="col">
            <ChatScreenItem data={this.props.currentChat} />
          </div>
          <div className="col-2 col-md-auto">
            <div className="row">
              <VideoButton
                socket={this.props.socket}
                data={this.props.currentChat}
              />
              <MoreButton />
            </div>
          </div>
        </div>
        <div className="chat-messages">
          <DisplayMessages
            old_messages={this.props.old_messages}
            user={this.props.user}
          />
        </div>
        <div className="row chat-col-1-row-3">
          <ChatBox
            value={this.props.message}
            onChange={this.props.handleMessage}
            onSubmit={this.props.handleSubmit}
            handleKeyDown={this.props.handleKeyDown}
          />
        </div>
      </div>
    );
  }
}

export default ChatScreen;
