import React from "react";
import { RxCross1 } from "react-icons/rx";

const PostImmediately = ({ isModalOpen, setIsModalOpen }) => {
  if (!isModalOpen) return null; // hide modal when not open

  return (
    <div className="fixed inset-0 z-[200000000] bg-black/40 flex items-center justify-center transition-all duration-300">
      <div className="relative w-[95%] sm:w-[80%] md:w-[50%] lg:w-[36%] bg-white rounded-xl shadow-xl p-6 lg:px-10 transition-all duration-300">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 p-2 text-xl text-gray-600 hover:bg-gray-200 rounded-full transition-all duration-300 cursor-pointer"
          onClick={() => setIsModalOpen(false)}
        >
          <RxCross1 />
        </button>

        {/* Header */}
        <div className="flex flex-col gap-4 text-center pb-4 mb-4">
          <h2 className="text-2xl lg:text-3xl font-bold">
            Ad Submitted for Approval
          </h2>
          <p className="text-sm text-gray-500">
            Thank you! Your vehicle listing has been successfully submitted. It
            will be reviewed by our team and published once approved by the
            admin.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-4 mt-6">
          <button
            type="button"
            onClick={() => {
              console.log("Boost Ads clicked");
              // Add your Boost Ads logic here
            }}
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100"
          >
            Boost Ads
          </button>
          <button
            type="button"
            onClick={() => {
              console.log("View My Ad clicked");
              // Add your View My Ad logic here
              setIsModalOpen(false);
            }}
            className="px-4 py-2 rounded-lg bg-custom-primary text-white hover:bg-custom-primary/90"
          >
            View My Ad
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostImmediately;
