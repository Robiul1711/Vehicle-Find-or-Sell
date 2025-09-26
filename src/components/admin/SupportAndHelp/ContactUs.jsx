
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
        Contact labonneroute.fr Support
      </h2>

      <hr className="my-4" />

      {/* Form */}
<form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
  {/* Name, Email, Phone in Grid */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
    {/* First Name */}
    <div>
      <label className="block text-sm font-medium text-gray-700">
        First Name
      </label>
      <input
        type="text"
        {...register("firstName", { required: "First name is required" })}
        placeholder="Enter your first name..."
        className="mt-1 block w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm shadow-sm focus:border-green-500 focus:ring focus:ring-green-200"
      />
      {errors.firstName && (
        <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
      )}
    </div>

    {/* Last Name */}
    <div>
      <label className="block text-sm font-medium text-gray-700">
        Last Name
      </label>
      <input
        type="text"
        {...register("lastName", { required: "Last name is required" })}
        placeholder="Enter your last name..."
        className="mt-1 block w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm shadow-sm focus:border-green-500 focus:ring focus:ring-green-200"
      />
      {errors.lastName && (
        <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
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

    {/* Phone */}
    <div>
      <label className="block text-sm font-medium text-gray-700">
        Phone
      </label>
      <input
        type="tel"
        {...register("phone", {
          required: "Phone number is required",
          pattern: {
            value: /^[0-9]+$/,
            message: "Invalid phone number",
          },
        })}
        placeholder="Enter your phone number..."
        className="mt-1 block w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm shadow-sm focus:border-green-500 focus:ring focus:ring-green-200"
      />
      {errors.phone && (
        <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
      )}
    </div>
  </div>

  {/* Subject */}
  <div>
    <label className="block text-sm font-medium text-gray-700">
      Subject
    </label>
    <input
      type="text"
      {...register("subject", { required: "Subject is required" })}
      placeholder="Enter subject..."
      className="mt-1 block w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm shadow-sm focus:border-green-500 focus:ring focus:ring-green-200"
    />
    {errors.subject && (
      <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>
    )}
  </div>

  {/* Message */}
  <div>
    <label className="block text-sm font-medium text-gray-700">Message</label>
    <textarea
      {...register("message", { required: "Message is required" })}
      placeholder="Your message here..."
      rows={5}
      className="mt-1 block w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm shadow-sm focus:border-green-500 focus:ring focus:ring-green-200"
    />
    {errors.message && (
      <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
    )}
  </div>

  {/* Button */}
  <div className="flex justify-end">
    <button
      type="submit"
      className="bg-custom-primary text-white text-sm font-medium px-6 py-2 rounded-md shadow flex items-center gap-2"
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
