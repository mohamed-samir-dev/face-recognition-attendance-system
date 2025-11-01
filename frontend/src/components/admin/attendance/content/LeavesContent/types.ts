import { LeaveRequest } from "@/lib/types";

export interface LeavesContentProps {
  searchQuery: string;
}

export interface StatusTabsProps {
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  leaveRequests: LeaveRequest[];
}

export interface LeaveRequestsTableProps {
  leaveRequests: LeaveRequest[];
  searchQuery: string;
  statusFilter: string;
  error: string | null;
  onViewDetails: (request: LeaveRequest) => void;
  onDelete: (request: LeaveRequest) => void;
}

export interface LeaveRequestRowProps {
  request: LeaveRequest;
  onViewDetails: (request: LeaveRequest) => void;
  onDelete: (request: LeaveRequest) => void;
}

export interface ToastState {
  message: string;
  type: 'success' | 'error' | 'warning';
  isVisible: boolean;
}