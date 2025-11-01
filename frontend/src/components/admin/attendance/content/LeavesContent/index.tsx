import { useState } from "react";
import { useLeaveRequests } from "@/hooks/leave/useLeaveRequests";
import Modal from "@/components/common/modals/Modal";
import DeleteConfirmModal from "@/components/common/modals/DeleteConfirmModal";
import Toast from "@/components/common/feedback/Toast";
import { updateLeaveRequestStatus, deleteLeaveRequest } from "@/lib/services/leaveService";
import { createNotification } from "@/lib/services/notificationService";
import { LeaveRequest } from "@/lib/types";
import { LeavesContentProps, ToastState } from "./types";
import StatusTabs from "./StatusTabs";
import LeaveRequestsTable from "./LeaveRequestsTable";

export default function LeavesContent({ searchQuery }: LeavesContentProps) {
  const { leaveRequests, loading, error, refetch } = useLeaveRequests();
  const [statusFilter, setStatusFilter] = useState("All Request");
  const [selectedRequest, setSelectedRequest] = useState<LeaveRequest | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteRequest, setDeleteRequest] = useState<LeaveRequest | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [toast, setToast] = useState<ToastState>({ message: '', type: 'success', isVisible: false });

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

  const handleViewDetails = (request: LeaveRequest) => {
    setSelectedRequest(request);
    setIsModalOpen(true);
  };

  const handleDelete = (request: LeaveRequest) => {
    setDeleteRequest(request);
    setIsDeleteModalOpen(true);
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
        
        <StatusTabs
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          leaveRequests={leaveRequests}
        />

        <LeaveRequestsTable
          leaveRequests={leaveRequests}
          searchQuery={searchQuery}
          statusFilter={statusFilter}
          error={error}
          onViewDetails={handleViewDetails}
          onDelete={handleDelete}
        />
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