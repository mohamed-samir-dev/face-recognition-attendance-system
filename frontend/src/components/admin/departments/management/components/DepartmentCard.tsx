'use client';

import { Department } from '@/lib/types';
import DepartmentInfo from './DepartmentInfo';
import DepartmentActions from './DepartmentActions';

interface DepartmentCardProps {
  department: Department;
  onEdit: (dept: Department) => void;
  onDelete: (dept: Department) => void;
}

export default function DepartmentCard({ department, onEdit, onDelete }: DepartmentCardProps) {
  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <DepartmentInfo department={department} />
        <DepartmentActions 
          department={department}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </div>
    </div>
  );
}