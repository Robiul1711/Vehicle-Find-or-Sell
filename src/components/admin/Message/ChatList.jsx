import React from 'react';
import { Search } from 'lucide-react';

const ChatList = () => {
  const contacts = [
    {
      id: 1,
      name: "Leslie Alexander",
      message: "But I, that am not shaped for sportive...",
      time: "9:41 am",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face&faceindex=1",
      unread: 0
    },
    {
      id: 2,
      name: "Philip khan",
      message: "But I, that am not shaped for sportive...",
      time: "9:30 am",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face&faceindex=1",
      unread: 1
    },
    {
      id: 3,
      name: "Jane Cooper",
      message: "But I, that am not shaped for sportive...",
      time: "9:31 am",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face&faceindex=1",
      unread: 0
    },
    {
      id: 4,
      name: "Robert Fox",
      message: "But I, that am not shaped for sportive...",
      time: "9:31 am",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face&faceindex=1",
      unread: 0
    },
    {
      id: 5,
      name: "Ronald Richards",
      message: "But I, that am not shaped for sportive...",
      time: "9:31 am",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face&faceindex=1",
      unread: 0
    },
    {
      id: 6,
      name: "Albert Flores",
      message: "But I, that am not shaped for sportive...",
      time: "9:31 am",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=40&h=40&fit=crop&crop=face&faceindex=1",
      unread: 0
    },
    {
      id: 7,
      name: "Dianne Russell",
      message: "But I, that am not shaped for sportive...",
      time: "9:31 am",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop&crop=face&faceindex=1",
      unread: 0
    },
    {
      id: 8,
      name: "Floyd Miles",
      message: "But I, that am not shaped for sportive...",
      time: "9:31 am",
      avatar: "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=40&h=40&fit=crop&crop=face&faceindex=1",
      unread: 0
    },
    {
      id: 9,
      name: "Eleanor Pena",
      message: "But I, that am not shaped for sportive...",
      time: "7:31 am",
      avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=40&h=40&fit=crop&crop=face&faceindex=1",
      unread: 0
    },
    {
      id: 10,
      name: "Eleanor Pena",
      message: "But I, that am not shaped for sportive...",
      time: "7:31 am",
      avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=40&h=40&fit=crop&crop=face&faceindex=1",
      unread: 0
    },
    {
      id: 11,
      name: "Eleanor Pena",
      message: "But I, that am not shaped for sportive...",
      time: "7:31 am",
      avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=40&h=40&fit=crop&crop=face&faceindex=1",
      unread: 0
    },
  ];

  return (
  <div className="max-w-sm mx-auto bg-white rounded-2xl h-[85vh] flex flex-col">
  {/* Header */}
  <div className="px-4 py-6 flex-shrink-0">
    <h1 className="text-2xl font-semibold text-gray-900 mb-4">Message</h1>

    {/* Search Bar */}
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="text"
        placeholder="Search by name..."
        className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
      />
    </div>
  </div>

  {/* Chat List */}
  <div className="flex-1 overflow-y-auto px-4 pb-4 no-scrollbar">
    {contacts.map((contact) => (
      <div
        key={contact.id}
        className="flex items-center py-3 hover:bg-gray-50 cursor-pointer rounded-lg px-2 -mx-2"
      >
        {/* Avatar */}
        <div className="flex-shrink-0 mr-3">
          <img
            className="h-12 w-12 rounded-full object-cover"
            src={contact.avatar}
            alt={contact.name}
          />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-900 truncate">
              {contact.name}
            </p>
            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-500">{contact.time}</span>
              {contact.unread > 0 && (
                <div className="bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {contact.unread}
                </div>
              )}
            </div>
          </div>
          <p className="text-sm text-gray-500 truncate mt-1">
            {contact.message}
          </p>
        </div>
      </div>
    ))}
  </div>
</div>

  );
};

export default ChatList;