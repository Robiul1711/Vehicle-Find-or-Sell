import AuthTabs from '@/components/auth/AuthTabs';
import { ImageProvider } from '@/utils/ImageProvider';
import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
    return (
        <div className="min-h-screen border flex items-center  justify-center gap-10 bg-gray-100 p-6">
            <div className="flex flex-col-reverse justify-center lg:flex-row gap-5">
                <div className="w-full hidden md:block lg:w-1/2">
                    <img src={ImageProvider.authImage} alt="" className='w-full' />
                </div>
                <div className="w-full lg:w-1/2 rounded-xl border p-6 shadow">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;