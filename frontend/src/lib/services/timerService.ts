import { doc, setDoc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/config";

export interface TimerData {
  userId: string;
  startTime: number;
  remaining: number;
  active: boolean;
  totalHours: number;
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
  const eightHours = 8*60* 60 * 1000;
  const timerData: TimerData = {
    userId,
    startTime: Date.now(),
    remaining: eightHours,
    active: true,
    totalHours: 0
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
  if (!timerData) return;

  await updateDoc(doc(db, "timers", userId), {
    active: false,
    totalHours: timerData.totalHours + 8,
    remaining: 0
  });
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
    totalHours: 0
  });
};