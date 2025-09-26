
import React from "react";
import { useForm } from "react-hook-form";

const ContactUs = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    reset();
  };

  return (
    <div className="">
      {/* Heading */}
      <h2 className="text-xl font-semibold text-gray-900">
        Contact Our Support Team
      </h2>
      <p className="text-sm text-gray-600 mt-1">
        We’re here to help. Send us a message and we’ll get back to you as soon
        as possible.
      </p>
      <hr className="my-4" />

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            {...register("fullName", { required: "Full name is required" })}
            placeholder="Enter your full name..."
            className="mt-1 block w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm shadow-sm focus:border-green-500 focus:ring focus:ring-green-200"
          />
          {errors.fullName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.fullName.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
            })}
            placeholder="Enter your email..."
            className="mt-1 block w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm shadow-sm focus:border-green-500 focus:ring focus:ring-green-200"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Subject */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Subject
          </label>
          <input
            type="text"
            {...register("subject", { required: "Subject is required" })}
            placeholder="Your Message here..."
            className="mt-1 block w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm shadow-sm focus:border-green-500 focus:ring focus:ring-green-200"
          />
          {errors.subject && (
            <p className="text-red-500 text-sm mt-1">
              {errors.subject.message}
            </p>
          )}
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Message
          </label>
          <textarea
            {...register("message", { required: "Message is required" })}
            placeholder="Your Message here..."
            rows={5}
            className="mt-1 block w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm shadow-sm focus:border-green-500 focus:ring focus:ring-green-200"
          />
          {errors.message && (
            <p className="text-red-500 text-sm mt-1">
              {errors.message.message}
            </p>
          )}
        </div>

        {/* Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white text-sm font-medium px-6 py-2 rounded-full shadow flex items-center gap-2"
          >
            Send Message{" "}
            <span aria-hidden="true" className="inline-block">
              ↗
            </span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactUs;
