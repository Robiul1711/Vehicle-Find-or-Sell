import React, { useState, useEffect, useMemo } from "react";
import { Loader, Search, MessageSquare, Inbox } from "lucide-react";
import MessageInbox from "./MessageInbox";
import { useApiQuery } from "@/hooks/useApiQuery";
import { useAuth } from "@/hooks/useAuth";
import { useQueryClient } from "@tanstack/react-query";

const Message = () => {
  const { user } = useAuth();
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const queryClient = useQueryClient();

  // Fetch conversations list
  const { data: conversationsList, isLoading: conversationsLoading } =
    useApiQuery({
      queryKey: ["conversations-list"],
      url: `/message/conversations/`,
      secure: true,
    });

  // Listen for real-time conversation updates via query cache invalidation
  useEffect(() => {
    const interval = setInterval(() => {
      queryClient.invalidateQueries({ queryKey: ["conversations-list"] });
    }, 1000); // Refresh every 1 seconds

    return () => clearInterval(interval);
  }, [queryClient]);

  // Process conversations
  const processedConversations = useMemo(() => {
    return (
      conversationsList?.data
        ?.map((conv) => {
          const otherParticipant =
            conv.participants?.find((p) => p.email !== user?.email) ||
            conv.participants?.[0] ||
            {};

          return {
            id: conv.id,
            participants: conv.participants,
            name: otherParticipant.full_name || "Unknown User",
            avatar: otherParticipant.profile_image || "/default-avatar.png",
            lastMessage:
              typeof conv.last_message?.text === "string"
                ? conv.last_message.text
                : conv.last_message?.text?.text || "No messages yet",
            rawTimestamp: conv.last_message?.timestamp,
            time: conv.last_message?.timestamp
              ? new Date(conv.last_message.timestamp).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "",
            unread: conv.unread_count || 0,
            lastMessageId: conv.last_message?.id,
          };
        })
        .sort((a, b) => {
          const dateA = a.rawTimestamp ? new Date(a.rawTimestamp).getTime() : 0;
          const dateB = b.rawTimestamp ? new Date(b.rawTimestamp).getTime() : 0;
          return dateB - dateA;
        }) || []
    );
  }, [conversationsList, user]);

  const filteredConversations = useMemo(() => {
    return processedConversations.filter((conv) =>
      conv.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [processedConversations, searchQuery]);

  // Handle conversation selection
  const handleConversationSelect = (conversation) => {
    setSelectedConversation(conversation);
    // Mark conversation as read when selected
    if (conversation.unread > 0) {
      // Update local cache to reset unread count
      queryClient.setQueryData(["conversations-list"], (oldData) => {
        if (!oldData?.data) return oldData;
        return {
          ...oldData,
          data: oldData.data.map((conv) =>
            conv.id === conversation.id ? { ...conv, unread_count: 0 } : conv,
          ),
        };
      });
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 w-full h-[calc(100vh-70px)] sm:h-[calc(100vh-120px)]">
      {/* Sidebar */}
      <div
        className={`${
          selectedConversation ? "hidden md:flex" : "flex"
        } flex-col w-full md:w-1/3 p-4 border rounded-lg bg-white shadow-sm`}
      >
        <div className="mb-4">
          <h1 className="text-xl font-bold text-gray-800 mb-2">Messages</h1>
          <div className="relative">
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 text-sm"
            />
            <span className="absolute left-3 top-2.5 text-gray-400">
              <Search size={20} />
            </span>
          </div>
        </div>

        {/* Conversations List */}
        {conversationsLoading ? (
          <div className="flex justify-center items-center flex-1">
            <Loader className="animate-spin text-blue-500" size={24} />
          </div>
        ) : (
          <div className="space-y-1 overflow-y-auto flex-1 -mx-2 px-2">
            {filteredConversations?.length > 0 ? (
              filteredConversations.map((conversation) => (
                <div
                  key={conversation.id}
                  onClick={() => handleConversationSelect(conversation)}
                  className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200 cursor-pointer group ${
                    selectedConversation?.id === conversation.id
                      ? "bg-blue-50 border border-blue-100"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <div className="relative">
                    <img
                      src={conversation.avatar}
                      alt={conversation.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-white"
                      onError={(e) => {
                        e.target.src = "https://i.pravatar.cc/150";
                      }}
                    />
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-1">
                      <h3 className="font-semibold text-gray-800 truncate">
                        {conversation.name}
                      </h3>
                      <p className="text-xs text-gray-500 whitespace-nowrap">
                        {conversation.time}
                      </p>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-gray-600 truncate max-w-[70%]">
                        {conversation.lastMessage}
                      </p>
                      {conversation.unread > 0 && (
                        <span className="bg-blue-500 text-white text-xs font-medium rounded-full min-w-[20px] h-5 flex items-center justify-center px-1.5">
                          {conversation.unread}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-3">
                  <Inbox className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-gray-600 font-medium">No conversations</h3>
                <p className="text-sm text-gray-500 mt-1">
                  Start a new conversation
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 h-full">
        {selectedConversation ? (
          <MessageInbox
            selectedConversation={selectedConversation}
            onBack={() => setSelectedConversation(null)}
            queryClient={queryClient}
          />
        ) : (
          <div className="border rounded-lg bg-white h-full flex flex-col items-center justify-center p-6 shadow-sm">
            <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mb-6">
              <MessageSquare className="h-12 w-12 text-blue-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Welcome to Messages
            </h3>
            <p className="text-gray-600 text-center max-w-md mb-6">
              Select a conversation from the sidebar to start messaging.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Message;
