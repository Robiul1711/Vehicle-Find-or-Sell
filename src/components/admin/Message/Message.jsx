import React, { useState, useEffect } from "react";
import { Loader } from "lucide-react";
import MessageInbox from "./MessageInbox";

const Message = () => {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Mock API function
  const fetchConversations = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: 1,
            name: "Kabir",
            avatar: "https://i.pravatar.cc/40?img=3",
            lastMessage: "Hey there!",
            unread: 2,
            time: "10:00am",
          },
          {
            id: 2,
            name: "Junaid",
            avatar: "https://i.pravatar.cc/40?img=4",
            lastMessage: "How are you?",
            unread: 0,
            time: "9:45am",
          },
          {
            id: 3,
            name: "Mahi",
            avatar: "https://i.pravatar.cc/40?img=5",
            lastMessage: "See you tomorrow!",
            unread: 1,
            time: "Yesterday",
          },
          {
            id: 4,
            name: "Arif",
            avatar: "https://i.pravatar.cc/40?img=6",
            lastMessage: "Check this out",
            unread: 0,
            time: "Mon",
          },
          {
            id: 5,
            name: "Sarah",
            avatar: "https://i.pravatar.cc/40?img=7",
            lastMessage: "Meeting at 3pm",
            unread: 3,
            time: "Sun",
          },
        ]);
      }, 800);
    });
  };

  useEffect(() => {
    const loadConversations = async () => {
      setIsLoading(true);
      try {
        const data = await fetchConversations();
        setConversations(data);
      } catch (error) {
        console.error("Error loading conversations:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadConversations();
  }, []);

  const filteredConversations = conversations.filter((conv) =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col md:flex-row gap-4 w-full h-[calc(100vh-70px)] sm:h-[calc(100vh-120px)]">
      {/* Sidebar */}
      <div
        className={`${
          selectedConversation ? "hidden md:flex" : "flex"
        } flex-col w-full md:w-1/3 p-4 border rounded-lg bg-white`}
      >
        {/* Search box */}
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Search for a user..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-theme-primary dark:bg-slate-800 dark:border-slate-700 dark:text-white"
          />
          <span className="absolute right-3 top-3 text-gray-400 dark:text-slate-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 103 10.5a7.5 7.5 0 0013.15 6.15z"
              />
            </svg>
          </span>
        </div>

        {/* Conversations */}
        {isLoading ? (
          <div className="flex justify-center items-center flex-1">
            <Loader className="animate-spin" size={24} />
          </div>
        ) : (
          <div className="space-y-2 overflow-y-auto flex-1">
            {filteredConversations.map((conversation) => (
              <div
                key={conversation.id}
                onClick={() => setSelectedConversation(conversation)}
                className={`flex items-center gap-3 p-3 rounded-lg hover:bg-[#E6EAEE] dark:hover:bg-slate-800 cursor-pointer ${
                  selectedConversation?.id === conversation.id
                    ? "bg-[#E6EAEE] dark:bg-slate-800"
                    : ""
                }`}
              >
                <img
                  src={conversation.avatar}
                  alt={conversation.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="font-medium text-slate-800 dark:text-white truncate">
                      {conversation.name}
                    </h3>
                    <p className="text-[11px] text-gray-500 dark:text-slate-400 whitespace-nowrap">
                      {conversation.time}
                    </p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-xs text-gray-500 dark:text-slate-400 truncate max-w-[70%]">
                      {conversation.lastMessage}
                    </p>
                    {conversation.unread > 0 && (
                      <span className="bg-custom-primary text-white text-xs rounded-full min-w-[20px] h-5 flex items-center justify-center">
                        {conversation.unread}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 h-full">
        {selectedConversation ? (
          <MessageInbox
            selectedConversation={selectedConversation}
            onBack={() => setSelectedConversation(null)}
          />
        ) : (
          <div className="border rounded-lg p-5 bg-white h-full flex items-center justify-center">
            <div className="text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 mx-auto text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">
                Select a conversation
              </h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-slate-400">
                Choose a chat from the sidebar to start messaging
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Message;
