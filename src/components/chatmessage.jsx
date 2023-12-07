import React, { useEffect, useState } from "react";
import httpService from "../services/httpService";

const ChatMessage = ({
  message,
  isSender,
  timestamp,
  user,
  users,
  typeofMessage,
  item,
}) => {
  const [mediaUrl, setMediaUrl] = useState(null);
  const [contentType, setContentType] = useState(null);

  const fetchMedia = async () => {
    try {
      const response = await httpService.get(
        `http://localhost:3000/api/mediamessages/${message}`,
        {
          responseType: "arraybuffer",
        }
      );
      const blob = new Blob([response.data], {
        type: response.headers["content-type"],
      });
      const receivedContentType = response.headers["content-type"];
      setContentType(receivedContentType);
      const url = URL.createObjectURL(blob);
      setMediaUrl(url);
    } catch (error) {
      console.error("Error fetching media:", error);
    }
  };

  useEffect(() => {
    if (typeofMessage === "media") {
      fetchMedia();
    }
  }, [typeofMessage, message]);

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
            src={`http://localhost:3000/api/profileImages/${
              item.users.find((u) => u._id === isSender).profileImage
            }`}
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
        {typeofMessage === "media" &&
          mediaUrl !== null &&
          contentType !== null && (
            <div>
              {contentType.startsWith("image/") && (
                <img
                  src={mediaUrl}
                  alt="media"
                  style={{ maxWidth: "100%", maxHeight: "200px" }}
                />
              )}
              {contentType.startsWith("video/") && (
                <video
                  controls
                  style={{ maxWidth: "100%", maxHeight: "200px" }}
                >
                  <source src={mediaUrl} type={contentType} />
                  Your browser does not support the video tag.
                </video>
              )}
              {!contentType.startsWith("image/") &&
                !contentType.startsWith("video/") && (
                  <div>
                    <p>{`${contentType} type file`}</p>
                    <a href={mediaUrl} download>
                      Download File
                    </a>
                  </div>
                )}
            </div>
          )}
      </div>
      {issender && (
        <div className="col-md-auto text-center">
          <img
            className="profile-image-in-chat bg-primary"
            src={`http://localhost:3000/api/profileImages/${user.profileImage}`}
            alt="avatar"
          />
          <div className="message-timestamp">{timestamp}</div>
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
