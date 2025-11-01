"use client";

import { useEffect } from 'react';
import { statusScheduler } from '@/lib/services/statusScheduler';

export default function StatusScheduler() {
  useEffect(() => {
    statusScheduler.start();
    
    return () => {
      statusScheduler.stop();
    };
  }, []);

  return null;
}