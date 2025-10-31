"use client";

import { useAuth } from "@/hooks/useAuth";
import { useLeaveRequest } from "@/hooks/useLeaveRequest";
import { useRouter } from "next/navigation";
import LeaveRequestLayout from "@/components/leave/LeaveRequestLayout";
import LeaveRequestForm from "@/components/leave/LeaveRequestForm";

export default function LeaveRequestPage() {
  const { user, mounted, logout } = useAuth();
  const { formData, isSubmitting, toast, dateError, handleChange, handleSubmit, closeToast } = useLeaveRequest();
  const router = useRouter();

  if (!mounted || !user) {
    return null;
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    handleSubmit(e, user.id, user.name, user.numericId);
  };

  const onCancel = () => {
    router.push("/userData");
  };

  return (
    <LeaveRequestLayout 
      user={user} 
      toast={toast} 
      onCloseToast={closeToast} 
      onLogout={logout}
    >
      <LeaveRequestForm
        user={user}
        formData={formData}
        isSubmitting={isSubmitting}
        dateError={dateError}
        onSubmit={onSubmit}
        onChange={handleChange}
        onCancel={onCancel}
      />
    </LeaveRequestLayout>
  );
}