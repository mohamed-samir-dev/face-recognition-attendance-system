'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createUserWithId } from '@/lib/services/userService';
import {FormData} from "@/lib/types/addemployee"



export function useAddEmployee() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [photoError, setPhotoError] = useState('');
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    department: '',
    jobTitle: '',
    salary: '',
    image: '',
  });
  const [imageOption, setImageOption] = useState('upload');

  const compressImage = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return resolve('');
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
        resolve(canvas.toDataURL('image/jpeg', 0.7));
      };
      
      img.src = URL.createObjectURL(file);
    });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const compressedImage = await compressImage(file);
      setFormData({ ...formData, image: compressedImage });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.image) {
      setPhotoError('Employee photo is required to complete registration');
      return;
    }
    
    setPhotoError('');
    setLoading(true);

    try {
      const username = formData.name.toLowerCase().replace(/\s+/g, '');
      const password = Math.random().toString(36).substring(2, 8);

      await createUserWithId({
        name: formData.name,
        username,
        email: formData.email,
        department: formData.department,
        jobTitle: formData.jobTitle,
        salary: parseInt(formData.salary),
        image: formData.image,
        password,
        status: 'Active',
      });

      try {
        await fetch('/api/send-credentials', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            username,
            password,
          }),
        });
      } catch (emailError) {
        console.error('Error sending email:', emailError);
      }

      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        router.push('/admin');
      }, 2000);
    } catch (error) {
      console.error('Error adding employee:', error);
      alert('Error adding employee. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    showSuccess,
    photoError,
    formData,
    setFormData,
    imageOption,
    setImageOption,
    handleFileUpload,
    handleSubmit,
    router
  };
}