"use client";

import { Calendar } from "lucide-react";
import FormInput from "../form-fields/FormInput";
import FormSelect from "../form-fields/FormSelect";
import FormTextarea from "../form-fields/FormTextarea";

interface LeaveDetailsSectionProps {
  formData: {
    startDate: string;
    endDate: string;
    leaveType: string;
    reason: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  dateError?: string;
}

const leaveTypeOptions = [
  { value: "", label: "Select leave type" },
  { value: "Sick Leave", label: "Sick Leave" },
  { value: "Vacation", label: "Annual Leave / Vacation" },
  { value: "Personal Leave", label: "Personal Leave" },
  { value: "Maternity Leave", label: "Maternity Leave" },
  { value: "Paternity Leave", label: "Paternity Leave" }
];

export default function LeaveDetailsSection({ formData, onChange, dateError }: LeaveDetailsSectionProps) {
  const today = new Date().toISOString().split('T')[0];
  
  const calculateDays = () => {
    if (formData.startDate && formData.endDate) {
      const start = new Date(formData.startDate);
      const end = new Date(formData.endDate);
      const timeDiff = end.getTime() - start.getTime();
      return Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1;
    }
    return 0;
  };
  
  return (
    <div>
      <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">
        Leave Details
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        <FormInput
          label="Start Date"
          name="startDate"
          type="date"
          value={formData.startDate}
          icon={Calendar}
          required
          min={today}
          onChange={onChange}
        />
        <FormInput
          label="End Date"
          name="endDate"
          type="date"
          value={formData.endDate}
          icon={Calendar}
          required
          min={today}
          onChange={onChange}
        />
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Number of Days
          </label>
          <div className="flex items-center border border-gray-300 rounded-lg px-4 py-3 bg-gray-50">
            <Calendar className="text-gray-400 mr-3" size={20} />
            <span className="w-full text-gray-800 font-semibold">
              {calculateDays()} {calculateDays() === 1 ? 'day' : 'days'}
            </span>
          </div>
        </div>
      </div>
      {dateError && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm font-medium">{dateError}</p>
        </div>
      )}
      <div className="mt-6">
        <FormSelect
          label="Type of Leave"
          name="leaveType"
          value={formData.leaveType}
          options={leaveTypeOptions}
          required
          onChange={onChange}
        />
      </div>
      <div className="mt-6">
        <FormTextarea
          label="Reason for Leave"
          name="reason"
          value={formData.reason}
          placeholder="Please provide a detailed explanation for your leave request. Include any relevant information that may assist in the approval process..."
          onChange={onChange}
        />
      </div>
    </div>
  );
}