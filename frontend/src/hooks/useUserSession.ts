import { useState, useEffect } from "react";
import { User } from "@/lib/types";
import { getUserSession, formatLastLogin, UserSession } from "@/lib/services/sessionService";
import { isEmployeeOnLeave } from "@/lib/services/leaveStatusService";

export function useUserSession(user: User | null) {
  const [sessionData, setSessionData] = useState<UserSession | null>(null);
  const [lastLoginText, setLastLoginText] = useState<string>("Loading...");
  const [onLeave, setOnLeave] = useState<boolean>(false);

  useEffect(() => {
    if (!user) return;

    const fetchSessionData = async () => {
      const session = await getUserSession(user.id);
      if (session) {
        setSessionData(session);
        setLastLoginText(formatLastLogin(session.lastLogin));
      }
      
      // Check if employee is on leave
      if (user.numericId && user.numericId !== 1) {
        const leaveStatus = await isEmployeeOnLeave(user.numericId.toString());
        setOnLeave(leaveStatus);
      }
    };

    fetchSessionData();

    // Update last login text every minute
    const interval = setInterval(() => {
      if (sessionData) {
        setLastLoginText(formatLastLogin(sessionData.lastLogin));
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [user, sessionData]);

  const getAccountType = (): string => {
    if (!user) return "Employee";
    if (user.numericId === 1) return "Admin";
    return user.accountType || "Employee";
  };

  const getAccountStatus = (): string => {
    if (!user) return "Inactive";
    if (onLeave) return "On Leave";
    return user.status || "Active";
  };

  return {
    lastLoginText,
    accountType: getAccountType(),
    accountStatus: getAccountStatus(),
    isActive: sessionData?.isActive || false
  };
}