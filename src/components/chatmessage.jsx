import React from "react";

const ChatMessage = ({ message, isSender, timestamp, user }) => {
  const issender = isSender === user._id;
  return (
    <div
      className={`chat-message ${issender === true ? "sender" : "receiver"}`}
    >
      {!issender && (
        <div className="col-md-auto text-center">
          <img
            className="profile-image-in-chat bg-secondary"
            src="https://bootdey.com/img/Content/avatar/avatar1.png"
            alt="avatar"
          />
          <div className="message-timestamp">{timestamp}</div>
        </div>
      )}
      <div className="message-container">
        <div
          className={`message ${
            issender ? "sender-message" : "receiver-message"
          }`}
        >
          {message}
        </div>
      </div>
      {issender && (
        <div className="col-md-auto text-center">
          <img
            className="profile-image-in-chat bg-primary"
            src="https://bootdey.com/img/Content/avatar/avatar1.png"
            alt="avatar"
          />
          <div className="message-timestamp">{timestamp}</div>
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
