"use client";
import { Clock, AlertTriangle, XCircle, Timer } from "lucide-react";
import { useAuth } from "@/hooks/auth/useAuth";
import { SummaryCardProps } from "@/lib/types";
import { useLeaveDays } from "@/hooks/leave/useLeaveDays";
import { useWorkTimer } from "@/hooks/attendance/useWorkTimer";
import { getMonthlyLateArrivals } from "@/lib/services/attendanceService";
import Toast from "@/components/common/feedback/Toast";
import AbsenceRequestsCard from "./AbsenceRequestsCard";
import { useEffect, useState } from "react";

function SummaryCard({
  title,
  value,
  color = "blue",
  icon,
  timer,
}: SummaryCardProps & { timer?: string }) {
  const colorClasses = {
    blue: "from-blue-50 to-blue-100 border-blue-200",
    yellow: "from-amber-50 to-orange-100 border-amber-200",
    red: "from-red-50 to-red-100 border-red-200",
  };

  const iconColors = {
    blue: "text-blue-600",
    yellow: "text-amber-600",
    red: "text-red-600",
  };

  return (
    <div className="bg-white rounded-3xl border border-gray-200 p-6 ">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-semibold text-[#555]">{title}</h4>
        <div
          className={`p-2 rounded-full bg-gradient-to-r ${colorClasses[color]}`}
        >
          <div className={iconColors[color]}>{icon}</div>
        </div>
      </div>
      {value !== undefined && (
        <div className="text-3xl font-bold text-black">{value}</div>
      )}
      {timer && (
        <div>
          <div className="text-lg font-bold text-blue-700 tracking-wider">
            <span>Today Hour:</span> {timer}
          </div>
        </div>
      )}
    </div>
  );
}

export default function AttendanceSummary() {
  const { user } = useAuth();
  const { leaveDays: userLeaveDays } = useLeaveDays(
    user?.numericId?.toString()
  );
  const { timeRemaining, isActive, totalHours } = useWorkTimer(user?.id);
  const [lateArrivals, setLateArrivals] = useState<number>(0);
  const [showLateToast, setShowLateToast] = useState(false);

  useEffect(() => {
    if (user?.id) {
      getMonthlyLateArrivals(user.id).then(count => {
        console.log('Late arrivals count:', count);
        setLateArrivals(count);
      });
      
      // Check if user should see late toast
      const shouldShowLateToast = localStorage.getItem('showLateToast');
      if (shouldShowLateToast === 'true') {
        setShowLateToast(true);
        localStorage.removeItem('showLateToast');
      }
    }
  }, [user?.id]);
  


  // Debug logging
  useEffect(() => {
    console.log("Timer state:", {
      timeRemaining,
      isActive,
      totalHours,
      userId: user?.id,
      lateArrivals
    });
  }, [timeRemaining, isActive, totalHours, user?.id, lateArrivals]);

  return (
    <div className="mb-8">
      <h3 className="text-lg font-bold text-[#1A1A1A] mb-4">
        Monthly Attendance Summary
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <SummaryCard
          title="Total Hours Worked"
          value={`${Math.round(totalHours * 100) / 100}h`}
          timer={isActive ? timeRemaining : undefined}
          icon={<Clock className="w-5 h-5" />}
        />

        <SummaryCard
          title="Overtime"
          value="0h"
          icon={<Timer className="w-5 h-5" />}
        />

        <SummaryCard
          title="Late Arrivals"
          value={`${lateArrivals} days`}
          color="yellow"
          icon={<AlertTriangle className="w-5 h-5" />}
        />
        <SummaryCard
          title="Leave Days Taken"
          value={userLeaveDays}
          color="red"
          icon={<XCircle className="w-5 h-5" />}
        />
      </div>
      <AbsenceRequestsCard />
      
      <Toast
        message="Late Arrival Notice: Your tardiness has been recorded and may impact your salary and performance evaluation. Please ensure punctual attendance."
        type="warning"
        isVisible={showLateToast}
        onClose={() => setShowLateToast(false)}
        duration={8000}
      />
    </div>
  );
}
