export interface WorkingHours {
  startTime: string;
  endTime: string;
}

export interface Holiday {
  id: string;
  name: string;
  date: string;
  endDate?: string;
}

export interface Department {
  id: string;
  name: string;
  head: string;
  headId?: string;
  description?: string;
  employeeCount?: number;
  budget?: number;
  location?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AttendanceRules {
  gracePeriod: number;
}

export interface CompanySettings {
  workingHours: WorkingHours;
  holidays: Holiday[];
  departments: Department[];
  attendanceRules: AttendanceRules;
}

export interface ProfileSettings {
  attendanceReminders: boolean;
  leaveStatusUpdates: boolean;
  systemAnnouncements: boolean;
  attendanceHistoryVisibility: 'private' | 'team' | 'department' | 'public';
}