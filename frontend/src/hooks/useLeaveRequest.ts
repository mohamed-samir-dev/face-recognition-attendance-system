import { useState } from "react";
import { useRouter } from "next/navigation";
import { submitLeaveRequest } from "@/lib/services/leaveService";

type LeaveType = "Sick Leave" | "Vacation" | "Personal Leave" | "Maternity Leave" | "Paternity Leave";

interface LeaveFormData {
  startDate: string;
  endDate: string;
  leaveType: string;
  reason: string;
  contactName: string;
  phoneNumber: string;
}

export function useLeaveRequest() {
  const router = useRouter();
  const [formData, setFormData] = useState<LeaveFormData>({
    startDate: "",
    endDate: "",
    leaveType: "",
    reason: "",
    contactName: "",
    phoneNumber: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'warning'; isVisible: boolean }>({ 
    message: '', 
    type: 'success', 
    isVisible: false 
  });
  const [dateError, setDateError] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const newFormData = { ...formData, [name]: value };
    setFormData(newFormData);
    
    // Validate dates when either start or end date changes
    if (name === 'startDate' || name === 'endDate') {
      validateDates(newFormData.startDate, newFormData.endDate);
    }
  };

  const validateDates = (startDate: string, endDate: string) => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      if (end < start) {
        setDateError("End date cannot be before start date");
      } else {
        setDateError("");
      }
    } else {
      setDateError("");
    }
  };

  const calculateLeaveDays = (startDate: string, endDate: string): number => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const timeDiff = end.getTime() - start.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1; // +1 to include both start and end dates
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>, userId: string, userName: string, numericId?: number) => {
    e.preventDefault();
    
    // Check for date validation error
    if (dateError) {
      setToast({ message: dateError, type: 'error', isVisible: true });
      return;
    }
    
    setIsSubmitting(true);
    try {
      const leaveDays = calculateLeaveDays(formData.startDate, formData.endDate);
      
      await submitLeaveRequest({
        employeeId: numericId?.toString() || userId,
        employeeName: userName,
        leaveType: formData.leaveType as LeaveType,
        startDate: formData.startDate,
        endDate: formData.endDate,
        leaveDays,
        reason: formData.reason,
        status: 'Pending'
      });
      
      setToast({ message: "Leave request submitted successfully!", type: 'success', isVisible: true });
      setTimeout(() => router.push("/userData"), 2000);
    } catch {
      setToast({ message: "Failed to submit leave request. Please try again.", type: 'error', isVisible: true });
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeToast = () => {
    setToast(prev => ({ ...prev, isVisible: false }));
  };

  return {
    formData,
    isSubmitting,
    toast,
    dateError,
    handleChange,
    handleSubmit,
    closeToast
  };
}