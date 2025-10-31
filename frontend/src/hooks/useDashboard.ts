import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export function useDashboard() {
  const { user, mounted, logout, refreshUserData } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user && user.numericId === 1) {
      router.push("/admin");
    }
  }, [user, router]);

  useEffect(() => {
    if (mounted && user && refreshUserData) {
      refreshUserData();
    }
  }, [mounted, user, refreshUserData]);

  const handleTakeAttendance = () => {
    router.push("/camera");
  };

  const handleRequestLeave = () => {
    router.push("/leaveRequest");
  };

  const handleSettings = () => {
    router.push("/profile");
  };

  const handleReports = () => {
    // Future implementation
  };

  const handleDashboard = () => {
    router.push("/userData");
  };

  return {
    user,
    mounted,
    logout,
    handleTakeAttendance,
    handleRequestLeave,
    handleSettings,
    handleReports,
    handleDashboard
  };
}