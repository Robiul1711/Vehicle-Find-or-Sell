import React from "react";
import { MdOutlineArrowOutward } from "react-icons/md";
import banner from "@/assets/images/banner.png";
import Title from "../common/Title";
import CommonButton from "../common/CommonButton";
import { motion } from "framer-motion";
import { useApiQuery } from "@/hooks/useApiQuery";

const Banner = () => {
    const { data } = useApiQuery({
    queryKey: ["home"],
    url: "cms/home/",
  });

  const BannerData = data?.data;
  // console.log(BannerData)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9, x: 20 },
    visible: { opacity: 1, scale: 1, x: 0, transition: { duration: 1, ease: "easeOut" } },
  };

  return (
    <section className="w-full relative bg-white overflow-hidden">
      {/* Desktop layout */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="hidden md:flex flex-row justify-between items-center section-padding-x"
      >
        {/* Left Content */}
        <div className="w-1/2 flex flex-col justify-center space-y-6 text-left">
          <motion.p variants={itemVariants} className="text-lg font-medium text-gray-600 dark:text-gray-300">
            {BannerData?.subtitle || "Buy or sell vehicles today – fast, simple, trusted."}
          </motion.p>

          <motion.div variants={itemVariants}>
            <Title level="title70" className="max-w-[750px]">
              {BannerData?.title || "Find or Sell Your Vehicle Fast & Easy!"}
            </Title>
          </motion.div>

          <motion.div variants={itemVariants} className="flex gap-4">
            <CommonButton
              link="/dashboard/create-ads"
              variant="primary"
              className="flex items-center gap-2 transition-transform hover:scale-105 active:scale-95"
            >
              Post Your Ads <MdOutlineArrowOutward />
            </CommonButton>
            <CommonButton 
              link={"/listings"} 
              variant="primary" 
              className="flex items-center gap-2 transition-transform hover:scale-105 active:scale-95"
            >
              Browse Listings <MdOutlineArrowOutward />
            </CommonButton>
          </motion.div>
        </div>

        {/* Right Content */}
        <motion.div variants={imageVariants} className="w-1/2 flex justify-end">
          <img
            src={BannerData?.hero_background_image_url || banner}
            alt="Car banner"
            className="w-full max-w-full object-contain"
          />
        </motion.div>
      </motion.div>

      {/* Mobile layout */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="md:hidden relative w-full h-[400px] flex items-center justify-center"
      >
        {/* Blurred Background */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${banner})`,
            filter: "blur(6px)",
          }}
        ></div>

        {/* Overlay for better contrast */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Text content */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 text-center px-4"
        >
          <motion.p variants={itemVariants} className="text-white text-lg font-medium mb-2">
            Buy or sell vehicles today – fast, simple, trusted.
          </motion.p>
          <motion.div variants={itemVariants}>
            <Title level="title40" className="text-white mb-4">
              Find or Sell Your Vehicle Fast & Easy!
            </Title>
          </motion.div>
          <motion.div variants={itemVariants} className="flex gap-3 sm:flex-row justify-center">
            <CommonButton
              link="/dashboard/create-ads"
              variant="primary"
              className="flex items-center gap-2 justify-center border border-white text-white"
            >
              Post Your Ad <MdOutlineArrowOutward />
            </CommonButton>
            <CommonButton 
              link="/listings" 
              className="flex items-center gap-2 justify-center border-white text-white"
            >
              Browse Listings <MdOutlineArrowOutward />
            </CommonButton>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Banner;
