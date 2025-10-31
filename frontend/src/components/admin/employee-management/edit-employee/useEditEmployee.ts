"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getUsers, updateUser } from "@/lib/services/userService";
import { User as UserType } from "@/lib/types";
import { FormData } from "@/lib/types/addemployee";

export function useEditEmployee() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get("id");

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    department: "",
    jobTitle: "",
    salary: "",
    image: "",
  });
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [employee, setEmployee] = useState<UserType | null>(null);
  const [updating, setUpdating] = useState(false);
  const [photoMessage, setPhotoMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [hasNewPhoto, setHasNewPhoto] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);

  useEffect(() => {
    const fetchEmployee = async () => {
      if (!userId) return;

      try {
        const users = await getUsers();
        const emp = users.find((u) => u.id === userId);
        if (emp) {
          setEmployee(emp);
          setFormData({
            name: emp.name,
            email: emp.email || "",
            department: emp.department || emp.Department || "",
            jobTitle: emp.jobTitle || "",
            salary: emp.salary?.toString() || "",
            image: emp.image || "",
          });
        }
      } catch (error) {
        console.error("Error fetching employee:", error);
      }
    };

    fetchEmployee();
  }, [userId]);

  const compressImage = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d")!;
      const img = new Image();

      img.onload = () => {
        const maxWidth = 400;
        const maxHeight = 400;
        let { width, height } = img;

        if (width > height) {
          if (width > maxWidth) {
            height = (height * maxWidth) / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = (width * maxHeight) / height;
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", 0.7));
      };

      const reader = new FileReader();
      reader.onload = (e) => {
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    });
  };

  const handleResetPhoto = async () => {
    if (!userId || !employee) return;

    try {
      await updateUser(userId, { image: employee.image });
      setFormData({ ...formData, image: employee.image || "" });
      setHasNewPhoto(false);
      setPhotoMessage(null);
    } catch (error) {
      console.error("Error resetting photo:", error);
      setPhotoMessage({
        type: "error",
        text: "Failed to reset photo. Please try again.",
      });
    }
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !userId) return;

    setUpdating(true);
    setPhotoMessage(null);
    try {
      const compressedImage = await compressImage(file);
      await updateUser(userId, { image: compressedImage });
      setFormData({ ...formData, image: compressedImage });
      setHasNewPhoto(true);
      setPhotoMessage({
        type: "success",
        text: "Facial recognition photo updated successfully!",
      });
    } catch (error) {
      console.error("Error updating facial data:", error);
      setPhotoMessage({
        type: "error",
        text: "Failed to update facial recognition photo. Please try again.",
      });
    } finally {
      setUpdating(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) return;

    setLoading(true);
    try {
      await updateUser(userId, {
        name: formData.name,
        email: formData.email,
        department: formData.department,
        jobTitle: formData.jobTitle,
        salary: parseInt(formData.salary),
        image: formData.image,
      });

      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        router.push("/admin");
      }, 2000);
    } catch (error) {
      console.error("Error updating employee:", error);
      alert("Error updating employee. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    setFormData,
    loading,
    showSuccess,
    employee,
    updating,
    photoMessage,
    hasNewPhoto,
    showResetModal,
    setShowResetModal,
    handleResetPhoto,
    handlePhotoUpload,
    handleSubmit,
    router,
  };
}
