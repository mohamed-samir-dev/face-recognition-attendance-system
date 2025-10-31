"use client";

import { forwardRef } from "react";
import Image from "next/image";
import {
  AlertTriangle,
  CheckCircle2,
  Loader2,
  Users,
  ScanFace,
} from "lucide-react";

import { CameraPreviewProps } from "@/lib/types/camera";

const CameraPreview = forwardRef<HTMLVideoElement, CameraPreviewProps>(
  (
    {
      cameraActive,
      isProcessing,
      attendanceMarked,
      recognizedUser,
      error,
      exhaustedAttempts,
      multipleFaces,
    },
    ref
  ) => {
    return (
      <div className="bg-gray-100 rounded-xl h-64 sm:h-80 lg:h-96 relative overflow-hidden">
        <video
          ref={ref}
          autoPlay
          playsInline
          muted
          className={`w-full h-full object-cover rounded-xl ${
            !cameraActive ? "hidden" : ""
          }`}
        />

        {!cameraActive && !attendanceMarked && !isProcessing && !error && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <ScanFace className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-[#1A1A1A] mb-2">
                Camera Ready
              </h3>
              <p className="text-xs sm:text-sm text-[#555]">
                Click Start Camera to begin.
              </p>
            </div>
          </div>
        )}

        {error && !exhaustedAttempts && !multipleFaces && (
          <div className="absolute inset-0 flex items-center justify-center backdrop-blur-sm bg-gray-100/80">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <AlertTriangle className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-[#1A1A1A] mb-2">
                Face Not Recognized
              </h3>
              <p className="text-xs sm:text-sm text-[#555]">
                Please try again.
              </p>
            </div>
          </div>
        )}

        {multipleFaces && (
          <div className="absolute inset-0 flex items-center justify-center backdrop-blur-sm bg-orange-50/90">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Users className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-[#1A1A1A] mb-2">
                Multiple Faces Detected
              </h3>
              <p className="text-xs sm:text-sm text-[#555] px-4">
                Only one person is allowed. Please ensure you are alone in the
                frame.
              </p>
            </div>
          </div>
        )}

        {exhaustedAttempts && (
          <div className="absolute inset-0 flex items-center justify-center backdrop-blur-sm bg-red-50/90">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <AlertTriangle className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-[#1A1A1A] mb-2">
                Attempts Exhausted
              </h3>
              <p className="text-xs sm:text-sm text-[#555] mb-4 px-4">
                You have exhausted the number of attempts.
              </p>
              <p className="text-xs sm:text-sm text-[#555]">
                Please log in again.
              </p>
              <div className="flex items-center justify-center space-x-2 mt-4">
                <Loader2 className="w-4 h-4 text-blue-600 animate-spin" />
                <span className="text-blue-600 text-sm font-medium">
                  Redirecting...
                </span>
              </div>
            </div>
          </div>
        )}

        {isProcessing && !attendanceMarked && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
            <div className="text-center text-white">
              <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2" />
              <p className="text-xs sm:text-sm font-medium">
                {cameraActive ? "Processing..." : "Starting Camera..."}
              </p>
            </div>
          </div>
        )}

        {attendanceMarked && recognizedUser && (
          <div className="absolute inset-0 flex items-center justify-center bg-green-50">
            <div className="text-center p-4">
              <div className="w-14 h-14 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center mx-auto mt-2">
                <CheckCircle2 className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-[#1A1A1A] mb-2">
                Welcome, {recognizedUser.name}!
              </h3>
              <div className="bg-white text-left rounded-lg p-4 mb-4 shadow-sm min-w-[400px] max-w-[700px] mx-auto">
                <div className="flex items-center justify-center mb-3">
                  {recognizedUser.image && (
                    <Image 
                      src={recognizedUser.image} 
                      alt={recognizedUser.name}
                      width={60}
                      height={60}
                      className="w-15 h-15 rounded-full object-cover ring-2 ring-blue-200"
                    />
                  )}
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-600">Name:</span>
                    <span className="text-sm font-semibold text-gray-800">{recognizedUser.name}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-600">Username:</span>
                    <span className="text-sm font-semibold text-blue-700">@{recognizedUser.username}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-600">ID:</span>
                    <span className="text-sm font-semibold text-green-700">{recognizedUser.numericId}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-600">Department:</span>
                    <span className="text-sm font-semibold text-purple-700">{recognizedUser.department || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-600">Position:</span>
                    <span className="text-sm font-semibold text-orange-700">{recognizedUser.jobTitle || 'N/A'}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Loader2 className="w-4 h-4 text-blue-600 animate-spin" />
                <span className="text-blue-600 text-sm font-medium">
                  Redirecting to dashboard...
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
);

CameraPreview.displayName = "CameraPreview";

export default CameraPreview;
