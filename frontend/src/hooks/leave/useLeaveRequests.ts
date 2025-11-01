import { useState, useEffect } from "react";
import { LeaveRequest } from "@/lib/types";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase/config";

export const useLeaveRequests = () => {
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "leaveRequests"),
      (snapshot) => {
        const requests = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as LeaveRequest[];
        setLeaveRequests(requests);
        setLoading(false);
        setError(null);
      },
      () => {
        setError("Failed to fetch leave requests");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const refetch = () => {
    // No longer needed with real-time updates
  };

  return { leaveRequests, loading, error, refetch };
};