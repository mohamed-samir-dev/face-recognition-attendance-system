import { DocumentData } from "firebase/firestore";
import { User } from "./user";

export interface DashboardContentProps {
  user: User;
  onTakeAttendance: () => void;
  onRequestLeave: () => void;
}

export interface ProfileSectionProps {
  user: DocumentData;
  onRequestLeave?: () => void;
  onTakePhoto: () => void;
}

export interface AttendanceChartProps {
  title: string;
  percentage: number;
  improvement: number;
  type: "line" | "bar";
}

export interface SummaryCardProps {
  title: string;
  value?: string | number;
  color?: "blue" | "yellow" | "red";
  icon?: React.ReactNode;
}

export interface DashboardLayoutProps {
  user: User;
  onLogout: () => void;
  onDashboard: () => void;
  onReports: () => void;
  onSettings: () => void;
  children: React.ReactNode;
}