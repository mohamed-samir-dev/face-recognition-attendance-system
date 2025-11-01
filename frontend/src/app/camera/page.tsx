"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/auth/useAuth";
import { checkDailyAttendance } from "@/lib/services/dailyAttendanceService";
import CameraLayout from "@/components/camera/layouts/CameraLayout";
import CameraContainer from "@/components/camera/views/CameraView";

export default function CameraPage() {
  const { user, mounted } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (mounted && !user) {
      router.push("/login");
      return;
    }
    
    if (mounted && user) {
      checkDailyAttendance(user.id).then(result => {
        if (result.hasAttendance) {
          router.push("/userData?showAttendanceWarning=true");
        }
      });
    }
  }, [mounted, user, router]);

  if (!mounted || !user) {
    return null;
  }

  return (
    <CameraLayout user={user}>
      <CameraContainer />
    </CameraLayout>
  );
}