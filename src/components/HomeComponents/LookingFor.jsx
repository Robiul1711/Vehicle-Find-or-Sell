import React, { useState } from 'react'
import lookfor from '@/assets/images/lookfor.png'
import Title from '../common/Title'
import { BsFillSendPlusFill } from "react-icons/bs";
import { useApiMutation } from '@/hooks/useApiMutation';
import { useForm } from "react-hook-form";
import { motion } from 'framer-motion';

const LookingFor = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const { mutate: newsletter, isPending } = useApiMutation({
    url: "/cms/newsletter/",
    method: "POST",
    successMessage: "Subscribed successfully",
    onSuccess: () => {
      reset();
    }
  });

  const handleSubscribe = (data) => {
    newsletter(data);
  };
  return (
    <div className="section-padding-x section-padding-y overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col lg:flex-row w-full justify-between lg:h-[560px] bg-bg-custom rounded-[30px] overflow-hidden shadow-2xl"
      >
        
        {/* Left Content */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="lg:w-1/2 w-full p-8 sm:p-12 lg:p-16 text-white flex flex-col gap-6 justify-center"
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-white text-custom-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              Newsletter
            </span>
          </div>
          <Title level="title48" className="leading-tight">
            Stay Updated with the Latest Listings
          </Title>
          <Title level="title20" className="text-gray-300">
            Subscribe to our newsletter to receive the newest ads, exclusive deals, and market insights directly in your inbox.
          </Title>

          {/* Email Input */}
          <form className="flex flex-col gap-2 mt-4" onSubmit={handleSubmit(handleSubscribe)}>
            <div className="flex flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email to subscribe"
                className={`flex-1 p-4 rounded-full bg-white text-black outline-none focus:ring-4 transition-all duration-300 ${errors.email ? 'focus:ring-red-500/50 ring-2 ring-red-500' : 'focus:ring-custom-primary/30'}`}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
              />
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit" 
                disabled={isPending}
                className="flex items-center justify-center bg-custom-primary text-white p-4 rounded-full hover:bg-custom-primary/90 transition shadow-lg disabled:bg-custom-primary/70 disabled:cursor-not-allowed"
              >
                <BsFillSendPlusFill className="w-6 h-6" />
              </motion.button>
            </div>
            {errors.email && (
              <span className="text-red-400 text-sm ml-4 font-medium">{errors.email.message}</span>
            )}
          </form>
        </motion.div>

        {/* Right Image */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="lg:w-1/2 w-full flex items-center justify-center bg-[#00152c] p-6 lg:p-0"
        >
          <motion.img
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.5 }}
            src={lookfor}
            alt="Looking For"
            className="w-full h-full object-cover rounded-2xl lg:rounded-none shadow-xl lg:shadow-none"
          />
        </motion.div>
      </motion.div>
    </div>
  )
}

export default LookingFor;
