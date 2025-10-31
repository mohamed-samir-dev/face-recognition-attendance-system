'use client';

import { Edit, Trash2, Users, MapPin, DollarSign, Building } from 'lucide-react';
import { Department } from '@/lib/types';

interface DepartmentListProps {
  departments: Department[];
  onEdit: (dept: Department) => void;
  onDelete: (dept: Department) => void;
}

export default function DepartmentList({ departments, onEdit, onDelete }: DepartmentListProps) {
  if (departments.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <Building className="w-12 h-12 mx-auto mb-3 text-gray-300" />
        <p>No departments created yet</p>
        <p className="text-sm">Click &quot;Add Department&quot; to get started</p>
        </div>
    );
  }

  return (
    <div className="space-y-4">
      {departments.map((dept) => (
        <div
          key={dept.id}
          className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h4 className="text-lg font-semibold text-gray-900">
                  {dept.name}
                </h4>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                  Active
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>Head: {dept.head}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>Employees: {dept.employeeCount || 0}</span>
                </div>
                {dept.location && (
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{dept.location}</span>
                  </div>
                )}
                {dept.budget && (
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    <span>${dept.budget.toLocaleString()}</span>
                  </div>
                )}
              </div>

              {dept.description && (
                <p className="text-sm text-gray-600 mt-2">
                  {dept.description}
                </p>
              )}
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => onEdit(dept)}
                className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                title="Edit Department"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                onClick={() => onDelete(dept)}
                className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                title="Delete Department"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}