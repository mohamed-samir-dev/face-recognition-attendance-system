'use client';

import Image from 'next/image';
import { Edit, Trash2 } from 'lucide-react';
import { User } from '@/lib/types';

interface UserCardsProps {
  users: User[];
  deleting: string | null;
  onEdit: (userId: string) => void;
  onDelete: (user: User) => void;
  getStatusColor: (status?: string) => string;
  getStatusText: (status?: string) => string;
}

export default function UserCards({ users, deleting, onEdit, onDelete, getStatusColor, getStatusText }: UserCardsProps) {
  if (users.length === 0) {
    return (
      <div className="lg:hidden">
        <div className="text-center py-8 text-gray-500">
          No users found matching the current filter.
        </div>
      </div>
    );
  }

  return (
    <div className="lg:hidden space-y-4">
      {users.map((user) => (
        <div key={user.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              <Image
                src={user.image}
                alt={user.name}
                width={40}
                height={40}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <h3 className="font-medium text-gray-900">{user.name}</h3>
                <p className="text-sm text-gray-500">{user.jobTitle || "Employee"}</p>
              </div>
            </div>
            <span
              className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                user.status
              )}`}
            >
              {getStatusText(user.status)}
            </span>
          </div>
          
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Contact:</span>
              <span className="text-gray-900">{user.email || "No contact"}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Department:</span>
              <span className="text-gray-900">{user.Department || user.department || "Not Assigned"}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Job Title:</span>
              <span className="text-gray-900">{user.jobTitle || "Not Assigned"}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Salary:</span>
              <span className="text-gray-900 font-semibold">${user.salary?.toLocaleString() || "Not Set"}</span>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <button 
              onClick={() => onEdit(user.id)}
              className="flex-1 text-blue-600 hover:text-blue-900 hover:bg-blue-50 px-3 py-2 rounded-lg flex items-center justify-center space-x-1 transition-all duration-200 cursor-pointer"
            >
              <Edit className="w-4 h-4" />
              <span>Edit</span>
            </button>
            <button 
              onClick={() => onDelete(user)}
              disabled={deleting === user.id}
              className="flex-1 text-red-600 hover:text-red-900 hover:bg-red-50 px-3 py-2 rounded-lg flex items-center justify-center space-x-1 disabled:opacity-50 transition-all duration-200 cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
              <span>{deleting === user.id ? "Deleting..." : "Delete"}</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}