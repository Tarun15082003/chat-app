import React, { Component } from "react";
import ChatScreenItem from "./chatScreenChatitem";
import { getChat } from "../services/ChatService";
import ChatBox from "./chatbox";
import VideoButton from "./video_button";
import MoreButton from "./more_button";
import DisplayMessages from "./displaymessages";

class ChatScreen extends Component {
  render() {
    const { data: id } = this.props;
    const item = getChat(id);
    return (
      <div>
        <div className="row chat-heading">
          <div className="col">
            <ChatScreenItem data={item} />
          </div>
          <div className="col-2 col-md-auto">
            <div className="row">
              <VideoButton />
              <MoreButton />
            </div>
          </div>
        </div>
        <div className="chat-messages">
          <DisplayMessages old_messages={this.props.old_messages} />
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
