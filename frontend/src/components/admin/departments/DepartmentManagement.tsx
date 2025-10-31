"use client";

import { Plus, Building } from "lucide-react";
import { Department } from "@/lib/types";
import {
  AddDepartmentForm,
  DepartmentList,
  EditDepartmentModal,
  DeleteConfirmModal,
  SuccessMessage,
  useDepartmentManagement,
} from './management';

interface DepartmentManagementProps {
  departments: Department[];
  onDepartmentsChange: () => void;
}

export default function DepartmentManagement({
  departments,
  onDepartmentsChange,
}: DepartmentManagementProps) {
  const {
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
  } = useDepartmentManagement(departments, onDepartmentsChange);

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Building className="w-5 h-5 text-blue-600" />
            Department Management
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            Manage organizational departments and structure
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Department
        </button>
      </div>

      {showAddForm && (
        <AddDepartmentForm
          newDepartment={newDepartment}
          setNewDepartment={setNewDepartment}
          users={users}
          onAdd={handleAddDepartment}
          onCancel={() => setShowAddForm(false)}
        />
      )}

      <DepartmentList
        departments={departments}
        onEdit={setEditingDept}
        onDelete={handleDeleteClick}
      />

      {editingDept && (
        <EditDepartmentModal
          editingDept={editingDept}
          setEditingDept={setEditingDept}
          users={users}
          onSave={handleUpdateDepartment}
          onCancel={() => setEditingDept(null)}
        />
      )}

      {deleteConfirm.show && deleteConfirm.dept && (
        <DeleteConfirmModal
          department={deleteConfirm.dept}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeleteConfirm({ show: false, dept: null })}
        />
      )}

      {showSuccessMessage && (
        <SuccessMessage message={successMessage} />
      )}
    </div>
  );
}
