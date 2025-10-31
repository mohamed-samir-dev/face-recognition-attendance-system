"use client";

import { useProfile } from "@/hooks/useProfile";
import ProfileLayout from "@/components/profile/ProfileLayout";
import ProfileSettingsForm from "@/components/profile/ProfileSettingsForm";

export default function ProfilePage() {
  const { user, mounted, logout, handleDashboard, handleReports, handleSettings } = useProfile();

  if (!mounted || !user) {
    return null;
  }

  if (user && user.numericId === 1) {
    return null;
  }

  return (
    <ProfileLayout
      user={user}
      onLogout={logout}
      onDashboard={handleDashboard}
      onReports={handleReports}
      onSettings={handleSettings}
    >
      <ProfileSettingsForm user={user} />
    </ProfileLayout>
  );
}