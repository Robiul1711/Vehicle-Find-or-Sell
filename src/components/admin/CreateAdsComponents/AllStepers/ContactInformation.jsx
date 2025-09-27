import React from 'react';
import { useFormContext } from 'react-hook-form';

const ContactInformation = () => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="md:p-6">
      <style jsx>{`
        .focus-primary:focus {
          outline: none;
          border-color: #012853;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }
      `}</style>
      
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Contact Information</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Name */}
        <div className="lg:col-span-1">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="Enter your name"
            {...register('name')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm placeholder-gray-400 focus-primary transition-colors"
          />
        </div>

        {/* Email */}
        <div className="lg:col-span-1">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter email address"
            {...register('email')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm placeholder-gray-400 focus-primary transition-colors"
          />
        </div>

        {/* Contact Number */}
        <div className="lg:col-span-1">
          <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700 mb-2">
            Contact Number
          </label>
          <input
            id="contactNumber"
            type="tel"
            placeholder="Enter your contact number"
            {...register('contactNumber')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm placeholder-gray-400 focus-primary transition-colors"
          />
        </div>

        {/* WhatsApp Number */}
        <div className="lg:col-span-1">
          <label htmlFor="whatsappNumber" className="block text-sm font-medium text-gray-700 mb-2">
            WhatsApp Number
          </label>
          <input
            id="whatsappNumber"
            type="tel"
            placeholder="Enter your WhatsApp Number"
            {...register('whatsappNumber')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm placeholder-gray-400 focus-primary transition-colors"
          />
        </div>
      </div>
    </div>
  );
};

export default ContactInformation;