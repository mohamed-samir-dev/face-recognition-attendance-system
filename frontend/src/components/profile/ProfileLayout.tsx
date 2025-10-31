"use client";

import Navbar from "@/components/layout/Navbar";
import NavigationBlocker from "@/components/NavigationBlocker";
import { User } from "@/lib/types";

interface ProfileLayoutProps {
  user: User;
  onLogout: () => void;
  onDashboard: () => void;
  onReports: () => void;
  onSettings: () => void;
  children: React.ReactNode;
}

export default function ProfileLayout({
  user,
  onLogout,
  onDashboard,
  onReports,
  onSettings,
  children
}: ProfileLayoutProps) {
  return (
    <div className="min-h-screen bg-[#F8FAFC] font-['Inter',sans-serif]">
      <NavigationBlocker />
      <Navbar 
        user={user}
        title="Profile Settings"
        onUserClick={onLogout}
        showNavigation
        navigationItems={[
          { label: "Dashboard", href: "", onClick: onDashboard },
          { label: "Reports", href: "", onClick: onReports },
          { label: "Settings", href: "", onClick: onSettings }
        ]}
      />

      <div className="max-w-full mx-auto p-6">
        {children}
      </div>
    </div>
  );
}