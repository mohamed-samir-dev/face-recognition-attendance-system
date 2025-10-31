export interface LeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  leaveType: 'Vacation' | 'Sick Leave' | 'Personal Leave' | 'Maternity Leave' | 'Paternity Leave';
  startDate: string;
  endDate: string;
  leaveDays: number;
  status: 'Pending' | 'Approved' | 'Rejected';
  reason?: string;
  createdAt: string;
  updatedAt: string;
}