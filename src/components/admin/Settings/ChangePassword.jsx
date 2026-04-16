import React from "react";
import { useForm } from "react-hook-form";

const ChangePassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const onSubmit = (data) => {
    // console.log("Password Changed:", data);
    // Call your API here
  };

  const newPassword = watch("newPassword");

  return (
    <div className=" mt-6">

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Current Password */}
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">Current Password</label>
          <input
            type="password"
            placeholder="Enter current password"
            className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-custom-primary"
            {...register("currentPassword", { required: "Current password is required" })}
          />
          {errors.currentPassword && (
            <p className="text-red-500 text-sm">{errors.currentPassword.message}</p>
          )}
        </div>

        {/* New Password */}
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">New Password</label>
          <input
            type="password"
            placeholder="Enter new password"
            className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-custom-primary"
            {...register("newPassword", {
              required: "New password is required",
              minLength: { value: 6, message: "Password must be at least 6 characters" },
            })}
          />
          {errors.newPassword && (
            <p className="text-red-500 text-sm">{errors.newPassword.message}</p>
          )}
        </div>

        {/* Confirm New Password */}
        <div className="flex flex-col md:col-span-2">
          <label className="text-sm font-medium mb-1">Confirm New Password</label>
          <input
            type="password"
            placeholder="Confirm new password"
            className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-custom-primary"
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) =>
                value === newPassword || "Passwords do not match",
            })}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="md:col-span-2 flex justify-end">
          <button
            type="submit"
            className="bg-custom-primary text-white px-6 py-2 rounded-md  transition"
          >
            Save Change
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
