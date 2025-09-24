import React, { useState, useRef, useEffect } from "react";
import { FiBell } from "react-icons/fi";
import { FaRegCheckCircle, FaRegTimesCircle } from "react-icons/fa";
import { MdEventNote } from "react-icons/md";

const notifications = [
  {
    id: 1,
    text: '5K Training Tips" has been approved and published',
    time: "5 min ago",
    type: "success",
  },
  {
    id: 2,
    text: 'You\'ve been added as a Pacer for "Dubai 10K Run"',
    time: "5 min ago",
    type: "event",
  },
  {
    id: 3,
    text: 'Your article "Trail Running Essentials" was rejected',
    time: "5 min ago",
    type: "error",
  },
  {
    id: 4,
    text: "Your subscription has been successfully activated!",
    time: "5 min ago",
    type: "success",
  },
  {
    id: 5,
    text: "Your subscription will expire soon!",
    time: "5 min ago",
    type: "event",
  },
];

const NotificationDropdown = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

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

  // Choose icon based on type
  const getIcon = (type) => {
    switch (type) {
      case "success":
        return <FaRegCheckCircle className="text-green-500 text-lg" />;
      case "error":
        return <FaRegTimesCircle className="text-red-500 text-lg" />;
      case "event":
        return <MdEventNote className="text-blue-500 text-lg" />;
      default:
        return <MdEventNote className="text-gray-500 text-lg" />;
    }
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
        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-3 w-80 bg-white shadow-xl border rounded-lg overflow-hidden z-50">
          <div className="px-4 py-3 border-b">
            <h3 className="text-lg font-semibold text-gray-900">
              Notifications
            </h3>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {notifications.map((n) => (
              <div
                key={n.id}
                className="flex items-start gap-3 px-4 py-3 hover:bg-gray-50 transition"
              >
                <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100">
                  {getIcon(n.type)}
                </div>
                <div className="flex flex-col">
                  <p className="text-sm text-gray-800">{n.text}</p>
                  <span className="text-xs text-gray-500">{n.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
