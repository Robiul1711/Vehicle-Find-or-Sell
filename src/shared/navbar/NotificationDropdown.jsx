import React, { useState, useRef, useEffect } from "react";
import { FiBell } from "react-icons/fi";
import { FaRegCheckCircle, FaRegTimesCircle } from "react-icons/fa";
import { MdEventNote } from "react-icons/md";
import { useApiQuery } from "@/hooks/useApiQuery";
import { useApiMutation } from "@/hooks/useApiMutation";

const NotificationDropdown = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const [selectedId, setSelectedId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: notificationsData, refetch } = useApiQuery({
    queryKey: ["notification"],
    url: "/notification/notifications/",
    secure: true,
  });
  // console.log(notificationsData)
  const { data: specificNotification, isLoading: notificationLoading } =
    useApiQuery({
      queryKey: ["notification-detail", selectedId],
      url: `/notification/notifications/${selectedId}/`,
      secure: true,
      enabled: !!selectedId,
    });

  const { mutate: markAsRead } = useApiMutation({
    url: `/notification/notifications/${selectedId}/read/`,
    method: "POST",
    secure: true,

    onSuccess: () => {
      refetch(); // Refresh list to update unread count/styles
    },
  });

  const { mutate: markAllAsRead } = useApiMutation({
    url: `/notification/notifications/read-all/`,
    method: "POST",
    secure: true,

    onSuccess: () => {
      refetch(); // Refresh list to update unread count/styles
    },
  });

  const notificationsList = notificationsData?.data || [];
  const unreadCount = notificationsList.filter((n) => !n.is_read).length;

  const handleNotificationClick = (notification) => {
    setSelectedId(notification.id);
    setIsModalOpen(true);
    setOpen(false); // Close dropdown

    if (!notification.is_read) {
      markAsRead();
    }
  };

  // Format date to relative time or readable string
  const formatTime = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) return "Just now";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return date.toLocaleDateString();
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Choose icon based on verb content
  const getIcon = (verb) => {
    const lowerVerb = verb?.toLowerCase() || "";
    if (lowerVerb.includes("published") || lowerVerb.includes("approved")) {
      return <FaRegCheckCircle className="text-green-500 text-lg" />;
    }
    if (lowerVerb.includes("declined") || lowerVerb.includes("rejected")) {
      return <FaRegTimesCircle className="text-red-500 text-lg" />;
    }
    return <MdEventNote className="text-blue-500 text-lg" />;
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bell Icon */}
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 rounded-full hover:bg-gray-100 transition"
      >
        <FiBell size={22} className="text-gray-700" />
        {/* Badge */}
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full leading-none">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-3 w-80 bg-white shadow-xl border rounded-lg overflow-hidden z-50">
          <div className="px-4 py-3 border-b flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              Notifications
            </h3>
            {unreadCount > 0 && (
              <span
                onClick={() => markAllAsRead()}
                className="text-xs text-blue-600 font-medium cursor-pointer hover:underline"
              >
                Mark all as read
              </span>
            )}
          </div>
          <div className="max-h-96 overflow-y-auto">
            {notificationsList.length > 0 ? (
              notificationsList.map((n) => (
                <div
                  key={n.id}
                  onClick={() => handleNotificationClick(n)}
                  className={`flex items-start gap-3 px-4 py-3 hover:bg-gray-50 transition border-b last:border-b-0 cursor-pointer ${
                    !n.is_read ? "bg-blue-50/50" : ""
                  }`}
                >
                  <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-sm border border-gray-100">
                    {getIcon(n.verb)}
                  </div>
                  <div className="flex flex-col flex-1">
                    <p className="text-sm text-gray-800 leading-snug">
                      {n.verb}
                    </p>
                    <span className="text-xs text-gray-500 mt-1">
                      {formatTime(n.created_at)}
                    </span>
                  </div>
                  {!n.is_read && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 flex-shrink-0"></div>
                  )}
                </div>
              ))
            ) : (
              <div className="px-4 py-8 text-center text-gray-500">
                <p>No notifications yet</p>
              </div>
            )}
          </div>
        </div>
      )}
      {/* Notification Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center">
                  <FiBell size={24} className="text-orange-600" />
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <FaRegTimesCircle className="text-gray-400 text-xl" />
                </button>
              </div>

              {notificationLoading ? (
                <div className="py-8 flex flex-col items-center justify-center gap-3">
                  <div className="w-8 h-8 border-4 border-orange-500/20 border-t-orange-500 rounded-full animate-spin"></div>
                  <p className="text-sm text-gray-500">Loading details...</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 leading-tight">
                      Notification Detail
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">
                      {formatTime(specificNotification?.data?.created_at)}
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                    <p className="text-gray-800 font-medium leading-relaxed">
                      {specificNotification?.data?.verb}
                    </p>
                  </div>

                  {specificNotification?.data?.target_id && (
                    <button
                      onClick={() => {
                        setIsModalOpen(false);
                        // Optional: navigate to the item
                        // window.location.href = `/dashboard/car-details/${specificNotification.data.target_id}`;
                      }}
                      className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-4 rounded-xl transition-colors shadow-lg shadow-orange-600/20"
                    >
                      View Related Item
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
