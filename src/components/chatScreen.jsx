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
            <ChatScreenItem
              data={this.props.currentChat}
              loggedInUsers={this.props.loggedInUsers}
              users={this.props.users}
              user={this.props.user}
            />
          </div>
          <div className="col-2 col-md-auto">
            <div className="row">
              <VideoButton data={this.props.currentChat} />
              <MoreButton
                data={this.props.currentChat}
                old_messages={this.props.old_messages}
                all_users={this.props.users}
                current_user={this.props.user}
                currentChat={this.props.currentChat}
              />
            </div>
          </div>
        </div>
        <div className="chat-messages">
          <DisplayMessages
            old_messages={this.props.old_messages}
            user={this.props.user}
            users={this.props.users}
            data={this.props.currentChat}
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
