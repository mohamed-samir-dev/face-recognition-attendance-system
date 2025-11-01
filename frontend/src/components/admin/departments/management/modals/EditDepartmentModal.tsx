'use client';

import { Department, User } from '@/lib/types';
import ModalOverlay from './components/ModalOverlay';
import EditDepartmentFields from './components/EditDepartmentFields';
import ModalActions from './components/ModalActions';

interface EditDepartmentModalProps {
  editingDept: Department;
  setEditingDept: React.Dispatch<React.SetStateAction<Department | null>>;
  users: User[];
  onSave: () => void;
  onCancel: () => void;
}

export default function EditDepartmentModal({
  editingDept,
  setEditingDept,
  users,
  onSave,
  onCancel
}: EditDepartmentModalProps) {
  return (
    <ModalOverlay>
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Edit Department
        </h3>
        <EditDepartmentFields
          editingDept={editingDept}
          setEditingDept={setEditingDept}
          users={users}
        />
        <ModalActions
          onCancel={onCancel}
          onSave={onSave}
        />
      </div>
    </ModalOverlay>
  );
}