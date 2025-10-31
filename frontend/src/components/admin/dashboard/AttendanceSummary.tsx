import { Users, UserCheck, UserX, Calendar } from 'lucide-react';
import { AttendanceStats, DepartmentStats } from '@/lib/types';
import MetricCard from '@/components/common/MetricCard';

interface AttendanceSummaryProps {
  stats: AttendanceStats | DepartmentStats | null;
}

export default function AttendanceSummary({ stats }: AttendanceSummaryProps) {
  return (
    <>
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Team Attendance Summary</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard
          title="Total Team Members"
          value={stats?.totalMembers || 0}
          icon={<Users className="w-6 h-6 text-blue-600" />}
          color="bg-blue-100"
        />
        <MetricCard
          title="Present Today"
          value={stats?.presentToday || 0}
          icon={<UserCheck className="w-6 h-6 text-green-600" />}
          color="bg-green-100"
        />
        <MetricCard
          title="On Leave Today"
          value={stats?.onLeaveToday || 0}
          icon={<Calendar className="w-6 h-6 text-orange-600" />}
          color="bg-orange-100"
        />
        <MetricCard
          title="Absent Today"
          value={stats?.absentToday || 0}
          icon={<UserX className="w-6 h-6 text-red-600" />}
          color="bg-red-100"
        />
      </div>
    </>
  );
}