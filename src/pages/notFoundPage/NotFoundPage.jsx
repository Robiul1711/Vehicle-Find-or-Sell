import React from 'react';
import CommonButton from '@/components/common/CommonButton';
import { MdOutlineArrowBack } from 'react-icons/md';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] bg-[#F9FAFB] p-6 text-center relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-custom-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Content */}
      <div className="z-10 flex flex-col items-center max-w-2xl w-full">
        {/* Animated 404 Header */}
        <div className="relative">
          <h1 className="text-[120px] sm:text-[180px] font-extrabold leading-none tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-custom-primary to-blue-600 drop-shadow-lg">
            404
          </h1>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-500/10 rounded-full blur-3xl animate-pulse pointer-events-none" />
        </div>
        
        {/* Title */}
        <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-gray-800">
          Oops! Page Not Found
        </h2>
        
        {/* Description */}
        <p className="mt-4 text-lg text-gray-500 max-w-md mx-auto">
          It looks like the page you are looking for has taken a detour, has been removed, or was temporarily unavailable.
        </p>
        
        {/* Actions */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 items-center justify-center">
          <CommonButton 
            link="/" 
            variant="primary" 
            className="flex items-center gap-2 transform transition-transform hover:scale-105 hover:shadow-lg"
          >
            <MdOutlineArrowBack className="text-xl" />
            Back to Home
          </CommonButton>
          <CommonButton 
            link="/contact" 
            variant="secondary" 
            className="flex items-center gap-2 transform transition-transform hover:bg-custom-primary hover:scale-105 hover:shadow-md"
          >
            Contact Support
          </CommonButton>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
