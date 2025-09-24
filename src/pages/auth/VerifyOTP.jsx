import LoginForm from '@/components/auth/LoginForm';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { CustomEmail } from '@/utils/IconProvider';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import OTPInput from "otp-input-react";

import { Link, useNavigate } from 'react-router-dom';

const VerifyOTP = () => {
    const [OTP, setOTP] = useState("");
    const navigate = useNavigate();
    const handleVerify = () => {
        console.log("OTP Submitted:", OTP);
        navigate('/auth/set-new-password');
    };
    return (
        <div className="flex flex-col min-h-full">
            {/* Header Section */}
            <div className="text-center mb-6 py-10 space-y-5">
                <h1 className="text-2xl lg:text-4xl font-bold mb-2">Verify Your Account</h1>
                <p className="text-sm lg:text-xl text-muted-foreground">
                    Enter the 6-digit code we sent to your email to continue.
                </p>
                <div className="flex justify-center">
                    <OTPInput
                        value={OTP}
                        onChange={setOTP}
                        autoFocus
                        OTPLength={6}
                        otpType="number"
                        disabled={false}
                        secure
                        inputStyles={{
                            width: "4rem",
                            height: "4rem",
                            margin: "0 0.5rem",
                            fontSize: "1.5rem",
                            borderRadius: "0.5rem",
                            border: "2px solid #d1d5db",
                            textAlign: "center",
                            outline: "none",
                        }}
                        focusStyles={{
                            border: "2px solid #3b82f6",
                            boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.5)",
                        }}
                        className="otp-input-container text-center"
                    />
                </div>

                <Button
                    onClick={handleVerify}
                    className="w-full !h-12 text-lg bg-custom-primary ">Verify
                </Button>
            </div>


        </div>
    );
};

export default VerifyOTP;