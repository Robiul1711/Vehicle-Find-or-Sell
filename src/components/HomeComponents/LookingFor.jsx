import React, { useState } from 'react'
import lookfor from '@/assets/images/lookfor.png'
import Title from '../common/Title'
import { BsFillSendPlusFill } from "react-icons/bs";
import { useApiMutation } from '@/hooks/useApiMutation';
import { useForm } from "react-hook-form";
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
    <div className="section-padding-x section-padding-y">
      <div className="flex flex-col lg:flex-row w-full justify-between h-[560px] bg-bg-custom rounded-[20px] overflow-hidden shadow-xl">
        
        {/* Left Content */}
        <div className="lg:w-1/2 w-full p-6 sm:p-8 lg:p-12 text-white flex flex-col gap-6 justify-center">
          <Title level="title48" className="leading-tight">
            Looking for a Car, Bike, Van, or Spare Parts?
          </Title>
          <Title level="title20" className="text-gray-300">
            Browse verified listings from private sellers and trusted professionals near you.
          </Title>

          {/* Email Input */}
          <form className="flex flex-col gap-2 mt-4" onSubmit={handleSubmit(handleSubscribe)}>
            <div className="flex flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className={`flex-1 p-3 rounded-full bg-white text-black outline-none focus:ring-2 transition ${errors.email ? 'focus:ring-red-500 ring-2 ring-red-500' : 'focus:ring-custom-primary'}`}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
              />
              <button 
                type="submit" 
                disabled={isPending}
                className="flex items-center justify-center bg-custom-primary text-white px-6 py-3 rounded-full hover:bg-custom-primary/90 transition shadow-md disabled:bg-custom-primary/70 disabled:cursor-not-allowed"
              >
                <BsFillSendPlusFill className="w-5 h-5" />
              </button>
            </div>
            {errors.email && (
              <span className="text-red-400 text-sm ml-4">{errors.email.message}</span>
            )}
          </form>
        </div>

        {/* Right Image */}
        <div className="lg:w-1/2 w-full flex items-center justify-center bg-[#00152c]">
          <img
            src={lookfor}
            alt="Looking For"
            className="w-full object-cover"
          />
        </div>
      </div>
    </div>
  )
}

export default LookingFor
