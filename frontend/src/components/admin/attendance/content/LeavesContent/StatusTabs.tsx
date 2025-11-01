import { StatusTabsProps } from "./types";
import { statusTabs } from "./utils";

export default function StatusTabs({ statusFilter, setStatusFilter, leaveRequests }: StatusTabsProps) {
  return (
    <div className="flex items-center justify-end mb-6">
      <div className="flex overflow-x-auto rounded-lg p-1">
        {statusTabs.map((tab) => {
          let count = 0;
          let badgeColor = "bg-gray-200 text-gray-700";
          
          if (tab === "All Request") {
            count = leaveRequests.length;
            badgeColor = "bg-gray-200 text-gray-700";
          } else if (tab === "Pending") {
            count = leaveRequests.filter(r => r.status === 'Pending').length;
            badgeColor = "bg-orange-200 text-orange-800";
          } else if (tab === "Approve") {
            count = leaveRequests.filter(r => r.status === 'Approved').length;
            badgeColor = "bg-green-200 text-green-800";
          } else if (tab === "Rejected") {
            count = leaveRequests.filter(r => r.status === 'Rejected').length;
            badgeColor = "bg-red-200 text-red-800";
          } else if (tab === "Expired") {
            count = leaveRequests.filter(r => new Date(r.endDate) < new Date() && r.status === 'Approved').length;
            badgeColor = "bg-purple-200 text-purple-800";
          }
          
          return (
            <button
              key={tab}
              onClick={() => setStatusFilter(tab)}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all cursor-pointer whitespace-nowrap flex items-center space-x-2 ${
                statusFilter === tab
                  ? "bg-gray-100 text-blue-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              <span>{tab}</span>
              <span className={`${badgeColor} px-2 py-1 rounded-full text-xs font-semibold`}>{count}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}