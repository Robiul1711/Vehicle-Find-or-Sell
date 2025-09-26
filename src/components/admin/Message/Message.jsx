import React from "react";
import ChatList from "./ChatList";
import MessageInbox from "./MessageInbox";

const Message = () => {
  return (
    <div className="flex gap-6">
      {/* Sidebar */}
      <div className="w-1/4 ">
        <ChatList />
      </div>

      {/* Main Chat */}
      <div className="flex-1">
        <MessageInbox />
      </div>
    </div>
  );
};

export default Message;
