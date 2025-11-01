'use client';

import AttendanceOverview from '../../attendance/overview/AttendanceOverview';
import DashboardHeader from '../header/DashboardHeader';
import DepartmentSelector from '../selector/DepartmentSelector';
import AttendanceSummary from '../summary/AttendanceSummary';
import LoadingState from '../states/LoadingState';
import { useAttendanceData } from '@/hooks/attendance/useAttendanceData';
import { useDepartmentFilter } from '@/hooks/data/useDepartmentFilter';

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