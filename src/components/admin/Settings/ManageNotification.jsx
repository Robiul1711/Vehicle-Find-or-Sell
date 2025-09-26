import React, { useState } from 'react';
import { Switch } from '@/components/ui/switch';

const ManageNotification = () => {
  const [notifications, setNotifications] = useState({
    subscription: true,
    articles: true,
    events: true
  });

  const handleToggle = (key) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleSaveUpdate = () => {
    console.log('Saving notification preferences:', notifications);
    // Add your save logic here
  };

  return (
    <div className=" border-t pt-4">

      
      <div className="space-y-8">
        {/* Subscription & Payments */}
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-medium text-gray-900 mb-1">
              Account & Billing Alerts
            </h3>
            <p className="text-sm text-gray-600">
          Get notified about subscription renewals and payment issues.
            </p>
          </div>
          <div className="ml-6">
            <Switch
              checked={notifications.subscription}
              onCheckedChange={() => handleToggle('subscription')}
              className="data-[state=checked]:bg-custom-primary"
            />
          </div>
        </div>

        {/* Articles Remainders */}
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-medium text-gray-900 mb-1">
             Ad Updates
            </h3>
            <p className="text-sm text-gray-600">
             Receive alerts when your ad is approved.
            </p>
          </div>
          <div className="ml-6">
            <Switch
              checked={notifications.articles}
              onCheckedChange={() => handleToggle('articles')}
              className="data-[state=checked]:bg-custom-primary"
            />
          </div>
        </div>

        {/* Event Remainders */}
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-medium text-gray-900 mb-1">
             Messages & Enquiries
            </h3>
            <p className="text-sm text-gray-600">
             New buyer & Seller messages.
            </p>
          </div>
          <div className="ml-6">
            <Switch
              checked={notifications.events}
              onCheckedChange={() => handleToggle('events')}
              className="data-[state=checked]:bg-custom-primary"
            />
          </div>
        </div>
        {/* Event Remainders */}
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-medium text-gray-900 mb-1">
     Boost & Promotions
            </h3>
            <p className="text-sm text-gray-600">
           Reminder when a boost is about to expire.
            </p>
          </div>
          <div className="ml-6">
            <Switch
              checked={notifications.events}
              onCheckedChange={() => handleToggle('events')}
              className="data-[state=checked]:bg-custom-primary"
            />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end mt-12">
        <button
          onClick={handleSaveUpdate}
          className="px-8 py-3 bg-custom-primary text-white font-medium rounded-md transition-colors duration-200  "
        >
          Save & Update
        </button>
      </div>
    </div>
  );
};

export default ManageNotification;