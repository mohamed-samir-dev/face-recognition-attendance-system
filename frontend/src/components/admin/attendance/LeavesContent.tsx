import { useState } from "react";
import { Calendar, Eye, Trash2 } from "lucide-react";
import { useLeaveRequests } from "@/hooks/useLeaveRequests";
import Modal from "@/components/common/Modal";
import DeleteConfirmModal from "@/components/common/DeleteConfirmModal";
import Toast from "@/components/common/Toast";
import { updateLeaveRequestStatus, deleteLeaveRequest } from "@/lib/services/leaveService";
import { createNotification } from "@/lib/services/notificationService";
import { LeaveRequest } from "@/lib/types";

interface LeavesContentProps {
  searchQuery: string;
}

export default function LeavesContent({ searchQuery }: LeavesContentProps) {
  const { leaveRequests, loading, error, refetch } = useLeaveRequests();
  const [statusFilter, setStatusFilter] = useState("All Request");
  const [selectedRequest, setSelectedRequest] = useState<LeaveRequest | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteRequest, setDeleteRequest] = useState<LeaveRequest | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'warning'; isVisible: boolean }>({ message: '', type: 'success', isVisible: false });

  const statusTabs = ["All Request", "Pending", "Approve", "Rejected", "Expired"];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved": return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "Pending": return "bg-amber-50 text-amber-700 border-amber-200";
      case "Rejected": return "bg-red-50 text-red-700 border-red-200";
      default: return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const handleStatusUpdate = async (requestId: string, status: 'Approved' | 'Rejected') => {
    const request = leaveRequests.find(req => req.id === requestId);
    try {
      await updateLeaveRequestStatus(requestId, status);
      
      if (request) {
        const notificationMessage = status === 'Approved'
          ? `🎉 Great news! Your leave request from ${new Date(request.startDate).toLocaleDateString()} to ${new Date(request.endDate).toLocaleDateString()} has been approved.`
          : `❌ Your leave request from ${new Date(request.startDate).toLocaleDateString()} to ${new Date(request.endDate).toLocaleDateString()} has been rejected.`;
        
        await createNotification(
          request.employeeId,
          notificationMessage,
          status === 'Approved' ? 'leave_approved' : 'leave_rejected'
        );
      }
      
      refetch();
      
      // Trigger leave days refresh after all database operations complete
      if (status === 'Approved' && request) {
        console.log('Dispatching leaveDaysUpdated event for employee:', request.employeeId);
        window.dispatchEvent(new CustomEvent('leaveDaysUpdated', { detail: { employeeId: request.employeeId } }));
      }
      
      const adminMessage = status === 'Approved' 
        ? `✅ ${request?.employeeName}'s leave request has been approved successfully!`
        : `❌ ${request?.employeeName}'s leave request has been rejected.`;
      setToast({ message: adminMessage, type: 'success', isVisible: true });
    } catch {
      setToast({ message: 'Failed to update request status', type: 'error', isVisible: true });
    }
  };

  const handleDeleteRequest = async () => {
    if (deleteRequest) {
      try {
        await deleteLeaveRequest(deleteRequest.id);
        refetch();
        
        // Send notification to employee and trigger leave days refresh if approved
        const notificationMessage = `Your leave request has been cancelled.`;
        
        await createNotification(
          deleteRequest.employeeId,
          notificationMessage,
          'leave_rejected'
        );
        
        if (deleteRequest.status === 'Approved') {
          window.dispatchEvent(new CustomEvent('leaveDaysUpdated', { detail: { employeeId: deleteRequest.employeeId } }));
        }
        
        setToast({ message: `✅ ${deleteRequest.employeeName}'s leave request has been deleted successfully!`, type: 'success', isVisible: true });
        setIsDeleteModalOpen(false);
        setDeleteRequest(null);
      } catch {
        setToast({ message: 'Failed to delete request', type: 'error', isVisible: true });
      }
    }
  };

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Leave Request</h1>
          <p className="text-gray-500 mt-1">Manage Requests</p>
        </div>
        
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
                  {leaveRequests
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
                    })
                    .map((request) => (
                      <tr key={request.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900">{request.employeeName}</div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">{request.leaveType}</td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-600">{new Date(request.startDate).toLocaleDateString()}</div>
                          <div className="text-xs text-gray-500">to {new Date(request.endDate).toLocaleDateString()}</div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${
                            new Date(request.endDate) < new Date() && request.status === 'Approved'
                              ? 'bg-purple-50 text-purple-700 border-purple-200'
                              : getStatusColor(request.status)
                          }`}>
                            {new Date(request.endDate) < new Date() && request.status === 'Approved' ? 'Expired' : request.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => {
                                setSelectedRequest(request);
                                setIsModalOpen(true);
                              }}
                              className="group relative inline-flex items-center px-4 py-2 text-sm font-medium text-blue-500 cursor-pointer"
                            >
                              <Eye className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-200" />
                              <span className="relative">View Details</span>
                            </button>
                            <button
                              onClick={() => {
                                setDeleteRequest(request);
                                setIsDeleteModalOpen(true);
                              }}
                              className="group relative inline-flex items-center px-4 py-2 text-sm font-medium text-red-500 cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-200" />
                              <span className="relative">Delete</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  {leaveRequests.filter(request => {
                    const matchesSearch = request.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      request.leaveType.toLowerCase().includes(searchQuery.toLowerCase());
                    const matchesStatus = statusFilter === "All Request" || 
                      (statusFilter === "Approve" && request.status === "Approved") ||
                      (statusFilter === "Expired" && new Date(request.endDate) < new Date() && request.status === 'Approved') ||
                      request.status === statusFilter;
                    return matchesSearch && matchesStatus;
                  }).length === 0 && (
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
      </div>
      
      <Toast 
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={() => setToast(prev => ({ ...prev, isVisible: false }))}
      />
      
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        request={selectedRequest}
        onStatusUpdate={handleStatusUpdate}
      />
      
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setDeleteRequest(null);
        }}
        onConfirm={handleDeleteRequest}
        employeeName={deleteRequest?.employeeName || ''}
      />
    </>
  );
}