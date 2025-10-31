import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface PersonalInfoFormProps {
  formData: {
    fullName: string;
    email: string;
    phone: string;
    jobTitle: string;
    department: string;
    employeeId: string;
  };
  userPassword: string;
  userNumericId: string;
  onInputChange: (field: string, value: string | boolean) => void;
  onPasswordModalOpen: () => void;
}

export default function PersonalInfoForm({
  formData,
  userPassword,
  userNumericId,
  onInputChange,
  onPasswordModalOpen,
}: PersonalInfoFormProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <h2 className="text-lg font-medium text-gray-900 mb-4">
        Personal Information
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <div>
          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
            Full Name
          </label>
          <input
            type="text"
            value={formData.fullName}
            onChange={(e) => onInputChange("fullName", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 text-sm sm:text-base"
          />
        </div>

        <div>
          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => onInputChange("email", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 text-sm sm:text-base"
          />
        </div>

        <div>
          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => onInputChange("phone", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 text-sm sm:text-base"
            placeholder="Enter phone number"
          />
        </div>

        <div>
          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
            Job Title
          </label>
          <input
            type="text"
            value={formData.jobTitle}
            readOnly
            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-900 text-sm sm:text-base"
          />
        </div>

        <div>
          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
            Department
          </label>
          <input
            type="text"
            value={formData.department}
            readOnly
            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-900 text-sm sm:text-base"
          />
        </div>

        <div>
          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
            Employee ID
          </label>
          <input
            type="text"
            value={userNumericId || ""}
            readOnly
            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-900 text-sm sm:text-base"
          />
        </div>
      </div>

      <div className="mt-4 sm:mt-6">
        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
          Password
        </label>
        <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
          <div className="relative w-full sm:max-w-xs">
            <input
              type={showPassword ? "text" : "password"}
              value={
                showPassword
                  ? userPassword || ""
                  : "•".repeat((userPassword || "").length)
              }
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-900 pr-10 text-sm sm:text-base"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
          <button 
            onClick={onPasswordModalOpen}
            className="text-blue-600 hover:text-blue-700 font-medium text-xs sm:text-sm cursor-pointer self-start sm:self-center"
          >
            Update Password
          </button>
        </div>
      </div>
    </div>
  );
}