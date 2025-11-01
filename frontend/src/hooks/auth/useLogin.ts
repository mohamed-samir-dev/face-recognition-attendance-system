import { useState } from "react";
import { useRouter } from "next/navigation";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { LoginFormData } from "@/lib/types";
import { updateUserSession } from "@/lib/services/sessionService";

export function useLogin() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [faceLoading, setFaceLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (formData: LoginFormData) => {
    setError("");
    setLoading(true);

    try {
      const q = query(
        collection(db, "users"),
        where("username", "==", formData.email),
        where("password", "==", formData.password)
      );

      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        const userData = snapshot.docs[0].data();
        const userId = snapshot.docs[0].id;
        const currentTime = new Date().getTime();

        // Update user session in Firebase
        await updateUserSession(userId);

        if (typeof window !== "undefined") {
          sessionStorage.setItem("attendanceUser", JSON.stringify(userData));
          sessionStorage.setItem("sessionTime", currentTime.toString());
        }
        
        router.push("/userData");
      } else {
        setError("Invalid username or password");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred during login");
    } finally {
      setLoading(false);
    }
  };

  const handleFacialRecognition = () => {
    setFaceLoading(true);
    router.push("/camera");
  };

  const handleClearSession = () => {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("attendanceUser");
      sessionStorage.removeItem("sessionTime");
      localStorage.removeItem("showUserData");
      localStorage.removeItem("totalHoursWorked");
    }
    window.location.reload();
  };

  return {
    error,
    loading,
    faceLoading,
    handleLogin,
    handleFacialRecognition,
    handleClearSession
  };
}