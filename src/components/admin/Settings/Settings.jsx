import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaRegUser, FaStar } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import { FaLock } from "react-icons/fa";
import ManageNotification from "./ManageNotification";
import ChangePassword from "./ChangePassword";
import EditProfile from "./EditProfile";
import AddServices from "./AddServices";
import Subscription from "./Subscription";
import { GrServices } from "react-icons/gr";
import { LuPackage2 } from "react-icons/lu";
import AddGoogleReview from "./AddGoogleReview";
export default function Settings() {
  const [activeTab, setActiveTab] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (activeTab) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [activeTab]);
  const tabs = [
      {
      id: 1,
      name: "Subscription",
      icon: <LuPackage2 className="size-6"/>,
      type: "content",
      content: <Subscription />,
    },
    {
      id: 2,
      name: "Edit Profile",
      icon:<FaRegUser /> ,
      type: "content",
      content: <EditProfile />,
    },
    {
      id: 3,
      name: "Manage Services",
      icon: <GrServices />,
      type: "content",
      content:<AddServices/>,
    },
    {
      id: 4,
      name: "Change Password",
      icon: <FaLock />,
      type: "content",
      content:<ChangePassword/>,
    },
    {
      id: 5,
      name: "Manage Notification",
      icon: <IoIosNotifications  className="size-6"/>,
      type: "content",
      content: <ManageNotification />,
    },
    {
      id: 6,
      name: "Add Google Review",
      icon: <FaStar />,
      type: "content",
      content: <AddGoogleReview />,
    },
  
  ];
  return (
  <div className="w-full">
  <div className="flex flex-col sm:flex-row gap-4 md:gap-6 rounded-xl overflow-hidden">
    {/* Sidebar Tabs */}
    <div className="flex sm:w-72 sm:flex-col overflow-x-auto sm:overflow-visible bg-white rounded-xl shadow-sm">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`relative flex items-center px-4 py-3 sm:py-4 transition-all flex-shrink-0 sm:flex-shrink-none
            ${activeTab === tab.id ? "text-white" : "text-gray-500 hover:text-gray-800"}
          `}
        >
          {activeTab === tab.id && (
            <motion.div
              layoutId="tabBackground"
              className="absolute inset-0 bg-custom-primary rounded-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            />
          )}
          <div className="flex items-center gap-2 sm:gap-3 z-10">
            <span className="text-base sm:text-xl">{tab.icon}</span>
            <span className="text-sm sm:text-base font-medium whitespace-nowrap">
              {tab.name}
            </span>
          </div>

          {activeTab === tab.id ? (
            <motion.div
              layoutId="activeDot"
              className="absolute right-3 w-2 h-2 rounded-full bg-white"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1 }}
            />
          ) : (
            <div className="absolute right-3 w-2 h-2 rounded-full bg-gray-400/0 group-hover:bg-gray-400/30 transition-colors" />
          )}
        </button>
      ))}
    </div>

    {/* Tab Content */}
    <div className="flex-1 relative rounded-xl bg-white dark:bg-gray-900/80 backdrop-filter backdrop-blur-lg shadow-lg overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.3 }}
          className="p-4 md:p-6 h-[calc(100vh-150px)] overflow-y-auto custom-scrollbar"
        >
          <h3 className="text-lg font-semibold flex items-center gap-2 mb-4 text-gray-900">
            <span>{tabs.find((t) => t.id === activeTab)?.icon}</span>
            <span>{tabs.find((t) => t.id === activeTab)?.name}</span>
          </h3>
          <div className="prose">
            {tabs.find((tab) => tab.id === activeTab)?.content || tabs[0].content}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  </div>
</div>

  );
}
