import { doc, setDoc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { getCompanySettings } from "./settingsService";

export interface TimerData {
  userId: string;
  startTime: number;
  remaining: number;
  active: boolean;
  totalHours: number;
  actualWorkedHours?: number;
  checkInTime?: string;
}

class LocalTimer {
  private intervalId: NodeJS.Timeout | null = null;
  private remaining: number = 0;
  private onUpdate: (remaining: number) => void = () => {};
  private onComplete: () => void = () => {};

  start(initialRemaining: number, onUpdate: (remaining: number) => void, onComplete: () => void) {
    this.remaining = Math.floor(initialRemaining / 1000);
    this.onUpdate = onUpdate;
    this.onComplete = onComplete;
    
    this.onUpdate(this.remaining);
    
    this.intervalId = setInterval(() => {
      this.remaining--;
      this.onUpdate(this.remaining);
      
      if (this.remaining <= 0) {
        this.stop();
        this.onComplete();
      }
    }, 1000);
  }

  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  getRemaining() {
    return this.remaining;
  }
}

export const localTimer = new LocalTimer();

export const startWorkTimer = async (userId: string): Promise<void> => {
  const now = new Date();
  const checkInTime = now.toTimeString().split(' ')[0]; // HH:MM:SS format
  
  // Get working hours from settings
  const settings = await getCompanySettings();
  const { startTime: workStartTime, endTime: workEndTime } = settings.workingHours;
  
  // Calculate timer duration based on check-in time
  const workStart = new Date(`${now.toDateString()} ${workStartTime}:00`);
  const workEnd = new Date(`${now.toDateString()} ${workEndTime}:00`);
  const checkIn = new Date(`${now.toDateString()} ${checkInTime}`);
  
  // Timer duration = end of working hours - actual check-in time
  const timerDuration = Math.max(0, workEnd.getTime() - checkIn.getTime());
  
  const timerData: TimerData = {
    userId,
    startTime: Date.now(),
    remaining: timerDuration,
    active: true,
    totalHours: 0,
    checkInTime,
    actualWorkedHours: 0
  };

  const existingData = await getTimerData(userId);
  if (existingData) {
    timerData.totalHours = existingData.totalHours;
  }

  await setDoc(doc(db, "timers", userId), timerData);
};

export const getTimerData = async (userId: string): Promise<TimerData | null> => {
  try {
    const docRef = doc(db, "timers", userId);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data() as TimerData : null;
  } catch {
    return null;
  }
};

export const calculateRemainingTime = (timerData: TimerData): number => {
  const elapsed = Date.now() - timerData.startTime;
  return Math.max(0, timerData.remaining - elapsed);
};

export const completeTimer = async (userId: string): Promise<void> => {
  const timerData = await getTimerData(userId);
  if (!timerData || !timerData.checkInTime) return;

  // Calculate actual worked hours
  const now = new Date();
  const checkInTime = new Date(`${now.toDateString()} ${timerData.checkInTime}`);
  const actualWorkedMs = now.getTime() - checkInTime.getTime();
  const actualWorkedHours = actualWorkedMs / (1000 * 60 * 60);

  await updateDoc(doc(db, "timers", userId), {
    active: false,
    totalHours: timerData.totalHours + actualWorkedHours,
    actualWorkedHours,
    remaining: 0
  });

  // Update attendance record with actual worked hours
  await updateAttendanceWithWorkedHours(userId, actualWorkedHours);
};

const updateAttendanceWithWorkedHours = async (userId: string, workedHours: number): Promise<void> => {
  try {
    const { collection, query, where, getDocs, updateDoc: updateFirestoreDoc, doc: firestoreDoc } = await import('firebase/firestore');
    const today = new Date().toISOString().split('T')[0];
    
    const attendanceQuery = query(
      collection(db, 'attendance'),
      where('userId', '==', userId),
      where('date', '==', today)
    );
    
    const snapshot = await getDocs(attendanceQuery);
    if (!snapshot.empty) {
      const attendanceDoc = snapshot.docs[0];
      await updateFirestoreDoc(firestoreDoc(db, 'attendance', attendanceDoc.id), {
        workedHours: Math.round(workedHours * 100) / 100, // Round to 2 decimal places
        checkOut: new Date().toTimeString().split(' ')[0]
      });
    }
  } catch (error) {
    console.error('Error updating attendance with worked hours:', error);
  }
};

export const stopTimer = async (userId: string): Promise<void> => {
  const currentRemaining = localTimer.getRemaining() * 1000;
  localTimer.stop();
  
  await updateDoc(doc(db, "timers", userId), {
    active: false,
    remaining: currentRemaining
  });
};

export const deleteTimer = async (userId: string): Promise<void> => {
  localTimer.stop();
  await deleteDoc(doc(db, "timers", userId));
};

export const resetTimer = async (userId: string): Promise<void> => {
  localTimer.stop();
  await updateDoc(doc(db, "timers", userId), {
    active: false,
    remaining: 0,
    totalHours: 0,
    actualWorkedHours: 0,
    checkInTime: undefined
  });
};

export const getTimerInfo = async (userId: string) => {
  const timerData = await getTimerData(userId);
  if (!timerData || !timerData.checkInTime) return null;
  
  const now = new Date();
  const checkInTime = new Date(`${now.toDateString()} ${timerData.checkInTime}`);
  const elapsed = now.getTime() - checkInTime.getTime();
  const elapsedHours = elapsed / (1000 * 60 * 60);
  
  return {
    checkInTime: timerData.checkInTime,
    elapsedHours: Math.round(elapsedHours * 100) / 100,
    remainingMs: timerData.remaining,
    isActive: timerData.active
  };
};