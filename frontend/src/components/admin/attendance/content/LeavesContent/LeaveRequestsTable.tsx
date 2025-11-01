import { Calendar } from "lucide-react";
import { LeaveRequestsTableProps } from "./types";
import LeaveRequestRow from "./LeaveRequestRow";

export default function LeaveRequestsTable({ 
  leaveRequests, 
  searchQuery, 
  statusFilter, 
  error, 
  onViewDetails, 
  onDelete 
}: LeaveRequestsTableProps) {
  const filteredRequests = leaveRequests
    .filter(request => {
      const matchesSearch = request.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        request.leaveType.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === "All Request" || 
        (statusFilter === "Approve" && request.status === "Approved") ||
        (statusFilter === "Expired" && new Date(request.endDate) < new Date() && request.status === 'Approved') ||
        request.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      const statusOrder = { "Pending": 0, "Approved": 1, "Rejected": 2 };
      return statusOrder[a.status as keyof typeof statusOrder] - statusOrder[b.status as keyof typeof statusOrder];
    });

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      {error ? (
        <div className="p-8 text-center">
          <p className="text-red-600">{error}</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Employee</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Leave Type</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Dates</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredRequests.map((request) => (
                <LeaveRequestRow
                  key={request.id}
                  request={request}
                  onViewDetails={onViewDetails}
                  onDelete={onDelete}
                />
              ))}
              {filteredRequests.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-16 text-center">
                    <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p className="text-gray-500 font-medium">No leave requests found</p>
                    <p className="text-gray-400 text-sm mt-1">Try adjusting your search or filter criteria</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}