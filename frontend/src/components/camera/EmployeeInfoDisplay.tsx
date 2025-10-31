"use client";
import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

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

interface EmployeeInfoDisplayProps {
  employee: Employee;
}

export default function EmployeeInfoDisplay({ employee }: EmployeeInfoDisplayProps) {
  const hasShownToast = useRef(false);
  const router = useRouter();

  useEffect(() => {
    if (hasShownToast.current) return;
    hasShownToast.current = true;
    
    toast.success(
      <div className="flex items-center space-x-3">
        <div className="flex-shrink-0">
          <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
        <div>
          <p className="font-semibold text-gray-900">Welcome, {employee.name}!</p>
          <p className="text-sm text-gray-600">Attendance marked successfully</p>
        </div>
      </div>,
      {
        duration: 3000,
        position: 'top-center',
        style: {
          background: '#fff',
          color: '#333',
          padding: '16px',
          borderRadius: '12px',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e5e7eb',
        },
      }
    );

    setTimeout(() => router.push('/userData'), 3500);
  }, [employee, router]);

  return null;
}