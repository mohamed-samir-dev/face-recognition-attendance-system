"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import CameraLayout from "@/components/camera/CameraLayout";
import CameraContainer from "@/components/camera/CameraContainer";

export default function CameraPage() {
  const { user, mounted } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (mounted && !user) {
      router.push("/login");
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