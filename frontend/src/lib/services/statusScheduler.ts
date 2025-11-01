import { checkAndUpdateEmployeeStatuses } from './leaveService';

class StatusScheduler {
  private intervalId: NodeJS.Timeout | null = null;
  private isRunning = false;

  start() {
    if (this.isRunning) return;
    
    this.isRunning = true;
    // Check immediately on start
    this.checkStatuses();
    
    // Then check every hour
    this.intervalId = setInterval(() => {
      this.checkStatuses();
    }, 60 * 60 * 1000); // 1 hour
    
    console.log('Employee status scheduler started');
  }

  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.isRunning = false;
    console.log('Employee status scheduler stopped');
  }

  private async checkStatuses() {
    try {
      await checkAndUpdateEmployeeStatuses();
    } catch (error) {
      console.error('Error in status scheduler:', error);
    }
  }
}

export const statusScheduler = new StatusScheduler();