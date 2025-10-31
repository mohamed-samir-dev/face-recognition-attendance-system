"use client";

import { useDashboard } from "@/hooks/useDashboard";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DashboardContent from "@/components/dashboard/DashboardContent";

export default function DashboardPage() {
  const {
    user,
    mounted,
    logout,
    handleTakeAttendance,
    handleRequestLeave,
    handleSettings,
    handleReports,
    handleDashboard
  } = useDashboard();

  if (!mounted || !user) {
    return null;
  }

  if (user && user.numericId === 1) {
    return null;
  }

  return (
    <DashboardLayout
      user={user}
      onLogout={logout}
      onDashboard={handleDashboard}
      onReports={handleReports}
      onSettings={handleSettings}
    >
      <DashboardContent
        user={user}
        onTakeAttendance={handleTakeAttendance}
        onRequestLeave={handleRequestLeave}
      />
    </DashboardLayout>
  );
}
