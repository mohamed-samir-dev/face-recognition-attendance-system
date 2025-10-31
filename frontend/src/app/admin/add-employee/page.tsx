"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useLeaveRequests } from "@/hooks/useLeaveRequests";
import NavigationBlocker from "@/components/NavigationBlocker";
import AdminSidebar from "@/components/layout/AdminSidebar";
import AdminTopBar from "@/components/layout/AdminTopBar";
import { AddEmployeeForm } from "@/components/admin";

export default function AddEmployeePage() {
  const router = useRouter();
  const { user, mounted, logout } = useAuth();
  const { leaveRequests } = useLeaveRequests();
  const [searchQuery, setSearchQuery] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleTabChange = (tab: string) => {
    router.push(`/admin?tab=${tab}`);
  };

  if (!mounted || !user || user.numericId !== 1) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationBlocker />
      
      <AdminSidebar 
        activeTab="UserManagement"
        onTabChange={handleTabChange}
        pendingCount={leaveRequests.filter(req => req.status === "Pending").length}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      
      <div className="lg:ml-56">
        <AdminTopBar 
          user={user}
          onLogout={logout}
          showNotifications={showNotifications}
          onToggleNotifications={() => setShowNotifications(!showNotifications)}
          pendingRequests={[]}
          onViewRequest={() => {}}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onMenuClick={() => setSidebarOpen(true)}
        />

        <AddEmployeeForm />
      </div>
    </div>
  );
}