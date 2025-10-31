export interface User {
  id: string;
  numericId?: number;
  name: string;
  username: string;
  email?: string;
  image: string;
  password?: string;
  department?: string;
  Department?: string;
  jobTitle?: string;
  status?: 'Active' | 'OnLeave' | 'Inactive';
  salary?: number;
  phone?: string;
  // Session data
  lastLogin?: Date;
  isActive?: boolean;
  sessionStartTime?: Date;
  accountType?: 'Employee' | 'Admin' | 'Manager';
  // Notification preferences
  systemAnnouncements?: boolean;
  leaveStatusUpdates?: boolean;
  attendanceReminders?: boolean;
}