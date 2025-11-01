"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/hooks/auth/useAuth";
import { useLeaveRequests } from "@/hooks/leave/useLeaveRequests";
import NavigationBlocker from "@/components/NavigationBlocker";
import AdminSidebar from "@/components/layout/admin/AdminSidebar";
import AdminTopBar from "@/components/layout/admin/AdminTopBar";
import DashboardContent from "@/components/admin/dashboard/content/DashboardContent";
import AttendanceContent from "@/components/admin/attendance/content/AttendanceContent";
import LeavesContent from "@/components/admin/attendance/content/LeavesContent";
import ReportsContent from "@/components/admin/reports/ReportsContent";
import UserManagementView from "@/components/admin/employee-management/views/UserManagementView";
import SettingsContent from "@/components/admin/settings/views/SettingsView";
import DepartmentsContent from "@/components/admin/departments/DepartmentsContent";

function AdminDashboardContent() {
  const { user, mounted, logout } = useAuth();
  const { leaveRequests, loading } = useLeaveRequests();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  if (!mounted || !user || user.numericId !== 1) {
    return null;
  }

  const pendingRequests = leaveRequests.filter(req => req.status === "Pending");
  const pendingCount = pendingRequests.length;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center font-['SF_Pro_Display',system-ui,sans-serif]">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="text-gray-600 font-medium">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50" onClick={() => {
      if (showNotifications) setShowNotifications(false);
      if (sidebarOpen) setSidebarOpen(false);
    }}>
      <NavigationBlocker />
      
      {/* Sidebar */}
      <AdminSidebar 
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          setSidebarOpen(false);
          window.history.pushState({}, '', `/admin?tab=${tab}`);
        }}
        pendingCount={pendingCount}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      
      {/* Main Content */}
      <div className="lg:ml-56">
        {/* Top Bar */}
        <AdminTopBar 
          user={user}
          onLogout={logout}
          showNotifications={showNotifications}
          onToggleNotifications={() => setShowNotifications(!showNotifications)}
          pendingRequests={pendingRequests}
          onViewRequest={() => {
            setShowNotifications(false);
          }}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onMenuClick={() => setSidebarOpen(true)}
        />

        {/* Content Area */}
        <div className="p-4 lg:p-0">
          {activeTab === "Dashboard" && <DashboardContent />}
          {activeTab === "Attendance" && <AttendanceContent />}
          {activeTab === "Leaves" && <LeavesContent searchQuery={searchQuery} />}
          {activeTab === "Reports" && <ReportsContent />}
          {activeTab === "UserManagement" && <UserManagementView />}
          {activeTab === "Departments" && <DepartmentsContent />}
          {activeTab === "Settings" && <SettingsContent />}
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center font-['SF_Pro_Display',system-ui,sans-serif]">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="text-gray-600 font-medium">Loading dashboard...</p>
        </div>
      </div>
    }>
      <AdminDashboardContent />
    </Suspense>
  );
}