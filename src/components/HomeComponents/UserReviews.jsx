import React from "react";
import Title from "../common/Title";
import TestimonialCard from "./TestimonialCard";
import { useApiQuery } from "@/hooks/useApiQuery";
import { motion } from "framer-motion";

const UserReviews = () => {
    const { data:testimonials, isLoading } = useApiQuery({
      queryKey: ["testimonials"],
      url: "/cms/testimonials/",
    });
    // console.log(testimonials);
  return (
    <div className="section-padding-x section-padding-y bg-[#000E1D] text-white overflow-hidden">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <Title level="title40">What Our Users Are Saying..!</Title>
        <Title level="title20" className="mt-4 text-gray-400">
          Real feedback from individuals and professionals who’ve bought, sold, and listed vehicles with us.
        </Title>
      </motion.div>
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mt-10"
      >
        <TestimonialCard testimonials={testimonials?.data} isLoading={isLoading} />
      </motion.div>
    </div>
  );
};

export default UserReviews;
