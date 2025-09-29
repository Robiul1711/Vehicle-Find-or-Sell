import React from "react";
import { RxCross1 } from "react-icons/rx";
import { useFormContext } from "react-hook-form";

const ScheduleLaterModal = ({ isModalOpen, setIsModalOpen }) => {
  const { register } = useFormContext();

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 z-[200000000] bg-black/40 flex items-center justify-center transition-all duration-300">
      <div className="relative w-[95%] sm:w-[80%] md:w-[50%] lg:w-[36%] bg-white rounded-xl shadow-xl p-6 lg:px-10 transition-all duration-300">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-4 mb-4">
          <div>
            <h2 className="text-2xl lg:text-3xl font-bold">
              Schedule Ad Posting
            </h2>
            <p className="text-sm text-gray-500">
              Choose when your ad should go live
            </p>
          </div>
          <button
            className="p-2 text-xl text-gray-600 hover:bg-gray-200 rounded-full transition-all duration-300 cursor-pointer mt-3 sm:mt-0"
            onClick={() => setIsModalOpen(false)}
          >
            <RxCross1 />
          </button>
        </div>

        {/* Inputs */}
        <div className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Date</label>
            <input
              type="date"
              {...register("scheduleDate")}
              className="border px-4 py-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-custom-primary"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Time</label>
            <input
              type="time"
              {...register("scheduleTime")}
              className="border px-4 py-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-custom-primary"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 rounded-lg bg-custom-primary text-white hover:bg-custom-primary/90"
            >
              Confirm & Schedule
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleLaterModal;
