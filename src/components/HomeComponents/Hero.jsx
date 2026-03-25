import React from "react";
import Title from "../common/Title";
import CommonButton from "../common/CommonButton";
import { MdOutlineArrowOutward } from "react-icons/md";
import { CarOneIcon } from "../common/SVGicons/MySvg";
import { motion } from "framer-motion";

const heroData = [
  {
    id: 1,
    title: "Looking for a Car, Bike, Van, or  Parts?",
    desc: "Browse verified listings from private sellers and trusted professionals near you.",
    icon: <CarOneIcon className="size-10 sm:size-12 lg:size-16 xl:size-auto" />,
  },
  {
    id: 2,
    title: "Want to Sell Your Car, Bike, Van, or Spare Parts?",
    desc: "Create your listing in minutes and connect with thousands of potential buyers.",
    icon: <CarOneIcon className="size-10 sm:size-12 lg:size-16 xl:size-auto" />,
  },
];

const Hero = () => {
  return (
    <div className="bg-[#F9FAFB] section-padding-x section-padding-y grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 overflow-hidden">
      {heroData.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, x: index === 0 ? -50 : 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.2 }}
          className="bg-[#E9F2FF] rounded-2xl p-8 md:p-16 flex flex-col justify-between hover:shadow-xl transition-shadow duration-300"
        >
          {/* Top Section */}
          <div className="flex flex-col gap-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.2 }}
            >
              <Title level="title32">{item.title}</Title>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.2 }}
            >
              <Title level="title18">{item.desc}</Title>
            </motion.div>
          </div>

          {/* Bottom Section */}
          <div className="flex items-center justify-between mt-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + index * 0.2 }}
            >
              <CommonButton
                link="/listings"
                variant="primary"
                className="flex items-center gap-2 transition-transform hover:scale-105 active:scale-95"
              >
                Get Started <MdOutlineArrowOutward />
              </CommonButton>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, rotate: index === 0 ? -10 : 10 }}
              whileInView={{ opacity: 1, rotate: 0 }}
              transition={{ delay: 0.6 + index * 0.2, type: "spring" }}
              className="flex-shrink-0"
            >
              {item.icon}
            </motion.div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default Hero;
