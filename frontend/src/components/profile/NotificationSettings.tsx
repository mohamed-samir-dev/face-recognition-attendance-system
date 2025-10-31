import React from "react";

interface NotificationSettingsProps {
  formData: {
    attendanceReminders: boolean;
    leaveStatusUpdates: boolean;
    systemAnnouncements: boolean;
  };
  onInputChange: (field: string, value: boolean) => void;
}

export default function NotificationSettings({
  formData,
  onInputChange,
}: NotificationSettingsProps) {
  return (
    <div>
      <h2 className="text-base sm:text-lg font-medium text-gray-900 mb-4">
        Notification Preferences
      </h2>
      <div className="space-y-4 sm:space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
          <div className="flex-1">
            <h3 className="text-xs sm:text-sm font-medium text-gray-900">
              Attendance Reminders
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Receive reminders to clock in and out.
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer flex-shrink-0 self-start sm:self-center">
            <input
              type="checkbox"
              checked={formData.attendanceReminders}
              onChange={(e) =>
                onInputChange("attendanceReminders", e.target.checked)
              }
              className="sr-only peer"
              disabled={true}
            />
            <div className="w-10 h-5 sm:w-11 sm:h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 sm:after:h-5 sm:after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
          <div className="flex-1">
            <h3 className="text-xs sm:text-sm font-medium text-gray-900">
              Leave Status Updates
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Get notified when your leave requests are approved or rejected.
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer flex-shrink-0 self-start sm:self-center">
            <input
              type="checkbox"
              checked={formData.leaveStatusUpdates}
              onChange={(e) =>
                onInputChange("leaveStatusUpdates", e.target.checked)
              }
              className="sr-only peer"
              disabled={true}
            />
            <div className="w-10 h-5 sm:w-11 sm:h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 sm:after:h-5 sm:after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
          <div className="flex-1">
            <h3 className="text-xs sm:text-sm font-medium text-gray-900">
              System Announcements
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Receive notifications about system updates and maintenance.
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer flex-shrink-0 self-start sm:self-center">
            <input
              type="checkbox"
              checked={formData.systemAnnouncements}
              onChange={(e) =>
                onInputChange("systemAnnouncements", e.target.checked)
              }
              className="sr-only peer"
              disabled={true}
            />
            <div className="w-10 h-5 sm:w-11 sm:h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 sm:after:h-5 sm:after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>
    </div>
  );
}
