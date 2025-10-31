import { Clock, AlertTriangle, XCircle } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { SummaryCardProps } from "@/lib/types";
import { useLeaveDays } from "@/hooks/useLeaveDays";
import AbsenceRequestsCard from "./AbsenceRequestsCard";

function SummaryCard({ title, value, color = "blue", icon }: SummaryCardProps) {
  const colorClasses = {
    blue: "from-blue-50 to-blue-100 border-blue-200",
    yellow: "from-amber-50 to-orange-100 border-amber-200", 
    red: "from-red-50 to-red-100 border-red-200"
  };

  const iconColors = {
    blue: "text-blue-600",
    yellow: "text-amber-600",
    red: "text-red-600"
  };

  return (
    <div className="bg-white rounded-3xl border border-gray-200 p-6 ">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-semibold text-[#555]">
          {title}
        </h4>
        <div className={`p-2 rounded-full bg-gradient-to-r ${colorClasses[color]}`}>
          <div className={iconColors[color]}>
            {icon}
          </div>
        </div>
      </div>
      {value !== undefined && (
        <div className="text-3xl font-bold text-black">{value}</div>
      )}
    </div>
  );
}

export default function AttendanceSummary() {
  const { user } = useAuth();
  const { leaveDays: userLeaveDays } = useLeaveDays(user?.numericId?.toString());

  return (
    <div className="mb-8">
      <h3 className="text-lg font-bold text-[#1A1A1A] mb-4">
        Monthly Attendance Summary
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <SummaryCard 
          title="Total Hours Worked" 
          icon={<Clock className="w-5 h-5" />} 
        />
        <SummaryCard 
          title="Late Arrivals" 
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
    </div>
  );
}