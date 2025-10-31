import { useState } from "react";
import { Calendar, Clock, AlertCircle } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useLeaveRequests } from "@/hooks/useLeaveRequests";
import { getStatusIcon, getStatusColor } from "@/utils/statusHelpers";

export default function AbsenceRequestsCard() {
  const { user } = useAuth();
  const { leaveRequests, loading } = useLeaveRequests();
  const [showAll, setShowAll] = useState(false);

  const userRequests = leaveRequests.filter(r => r.employeeId === user?.numericId?.toString());
  const pendingRequests = userRequests.filter(r => r.status === 'Pending');
  const approvedRequests = userRequests.filter(r => r.status === 'Approved');
  const recentRequests = showAll ? userRequests : userRequests.slice(0, 3);

  return (
    <div className="bg-white rounded-3xl border border-gray-200 p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-full bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
          <Calendar className="w-5 h-5 text-purple-600" />
        </div>
        <div>
          <h4 className="text-sm font-semibold text-[#555]">Absence Requests</h4>
          <div className="text-2xl font-bold text-gray-800 mt-1">{approvedRequests.length}</div>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <>
          {pendingRequests.length > 0 && (
            <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
              <div className="flex items-center gap-2 text-amber-700 text-sm font-medium">
                <AlertCircle className="w-4 h-4" />
                {pendingRequests.length} pending request{pendingRequests.length > 1 ? 's' : ''}
              </div>
            </div>
          )}

          <div className="space-y-3">
            {recentRequests.length === 0 ? (
              <div className="text-center py-6 text-gray-500 text-sm">No absence requests found</div>
            ) : (
              recentRequests.map((request) => (
                <div key={request.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-gray-900">{request.leaveType}</span>
                      <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                        {getStatusIcon(request.status)}
                        {request.status}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-600">
                      <Clock className="w-3 h-3" />
                      {new Date(request.startDate).toLocaleDateString()} - {new Date(request.endDate).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {userRequests.length > 3 && (
            <button
              onClick={() => setShowAll(!showAll)}
              className="w-full mt-3 text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              {showAll ? 'Show Less' : `View All (${userRequests.length})`}
            </button>
          )}
        </>
      )}
    </div>
  );
}