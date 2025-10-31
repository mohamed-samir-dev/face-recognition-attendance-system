'use client';

import { Building, Users } from 'lucide-react';
import { User, Department } from '@/lib/types';

interface DepartmentListProps {
  departments: Department[];
  users: User[];
  searchQuery: string;
  onRemoveUser: (userId: string) => void;
}

export default function DepartmentList({ departments, users, searchQuery, onRemoveUser }: DepartmentListProps) {
  const getUsersByDepartment = (deptName: string) => {
    return users.filter(user => user.department === deptName || user.Department === deptName);
  };

  if (departments.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <Building className="w-12 h-12 mx-auto mb-3 text-gray-300" />
        <p>No departments created yet</p>
        <p className="text-sm">Create departments first to assign users</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {departments.map(dept => {
        const deptUsers = getUsersByDepartment(dept.name).filter(user =>
          user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.username.toLowerCase().includes(searchQuery.toLowerCase())
        );

        if (searchQuery && deptUsers.length === 0) return null;

        return (
          <div key={dept.id} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Building className="w-5 h-5 text-blue-600" />
                <div>
                  <h4 className="font-medium text-gray-900">{dept.name}</h4>
                  <p className="text-sm text-gray-600">Head: {dept.head}</p>
                </div>
              </div>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                {deptUsers.length} employees
              </span>
            </div>

            {deptUsers.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {deptUsers.map(user => (
                  <div key={user.id} className="bg-gray-50 p-3 rounded border">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">{user.name}</p>
                        <p className="text-sm text-gray-600">@{user.username}</p>
                        {user.jobTitle && (
                          <p className="text-xs text-gray-500">{user.jobTitle}</p>
                        )}
                      </div>
                      <button
                        onClick={() => onRemoveUser(user.id)}
                        className="text-red-600 hover:bg-red-100 p-1 rounded transition-colors"
                        title="Remove from department"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-gray-500">
                <Users className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                <p className="text-sm">No employees assigned to this department</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}