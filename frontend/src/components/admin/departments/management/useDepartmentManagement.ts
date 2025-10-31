'use client';

import { useState, useEffect, useCallback } from 'react';
import { Department, User } from '@/lib/types';
import {
  addDepartment,
  updateDepartment,
  deleteDepartment,
  updateDepartmentEmployeeCount,
} from '@/lib/services/settingsService';
import { getUsers } from '@/lib/services/userService';

export interface NewDepartment {
  name: string;
  head: string;
  headId: string;
  description: string;
  budget: string;
  location: string;
}

export function useDepartmentManagement(
  departments: Department[],
  onDepartmentsChange: () => void
) {
  const [users, setUsers] = useState<User[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingDept, setEditingDept] = useState<Department | null>(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<{
    show: boolean;
    dept: Department | null;
  }>({ show: false, dept: null });
  const [newDepartment, setNewDepartment] = useState<NewDepartment>({
    name: '',
    head: '',
    headId: '',
    description: '',
    budget: '',
    location: '',
  });

  const fetchUsers = async () => {
    try {
      const userData = await getUsers();
      setUsers(userData.filter((user) => user.numericId !== 1));
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const updateEmployeeCounts = useCallback(async () => {
    for (const dept of departments) {
      await updateDepartmentEmployeeCount(dept.id);
    }
  }, [departments]);

  useEffect(() => {
    fetchUsers();
    updateEmployeeCounts();
  }, [departments, updateEmployeeCounts]);

  const handleAddDepartment = async () => {
    if (!newDepartment.name || !newDepartment.head) return;

    try {
      await addDepartment({
        name: newDepartment.name,
        head: newDepartment.head,
        headId: newDepartment.headId,
        description: newDepartment.description,
        budget: newDepartment.budget ? parseFloat(newDepartment.budget) : undefined,
        location: newDepartment.location,
      });

      setNewDepartment({
        name: '',
        head: '',
        headId: '',
        description: '',
        budget: '',
        location: '',
      });
      setShowAddForm(false);
      onDepartmentsChange();
    } catch (error) {
      console.error('Error adding department:', error);
    }
  };

  const handleUpdateDepartment = async () => {
    if (!editingDept) return;

    try {
      await updateDepartment(editingDept.id, editingDept);
      setEditingDept(null);
      onDepartmentsChange();
    } catch (error) {
      console.error('Error updating department:', error);
    }
  };

  const handleDeleteClick = (dept: Department) => {
    setDeleteConfirm({ show: true, dept });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteConfirm.dept) return;

    try {
      await deleteDepartment(deleteConfirm.dept.id);
      setSuccessMessage(
        `Department "${deleteConfirm.dept.name}" has been successfully deleted.`
      );
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 3000);
      setDeleteConfirm({ show: false, dept: null });
      onDepartmentsChange();
    } catch (error) {
      console.error('Error deleting department:', error);
    }
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