'use client';

import { User } from '@/lib/types';
import { NewDepartment } from "@/lib/types/dapartment";
import DepartmentFormFields from './components/DepartmentFormFields';
import FormActions from './components/FormActions';

interface AddDepartmentFormProps {
  newDepartment: NewDepartment;
  setNewDepartment: React.Dispatch<React.SetStateAction<NewDepartment>>;
  users: User[];
  onAdd: () => void;
  onCancel: () => void;
}

export default function AddDepartmentForm({
  newDepartment,
  setNewDepartment,
  users,
  onAdd,
  onCancel
}: AddDepartmentFormProps) {
  return (
    <div className="mb-6 p-4 bg-gray-50 rounded-lg border">
      <h4 className="font-medium text-gray-900 mb-4">Add New Department</h4>
      <DepartmentFormFields
        newDepartment={newDepartment}
        setNewDepartment={setNewDepartment}
        users={users}
      />
      <FormActions
        onCancel={onCancel}
        onSubmit={onAdd}
      />
    </div>
  );
}