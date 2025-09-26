"use client";

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const EditProfile = () => {
  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      avatar: null,
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      siren: "",
      siret: "",
      street: "",
      zip: "",
      city: "",
      country: "",
      openingHours: {
        saturday: { open: true, start: "10:00", end: "22:00" },
        sunday: { open: true, start: "10:00", end: "22:00" },
        monday: { open: true, start: "10:00", end: "22:00" },
        tuesday: { open: true, start: "10:00", end: "22:00" },
        wednesday: { open: true, start: "10:00", end: "22:00" },
        thursday: { open: false, start: "10:00", end: "22:00" },
        friday: { open: true, start: "10:00", end: "22:00" },
      },
    },
  });

  const [avatarPreview, setAvatarPreview] = useState(null);
  const avatarFile = watch("avatar");

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    // You will need to send `data.avatar` as File in FormData for backend
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("avatar", file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const days = [
    "saturday",
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Avatar Upload Section */}
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <img
            src={
              avatarPreview ||
              "https://via.placeholder.com/120x120.png?text=Avatar"
            }
            alt="Avatar"
            className="w-28 h-28 rounded-full object-cover border border-gray-300"
          />
          <label
            htmlFor="avatar-upload"
            className="absolute bottom-0 right-0 bg-[#01244B] text-white text-xs px-2 py-1 rounded-full cursor-pointer"
          >
            Change
          </label>
          <input
            id="avatar-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleAvatarChange}
          />
        </div>
        <p className="text-sm text-gray-500">
          Allowed: JPG, PNG (max 2MB)
        </p>
      </div>

      {/* Profile Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Input
          placeholder="Enter your first name..."
          {...register("firstName", { required: "First name is required" })}
        />
        <Input
          placeholder="Enter your last name..."
          {...register("lastName", { required: "Last name is required" })}
        />
        <Input
          placeholder="Enter your email..."
          type="email"
          {...register("email", { required: "Email is required" })}
        />
        <Input
          placeholder="Enter your number..."
          type="tel"
          {...register("phone", { required: "Phone is required" })}
        />
        <Input placeholder="123 456 789" {...register("siren")} />
        <Input placeholder="123 456 789 00015" {...register("siret")} />
      </div>

      {/* Address Section */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-2">Address</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Input placeholder="Enter street address..." {...register("street")} />
          <Input placeholder="Enter Zip Code" {...register("zip")} />
          <Input placeholder="Enter your city" {...register("city")} />
          <Input placeholder="Select Country" {...register("country")} />
        </div>
      </div>

      {/* Opening Hours */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-2">Opening Hours</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {days.map((day) => (
            <div key={day} className="space-y-2">
              <div className="flex items-center gap-2">
                <Controller
                  control={control}
                  name={`openingHours.${day}.open`}
                  render={({ field }) => (
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
                <span className="capitalize">{day}</span>
              </div>

              {/* Start / End Time */}
              <div className="flex gap-2">
                <Controller
                  control={control}
                  name={`openingHours.${day}.start`}
                  render={({ field }) => (
                    <Input type="time" {...field} disabled={!watch(`openingHours.${day}.open`)} />
                  )}
                />
                <Controller
                  control={control}
                  name={`openingHours.${day}.end`}
                  render={({ field }) => (
                    <Input type="time" {...field} disabled={!watch(`openingHours.${day}.open`)} />
                  )}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button type="submit" className="bg-[#01244B] text-white">
          Save Changes
        </Button>
      </div>
    </form>
  );
};

export default EditProfile;
