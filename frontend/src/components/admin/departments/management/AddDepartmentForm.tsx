'use client';

import { User, } from '@/lib/types';
import {NewDepartment} from "@/lib/types/dapartment"


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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Department Name *
          </label>
          <input
            type="text"
            value={newDepartment.name}
            onChange={(e) =>
              setNewDepartment((prev) => ({
                ...prev,
                name: e.target.value,
              }))
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            placeholder="e.g., Engineering"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Department Head *
          </label>
          <select
            value={newDepartment.headId}
            onChange={(e) => {
              const selectedUser = users.find(
                (user) => user.id === e.target.value
              );
              setNewDepartment((prev) => ({
                ...prev,
                headId: e.target.value,
                head: selectedUser ? selectedUser.name : "",
              }));
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          >
            <option value="">Select department head</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Location
          </label>
          <input
            type="text"
            value={newDepartment.location}
            onChange={(e) =>
              setNewDepartment((prev) => ({
                ...prev,
                location: e.target.value,
              }))
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            placeholder="e.g., Building A, Floor 3"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Budget ($)
          </label>
          <input
            type="number"
            value={newDepartment.budget}
            onChange={(e) =>
              setNewDepartment((prev) => ({
                ...prev,
                budget: e.target.value,
              }))
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            placeholder="e.g., 100000"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            value={newDepartment.description}
            onChange={(e) =>
              setNewDepartment((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            rows={3}
            placeholder="Brief description of the department's role and responsibilities"
          />
        </div>
      </div>
      <div className="flex gap-3 mt-4">
        <button
          onClick={onCancel}
          className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={onAdd}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Add Department
        </button>
      </div>
    </div>
  );
}