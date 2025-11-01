"use client";

import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/auth/useAuth';
import { getTimerInfo, getTimerData } from '@/lib/services/timerService';
import { getCompanySettings } from '@/lib/services/settingsService';

export default function TimerDetails() {
  const { user } = useAuth();
  const [timerInfo, setTimerInfo] = useState<any>(null);
  const [workingHours, setWorkingHours] = useState<any>(null);

  useEffect(() => {
    if (!user?.id) return;

    const fetchTimerInfo = async () => {
      try {
        const [info, settings] = await Promise.all([
          getTimerInfo(user.id),
          getCompanySettings()
        ]);
        
        setTimerInfo(info);
        setWorkingHours(settings.workingHours);
      } catch (error) {
        console.error('Error fetching timer info:', error);
      }
    };

    fetchTimerInfo();
    const interval = setInterval(fetchTimerInfo, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, [user?.id]);

  if (!timerInfo || !workingHours) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4">
        <h4 className="font-semibold text-gray-700 mb-2">Timer Details</h4>
        <p className="text-sm text-gray-500">No active timer</p>
      </div>
    );
  }

  const calculateExpectedEndTime = () => {
    if (!timerInfo.checkInTime || !workingHours.endTime) return 'N/A';
    
    const today = new Date().toDateString();
    const endTime = new Date(`${today} ${workingHours.endTime}:00`);
    return endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4">
      <h4 className="font-semibold text-gray-700 mb-3">Timer Details</h4>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Check-in Time:</span>
          <span className="font-medium">{timerInfo.checkInTime}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Expected End:</span>
          <span className="font-medium">{calculateExpectedEndTime()}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Hours Worked:</span>
          <span className="font-medium">{timerInfo.elapsedHours}h</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Status:</span>
          <span className={`font-medium ${timerInfo.isActive ? 'text-green-600' : 'text-gray-500'}`}>
            {timerInfo.isActive ? 'Active' : 'Inactive'}
          </span>
        </div>
        <div className="pt-2 border-t border-gray-100">
          <div className="flex justify-between">
            <span className="text-gray-600">Working Hours:</span>
            <span className="font-medium">{workingHours.startTime} - {workingHours.endTime}</span>
          </div>
        </div>
      </div>
    </div>
  );
}