import React, { useRef, useState, useEffect, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LuSend, LuX } from "react-icons/lu";
import { Loader } from "lucide-react";
import { useApiQuery } from "@/hooks/useApiQuery";
import { useAuth } from "@/hooks/useAuth";
import { IMG_URL } from "@/config/constant";

/* ================= MESSAGE COMPONENT ================= */

const MessageBubble = memo(({ message, isCurrentUser }) => {
  const getMessageText = () => {
    if (!message.text) return "";

    if (typeof message.text === "string") return message.text;
    if (typeof message.text === "object") {
      return message.text?.text || message.text?.message || "";
    }
    return String(message.text);
  };

  const text = getMessageText();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className={`flex ${isCurrentUser ? "justify-end" : "justify-start"} mb-3`}
    >
      <div className="flex items-end gap-2 max-w-[80%]">
        {!isCurrentUser && (
          <img
            src={
              IMG_URL + (message.senderProfile?.avatar || "/default-avatar.png")
            }
            alt="Profile"
            className="w-8 h-8 rounded-full object-cover flex-shrink-0"
            onError={(e) => {
              e.target.src = "https://i.pravatar.cc/150";
            }}
          />
        )}

        <div className={`${isCurrentUser ? "order-2" : "order-1"}`}>
          <div
            className={`px-4 py-2.5 rounded-2xl ${
              isCurrentUser
                ? "bg-blue-500 text-white rounded-br-md"
                : "bg-gray-100 text-gray-800 rounded-bl-md"
            }`}
          >
            <p className="text-sm leading-relaxed">{text}</p>
          </div>
          <div
            className={`text-xs mt-1 text-gray-500 ${
              isCurrentUser ? "text-right" : "text-left"
            }`}
          >
            {message.timestamp}
            {message.status && (
              <span className="ml-1">
                {message.status === "sent" && "✓"}
                {message.status === "delivered" && "✓✓"}
                {message.status === "read" && "✓✓ (Read)"}
              </span>
            )}
          </div>
        </div>

        {isCurrentUser && (
          <img
            src={
              IMG_URL + (message.senderProfile?.avatar || "/default-avatar.png")
            }
            alt="Profile"
            className="w-8 h-8 rounded-full object-cover flex-shrink-0"
            onError={(e) => {
              e.target.src = "https://i.pravatar.cc/150";
            }}
          />
        )}
      </div>
    </motion.div>
  );
});

MessageBubble.displayName = "MessageBubble";

/* ================= MAIN INBOX ================= */

const MessageInbox = ({ selectedConversation, onBack, queryClient }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [typing, setTyping] = useState(false);
  const { user } = useAuth();

  const messagesEndRef = useRef(null);
  const socketRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  /* -------- FETCH HISTORY -------- */
  const {
    data: inboxMessagesData,
    isLoading,
    refetch,
  } = useApiQuery({
    queryKey: ["inbox-messages", selectedConversation?.id],
    url: `/message/conversations/${selectedConversation?.id}/messages/`,
    secure: true,
    enabled: !!selectedConversation?.id,
  });

  // Process message to determine sender
  const processMessage = useCallback(
    (msg) => {
      const msgSenderId = msg.sender?.id || msg.sender;
      const msgSenderEmail = msg.sender_email;

      const isMe =
        (msgSenderId && msgSenderId === user?.profile?.user?.id) ||
        (msgSenderEmail && msgSenderEmail === user?.email);

      return {
        id: msg.id || Date.now(),
        text: msg.text || msg.message,
        sender: isMe ? "me" : "other",
        senderProfile: {
          avatar: isMe
            ? user?.profile?.profile_image
            : selectedConversation?.avatar,
        },
        timestamp: new Date(
          msg.timestamp || msg.created_at || Date.now(),
        ).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        status: isMe ? "sent" : undefined,
      };
    },
    [user, selectedConversation],
  );

  // Sync History
  useEffect(() => {
    if (inboxMessagesData?.data) {
      const processed = inboxMessagesData.data.map(processMessage);
      setMessages(processed);
    }
  }, [inboxMessagesData, processMessage]);

  /* -------- WEBSOCKET CONNECTION -------- */
  useEffect(() => {
    if (!selectedConversation?.id) return;

    const wsUrl = `wss://gtac.softvencealpha.com/ws/chat/${selectedConversation.id}/`;
    const socket = new WebSocket(wsUrl);
    socketRef.current = socket;

    socket.onopen = () => {
      console.log("WebSocket Connected");
    };

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        // Handle typing indicators
        if (data.type === "typing") {
          setTyping(data.is_typing);
          return;
        }

        // Extract message data
        let messageData = data;
        if (data.message && typeof data.message === "object") {
          messageData = data.message;
        } else if (data.message && typeof data.message === "string") {
          messageData = {
            id: data.id || `ws-${Date.now()}`,
            text: data.message,
            sender: data.sender,
            sender_email: data.sender_email,
            timestamp: data.timestamp || new Date().toISOString(),
          };
        }

        // Skip if this is an echo of our own message (already handled optimistically)
        const msgSenderId = messageData.sender?.id || messageData.sender;
        const isMe = msgSenderId && msgSenderId === user?.profile?.user?.id;

        if (isMe) {
          // This is our own message echoed back from server
          // Find and update the optimistic message
          setMessages((prev) => {
            const newMessages = [...prev];
            const optimisticIndex = newMessages.findIndex((m) =>
              m.id.toString().startsWith("temp-"),
            );

            if (optimisticIndex !== -1) {
              // Replace optimistic message with real one
              const processedMessage = processMessage(messageData);
              processedMessage.status = "delivered";
              newMessages[optimisticIndex] = processedMessage;
            } else {
              // Add as new message if no optimistic found
              const processedMessage = processMessage(messageData);
              processedMessage.status = "delivered";
              newMessages.push(processedMessage);
            }

            return newMessages;
          });
        } else {
          // Message from other user
          const processedMessage = processMessage(messageData);

          setMessages((prev) => {
            // Check for duplicates by ID
            if (prev.find((m) => m.id === processedMessage.id)) return prev;
            return [...prev, processedMessage];
          });

          // Update conversation list with new message
          updateConversationList(processedMessage, false);
        }
      } catch (error) {
        console.error("Error processing WebSocket message:", error);
      }
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    socket.onclose = () => {
      console.log("WebSocket disconnected");
    };

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, [selectedConversation?.id, processMessage, user]);

  // Update conversation list in real-time
  const updateConversationList = useCallback(
    (message, isCurrentUser) => {
      if (!queryClient) return;

      queryClient.setQueryData(["conversations-list"], (oldData) => {
        if (!oldData?.data) return oldData;

        const updatedData = oldData.data.map((conv) => {
          if (conv.id === selectedConversation.id) {
            const textContent =
              typeof message.text === "object"
                ? message.text.text
                : message.text;

            return {
              ...conv,
              last_message: {
                ...conv.last_message,
                id: message.id,
                text: textContent,
                timestamp: new Date().toISOString(),
              },
              // Increment unread count only if message is from other user
              unread_count: isCurrentUser
                ? conv.unread_count
                : (conv.unread_count || 0) + 1,
            };
          }
          return conv;
        });

        // Move updated conversation to top
        const updatedConv = updatedData.find(
          (c) => c.id === selectedConversation.id,
        );
        const otherConvs = updatedData.filter(
          (c) => c.id !== selectedConversation.id,
        );

        return {
          ...oldData,
          data: updatedConv ? [updatedConv, ...otherConvs] : updatedData,
        };
      });
    },
    [selectedConversation?.id, queryClient],
  );

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handle typing indicator
  const handleTyping = useCallback(() => {
    if (!socketRef.current || socketRef.current.readyState !== WebSocket.OPEN)
      return;

    // Send typing start
    socketRef.current.send(
      JSON.stringify({
        type: "typing",
        is_typing: true,
      }),
    );

    // Clear previous timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Set timeout to stop typing indicator
    typingTimeoutRef.current = setTimeout(() => {
      if (socketRef.current?.readyState === WebSocket.OPEN) {
        socketRef.current.send(
          JSON.stringify({
            type: "typing",
            is_typing: false,
          }),
        );
      }
    }, 1000);
  }, []);

  /* -------- SEND MESSAGE -------- */
  const handleSendMessage = async () => {
    const trimmedMessage = newMessage.trim();
    if (!trimmedMessage || !socketRef.current || isSending) return;

    if (socketRef.current.readyState !== WebSocket.OPEN) {
      alert("Connection lost. Please refresh the page.");
      return;
    }

    setIsSending(true);

    const tempId = `temp-${Date.now()}`;

    try {
      // Create optimistic message
      const optimisticMessage = {
        id: tempId,
        text: trimmedMessage,
        sender: "me",
        senderProfile: {
          avatar: user?.profile?.profile_image,
        },
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        status: "sending",
      };

      // Add optimistic message to UI
      setMessages((prev) => [...prev, optimisticMessage]);

      // Update conversation list optimistically
      updateConversationList(optimisticMessage, true);

      // Prepare payload
      const payload = {
        message: trimmedMessage,
        sender_id: user?.profile?.user?.id,
        conversation_id: selectedConversation.id,
        timestamp: new Date().toISOString(),
      };

      // Send via WebSocket
      socketRef.current.send(JSON.stringify(payload));

      // Clear input
      setNewMessage("");

      // Refetch messages after a short delay to ensure consistency
      // Keeping this as a safety net
      setTimeout(() => {
        refetch();
      }, 500);
    } catch (error) {
      console.error("Error sending message:", error);
      // Remove optimistic message on error
      setMessages((prev) => prev.filter((m) => m.id !== tempId));
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="border rounded-lg bg-white h-full flex flex-col overflow-hidden shadow-sm">
      {/* Header */}
      <div className="px-4 py-3 border-b bg-white flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Back to conversations"
          >
            <LuX size={18} />
          </button>
          <div className="relative">
            <img
              src={
                IMG_URL +
                (selectedConversation?.avatar || "/default-avatar.png")
              }
              className="w-10 h-10 rounded-full object-cover"
              alt={selectedConversation?.name}
              onError={(e) => {
                e.target.src = "https://i.pravatar.cc/150";
              }}
            />
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
          </div>
          <div>
            <h2 className="font-semibold text-gray-800">
              {selectedConversation?.name}
            </h2>
            <p className="text-xs text-gray-500">
              {typing ? "Typing..." : "Online"}
            </p>
          </div>
        </div>
        {/* Removed inactive header buttons */}
      </div>

      {/* Message List */}
      <div className="flex-1 overflow-y-auto p-4 bg-gradient-to-b from-gray-50 to-white custom-scrollbar">
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <div className="text-center">
              <Loader
                className="animate-spin text-blue-500 mx-auto mb-2"
                size={28}
              />
              <p className="text-sm text-gray-500">Loading messages...</p>
            </div>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex justify-center items-center h-full">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-8 h-8 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-700 mb-1">
                No messages yet
              </h3>
              <p className="text-gray-500 text-sm">
                Send a message to start the conversation
              </p>
            </div>
          </div>
        ) : (
          <AnimatePresence initial={false}>
            <div className="space-y-1">
              {messages.map((msg) => (
                <MessageBubble
                  key={msg.id}
                  message={msg}
                  isCurrentUser={msg.sender === "me"}
                />
              ))}
            </div>
            <div ref={messagesEndRef} />
          </AnimatePresence>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 border-t bg-white">
        <div className="flex items-center gap-2">
          <div className="flex-1 relative">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => {
                setNewMessage(e.target.value);
                handleTyping();
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              placeholder="Type your message..."
              className="w-full px-4 py-3 bg-gray-50 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              disabled={isSending}
            />
          </div>
          <button
            onClick={handleSendMessage}
            disabled={!newMessage.trim() || isSending}
            className={`p-3 rounded-full transition-all ${
              newMessage.trim()
                ? "bg-blue-500 hover:bg-blue-600 text-white"
                : "bg-gray-100 text-gray-400"
            } ${isSending ? "opacity-70 cursor-not-allowed" : ""}`}
            aria-label="Send message"
          >
            {isSending ? (
              <Loader className="animate-spin" size={18} />
            ) : (
              <LuSend size={18} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageInbox;
