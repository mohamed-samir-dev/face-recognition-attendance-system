import { useState } from "react";
import { useRouter } from "next/navigation";
import { detectFace } from "@/utils/faceDetection";
import { compareWithSpecificUser } from "@/lib/services/photoComparisonService";
import { updateUserSession } from "@/lib/services/sessionService";
import { checkDailyAttendance, recordDailyAttendance } from "@/lib/services/dailyAttendanceService";
import { User } from "@/lib/types";
import { useAuth } from "@/hooks/auth/useAuth";
import { useWorkTimer } from "@/hooks/attendance/useWorkTimer";

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
  const [showAlreadyTakenModal, setShowAlreadyTakenModal] = useState(false);

  const { user } = useAuth();
  const { startTimer } = useWorkTimer(user?.id);
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
      
      // Get current user ID from session - only the logged-in user can mark attendance
      const currentUser = user; // Only use the authenticated user, not any recognized user
      if (!currentUser?.numericId) {
        setError("User session not found. Please login again.");
        return;
      }
      
      console.log(`SECURITY: Attendance restricted to logged-in user: ${currentUser.name} (ID: ${currentUser.numericId})`);
      
      // SECURITY: Compare captured image with ONLY the logged-in user's photo in Firebase
      // This ensures no other user's image from Firebase can be used for comparison
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
        
        // Record attendance in Firebase
        const attendanceResult = await recordDailyAttendance(matchedUser.id, matchedUser.name);
        
        // Store late status for dashboard notification
        if (attendanceResult.isLate) {
          localStorage.setItem('showLateToast', 'true');
        }
        
        await updateUserSession(matchedUser.id);
        await startTimer();
        
        if (typeof window !== "undefined") {
          const currentHours = parseInt(localStorage.getItem("totalHoursWorked") || "0");
          localStorage.setItem("totalHoursWorked", (currentHours + 1).toString());
          
          const attendanceTime = new Date().toISOString();
          localStorage.setItem("lastAttendance", attendanceTime);
          
          localStorage.setItem("recognizedEmployee", JSON.stringify(matchedUser));
        }

        // Verification successful - result is pinned, no redirect
      } else {
        // Access denied - only the logged-in user can mark attendance
        const expectedName = currentUser.name || currentUser.username || "Expected User";
        setRecognizedEmployee({
          id: "unauthorized",
          name: `Access Denied - Account Holder Only`,
          email: "",
          department: "",
          position: ""
        });
        
        const newAttempts = attemptsRemaining - 1;
        setAttemptsRemaining(newAttempts);
        
        console.log(`Unauthorized attendance attempt. Expected: ${expectedName}, but face did not match.`);
        
        if (newAttempts === 0) {
          setExhaustedAttempts(true);
          stopCamera();
          setTimeout(() => {
            router.push("/login");
          }, 3000);
        } else {
          setError(`Only ${expectedName} can mark attendance on this account. Please ensure the correct person is using this session.`);
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
    showAlreadyTakenModal,
    setShowAlreadyTakenModal,
    processAttendance,
    resetState,
    setError
  };
}