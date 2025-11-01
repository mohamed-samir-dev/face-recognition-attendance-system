"use client";

import { useCamera } from "@/hooks/attendance/useCamera";
import { useAttendance } from "@/hooks/attendance/useAttendance";
import CameraPreview from "../components/CameraPreview";
import CameraControls from "../components/CameraControls";
import EmployeeInfoDisplay from "../components/EmployeeInfoDisplay";
import Card from "@/components/common/cards/Card";

export default function CameraContainer() {
  const { cameraActive, isProcessing, videoRef, canvasRef, startCamera, stopCamera, captureImage } = useCamera();
  const { 
    attendanceMarked, 
    recognizedUser,
    recognizedEmployee,
    error, 
    attemptsRemaining, 
    exhaustedAttempts, 
    multipleFaces, 
    detecting, 
    processAttendance, 
    resetState, 
    setError 
  } = useAttendance();

  const handleStartCamera = async () => {
    try {
      setError("");
      await startCamera();
    } catch (error) {
      setError((error as Error).message);
    }
  };

  const handleCaptureAndDetect = async () => {
    const imageData = captureImage();
    if (!imageData) {
      setError("Camera not ready. Please start camera first.");
      return;
    }
    await processAttendance(imageData, stopCamera);
  };

  const handleRetry = () => {
    resetState();
    if (cameraActive) {
      stopCamera();
    }
    handleStartCamera();
  };

  return (
    <Card className="w-full  max-w-md sm:max-w-lg lg:max-w-xl">
      <h2 className="text-xl sm:text-2xl font-bold text-[#1A1A1A] text-center mb-2">
        Mark Your Attendance
      </h2>
      
      <p className="text-sm sm:text-base text-[#555] text-center mb-6 sm:mb-8">
        Position your face within the frame for recognition.
      </p>

      <div className="mb-4 sm:mb-6">
        <CameraPreview
          ref={videoRef}
          cameraActive={cameraActive}
          isProcessing={isProcessing}
          attendanceMarked={attendanceMarked}
          recognizedUser={recognizedUser}
          error={error}
          exhaustedAttempts={exhaustedAttempts}
          attemptsRemaining={attemptsRemaining}
          multipleFaces={multipleFaces}
        />
        
        {recognizedEmployee && (
          <div className={`mt-4 p-3 rounded-lg text-center ${
            (recognizedEmployee.id === "unknown" || recognizedEmployee.id === "unauthorized")
              ? "bg-red-50 border border-red-200" 
              : "bg-blue-50 border border-blue-200"
          }`}>
            <p className={`text-lg font-bold ${
              (recognizedEmployee.id === "unknown" || recognizedEmployee.id === "unauthorized")
                ? "text-red-800" 
                : "text-blue-800"
            }`}>
              {recognizedEmployee.name}
            </p>
            {(recognizedEmployee.id === "unknown" || recognizedEmployee.id === "unauthorized") && (
              <p className="text-sm text-red-600 mt-2">
                Access denied - Not authorized for this account
              </p>
            )}
          </div>
        )}
      </div>
      
      {attendanceMarked && recognizedEmployee && recognizedEmployee.id !== "unknown" && recognizedEmployee.id !== "unauthorized" && (
        <EmployeeInfoDisplay key={recognizedEmployee.id} employee={recognizedEmployee} />
      )}
      
      <canvas ref={canvasRef} className="hidden" />

      <CameraControls
        cameraActive={cameraActive}
        attendanceMarked={attendanceMarked}
        isProcessing={isProcessing || detecting}
        error={error}
        exhaustedAttempts={exhaustedAttempts}
        attemptsRemaining={attemptsRemaining}
        multipleFaces={multipleFaces}
        onStartCamera={handleStartCamera}
        onCaptureAndDetect={handleCaptureAndDetect}
        onRetry={handleRetry}
      />
    </Card>
  );
}