import { DocumentData } from "firebase/firestore";
import { LeaveRequest } from "./leave";

export interface NavbarProps {
  user?: DocumentData | null;
  title?: string;
  onUserClick?: () => void;
  showNavigation?: boolean;
  navigationItems?: Array<{
    label: string;
    href: string;
    onClick?: () => void;
  }>;
}

export interface AdminTopBarProps {
  user: DocumentData;
  onLogout: () => void;
  showNotifications: boolean;
  onToggleNotifications: () => void;
  pendingRequests: LeaveRequest[];
  onViewRequest: (request: LeaveRequest) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onMenuClick: () => void;
}