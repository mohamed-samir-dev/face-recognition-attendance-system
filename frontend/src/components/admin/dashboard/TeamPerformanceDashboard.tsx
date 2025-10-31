'use client';

import AttendanceOverview from '../attendance/AttendanceOverview';
import DashboardHeader from './DashboardHeader';
import DepartmentSelector from './DepartmentSelector';
import AttendanceSummary from './AttendanceSummary';
import LoadingState from './LoadingState';
import { useAttendanceData } from '@/hooks/useAttendanceData';
import { useDepartmentFilter } from '@/hooks/useDepartmentFilter';

export default function TeamPerformanceDashboard() {
  const { stats, departmentStats, loading } = useAttendanceData();
  const { selectedDepartment, setSelectedDepartment, currentStats } = useDepartmentFilter(stats, departmentStats);

  if (loading) {
    return <LoadingState />;
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <DashboardHeader />
        <DepartmentSelector 
          selectedDepartment={selectedDepartment} 
          onDepartmentChange={setSelectedDepartment} 
        />
        <AttendanceSummary stats={currentStats} />
        <AttendanceOverview />
      </div>
    </div>
  );
}