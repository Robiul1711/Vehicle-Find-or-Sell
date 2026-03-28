import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import OTPInput from "otp-input-react";
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo1.png';
import { Button } from '@/components/ui/button';
import { useApiMutation } from '@/hooks/useApiMutation';
import { useAuth } from '@/hooks/useAuth';


const VerifyOTP = () => {
    const { email } = useAuth();
 
    const navigate = useNavigate();

    // 1. Initialize Hook Form
    const { control, handleSubmit, formState: { isValid } } = useForm({
        defaultValues: {
            otp: ""
        }
    });

    const { mutate, isPending } = useApiMutation({
        url: "/account/verify-otp/",
        method: "POST",
        secure: false,
        successMessage: "OTP verified successfully!",
        onSuccess: (data) => {
            // Data is verified, move to next step
            navigate("/auth/set-new-password");
        },
    });

    // 2. Handle Submission
    const onSubmit = (formData) => {
        // Combine the email from context with the OTP from the form
        const payload = { 
            email: email, 
            otp: formData.otp 
        };
        mutate(payload);
    };

    return (
        <div className="flex flex-col min-h-full">
            <Link to="/" className="flex items-center justify-center">
                <img src={logo} alt="Logo" className="w-32 sm:w-40" />
            </Link>

            <div className="text-center mb-6 py-10 space-y-5">
                <h1 className="text-2xl lg:text-4xl font-bold mb-2">Verify Your Account</h1>
                <p className="text-sm lg:text-xl text-muted-foreground">
                    Enter the 6-digit code we sent to your email to continue.
                </p>

                {/* 3. Wrap in a form tag and use handleSubmit */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="flex justify-center">
                        <Controller
                            name="otp"
                            control={control}
                            rules={{ required: true, minLength: 6 }}
                            render={({ field: { onChange, value } }) => (
                                <OTPInput
                                    value={value}
                                    onChange={onChange}
                                    autoFocus
                                    OTPLength={6}
                                    otpType="number"
                                    disabled={isPending}
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
                                />
                            )}
                        />
                    </div>

                    <Button
                        type="submit"
                        disabled={isPending}
                        className="w-full !h-12 text-lg bg-custom-primary"
                    >
                        {isPending ? "Verifying..." : "Verify"}
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default VerifyOTP;