import React, { useRef, useState, useEffect, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  X,
  Loader,
  Paperclip,
  FileText,
  Download,
  Eye,
  ArrowLeft,
  Check,
  CheckCheck,
  File,
} from "lucide-react";
import { useApiQuery } from "@/hooks/useApiQuery";
import { useAuth } from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";

/* ================= ATTACHMENT RENDERER ================= */

const AttachmentItem = ({ attachment }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  const isImage =
    attachment.type === "image" ||
    (attachment.name && /\.(jpg|jpeg|png|webp|gif)$/i.test(attachment.name)) ||
    (attachment.url && /\.(jpg|jpeg|png|webp|gif)/i.test(attachment.url));

  if (isImage) {
    return (
      <>
        <div
          className="relative rounded-xl overflow-hidden border border-gray-100 group shadow-sm max-w-sm cursor-zoom-in"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => setIsImageModalOpen(true)}
        >
          <img
            src={attachment.url}
            alt={attachment.name || "Attachment"}
            className="max-h-60 object-cover w-full transition-transform duration-300 group-hover:scale-105"
          />
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/40 flex items-center justify-center gap-2"
              >
                <button
                  className="p-2 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full text-white transition-colors"
                  title="View Image"
                >
                  <Eye size={16} />
                </button>
                <a
                  href={attachment.url}
                  download
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="p-2 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full text-white transition-colors"
                  title="Download"
                >
                  <Download size={16} />
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Lightbox */}
        <AnimatePresence>
          {isImageModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsImageModalOpen(false)}
              className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            >
              <button
                onClick={() => setIsImageModalOpen(false)}
                className="absolute top-4 right-4 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
              >
                <X size={24} />
              </button>
              <motion.img
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
                src={attachment.url}
                alt={attachment.name}
                className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              />
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/60 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm font-medium">
                {attachment.name}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
  }

  // PDF / document
  return (
    <div className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-200 rounded-xl max-w-sm shadow-sm hover:bg-gray-100 transition-colors">
      <div className="p-2.5 bg-red-50 text-red-500 rounded-lg flex-shrink-0">
        <FileText size={20} />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-xs font-semibold text-gray-800 truncate">
          {attachment.name}
        </h4>
        <p className="text-[10px] text-gray-500 font-medium">PDF Document</p>
      </div>
      <div className="flex gap-1.5">
        <a
          href={attachment.url}
          target="_blank"
          rel="noreferrer"
          className="p-1.5 hover:bg-gray-200 text-gray-600 rounded-lg transition-colors"
          title="Open"
        >
          <Eye size={15} />
        </a>
        <a
          href={attachment.url}
          download
          target="_blank"
          rel="noreferrer"
          className="p-1.5 hover:bg-gray-200 text-gray-600 rounded-lg transition-colors"
          title="Download"
        >
          <Download size={15} />
        </a>
      </div>
    </div>
  );
};

/* ================= MESSAGE BUBBLE ================= */

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
  const hasAttachments = message.attachments && message.attachments.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.18 }}
      className={`flex ${isCurrentUser ? "justify-end" : "justify-start"} mb-4`}
    >
      <div className="flex items-end gap-2.5 max-w-[75%] sm:max-w-[70%]">
        {!isCurrentUser && (
          <img
            src={message.senderProfile?.avatar || "/default-avatar.png"}
            alt="Profile"
            className="w-8 h-8 rounded-full object-cover flex-shrink-0 shadow-sm border border-gray-100"
            onError={(e) => {
              e.target.src = "https://i.pravatar.cc/150";
            }}
          />
        )}

        <div className={`flex flex-col ${isCurrentUser ? "items-end" : "items-start"}`}>
          <div
            className={`shadow-sm ${
              isCurrentUser
                ? "bg-blue-600 text-white rounded-2xl rounded-br-none"
                : "bg-gray-100 text-gray-800 rounded-2xl rounded-bl-none"
            } overflow-hidden`}
          >
            {/* Attachments */}
            {hasAttachments && (
              <div className="p-2.5 flex flex-col gap-2 bg-black/5 border-b border-black/5">
                {message.attachments.map((att, index) => (
                  <AttachmentItem key={att.id || index} attachment={att} />
                ))}
              </div>
            )}

            {/* Text */}
            {text && (
              <div className="px-4 py-2.5">
                <p className="text-sm leading-relaxed whitespace-pre-wrap font-medium">
                  <span>{text}</span>
                </p>
              </div>
            )}
          </div>

          {/* Timestamp & Status */}
          <div
            className={`text-[10px] mt-1 text-gray-400 font-medium flex items-center gap-1 ${
              isCurrentUser ? "justify-end" : "justify-start"
            }`}
          >
            <span>{message.timestamp}</span>
            {isCurrentUser && message.status && (
              <span className="text-blue-400">
                {message.status === "sending" && (
                  <Loader size={10} className="animate-spin text-gray-400" />
                )}
                {message.status === "sent" && <Check size={12} />}
                {message.status === "delivered" && <CheckCheck size={12} />}
              </span>
            )}
          </div>
        </div>

        {isCurrentUser && (
          <img
            src={message.senderProfile?.avatar || "/default-avatar.png"}
            alt="Profile"
            className="w-8 h-8 rounded-full object-cover flex-shrink-0 shadow-sm border border-gray-100"
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
  const [selectedFiles, setSelectedFiles] = useState([]);
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  /* -------- FETCH MESSAGES -------- */
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

  /* -------- POLLING — refetch every 3 seconds -------- */
  useEffect(() => {
    if (!selectedConversation?.id) return;

    const interval = setInterval(() => {
      refetch();
    }, 3000);

    return () => clearInterval(interval);
  }, [selectedConversation?.id, refetch]);

  /* -------- PROCESS MESSAGE -------- */
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
        attachments: msg.attachments || [],
        timestamp: new Date(
          msg.timestamp || msg.created_at || Date.now(),
        ).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        status: isMe ? "delivered" : undefined,
      };
    },
    [user, selectedConversation],
  );

  /* -------- SYNC FETCHED MESSAGES -------- */
  useEffect(() => {
    if (inboxMessagesData?.data) {
      const processed = inboxMessagesData.data.map(processMessage);
      setMessages(processed);
    }
  }, [inboxMessagesData, processMessage]);

  /* -------- UPDATE CONVERSATION LIST -------- */
  const updateConversationList = useCallback(
    (message, isCurrentUser) => {
      if (!queryClient) return;

      queryClient.setQueryData(["conversations-list"], (oldData) => {
        if (!oldData?.data) return oldData;

        const updatedData = oldData.data.map((conv) => {
          if (conv.id === selectedConversation.id) {
            const textContent =
              typeof message.text === "object"
                ? message.text?.text
                : message.text || "Sent an attachment";

            return {
              ...conv,
              last_message: {
                ...conv.last_message,
                id: message.id,
                text: textContent,
                timestamp: new Date().toISOString(),
              },
              unread_count: isCurrentUser
                ? conv.unread_count
                : (conv.unread_count || 0) + 1,
            };
          }
          return conv;
        });

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

  /* -------- AUTO SCROLL -------- */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /* -------- FILE HANDLERS -------- */
  const handleFileChange = (e) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    const newFiles = files.map((file) => ({
      id: `local-${Date.now()}-${file.name}`,
      file,
      previewUrl: file.type.startsWith("image/")
        ? URL.createObjectURL(file)
        : null,
    }));
    setSelectedFiles((prev) => [...prev, ...newFiles]);
    // Reset input so same file can be re-selected
    e.target.value = "";
  };

  const removeSelectedFile = (id) => {
    setSelectedFiles((prev) => {
      const target = prev.find((f) => f.id === id);
      if (target?.previewUrl) URL.revokeObjectURL(target.previewUrl);
      return prev.filter((f) => f.id !== id);
    });
  };

  /* -------- SEND MESSAGE -------- */
  const handleSendMessage = async () => {
    const trimmedMessage = newMessage.trim();
    if (!trimmedMessage && selectedFiles.length === 0) return;
    if (isSending) return;

    setIsSending(true);
    const tempId = `temp-${Date.now()}`;

    try {
      // Optimistic message
      const optimisticMessage = {
        id: tempId,
        text: trimmedMessage,
        sender: "me",
        senderProfile: { avatar: user?.profile?.profile_image },
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        status: "sending",
        attachments: selectedFiles.map((f) => ({
          id: f.id,
          name: f.file.name,
          type: f.file.type.startsWith("image/") ? "image" : "pdf",
          url: f.previewUrl || "",
        })),
      };

      setMessages((prev) => [...prev, optimisticMessage]);
      updateConversationList(optimisticMessage, true);

      // Build FormData
      const formData = new FormData();
      if (trimmedMessage) formData.append("text", trimmedMessage);
      selectedFiles.forEach((fileObj) => {
        formData.append("attachment", fileObj.file);
      });

      // POST request
      const response = await axiosSecure.post(
        `/message/conversations/${selectedConversation.id}/messages/`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } },
      );

      const realMessage = response.data?.data;
      if (realMessage) {
        const processed = processMessage(realMessage);
        processed.status = "sent";

        setMessages((prev) => {
          const idx = prev.findIndex((m) => m.id === tempId);
          if (idx !== -1) {
            const updated = [...prev];
            updated[idx] = processed;
            return updated;
          }
          return [...prev, processed];
        });

        updateConversationList(processed, true);
      }

      // Cleanup blob URLs
      selectedFiles.forEach((f) => {
        if (f.previewUrl) URL.revokeObjectURL(f.previewUrl);
      });

      setNewMessage("");
      setSelectedFiles([]);

      // Refresh after send
      setTimeout(() => refetch(), 500);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => prev.filter((m) => m.id !== tempId));
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="border rounded-2xl bg-white h-full flex flex-col overflow-hidden shadow-md border-gray-200">
      {/* ── Header ── */}
      <div className="px-5 py-4 border-b bg-gradient-to-r from-gray-50/60 to-white flex items-center justify-between">
        <div className="flex items-center gap-3.5">
          <button
            onClick={onBack}
            className="md:hidden p-2 hover:bg-gray-100 rounded-xl transition-all"
            aria-label="Back"
          >
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
          <div className="relative">
            <img
              src={selectedConversation?.avatar || "/default-avatar.png"}
              className="w-11 h-11 rounded-full object-cover border-2 border-white shadow-sm"
              alt={selectedConversation?.name}
              onError={(e) => {
                e.target.src = "https://i.pravatar.cc/150";
              }}
            />
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white animate-pulse" />
          </div>
          <div>
            <h2 className="font-bold text-gray-800 text-base leading-tight">
              <span>{selectedConversation?.name}</span>
            </h2>
            <p className="text-xs text-gray-500 font-medium mt-0.5 flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full inline-block" />
              Online
            </p>
          </div>
        </div>
      </div>

      {/* ── Message List ── */}
      <div
        className="flex-1 overflow-y-auto p-5 bg-gradient-to-b from-slate-50/70 via-gray-50/40 to-white [&::-webkit-scrollbar]:hidden"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <div className="text-center">
              <Loader className="animate-spin text-blue-500 mx-auto mb-2" size={32} />
              <p className="text-sm font-medium text-gray-500">
                <span>Loading messages...</span>
              </p>
            </div>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex justify-center items-center h-full">
            <div className="text-center max-w-xs px-4">
              <div className="w-16 h-16 mx-auto bg-blue-50 text-blue-400 rounded-full flex items-center justify-center mb-4">
                <File className="w-8 h-8" />
              </div>
              <h3 className="text-base font-bold text-gray-800 mb-1.5">
                <span>No messages yet</span>
              </h3>
              <p className="text-gray-400 text-sm font-medium">
                <span>Send a message or attach a file to get started.</span>
              </p>
            </div>
          </div>
        ) : (
          <>
            <AnimatePresence initial={false}>
              {messages.map((msg) => (
                <MessageBubble
                  key={msg.id}
                  message={msg}
                  isCurrentUser={msg.sender === "me"}
                />
              ))}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* ── Selected File Previews ── */}
      {selectedFiles.length > 0 && (
        <div
          className="px-4 py-3 border-t bg-gray-50/80 flex flex-wrap gap-2.5 max-h-36 overflow-y-auto [&::-webkit-scrollbar]:hidden"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {selectedFiles.map((fileObj) => (
            <div
              key={fileObj.id}
              className="relative flex items-center gap-2 p-2 bg-white rounded-xl border border-gray-200 shadow-sm max-w-[190px]"
            >
              {fileObj.previewUrl ? (
                <img
                  src={fileObj.previewUrl}
                  alt="preview"
                  className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                />
              ) : (
                <div className="w-10 h-10 rounded-lg bg-red-50 text-red-400 flex items-center justify-center flex-shrink-0">
                  <FileText size={20} />
                </div>
              )}
              <div className="flex-1 min-w-0 pr-4">
                <p className="text-xs font-semibold text-gray-800 truncate">
                  {fileObj.file.name}
                </p>
                <p className="text-[10px] text-gray-400 font-medium">
                  {(fileObj.file.size / 1024).toFixed(0)} KB
                </p>
              </div>
              <button
                onClick={() => removeSelectedFile(fileObj.id)}
                className="absolute -top-1.5 -right-1.5 p-1 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-sm transition-transform hover:scale-110"
              >
                <X size={10} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* ── Input Area ── */}
      <div className="p-4 border-t bg-white">
        <div className="flex items-end gap-2.5">
          {/* Attach button */}
          <div className="pb-1">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              multiple
              accept="image/*,application/pdf"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isSending}
              className="p-3 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all duration-200"
              title="Attach files"
            >
              <Paperclip size={20} />
            </button>
          </div>

          {/* Text input */}
          <div className="flex-1">
            <textarea
              rows={1}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              placeholder="Type your message..."
              className="w-full px-4 py-3 bg-gray-50 hover:bg-white focus:bg-white rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/70 focus:border-transparent text-sm transition-all duration-200 resize-none max-h-24 font-medium"
              disabled={isSending}
            />
          </div>

          {/* Send button */}
          <div className="pb-0.5">
            <button
              onClick={handleSendMessage}
              disabled={(!newMessage.trim() && selectedFiles.length === 0) || isSending}
              className={`p-3.5 rounded-full transition-all duration-200 shadow-md ${
                newMessage.trim() || selectedFiles.length > 0
                  ? "bg-blue-600 hover:bg-blue-700 text-white hover:scale-105"
                  : "bg-gray-100 text-gray-300 cursor-not-allowed shadow-none"
              } ${isSending ? "opacity-75 scale-100 cursor-not-allowed" : ""}`}
              aria-label="Send message"
            >
              {isSending ? (
                <Loader className="animate-spin" size={18} />
              ) : (
                <Send size={18} />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageInbox;
