
import {CameraControlsProps}from "@/lib/types/camera"
export default function CameraControls({
  cameraActive,
  attendanceMarked,
  isProcessing,
  error,
  exhaustedAttempts,
  attemptsRemaining,
  multipleFaces,
  onStartCamera,
  onCaptureAndDetect,
  onRetry
}: CameraControlsProps) {
  return (
    <div className="space-y-3">
      {!cameraActive && !attendanceMarked && (
        <button
          onClick={onStartCamera}
          disabled={isProcessing}
          className="w-full bg-[#2563EB] hover:bg-blue-700 disabled:bg-gray-400 text-white py-2.5 sm:py-3 px-4 sm:px-6 rounded-xl font-medium text-sm sm:text-base transition-colors cursor-pointer disabled:cursor-not-allowed"
        >
          {isProcessing ? "Starting Camera..." : "Start Camera"}
        </button>
      )}
      
      {cameraActive && !attendanceMarked && (
        <button
          onClick={onCaptureAndDetect}
          disabled={isProcessing}
          className="w-full bg-[#2563EB] hover:bg-blue-700 disabled:bg-gray-400 text-white py-2.5 sm:py-3 px-4 sm:px-6 rounded-xl font-medium text-sm sm:text-base transition-colors cursor-pointer disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isProcessing && (
            <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          )}
          {isProcessing ? "Processing..." : "Capture & Detect Face"}
        </button>
      )}
      
      {(error || multipleFaces) && !exhaustedAttempts && (
        <button
          onClick={onRetry}
          className="w-full bg-[#2563EB] hover:bg-blue-700 text-white py-2.5 sm:py-3 px-4 sm:px-6 rounded-xl font-medium text-sm sm:text-base transition-colors cursor-pointer"
        >
          Retry
        </button>
      )}

      {error && !exhaustedAttempts && !multipleFaces && (
        <div className="mt-3 sm:mt-4 text-center">
          <p className="text-xs sm:text-sm text-[#666]">
            Attempts remaining: {attemptsRemaining}
          </p>
        </div>
      )}
    </div>
  );
}