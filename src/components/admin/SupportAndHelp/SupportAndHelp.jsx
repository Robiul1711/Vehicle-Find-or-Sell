import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaQuestionCircle } from "react-icons/fa";
import { BiMessageRoundedDots } from "react-icons/bi";
import Faq from "./Faq";
import ContactUs from "./ContactUs";
export default function SupportAndHelp() {
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
      name: "FAQ",
      icon: <FaQuestionCircle />,
      type: "content",
      content: <Faq />,
    },
    {
      id: 2,
      name: "Contact Us",
      icon: <BiMessageRoundedDots />,
      type: "content",
      content: <ContactUs />,
    },
  ];
  return (
    <div className="w-full ">
      {}
      <div className="flex flex-col sm:flex-row gap-6 rounded-xl overflow-hidden">
        {}
        <div className="sm:w-56 flex sm:flex-col rounded-xl bg-white  backdrop-filter backdrop-blur-lg">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                relative group flex items-center w-full px-4 py-3 sm:py-4 transition-all
                ${
                  activeTab === tab.id
                    ? "text-white "
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-800 "
                }
              `}
            >
              {}
              {activeTab === tab.id && (
                <motion.div
                  layoutId="tabBackground"
                  className="absolute inset-0 bg-custom-primary rounded-lg"
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    opacity: 1,
                  }}
                  transition={{
                    duration: 0.2,
                  }}
                />
              )}

              {}
              <div className="flex items-center gap-3 z-10">
                <span className="text-xl">{tab.icon}</span>
                <span className="font-medium">{tab.name}</span>
              </div>

              {}
              {activeTab === tab.id ? (
                <motion.div
                  layoutId="activeDot"
                  className="absolute right-3 w-2 h-2 rounded-full bg-white"
                  initial={{
                    scale: 0,
                  }}
                  animate={{
                    scale: 1,
                  }}
                  transition={{
                    delay: 0.1,
                  }}
                />
              ) : (
                <div className="absolute right-3 w-2 h-2 rounded-full bg-gray-400/0 group-hover:bg-gray-400/30 transition-colors" />
              )}
            </button>
          ))}
        </div>

        {}
        <div className="flex-1 relative rounded-xl bg-white dark:bg-gray-900/80 backdrop-filter backdrop-blur-lg shadow-lg overflow-hidden">
          {}
          <AnimatePresence>
            {isLoading && (
              <motion.div
                key="loader"
                className="absolute inset-0 z-20 flex items-center justify-center bg-white dark:bg-gray-900/90 backdrop-blur-sm"
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 0.7,
                }}
                exit={{
                  opacity: 0,
                }}
                transition={{
                  duration: 0.2,
                }}
              >
                <svg
                  className="animate-spin h-8 w-8 text-indigo-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              </motion.div>
            )}
          </AnimatePresence>

          {}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.3 }}
              className="p-4 md:p-6 h-[calc(100vh-150px)] overflow-y-auto"
            >
              <h3 className="text-lg font-semibold flex items-center gap-2 mb-4 text-gray-900">
                <span>{tabs.find((t) => t.id === activeTab)?.icon}</span>
                <span>{tabs.find((t) => t.id === activeTab)?.name}</span>
              </h3>
              <div className="prose">
                {tabs.find((tab) => tab.id === activeTab)?.content ||
                  tabs[0].content}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
