import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/config";

export async function checkDailyAttendance(userId: string): Promise<{
  hasAttendance: boolean;
  message: string;
}> {
  try {
    const today = new Date().toISOString().split('T')[0];
    
    const attendanceRef = collection(db, "attendance");
    const q = query(
      attendanceRef,
      where("userId", "==", userId),
      where("date", "==", today)
    );
    
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      return {
        hasAttendance: true,
        message: "You have already taken attendance today. Please try again tomorrow."
      };
    }
    
    return {
      hasAttendance: false,
      message: "No attendance found for today"
    };
    
  } catch (error) {
    console.error("Error checking daily attendance:", error);
    return {
      hasAttendance: false,
      message: "Error checking attendance status"
    };
  }
}

export async function recordDailyAttendance(userId: string, userName: string): Promise<{
  success: boolean;
  message: string;
}> {
  try {
    const now = new Date();
    const today = now.toISOString().split('T')[0];
    const currentTime = now.toTimeString().split(' ')[0];
    
    const attendanceData = {
      userId,
      employeeName: userName,
      date: today,
      checkIn: currentTime,
      status: 'Present',
      timestamp: now
    };
    
    await addDoc(collection(db, "attendance"), attendanceData);
    
    return {
      success: true,
      message: "Attendance recorded successfully"
    };
    
  } catch (error) {
    console.error("Error recording attendance:", error);
    return {
      success: false,
      message: "Failed to record attendance"
    };
  }
}