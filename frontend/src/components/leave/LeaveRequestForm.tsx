"use client";

import { LeaveRequestFormProps } from "@/lib/types";
import {
  FormHeader,
  EmployeeInfoSection,
  LeaveDetailsSection,
  EmergencyContactSection,
  FormActions
} from "./form-sections";

export default function LeaveRequestForm({ 
  user, 
  formData, 
  isSubmitting, 
  dateError,
  onSubmit, 
  onChange, 
  onCancel 
}: LeaveRequestFormProps) {
  return (
    <div className="bg-white shadow-lg rounded-2xl sm:rounded-3xl border border-gray-200 overflow-hidden">
      <FormHeader />
      
      <div className="p-4 sm:p-8">
        <form onSubmit={onSubmit} className="space-y-6 sm:space-y-8">
          <EmployeeInfoSection user={user} />
          <LeaveDetailsSection formData={formData} onChange={onChange} dateError={dateError} />
          <EmergencyContactSection formData={formData} onChange={onChange} />
          <FormActions isSubmitting={isSubmitting} onCancel={onCancel} />
        </form>
      </div>
    </div>
  );
}