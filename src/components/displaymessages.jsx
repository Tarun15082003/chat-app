import React, { useEffect, useRef } from "react";
import ChatMessage from "./chatmessage";

const DisplayMessages = ({ old_messages }) => {
  const divRef = useRef(null);

  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: "smooth" });
  });

  return (
    <div className="container">
      {old_messages.map((item) => (
        <ChatMessage
          message={item.message}
          isSender={item.isSender}
          timestamp={item.timestamp}
          key={item.message} //should change
        />
      ))}
      <div ref={divRef} />
    </div>
  );
};

export default DisplayMessages;
