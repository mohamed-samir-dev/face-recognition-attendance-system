'use client';

import { ArrowRight } from 'lucide-react';
import { User, Department } from '@/lib/types';

interface AssignmentFormProps {
  users: User[];
  departments: Department[];
  selectedUser: User | null;
  selectedDepartment: string;
  onUserSelect: (user: User | null) => void;
  onDepartmentSelect: (dept: string) => void;
  onAssign: () => void;
}

export default function AssignmentForm({
  users,
  departments,
  selectedUser,
  selectedDepartment,
  onUserSelect,
  onDepartmentSelect,
  onAssign
}: AssignmentFormProps) {
  const unassignedUsers = users.filter(user => !user.department && !user.Department);

  return (
    <div className="mb-6 p-4 bg-gray-50 rounded-lg border">
      <h4 className="font-medium text-gray-900 mb-4">Assign User to Department</h4>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Select User</label>
          <select
            value={selectedUser?.id || ''}
            onChange={(e) => {
              const user = users.find(u => u.id === e.target.value);
              onUserSelect(user || null);
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          >
            <option value="">Choose a user</option>
            {unassignedUsers.map(user => (
              <option key={user.id} value={user.id}>
                {user.name} ({user.username})
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Select Department</label>
          <select
            value={selectedDepartment}
            onChange={(e) => onDepartmentSelect(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          >
            <option value="">Choose a department</option>
            {departments.map(dept => (
              <option key={dept.id} value={dept.name}>
                {dept.name}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={onAssign}
          disabled={!selectedUser || !selectedDepartment}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
        >
          <ArrowRight className="w-4 h-4" />
          Assign
        </button>
      </div>
    </div>
  );
}