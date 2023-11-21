import React from "react";

const ChatMessage = ({ message, isSender, timestamp }) => {
  return (
    <div className={`chat-message ${isSender ? "sender" : "receiver"}`}>
      {!isSender && (
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
            isSender ? "sender-message" : "receiver-message"
          }`}
        >
          {message}
        </div>
      </div>
      {isSender && (
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
