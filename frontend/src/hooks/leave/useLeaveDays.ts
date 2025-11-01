import { useState, useEffect, useCallback } from "react";
import { getUserLeaveDays } from "@/lib/services/leaveDaysService";

export function useLeaveDays(employeeId: string | undefined) {
  const [leaveDays, setLeaveDays] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchLeaveDays = useCallback(async () => {
    if (!employeeId) return;
    setLoading(true);
    try {
      const days = await getUserLeaveDays(employeeId);
      setLeaveDays(days);
    } catch (error) {
      console.error("Error fetching leave days:", error);
    } finally {
      setLoading(false);
    }
  }, [employeeId]);

  useEffect(() => {
    fetchLeaveDays();
    
    const handleLeaveDaysUpdate = (event: CustomEvent) => {
      console.log('Leave days update event received:', event.detail);
      if (event.detail?.employeeId === employeeId) {
        console.log(`Refreshing leave days for employee ${employeeId}`);
        fetchLeaveDays();
      }
    };
    
    window.addEventListener('leaveDaysUpdated', handleLeaveDaysUpdate as EventListener);
    
    return () => {
      window.removeEventListener('leaveDaysUpdated', handleLeaveDaysUpdate as EventListener);
    };
  }, [fetchLeaveDays, employeeId]);

  return { leaveDays, loading, refetch: fetchLeaveDays };
}
