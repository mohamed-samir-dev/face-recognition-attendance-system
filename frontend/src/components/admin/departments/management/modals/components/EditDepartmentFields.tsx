'use client';

import { Department, User } from '@/lib/types';

interface EditDepartmentFieldsProps {
  editingDept: Department;
  setEditingDept: React.Dispatch<React.SetStateAction<Department | null>>;
  users: User[];
}

export default function EditDepartmentFields({ editingDept, setEditingDept, users }: EditDepartmentFieldsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Department Name
        </label>
        <input
          type="text"
          value={editingDept.name}
          onChange={(e) =>
            setEditingDept((prev) =>
              prev ? { ...prev, name: e.target.value } : null
            )
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Department Head
        </label>
        <select
          value={editingDept.headId || ""}
          onChange={(e) => {
            const selectedUser = users.find(
              (user) => user.id === e.target.value
            );
            setEditingDept((prev) =>
              prev
                ? {
                    ...prev,
                    headId: e.target.value,
                    head: selectedUser
                      ? selectedUser.name
                      : prev.head,
                  }
                : null
            );
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
          value={editingDept.location || ""}
          onChange={(e) =>
            setEditingDept((prev) =>
              prev ? { ...prev, location: e.target.value } : null
            )
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Budget ($)
        </label>
        <input
          type="number"
          value={editingDept.budget || ""}
          onChange={(e) =>
            setEditingDept((prev) =>
              prev
                ? {
                    ...prev,
                    budget: parseFloat(e.target.value) || undefined,
                  }
                : null
            )
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
        />
      </div>
      <div className="md:col-span-2">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Description
        </label>
        <textarea
          value={editingDept.description || ""}
          onChange={(e) =>
            setEditingDept((prev) =>
              prev ? { ...prev, description: e.target.value } : null
            )
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          rows={3}
        />
      </div>
    </div>
  );
}