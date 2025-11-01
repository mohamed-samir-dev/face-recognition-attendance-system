// Settings Types
export interface Holiday {
  id: string;
  name: string;
  date: string;
  type: 'public' | 'company' | 'optional';
  description?: string;
}

export interface WorkingHours {
  id: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  isWorkingDay: boolean;
}

export interface AttendanceRule {
  id: string;
  name: string;
  type: 'late_arrival' | 'early_departure' | 'overtime';
  threshold: number;
  action: 'warning' | 'deduction' | 'approval_required';
  isActive: boolean;
}