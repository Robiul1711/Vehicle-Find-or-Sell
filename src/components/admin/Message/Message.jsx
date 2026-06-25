import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader, Search, MessageSquare, Inbox, Paperclip } from "lucide-react";
import { useLocation } from "react-router-dom";
import MessageInbox from "./MessageInbox";
import { useApiQuery } from "@/hooks/useApiQuery";
import { useAuth } from "@/hooks/useAuth";
import { useQueryClient } from "@tanstack/react-query";
import profileFallback from "@/assets/images/dummy.png";

const Message = () => {
  const { user } = useAuth();
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const queryClient = useQueryClient();
  const location = useLocation();
  const stateConversationId = location.state?.conversationId;

  // Fetch conversations list
  const { data: conversationsList, isLoading: conversationsLoading } =
    useApiQuery({
      queryKey: ["conversations-list"],
      url: `/message/conversations/`,
      secure: true,
    });

  // Refresh conversations every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      queryClient.invalidateQueries({ queryKey: ["conversations-list"] });
    }, 5000);
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

          const lastMsgText = typeof conv.last_message?.text === "string"
            ? conv.last_message.text
            : conv.last_message?.text?.text || "";

          const hasAttachment = conv.last_message?.has_attachment;

          return {
            id: conv.id,
            participants: conv.participants,
            name: otherParticipant.full_name || "Unknown User",
            avatar: otherParticipant.profile_image || "/default-avatar.png",
            lastMessage: lastMsgText || (hasAttachment ? "Sent an attachment" : "No messages yet"),
            hasAttachment: hasAttachment && !lastMsgText,
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

  // Total unread count
  const totalUnread = useMemo(() => {
    return processedConversations.reduce((sum, c) => sum + c.unread, 0);
  }, [processedConversations]);

  // Auto-select conversation from location state
  useEffect(() => {
    if (processedConversations.length > 0 && stateConversationId) {
      const found = processedConversations.find(
        (conv) => conv.id === stateConversationId
      );
      if (found) {
        setSelectedConversation(found);
      }
    }
  }, [processedConversations, stateConversationId]);

  // Handle conversation selection
  const handleConversationSelect = (conversation) => {
    setSelectedConversation(conversation);
    if (conversation.unread > 0) {
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

      {/* ── Sidebar ── */}
      <div
        className={`${
          selectedConversation ? "hidden md:flex" : "flex"
        } flex-col w-full md:w-[340px] border rounded-2xl bg-white shadow-md overflow-hidden border-gray-150`}
      >
        {/* Sidebar Header */}
        <div className="px-5 pt-5 pb-4 border-b bg-gradient-to-b from-gray-50/60 to-white">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-blue-600 rounded-xl text-white shadow-sm shadow-blue-200">
                <MessageSquare size={18} />
              </div>
              <div>
                <h1 className="text-base font-bold text-gray-900 leading-tight">Messages</h1>
                <p className="text-xs text-gray-500 font-medium leading-tight">
                  {processedConversations.length} conversation{processedConversations.length !== 1 ? "s" : ""}
                </p>
              </div>
            </div>
            {totalUnread > 0 && (
              <motion.span
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className="bg-blue-600 text-white text-xs font-bold rounded-full min-w-[22px] h-[22px] flex items-center justify-center px-1.5 shadow-sm"
              >
                {totalUnread > 99 ? "99+" : totalUnread}
              </motion.span>
            )}
          </div>

          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/70 focus:border-transparent bg-gray-50 hover:bg-white focus:bg-white text-sm transition-all duration-200 font-medium text-gray-700 placeholder-gray-400"
            />
            <span className="absolute left-3.5 top-3 text-gray-400">
              <Search size={16} />
            </span>
          </div>
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {conversationsLoading ? (
            <div className="flex justify-center items-center py-16">
              <div className="text-center">
                <Loader className="animate-spin text-blue-500 mx-auto mb-2" size={28} />
                <p className="text-sm text-gray-500 font-medium">Loading...</p>
              </div>
            </div>
          ) : filteredConversations?.length > 0 ? (
            <div className="p-3 space-y-1">
              <AnimatePresence>
                {filteredConversations.map((conversation) => {
                  const isActive = selectedConversation?.id === conversation.id;
                  return (
                    <motion.div
                      key={conversation.id}
                      layout
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.18 }}
                      onClick={() => handleConversationSelect(conversation)}
                      className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200 group ${
                        isActive
                          ? "bg-blue-600 shadow-sm shadow-blue-100"
                          : "hover:bg-gray-50"
                      }`}
                    >
                      {/* Avatar */}
                      <div className="relative flex-shrink-0">
                        <img
                          src={conversation.avatar}
                          alt={conversation.name}
                          className={`w-12 h-12 rounded-full object-cover border-2 ${isActive ? "border-blue-400" : "border-gray-100"} shadow-sm`}
                          onError={(e) => {
                            e.target.src = profileFallback;
                          }}
                        />
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center mb-0.5">
                          <h3 className={`font-semibold text-sm truncate ${isActive ? "text-white" : "text-gray-800"}`}>
                            {conversation.name}
                          </h3>
                          <p className={`text-[10px] whitespace-nowrap font-medium ml-2 ${isActive ? "text-blue-200" : "text-gray-400"}`}>
                            {conversation.time}
                          </p>
                        </div>
                        <div className="flex justify-between items-center">
                          <p className={`text-xs truncate max-w-[75%] flex items-center gap-1 ${isActive ? "text-blue-100" : "text-gray-500"}`}>
                            {conversation.hasAttachment && (
                              <Paperclip size={11} className="flex-shrink-0" />
                            )}
                            <span>{conversation.lastMessage}</span>
                          </p>
                          {conversation.unread > 0 && (
                            <span className={`text-xs font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1.5 flex-shrink-0 ${isActive ? "bg-white text-blue-600" : "bg-blue-600 text-white"}`}>
                              {conversation.unread > 99 ? "99+" : conversation.unread}
                            </span>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          ) : (
            <div className="text-center py-16 px-6">
              <div className="w-16 h-16 mx-auto bg-gray-50 border border-gray-100 rounded-2xl flex items-center justify-center mb-4 shadow-inner">
                <Inbox className="h-8 w-8 text-gray-300" />
              </div>
              <h3 className="text-gray-700 font-semibold text-sm mb-1">
                {searchQuery ? "No results found" : "No conversations yet"}
              </h3>
              <p className="text-xs text-gray-400 font-medium">
                {searchQuery ? `No match for "${searchQuery}"` : "Start a new conversation"}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* ── Main Chat Area ── */}
      <div className="flex-1 h-full">
        {selectedConversation ? (
          <MessageInbox
            selectedConversation={selectedConversation}
            onBack={() => setSelectedConversation(null)}
            queryClient={queryClient}
          />
        ) : (
          <div className="border rounded-2xl bg-white h-full flex flex-col items-center justify-center p-6 shadow-md border-gray-150">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl flex items-center justify-center mb-6 shadow-inner">
              <MessageSquare className="h-11 w-11 text-blue-500" strokeWidth={1.5} />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Your Messages
            </h3>
            <p className="text-sm text-gray-500 text-center max-w-xs font-medium leading-relaxed">
              Pick a conversation from the sidebar to view messages, or send images and PDFs directly in the chat.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Message;
