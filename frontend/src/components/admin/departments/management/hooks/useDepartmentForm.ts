'use client';

import { useState } from 'react';
import { Department } from '@/lib/types';

export interface NewDepartment {
  name: string;
  head: string;
  headId: string;
  description: string;
  budget: string;
  location: string;
}

export function useDepartmentForm() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingDept, setEditingDept] = useState<Department | null>(null);
  const [newDepartment, setNewDepartment] = useState<NewDepartment>({
    name: '',
    head: '',
    headId: '',
    description: '',
    budget: '',
    location: '',
  });

  const resetForm = () => {
    setNewDepartment({
      name: '',
      head: '',
      headId: '',
      description: '',
      budget: '',
      location: '',
    });
  };

  return {
    showAddForm,
    setShowAddForm,
    editingDept,
    setEditingDept,
    newDepartment,
    setNewDepartment,
    resetForm,
  };
}