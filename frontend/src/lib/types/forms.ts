import { LoginFormData } from "./auth";
import { User } from "./user";

export interface LoginFormProps {
  onSubmit: (data: LoginFormData) => Promise<void>;
  loading: boolean;
  error: string;
}

export interface LeaveRequestFormProps {
  user: User;
  formData: {
    startDate: string;
    endDate: string;
    leaveType: string;
    reason: string;
    contactName: string;
    phoneNumber: string;
  };
  isSubmitting: boolean;
  dateError?: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  onCancel: () => void;
}

export interface FormTextareaProps {
  label: string;
  name: string;
  value: string;
  placeholder?: string;
  rows?: number;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export interface EmployeeInfoSectionProps {
  user: User;
}