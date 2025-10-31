export interface AttendanceRecord {
  id: string;
  userId: string;
  date: string;
  checkIn?: string;
  checkOut?: string;
  status: 'Present' | 'Absent' | 'Late' | 'OnLeave';
  department?: string;
}

export interface AttendanceStats {
  totalMembers: number;
  presentToday: number;
  absentToday: number;
  lateToday: number;
  onLeaveToday?: number;
}

export interface DepartmentStats extends AttendanceStats {
  department: string;
}

export interface AbsenceReason {
  reason: string;
  percentage: number;
  count: number;
}