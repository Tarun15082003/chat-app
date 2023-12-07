import React, { useEffect, useRef } from "react";
import ChatMessage from "./chatmessage";

const DisplayMessages = ({ old_messages, user, users, data }) => {
  const divRef = useRef(null);

  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: "smooth" });
  });

  let currentDate = null;
  let currentGroup = [];
  let finalMessages = [];

  let i = 0;
  while (i < old_messages.length) {
    if (
      old_messages[i].timestamp.slice(
        0,
        old_messages[i].timestamp.search(" ")
      ) === currentDate
    ) {
      currentGroup.push(old_messages[i]);
    } else {
      if (currentDate) {
        finalMessages.push(
          <div>
            <div
              className="d-flex justify-content-center"
              style={{ marginBottom: "5px" }}
            >
              <div className="date-separator">{currentDate}</div>
            </div>
            {currentGroup.map((item) => (
              <ChatMessage
                message={item.message}
                isSender={item.isSender}
                timestamp={item.timestamp.slice(item.timestamp.search(" ") + 1)}
                typeofMessage={item.typeofMessage}
                key={`${item.message}+${item.isSender}+${item.timestamp}`}
                user={user}
                users={users}
                item={data}
              />
            ))}
          </div>
        );
        currentGroup = [];
        currentDate = old_messages[i].timestamp.slice(
          0,
          old_messages[i].timestamp.search(" ")
        );
        currentGroup.push(old_messages[i]);
      } else {
        currentGroup = [];
        currentDate = old_messages[i].timestamp.slice(
          0,
          old_messages[i].timestamp.search(" ")
        );
        currentGroup.push(old_messages[i]);
      }
    }
    i++;
  }

  if (currentGroup.length > 0) {
    finalMessages.push(
      <div>
        <div
          className="d-flex justify-content-center"
          style={{ marginBottom: "5px" }}
        >
          <div className="date-separator ">{currentDate}</div>
        </div>
        {currentGroup.map((item) => (
          <ChatMessage
            message={item.message}
            isSender={item.isSender}
            timestamp={item.timestamp.slice(item.timestamp.search(" ") + 1)}
            typeofMessage={item.typeofMessage}
            key={`${item.message}+${item.isSender}+${item.timestamp}`}
            user={user}
            users={users}
            item={data}
          />
        ))}
      </div>
    );
  }
  return (
    <div className="container">
      {finalMessages}
      <div ref={divRef} />
    </div>
  );
};

export default DisplayMessages;
