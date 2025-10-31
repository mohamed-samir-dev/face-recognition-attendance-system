import { collection, getDocs, query, orderBy, doc, updateDoc, deleteDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { LeaveRequest } from "@/lib/types";

export const getLeaveRequests = async (): Promise<LeaveRequest[]> => {
  try {
    const leaveCollection = collection(db, "leaveRequests");
    const q = query(leaveCollection, orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as LeaveRequest));
  } catch (error) {
    console.error("Error fetching leave requests:", error);
    return [];
  }
};

export const submitLeaveRequest = async (requestData: Omit<LeaveRequest, 'id' | 'createdAt' | 'updatedAt'>): Promise<void> => {
  try {
    const now = new Date().toISOString();
    const timestamp = new Date().getTime();
    const documentId = `leave_req_${requestData.employeeId}_${timestamp}`;
    const requestRef = doc(db, "leaveRequests", documentId);
    
    await setDoc(requestRef, {
      id: documentId,
      ...requestData,
      createdAt: now,
      updatedAt: now
    });
  } catch (error) {
    console.error("Error submitting leave request:", error);
    throw new Error("Failed to submit leave request");
  }
};

export const updateLeaveRequestStatus = async (requestId: string, status: 'Pending' | 'Approved' | 'Rejected'): Promise<void> => {
  try {
    const requestRef = doc(db, "leaveRequests", requestId);
    await updateDoc(requestRef, {
      status,
      updatedAt: new Date().toISOString()
    });
    
    // If approved, add to leave days taken collection
    if (status === 'Approved') {
      const leaveRequests = await getLeaveRequests();
      const request = leaveRequests.find(req => req.id === requestId);
      
      if (request) {
        const { addLeaveDaysRecord } = await import('./leaveDaysService');
        await addLeaveDaysRecord({
          employeeId: request.employeeId,
          employeeName: request.employeeName,
          leaveRequestId: request.id,
          leaveDays: request.leaveDays,
          leaveType: request.leaveType,
          startDate: request.startDate,
          endDate: request.endDate,
          approvedAt: new Date().toISOString()
        });
      }
    }
  } catch (error) {
    console.error("Error updating leave request status:", error);
    throw new Error("Failed to update leave request status");
  }
};

export const deleteLeaveRequest = async (requestId: string): Promise<void> => {
  try {
    // Get the leave request to find the employee ID
    const leaveRequests = await getLeaveRequests();
    const request = leaveRequests.find(req => req.id === requestId);
    
    // If the request was approved, delete the corresponding leave days record first
    if (request && request.status === 'Approved') {
      const { deleteLeaveDaysRecord } = await import('./leaveDaysService');
      await deleteLeaveDaysRecord(requestId);
    }
    
    // Delete the leave request
    const requestRef = doc(db, "leaveRequests", requestId);
    await deleteDoc(requestRef);
    
    return request; // Return the request data for the component to handle UI updates
  } catch (error) {
    console.error("Error deleting leave request:", error);
    throw new Error("Failed to delete leave request");
  }
};