import React from "react";
import Title from "../common/Title";
import {
  AllUserIcon,
  EasyAdPostingIcon,
  SecureTrustedIcon,
  SmartPromotionsIcon,
} from "../common/SVGicons/MySvg";
import { motion } from "framer-motion";

const WhyChooseUsData = [
  {
    id: 1,
    icon: <EasyAdPostingIcon className={"size-12 sm:size-12 md:size-14 xl:size-auto"}/>,
    title: "Easy Ad Posting",
    desc: "List your vehicle with photos, videos & documents in minutes.",
  },
  {
    id: 2,
    icon: <AllUserIcon className={"size-12 sm:size-12 md:size-14 xl:size-auto"}/>,
    title: "For All Users",
    desc: "Designed for both private sellers and professional dealers.",
  },
  {
    id: 3,
    icon: <SmartPromotionsIcon className={"size-12 sm:size-12 md:size-14 xl:size-auto"}/>,
    title: "Smart Promotions",
    desc: "Boost your ad’s visibility with featured and top listings.",
  },
  {
    id: 4,
    icon: <SecureTrustedIcon className={"size-12 sm:size-12 md:size-14 xl:size-auto"}/>,
    title: "Secure & Trusted",
    desc: "Safe messaging, verified users, and full data protection.",
  },
];

const WhyChooseUs = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section className="section-padding-x section-padding-y bg-custom-primary text-white overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <Title level="title40">Why Choose Us?</Title>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mt-12"
      >
        {WhyChooseUsData.map((item) => (
          <motion.div
            key={item.id}
            variants={itemVariants}
            className="flex flex-col items-center text-center gap-4 sm:gap-6 px-4 group"
          >
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="w-16 h-16 md:w-20 md:h-20 transition-transform cursor-pointer"
            >
              {item.icon}
            </motion.div>
            <Title level="title24">{item.title}</Title>
            <p className="text-sm md:text-base text-gray-100 opacity-80 group-hover:opacity-100 transition-opacity">
              {item.desc}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default WhyChooseUs;
