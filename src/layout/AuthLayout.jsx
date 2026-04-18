import logo from "../assets/images/logo1.png";
import { Link, Outlet } from 'react-router-dom';
import { ImageProvider } from '@/utils/ImageProvider';
import React from 'react';

const AuthLayout = () => {
    return (
        <div className="min-h-screen flex flex-col lg:flex-row bg-white">
            {/* Left Side: Visual Branding (Fixed/Sticky on Desktop) */}
            <div className="hidden lg:flex lg:w-1/2 bg-[#F8FAFC] relative sticky top-0 h-screen items-center justify-center p-12 overflow-hidden">

                
                <div className="max-w-4xl text-center space-y-8 z-10">
                    <img 
                      src={ImageProvider.authImage} 
                      alt="Auth Illustration" 
                      className="w-full h-auto max-h-[800px] object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-2xl"
                    />
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-[-10%] right-[-10%] w-[400px] h-[400px] bg-custom-primary/5 rounded-full blur-3xl text-theme-primary"></div>
                <div className="absolute bottom-[-5%] left-[-5%] w-[300px] h-[300px] bg-blue-500/5 rounded-full blur-3xl text-theme-primary"></div>
            </div>

            {/* Right Side: Component Content (Scrollable on Mobile) */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 bg-white relative">
                <div className="w-full max-w-md">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;