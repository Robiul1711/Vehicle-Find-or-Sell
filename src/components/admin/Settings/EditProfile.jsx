import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useApiQuery } from "@/hooks/useApiQuery";
import { IMG_URL } from "@/config/constant";
import { useApiMutation } from "@/hooks/useApiMutation";

const EditProfile = () => {
  const { data, isLoading } = useApiQuery({
    queryKey: ["profile"],
    url: "/account/profile/",
    secure: true,
  });

  const profile = data?.profile;
  const acType = profile?.user?.account_type;

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const { mutate, isPending } = useApiMutation({
    url: "/account/profile/",
    method: "PUT", 
    secure: true,
    successMessage: "Profile updated successfully!",
  });

  const [avatarPreview, setAvatarPreview] = useState(null);

  useEffect(() => {
    if (profile) {
      reset({
        firstName: profile.first_name || "",
        lastName: profile.last_name || "",
        email: profile.user?.email || "", // Still loaded for display
        phone: profile.phone || "",
        siren: profile.user?.siren_number || "",
        siret: profile.user?.siret_number || "",
        street: profile.street || "",
        zip: profile.zip_code || "",
        city: profile.city || "",
        country: profile.country || "",
        openingHours: profile.opening_hours || {
          saturday: { open: true, start: "10:00", end: "22:00" },
          sunday: { open: true, start: "10:00", end: "22:00" },
          monday: { open: true, start: "10:00", end: "22:00" },
          tuesday: { open: true, start: "10:00", end: "22:00" },
          wednesday: { open: true, start: "10:00", end: "22:00" },
          thursday: { open: false, start: "10:00", end: "22:00" },
          friday: { open: true, start: "10:00", end: "22:00" },
        },
      });
    }
  }, [profile, reset]);

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("avatar", file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = (formData) => {
    const submission = new FormData();
    
    Object.keys(formData).forEach((key) => {
      // ❌ SKIP EMAIL: Do not append email to FormData so it isn't sent to backend
      if (key === "email") return; 

      if (key === "openingHours") {
        submission.append(key, JSON.stringify(formData[key]));
      } else if (key === "avatar") {
        if (formData[key] instanceof File) {
          submission.append("profile_image", formData[key]);
        }
      } else {
        submission.append(key, formData[key] || "");
      }
    });

    mutate(submission);
  };

  const days = ["saturday", "sunday", "monday", "tuesday", "wednesday", "thursday", "friday"];

  if (isLoading) return <p className="p-10 text-center">Loading profile...</p>;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 ">
      {/* Avatar Section */}
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <img
            src={avatarPreview || (profile?.profile_image ? IMG_URL + profile.profile_image : "/default-avatar.png")}
            alt="Profile"
            className="w-28 h-28 rounded-full object-cover border-2 border-gray-200"
          />
          <label htmlFor="avatar-upload" className="absolute bottom-0 right-0 bg-[#01244B] text-white text-xs px-3 py-1 rounded-full cursor-pointer hover:bg-blue-900 transition">
            Change
          </label>
          <input id="avatar-upload" type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
        </div>
      </div>

      {/* Basic Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="space-y-1">
          <label className="text-sm font-medium">First Name</label>
          <Input {...register("firstName", { required: "First name is required" })} />
          {errors.firstName && <span className="text-red-500 text-xs">{errors.firstName.message}</span>}
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium">Last Name</label>
          <Input {...register("lastName", { required: "Last name is required" })} />
        </div>

        {/* Email Field - Locked UI */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-400">Email (Cannot be changed)</label>
          <Input 
            type="email" 
            {...register("email")} 
            readOnly 
            className="bg-gray-100 cursor-not-allowed border-gray-200 text-gray-500" 
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">Phone</label>
          <Input type="tel" {...register("phone")} />
        </div>

        {acType !== "private" && (
          <>
            <div className="space-y-1">
              <label className="text-sm font-medium">SIREN Number</label>
              <Input {...register("siren")} />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">SIRET Number</label>
              <Input {...register("siret")} />
            </div>
          </>
        )}
      </div>

      {/* Address */}
      <div className="border-t pt-6">
        <h3 className="font-semibold text-lg mb-4">Address</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Input placeholder="Street Address" {...register("street")} />
          <Input placeholder="Zip Code" {...register("zip")} />
          <Input placeholder="City" {...register("city")} />
          <Input placeholder="Country" {...register("country")} />
        </div>
      </div>

      {/* Opening Hours */}
      {acType !== "private" && (
        <div className="border-t pt-6">
          <h3 className="font-semibold text-lg mb-4">Opening Hours</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {days.map((day) => (
              <div key={day} className="p-3 border rounded-lg bg-gray-50">
                <div className="flex items-center justify-between mb-3">
                  <span className="capitalize font-medium">{day}</span>
                  <Controller
                    control={control}
                    name={`openingHours.${day}.open`}
                    render={({ field }) => (
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    )}
                  />
                </div>
                <div className="flex gap-2">
                  <Input 
                    type="time" 
                    className="bg-white"
                    {...register(`openingHours.${day}.start`)} 
                    disabled={!watch(`openingHours.${day}.open`)} 
                  />
                  <Input 
                    type="time" 
                    className="bg-white"
                    {...register(`openingHours.${day}.end`)} 
                    disabled={!watch(`openingHours.${day}.open`)} 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-end pt-6">
        <Button type="submit" disabled={isPending} className="bg-[#01244B] px-10 text-white">
          {isPending ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  );
};

export default EditProfile;