import React from "react";
import avatar from "../images/user_image.jpg";

const ChatMessage = ({
  message,
  isSender,
  timestamp,
  user,
  users,
  typeofMessage,
}) => {
  const issender = isSender === user._id;
  let name;
  if (issender) name = "You";
  else {
    const other_user = users.find((u) => u._id === isSender);
    name = other_user.name;
  }
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
        {typeofMessage === "text" ? (
          <div
            className={`message ${
              issender ? "sender-message" : "receiver-message"
            }`}
          >
            <h6 style={{ fontSize: "0.7rem" }}>{name}</h6>
            {message}
          </div>
        ) : null}
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
