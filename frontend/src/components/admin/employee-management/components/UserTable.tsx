'use client';

import Image from 'next/image';
import { Edit, Trash2 } from 'lucide-react';
import { User } from '@/lib/types';

interface UserTableProps {
  users: User[];
  deleting: string | null;
  onEdit: (userId: string) => void;
  onDelete: (user: User) => void;
  getStatusColor: (status?: string) => string;
  getStatusText: (status?: string) => string;
}

export default function UserTable({ users, deleting, onEdit, onDelete, getStatusColor, getStatusText }: UserTableProps) {
  if (users.length === 0) {
    return (
      <div className="hidden lg:block bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="text-center py-8 text-gray-500">
          No users found matching the current filter.
        </div>
      </div>
    );
  }

  return (
    <div className="hidden lg:block bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Contact
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Department
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Job Title
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Salary
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <Image
                    src={user.image}
                    alt={user.name}
                    width={32}
                    height={32}
                    className="w-8 h-8 rounded-full mr-3"
                  />
                  <div className="text-sm font-medium text-gray-900">
                    {user.name}
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {user.email || "No contact"}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {user.Department || user.department || "Not Assigned"}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {user.jobTitle || "Not Assigned"}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">
                ${user.salary?.toLocaleString() || "Not Set"}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                    user.status
                  )}`}
                >
                  {getStatusText(user.status)}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div className="flex space-x-2">
                  <button 
                    onClick={() => onEdit(user.id)}
                    className="text-blue-600 hover:text-blue-900 hover:bg-blue-50 px-2 py-1 rounded-lg flex items-center space-x-1 transition-all duration-200 cursor-pointer"
                  >
                    <Edit className="w-4 h-4" />
                    <span>Edit</span>
                  </button>
                  <button 
                    onClick={() => onDelete(user)}
                    disabled={deleting === user.id}
                    className="text-red-600 hover:text-red-900 hover:bg-red-50 px-2 py-1 rounded-lg flex items-center space-x-1 disabled:opacity-50 transition-all duration-200 cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>{deleting === user.id ? "Deleting..." : "Delete"}</span>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}