"use client";

import ProfileSection from "./ProfileSection";
import AttendanceSummary from "./AttendanceSummary";
import AttendanceChart from "./AttendanceChart";
import { DashboardContentProps } from "@/lib/types";

export default function DashboardContent({
  user,
  onTakeAttendance,
  onRequestLeave
}: DashboardContentProps) {
  return (
    <div className="max-w-full mx-auto p-6">
      <ProfileSection 
        user={user}
        onTakePhoto={onTakeAttendance}
        onRequestLeave={onRequestLeave}
      />

      <AttendanceSummary />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <AttendanceChart 
          title="Attendance Trends"
          percentage={95}
          improvement={5}
          type="line"
        />
        <AttendanceChart 
          title="Monthly Performance"
          percentage={85}
          improvement={10}
          type="bar"
        />
      </div>
    </div>
  );
}