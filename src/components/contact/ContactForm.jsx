import { useApiMutation } from "@/hooks/useApiMutation";
import { useApiQuery } from "@/hooks/useApiQuery";
import {
  CustomArrow,
  CustomEmail,
  CustomEmail2,
  CustomLocation,
  CustomLocation2,
  CustomPhone,
} from "@/utils/IconProvider";
import { MoveUpRightIcon } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const { mutate, isPending } = useApiMutation({
    url: "/core/contact-us/",
    method: "POST",
    secure: false,
    successMessage: "Message sent successfully!",
  });

  // 2. Handle Submission
  const onSubmit = (data) => {
    mutate(data);
    reset();
  };
  const { data} = useApiQuery({
    queryKey: ["contact-info"],
    url: "/core/contact-info/",

  });
//   console.log(data?.data)
  return (
    <div className="flex flex-col lg:flex-row gap-10">
      <div className="lg:w-1/4 flex flex-col gap-5">
      {
        data?.data?.map((item) => (
          <div className="border bg-gray-100 rounded-lg group hover:bg-custom-primary p-5 flex items-center gap-5 ">
          <img src={item.icon} className="w-14 group group-hover:text-white h-14 rounded-full border flex items-center justify-center"/>
          <div className="group group-hover:text-white">
            <p className="text-sm">{item.title}</p>
            <p className="">{item.value}</p>
          </div>
        </div>
        ))
      }
      </div>
      <div className="lg:w-3/4">
        <div className="border bg-gray-100 rounded-lg p-5  gap-5 ">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="">
                <label htmlFor="">First Name</label>
                <div className="border bg-white w-full">
                  <input
                    type="text"
                    {...register("first_name", { required: true })}
                    placeholder="Enter your first name..."
                    className="w-full outline-0 px-2 py-2"
                  />
                </div>
                {errors.first_name && (
                  <span className="text-red-500">First Name is required</span>
                )}
              </div>

              <div className="">
                <label htmlFor="">Last Name</label>
                <div className="border bg-white w-full">
                  <input
                    type="text"
                    {...register("last_name", { required: true })}
                    placeholder="Last Name"
                    className="w-full outline-0 px-2 py-2"
                  />
                </div>
                {errors.last_name && (
                  <span className="text-red-500">Last Name is required</span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="">
                <label htmlFor="">Email</label>
                <div className="border bg-white w-full">
                  <input
                    type="email"
                    {...register("email", { required: true })}
                    placeholder="Enter your email..."
                    className="w-full outline-0 px-2 py-2"
                  />
                </div>
                {errors.email && (
                  <span className="text-red-500">Email is required</span>
                )}
              </div>

              <div className="">
                <label htmlFor="">Phone Number</label>
                <div className="border bg-white w-full">
                  <input
                    type="text"
                    {...register("phone", { required: true })}
                    placeholder="Enter your number..."
                    className="w-full outline-0 px-2 py-2"
                  />
                </div>
                {errors.phone && (
                  <span className="text-red-500">Phone Number is required</span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5">
              <div className="">
                <label htmlFor="">Subject</label>
                <div className="border bg-white w-full">
                  <input
                    type="text"
                    {...register("subject", { required: true })}
                    placeholder="Your Message here..."
                    className="w-full outline-0 px-2 py-2"
                  />
                </div>
                {errors.subject && (
                  <span className="text-red-500">Subject is required</span>
                )}
              </div>

              <div className="">
                <label htmlFor="" className="">
                  Message
                </label>
                <div className="border bg-white w-full">
                  <textarea
                    rows={5}
                    type="text"
                    {...register("message", { required: true })}
                    placeholder="Your Message here..."
                    className="w-full outline-0 px-2 py-2"
                  />
                </div>
                {errors.subject && (
                  <span className="text-red-500">Subject is required</span>
                )}
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-custom-primary flex items-center gap-2 text-white py-4 lg:text-xl px-4 rounded-lg"
              >
                Send Your Message <MoveUpRightIcon />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
