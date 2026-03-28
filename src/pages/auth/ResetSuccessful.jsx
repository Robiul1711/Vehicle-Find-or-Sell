import { Button } from '@/components/ui/button';
import { ImageProvider } from '@/utils/ImageProvider';
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo1.png';
const ResetSuccessful = () => {
    return (
        <div className="flex flex-col min-h-full">
                  <Link to="/" className="flex items-center justify-center">
                <img src={logo} alt="" className="w-32 sm:w-40" />
            </Link>
            {/* Header Section */}
            <div className="text-center mb-6 py-10 space-y-5">
                <h1 className="text-2xl lg:text-4xl font-bold mb-2">Password Reset Successful</h1>
                <p className="text-sm lg:text-xl text-muted-foreground">
                    Your password has been updated. You can now log in using your new credentials.
                </p>

            </div>
            <div className="w-full  flex justify-center items-center">
                <img src={ImageProvider.success} alt="" />
            </div>
            <Link to="/auth" className="mt-10">
                <Button className="w-full !h-12 text-lg bg-custom-primary ">Sign In</Button>
            </Link>



        </div>
    );
};

export default ResetSuccessful;