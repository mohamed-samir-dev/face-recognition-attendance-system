import { User } from "./user";

export interface CameraControlsProps {
  cameraActive: boolean;
  attendanceMarked: boolean;
  isProcessing: boolean;
  error: string;
  exhaustedAttempts: boolean;
  attemptsRemaining: number;
  multipleFaces: boolean;
  onStartCamera: () => void;
  onCaptureAndDetect: () => void;
  onRetry: () => void;
}

export interface CameraPreviewProps {
  cameraActive: boolean;
  isProcessing: boolean;
  attendanceMarked: boolean;
  recognizedUser?: User | null;
  error: string;
  exhaustedAttempts: boolean;
  attemptsRemaining: number;
  multipleFaces: boolean;
}

export interface CameraLayoutProps {
  user: User;
  children: React.ReactNode;
}
