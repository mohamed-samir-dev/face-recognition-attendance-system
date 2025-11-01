'use client';

import { Department } from '@/lib/types';
import DepartmentCard from './DepartmentCard';
import EmptyDepartmentState from './EmptyDepartmentState';

interface DepartmentListProps {
  departments: Department[];
  onEdit: (dept: Department) => void;
  onDelete: (dept: Department) => void;
}

export default function DepartmentList({ departments, onEdit, onDelete }: DepartmentListProps) {
  if (departments.length === 0) {
    return <EmptyDepartmentState />;
  }

  return (
    <div className="space-y-4">
      {departments.map((dept) => (
        <DepartmentCard
          key={dept.id}
          department={dept}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}