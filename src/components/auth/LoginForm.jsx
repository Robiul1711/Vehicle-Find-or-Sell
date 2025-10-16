import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { CustomEmail } from "@/utils/IconProvider";
import { Eye, EyeClosed } from "lucide-react";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="space-y-6">
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        {/* Email */}
        <div className="space-y-2">
          <Label className="text-lg">Email</Label>
          <div className="border flex items-center gap-2 p-3 rounded-md bg-white">
            <CustomEmail />
            <input
              type="email"
              {...register("email", { required: true })}
              placeholder="yourname@gmail.com"
              className="w-full border-none outline-none bg-transparent"
            />
          </div>
          {errors.email && (
            <span className="text-red-500 text-sm">Email is required</span>
          )}
        </div>

        {/* Password */}
        <div className="space-y-2">
          <Label className="text-lg">Password</Label>
          <div className="border flex items-center gap-2 p-3 rounded-md bg-white">
            <input
              {...register("password", { required: true })}
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="w-full border-none outline-none bg-transparent"
            />
            {showPassword ? (
              <EyeClosed
                className="cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              />
            ) : (
              <Eye
                className="cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              />
            )}
          </div>
          {errors.password && (
            <span className="text-red-500 text-sm">Password is required</span>
          )}
        </div>

        {/* Remember & Forgot */}
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="rounded" />
            <span>Remember me</span>
          </label>
          <Link
            to="/auth/forgot-password"
            className="text-theme-primary hover:underline"
          >
            Forgot Password?
          </Link>
        </div>

        {/* Submit Button */}
        <Button className="w-full h-12 text-lg bg-custom-primary">
          Sign In
        </Button>
      </form>

      {/* Divider */}
      <div className="flex items-center gap-2">
        <div className="flex-1 h-px bg-gray-300" />
        <p className="text-sm text-gray-500">Or continue with</p>
        <div className="flex-1 h-px bg-gray-300" />
      </div>

      {/* Social Login */}
      <div className="flex justify-center">
        <button className="w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center hover:bg-slate-300 transition">
          <FcGoogle className="w-6 h-6" />
        </button>
      </div>

      {/* Register Section */}
      <p className="text-center text-sm">
        Don't have an account?
        <Link
          to="/auth/register"
          className="text-theme-primary font-semibold hover:underline ml-1"
        >
          Sign Up
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;
