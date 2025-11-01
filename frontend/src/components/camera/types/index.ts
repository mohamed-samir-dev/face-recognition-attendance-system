// Camera Types
export interface CameraState {
  isActive: boolean;
  isRecording: boolean;
  hasPermission: boolean;
  error?: string;
}

export interface RecognitionResult {
  employeeId?: string;
  employeeName?: string;
  confidence: number;
  timestamp: Date;
  success: boolean;
}

export interface CameraSettings {
  width: number;
  height: number;
  facingMode: 'user' | 'environment';
  frameRate: number;
}