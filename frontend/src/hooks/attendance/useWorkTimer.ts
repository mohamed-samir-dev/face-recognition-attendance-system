import { useState, useEffect } from 'react';
import { getTimerData, startWorkTimer, completeTimer, resetTimer } from '@/lib/services/timerService';

export const useWorkTimer = (userId?: string) => {
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const [isActive, setIsActive] = useState(false);
  const [totalHours, setTotalHours] = useState<number>(0);

  useEffect(() => {
    if (!userId) return;

    const loadTimer = async () => {
      const timerData = await getTimerData(userId);
      if (timerData) {
        const elapsed = Date.now() - timerData.startTime;
        const newRemaining = Math.max(0, timerData.remaining - elapsed);
        
        setTimeRemaining(newRemaining);
        setIsActive(timerData.active && newRemaining > 0);
        setTotalHours(timerData.totalHours);
      } else {
        // Check if user has attendance today and auto-start timer
        const today = new Date().toISOString().split('T')[0];
        const { collection, query, where, getDocs } = await import('firebase/firestore');
        const { db } = await import('@/lib/firebase/config');
        
        const attendanceQuery = query(
          collection(db, 'attendance'),
          where('userId', '==', userId),
          where('date', '==', today)
        );
        
        const snapshot = await getDocs(attendanceQuery);
        if (!snapshot.empty) {
          // User has attendance today, start timer
          await startWorkTimer(userId);
          const eightHours = 8 * 60 * 60 * 1000;
          setTimeRemaining(eightHours);
          setIsActive(true);
        }
      }
    };

    loadTimer();
  }, [userId]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isActive && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prev => {
          const newTime = prev - 1000;
          if (newTime <= 0) {
            setIsActive(false);
            completeTimer(userId!).then(async () => {
              const updatedData = await getTimerData(userId!);
              if (updatedData) {
                setTotalHours(updatedData.totalHours);
              }
            });
            return 0;
          }
          return newTime;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, timeRemaining, userId]);

  const startTimer = async () => {
    if (!userId) return;
    
    await startWorkTimer(userId);
    const eightHours = 8 * 60 * 60 * 1000;
    setTimeRemaining(eightHours);
    setIsActive(true);
  };

  const formatTime = (ms: number) => {
    const hours = Math.floor(ms / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((ms % (1000 * 60)) / 1000);
    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const resetTimerData = async () => {
    if (!userId) return;
    await resetTimer(userId);
    setTimeRemaining(0);
    setIsActive(false);
    setTotalHours(0);
  };

  return {
    timeRemaining: formatTime(timeRemaining),
    isActive,
    totalHours,
    startTimer,
    resetTimerData
  };
};