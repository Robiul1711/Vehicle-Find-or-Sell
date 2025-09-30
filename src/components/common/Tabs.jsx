'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Tabs({ items = [], className = '' }) {
  const [activeTab, setActiveTab] = useState(items[0]?.id ?? 1);

  const tabVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  };

  const indicatorVariants = {
    hidden: { scaleX: 0 },
    visible: { scaleX: 1 },
  };

  const contentVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={tabVariants}
      className={`bg-white/60 backdrop-blur-sm rounded-2xl overflow-hidden w-full ${className}`}
    >
      {/* Tabs */}
      <div className="flex overflow-x-auto no-scrollbar border-b border-gray-100 bg-gray-50/50 backdrop-blur-sm">
        {items.map((tab) => (
          <motion.button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative px-2 sm:px-6 py-3 text-sm sm:text-base font-medium transition-all duration-300 ease-out flex-shrink-0 ${
              activeTab === tab.id
                ? 'text-slate-800'
                : 'text-slate-500 hover:text-slate-700'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            aria-selected={activeTab === tab.id}
            role="tab"
          >
            <span className="relative z-10 whitespace-nowrap">{tab.name}</span>
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-slate-600 to-slate-800"
                initial="hidden"
                animate="visible"
                variants={indicatorVariants}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              />
            )}
          </motion.button>
        ))}
      </div>

      {/* Content */}
      <div className="relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            role="tabpanel"
            className="py-6  "
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.2, ease: 'easeInOut' }}
          >
            {items.find((tab) => tab.id === activeTab)?.content ||
              items[0]?.content}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
