'use client';

import { Department } from '@/lib/types';
import { useUsers } from './useUsers';
import { useDepartmentForm } from './useDepartmentForm';
import { useDepartmentActions } from './useDepartmentActions';
import { useDepartmentEmployeeCount } from './useDepartmentEmployeeCount';

export function useDepartmentManagement(
  departments: Department[],
  onDepartmentsChange: () => void
) {
  const { users } = useUsers();
  const {
    showAddForm,
    setShowAddForm,
    editingDept,
    setEditingDept,
    newDepartment,
    setNewDepartment,
    resetForm,
  } = useDepartmentForm();
  const {
    showSuccessMessage,
    successMessage,
    deleteConfirm,
    setDeleteConfirm,
    handleAddDepartment: addDepartment,
    handleUpdateDepartment: updateDepartment,
    handleDeleteClick,
    handleDeleteConfirm,
  } = useDepartmentActions(onDepartmentsChange);
  
  useDepartmentEmployeeCount(departments);

  const handleAddDepartment = () => {
    addDepartment(newDepartment, resetForm, setShowAddForm);
  };

  const handleUpdateDepartment = () => {
    updateDepartment(editingDept!, setEditingDept);
  };

  return {
    users,
    showAddForm,
    setShowAddForm,
    editingDept,
    setEditingDept,
    showSuccessMessage,
    successMessage,
    deleteConfirm,
    setDeleteConfirm,
    newDepartment,
    setNewDepartment,
    handleAddDepartment,
    handleUpdateDepartment,
    handleDeleteClick,
    handleDeleteConfirm,
  };
}