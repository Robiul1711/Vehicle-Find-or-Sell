import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useApiQuery } from "@/hooks/useApiQuery";
import { useApiMutation } from "@/hooks/useApiMutation";
import { useAuth } from "@/hooks/useAuth";

const days = [
 
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
   "saturday",
  "sunday",
];

const EditProfile = () => {
  const { getProfile } = useAuth();
  const { data, isLoading, refetch } = useApiQuery({
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
    onSuccess: () => {
      getProfile();
    },
  });
  const { mutate: mutateOpeningHours, isPending: isPendingOpeningHours } =
    useApiMutation({
      url: "/delears/opening-hours/",
      method: "POST",
      secure: true,
      successMessage: "Opening hours updated successfully!",
    });

  const [submitType, setSubmitType] = useState("profile");
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);

  useEffect(() => {
    if (profile) {
      // Map API opening_hours array to our local object format
      const mappedHours = days.reduce((acc, day) => {
        const dayData = profile.opening_hours?.find(
          (h) => h.day_of_week.toLowerCase() === day,
        );
        acc[day] = {
          open: dayData ? dayData.is_open : false,
          start: dayData?.opening_time
            ? dayData.opening_time.slice(0, 5)
            : "10:00",
          end: dayData?.closing_time
            ? dayData.closing_time.slice(0, 5)
            : "22:00",
        };
        return acc;
      }, {});

      reset({
        first_name: profile.first_name || "",
        last_name: profile.last_name || "",
        email: profile.user?.email || "",
        phone: profile.phone || "",
        siren_number: profile.user?.siren_number || "",
        siret_number: profile.user?.siret_number || "",
        street: profile.street || "",
        zip_code: profile.zip_code || "",
        city: profile.city || "",
        country: profile.country || "",
        opening_hours: mappedHours,
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

  const handleCoverChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("cover_image", file);
      setCoverPreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = (formData) => {
    if (submitType === "profile") {
      const submission = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key === "opening_hours") return; // Skip opening hours for profile update

        if (key === "avatar") {
          if (formData[key] instanceof File) {
            submission.append("profile_image", formData[key]);
          }
        } else if (key === "cover_image") {
          if (formData[key] instanceof File) {
            submission.append("cover_image", formData[key]);
          }
        } else {
          submission.append(key, formData[key] || "");
        }
      });
      mutate(submission);
    } else {
      // Map back to the API array format
      const hoursArray = Object.entries(formData.opening_hours).map(
        ([day, val]) => ({
          day_of_week: day,
          is_open: val.open || false,
          opening_time: val.start
            ? val.start.length === 5
              ? `${val.start}:00`
              : val.start
            : "00:00:00",
          closing_time: val.end
            ? val.end.length === 5
              ? `${val.end}:00`
              : val.end
            : "00:00:00",
        }),
      );
      mutateOpeningHours(hoursArray);
    }
  };

  if (isLoading) return <p className="p-10 text-center">Loading profile...</p>;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 ">
      {/* Cover Image Section */}
      <div className="space-y-4">
        <label className="text-sm font-semibold text-gray-700">
          Cover Image
        </label>
        <div className="relative w-full h-48 lg:h-64 rounded-2xl overflow-hidden group bg-gray-100 border-2 border-dashed border-gray-200">
          <img
            src={
              coverPreview ||
              (profile?.cover_image
                ? profile.cover_image
                : "/placeholder-cover.png")
            }
            alt="Cover"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <label
              htmlFor="cover-upload"
              className="bg-white text-gray-900 px-6 py-2 rounded-xl font-bold cursor-pointer hover:bg-gray-100 transition shadow-xl"
            >
              Update Cover Image
            </label>
            <input
              id="cover-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleCoverChange}
            />
          </div>
        </div>
      </div>

      {/* Avatar Section */}
      <div className="flex flex-col items-center space-y-4 -mt-16 relative">
        <div className="relative">
          <div className="p-1 bg-white rounded-full">
            <img
              src={
                avatarPreview ||
                (profile?.profile_image
                  ? profile.profile_image
                  : "/default-avatar.png")
              }
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-xl"
            />
          </div>
          <label
            htmlFor="avatar-upload"
            className="absolute bottom-2 right-2 bg-custom-primary text-white p-2 rounded-full cursor-pointer hover:bg-blue-900 transition shadow-lg border-2 border-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
              <circle cx="12" cy="13" r="3" />
            </svg>
          </label>
          <input
            id="avatar-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleAvatarChange}
          />
        </div>
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-900">
            {profile?.first_name} {profile?.last_name}
          </h2>
          <p className="text-sm text-gray-500 capitalize">{acType}</p>
        </div>
      </div>

      {/* Basic Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="space-y-1">
          <label className="text-sm font-medium">First Name</label>
          <Input
            {...register("first_name", { required: "First name is required" })}
          />
          {errors.first_name && (
            <span className="text-red-500 text-xs">
              {errors.first_name.message}
            </span>
          )}
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium">Last Name</label>
          <Input
            {...register("last_name", { required: "Last name is required" })}
          />
        </div>

        {/* Email Field - Locked UI */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-400">
            Email (Cannot be changed)
          </label>
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
              <Input {...register("siren_number")} />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">SIRET Number</label>
              <Input {...register("siret_number")} />
            </div>
          </>
        )}
      </div>

      {/* Address */}
      <div className="border-t pt-6">
        <h3 className="font-semibold text-lg mb-4">Address</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Input placeholder="Street Address" {...register("street")} />
          <Input placeholder="Zip Code" {...register("zip_code")} />
          <Input placeholder="City" {...register("city")} />
          <Input placeholder="Country" {...register("country")} />
        </div>
      </div>
      <div className="flex justify-end pt-6">
        <Button
          type="submit"
          onClick={() => setSubmitType("profile")}
          disabled={isPending}
          className="bg-[#01244B] px-10 text-white"
        >
          {isPending ? "Saving..." : "Save Changes"}
        </Button>
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
                    name={`opening_hours.${day}.open`}
                    render={({ field }) => (
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    )}
                  />
                </div>
                <div className="flex gap-2">
                  <Input
                    type="time"
                    className="bg-white"
                    {...register(`opening_hours.${day}.start`)}
                    disabled={!watch(`opening_hours.${day}.open`)}
                  />
                  <Input
                    type="time"
                    className="bg-white"
                    {...register(`opening_hours.${day}.end`)}
                    disabled={!watch(`opening_hours.${day}.open`)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-end pt-6">
        <Button
          type="submit"
          onClick={() => setSubmitType("opening_hours")}
          disabled={isPendingOpeningHours}
          className="bg-[#01244B] px-10 text-white"
        >
          {isPendingOpeningHours ? "Saving..." : "Save Opening Hours"}
        </Button>
      </div>
    </form>
  );
};

export default EditProfile;
