import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { CustomEmail } from '@/utils/IconProvider';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeClosed } from 'lucide-react';
import logo from '../../assets/images/logo.png';
import { useApiMutation } from '@/hooks/useApiMutation';
import { useAuth } from '@/hooks/useAuth';
const NewPassword = () => {
    const {email}=useAuth()
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()
  const { mutate, isPending } = useApiMutation({
    url: "/account/reset-password/",
    method: "POST",
    secure: false,
    successMessage: "Password reset successfully!",
    // ✅ This now works because we passed it in the hook above
    onSuccess: (data) => {
    //   console.log(data);
      navigate("/auth/reset-successful-password");
    },
  });

  const onSubmit = (data) => {
     const payload = { 
            email: email, 
            password: data.password,
            confirm_password: data.confirmPassword
        };
    mutate(payload);

  };
    return (
        <div className="flex flex-col min-h-full">
                  <Link to="/" className="flex items-center justify-center">
                <img src={logo} alt="" className="w-20 h-20" />
            </Link>
            {/* Header Section */}
            <div className="text-center mb-6 py-10">
                <h1 className="text-2xl lg:text-4xl font-bold mb-2">Set a New Password</h1>
                <p className="text-sm lg:text-xl text-muted-foreground">
                    Create a strong password you’ll remember.
                </p>
                <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-4">
                        <Label className="text-lg">Password</Label>
                        <div className="border flex items-center gap-2 p-3 rounded-[10px]">

                            <input
                                {...register("password", { required: true })}
                                type={showPassword ? "text" : "password"}
                                placeholder="*********"
                                className="w-full border-none outline-none bg-transparent"
                            />
                            {
                                showPassword ? (
                                    <EyeClosed className="cursor-pointer" onClick={() => setShowPassword(!showPassword)} />
                                ) : (
                                    <Eye className="cursor-pointer" onClick={() => setShowPassword(!showPassword)} />
                                )

                            }
                        </div>
                        {errors.password && <span className="text-red-500">Password is required</span>}
                    </div>

                    <div className="space-y-4">
                        <Label className="text-lg">Confirm Password</Label>
                        <div className="border flex items-center gap-2 p-3 rounded-[10px]">

                            <input
                                {...register("confirmPassword", { required: true })}
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="*********"
                                className="w-full border-none outline-none bg-transparent"
                            />
                            {
                                showConfirmPassword ? (
                                    <EyeClosed className="cursor-pointer" onClick={() => setShowConfirmPassword(!showConfirmPassword)} />
                                ) : (
                                    <Eye className="cursor-pointer" onClick={() => setShowConfirmPassword(!showConfirmPassword)} />
                                )

                            }
                        </div>
                        {errors.confirmPassword && <span className="text-red-500">Confirm Password is required</span>}
                    </div>



                    <div className="flex items-center justify-end text-sm">

                        <Link to="/auth" className="text-theme-primary text-sm lg:text-base hover:underline">
                            Go back to Sign In
                        </Link>
                    </div>
                    <Button className="w-full !h-12 text-lg bg-custom-primary ">Update Password</Button>
                </form>
            </div>


        </div>
    );
};

export default NewPassword;