import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Bell, Search, Info } from "lucide-react";
import { useApiMutation } from "@/hooks/useApiMutation";

const NoVehicleFound = ({ filters, type }) => {
  const [frequency, setFrequency] = useState("daily");
  const [name, setName] = useState(filters?.search || "");
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    if (filters?.search) {
      setName(filters.search);
    }
  }, [filters?.search]);

  const { mutate, isLoading } = useApiMutation({
    url: "/alerts/saved-searches/",
    method: "POST",
    secure: true,
    successMessage: "Alert created successfully!",
    onSuccess: () => {
      setIsFormOpen(false);
      setName("");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Construct the filter object for the API
    // We only want to send filters that have values
    const cleanFilters = Object.fromEntries(
      Object.entries(filters || {}).filter(
        ([_, v]) => v !== "" && v !== null && v !== undefined
      )
    );

    const payload = {
      name: name || `Search for ${type}`,
      filters: {
        type: type,
        ...cleanFilters,
      },
      frequency: frequency,
    };

    mutate(payload);
  };

  const frequencies = [
    { id: "realtime", label: "Real-time" },
    { id: "daily", label: "Daily" },
    { id: "weekly", label: "Weekly" },
  ];

  return (
    <div className="col-span-full py-16 px-6 bg-white rounded-3xl border-2 border-dashed border-gray-200 flex flex-col items-center text-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-20 h-20 bg-orange-50 text-custom-primary rounded-full flex items-center justify-center mb-6"
      >
        <Search size={40} />
      </motion.div>

      <h3 className="text-2xl font-bold text-gray-900 mb-2">No Vehicle Found</h3>
      <p className="text-gray-500 max-w-md mb-8">
        We couldn't find any vehicles matching your current filters. Would you like to be notified when something matches your search?
      </p>

      {!isFormOpen ? (
        <button
          onClick={() => setIsFormOpen(true)}
          className="flex items-center gap-2 bg-custom-primary hover:bg-orange-600 text-white px-8 py-3 rounded-xl font-semibold transition-all shadow-lg shadow-orange-500/20 active:scale-95"
        >
          <Bell size={20} />
          Notify Me
        </button>
      ) : (
        <motion.form
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          onSubmit={handleSubmit}
          className="w-full max-w-lg bg-gray-50 p-6 rounded-2xl border border-gray-100 text-left"
        >
          <div className="flex items-center gap-2 mb-6 text-custom-primary">
            <Info size={18} />
            <span className="text-sm font-medium">Configure your alert</span>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Alert Name
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Alert Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-4 focus:ring-orange-500/10 focus:border-custom-primary outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Frequency
              </label>
              <div className="grid grid-cols-3 gap-2">
                {frequencies.map((freq) => (
                  <button
                    key={freq.id}
                    type="button"
                    onClick={() => setFrequency(freq.id)}
                    className={`py-2 px-3 text-sm font-medium rounded-lg border transition-all ${
                      frequency === freq.id
                        ? "bg-custom-primary border-custom-primary text-white shadow-md shadow-orange-500/10"
                        : "bg-white border-gray-200 text-gray-600 hover:border-gray-300"
                    }`}
                  >
                    {freq.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 flex gap-3">
              <button
                type="button"
                onClick={() => setIsFormOpen(false)}
                className="flex-1 px-4 py-2.5 text-gray-600 font-medium hover:bg-gray-100 rounded-xl transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 bg-custom-primary hover:bg-orange-600 disabled:bg-gray-400 text-white py-2.5 rounded-xl font-semibold transition-all shadow-lg shadow-orange-500/20 active:scale-95"
              >
                {isLoading ? "Saving..." : "Create Alert"}
              </button>
            </div>
          </div>
        </motion.form>
      )}
    </div>
  );
};

export default NoVehicleFound;
