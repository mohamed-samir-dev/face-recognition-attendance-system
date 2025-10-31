'use client';

import { useState, useEffect } from 'react';
import { DepartmentStats, AbsenceReason } from '@/lib/types';
import { getDepartmentStats, getAbsenceReasons, getAttendanceStats } from '@/lib/services/attendanceService';
import DepartmentAttendance from './DepartmentAttendance';
import AttendanceStatus from './AttendanceStatus';
import QuickActions from './QuickActions';
import AbsenceReasons from './AbsenceReasons';

export default function AttendanceOverview() {
  const [departmentStats, setDepartmentStats] = useState<DepartmentStats[]>([]);
  const [absenceReasons, setAbsenceReasons] = useState<AbsenceReason[]>([]);
  const [totalStats, setTotalStats] = useState({ present: 0, total: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [deptStats, reasons, stats] = await Promise.all([
          getDepartmentStats(),
          getAbsenceReasons(),
          getAttendanceStats()
        ]);
        setDepartmentStats(deptStats);
        setAbsenceReasons(reasons);
        setTotalStats({ present: stats.presentToday, total: stats.totalMembers });
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="animate-pulse bg-gray-200 h-96 rounded-lg"></div>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <DepartmentAttendance departmentStats={departmentStats} />
      <AttendanceStatus present={totalStats.present} total={totalStats.total} />
      <QuickActions />
      <AbsenceReasons absenceReasons={absenceReasons} />
    </div>
  );
}