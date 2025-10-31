import { useState } from "react";
import { useRouter } from "next/navigation";
import { detectFace } from "@/utils/faceDetection";
import { compareWithSpecificUser } from "@/lib/services/photoComparisonService";
import { updateUserSession } from "@/lib/services/sessionService";
import { User } from "@/lib/types";
import { useAuth } from "@/hooks/useAuth";

interface Employee {
  id: string;
  name: string;
  email: string;
  department: string;
  position: string;
  username?: string;
  numericId?: number;
  password?: string;
  photoUrl?: string;
  phone?: string;
  address?: string;
  salary?: number;
  hireDate?: string;
}

export function useAttendance() {
  const [attendanceMarked, setAttendanceMarked] = useState(false);
  const [recognizedUser, setRecognizedUser] = useState<User | null>(null);
  const [recognizedEmployee, setRecognizedEmployee] = useState<Employee | null>(null);
  const [error, setError] = useState("");
  const [attemptsRemaining, setAttemptsRemaining] = useState<number>(3);
  const [exhaustedAttempts, setExhaustedAttempts] = useState<boolean>(false);
  const [multipleFaces, setMultipleFaces] = useState(false);
  const [detecting, setDetecting] = useState(false);
  const { user } = useAuth();
  const router = useRouter();

  const processAttendance = async (imageData: string, stopCamera: () => void) => {
    try {
      setDetecting(true);
      setError("");
      setMultipleFaces(false);
      
      // First check if there's exactly one face
      const faceDetectionResult = await detectFace(imageData);
      
      if (faceDetectionResult.error_type === 'multiple_faces') {
        setMultipleFaces(true);
        return;
      }
      
      if (!faceDetectionResult.success || !faceDetectionResult.face_detected) {
        const newAttempts = attemptsRemaining - 1;
        setAttemptsRemaining(newAttempts);
        
        if (newAttempts === 0) {
          setExhaustedAttempts(true);
          stopCamera();
          setTimeout(() => {
            router.push("/login");
          }, 3000);
        } else {
          setError("No face detected. Please position your face clearly in the frame.");
        }
        return;
      }
      
      // Get current user ID from session/page
      const currentUser = recognizedUser || user;
      if (!currentUser?.numericId) {
        setError("User ID not found. Please login again.");
        return;
      }
      
      // Compare captured image with current user's photo in Firebase
      const matchedUser = await compareWithSpecificUser(imageData, currentUser.numericId);
      
      if (matchedUser) {
        // Show real user data from Firebase
        setRecognizedEmployee({
          id: matchedUser.id,
          name: matchedUser.name, // Real name from Firebase
          email: matchedUser.email || "",
          department: matchedUser.department || matchedUser.Department || "",
          position: matchedUser.jobTitle || "",
          username: matchedUser.username,
          numericId: matchedUser.numericId,
          password: matchedUser.password
        });
        
        setRecognizedUser(matchedUser);
        setAttendanceMarked(true);
        stopCamera();
        
        await updateUserSession(matchedUser.id);
        
        if (typeof window !== "undefined") {
          const currentHours = parseInt(localStorage.getItem("totalHoursWorked") || "0");
          localStorage.setItem("totalHoursWorked", (currentHours + 1).toString());
          
          const attendanceTime = new Date().toISOString();
          localStorage.setItem("lastAttendance", attendanceTime);
          
          localStorage.setItem("recognizedEmployee", JSON.stringify(matchedUser));
        }

        // Verification successful - result is pinned, no redirect
      } else {
        // Try face recognition API to get the detected person's name
        try {
          const response = await fetch("http://localhost:5001/recognize", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ image: imageData })
          });
          
          if (response.ok) {
            // const result = await response.json();
            // const detectedName = result.name || "Unknown Person";
            const expectedName = currentUser.name || currentUser.username || "Expected User";
            
            setRecognizedEmployee({
              id: "unauthorized",
              name: `I expected ${expectedName}, but he didn't appeared`,
              email: "",
              department: "",
              position: ""
            });
          } else {
            setRecognizedEmployee({
              id: "unknown",
              name: "Unknown Person",
              email: "",
              department: "",
              position: ""
            });
          }
        } catch (error) {
          setRecognizedEmployee({
            id: "unknown",
            name: "Unknown Person",
            email: "",
            department: "",
            position: ""
          });
        }
        
        const newAttempts = attemptsRemaining - 1;
        setAttemptsRemaining(newAttempts);
        
        if (newAttempts === 0) {
          setExhaustedAttempts(true);
          stopCamera();
          setTimeout(() => {
            router.push("/login");
          }, 3000);
        } else {
          setError("Identity verification failed. This person is not authorized to access the system.");
        }
      }
    } catch (error) {
      console.error("Face recognition error:", error);
      if (error instanceof Error && error.message.includes('Failed to fetch')) {
        setError("Connection error. Please ensure both Python servers are running:\n- Face detection: localhost:5000\n- Face recognition: localhost:5001");
      } else {
        setError("Face recognition failed. Please try again.");
      }
    } finally {
      setDetecting(false);
    }
  };

  const resetState = () => {
    setError("");
    setMultipleFaces(false);
    setAttendanceMarked(false);
    setRecognizedUser(null);
    setRecognizedEmployee(null);
  };

  return {
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
  };
}