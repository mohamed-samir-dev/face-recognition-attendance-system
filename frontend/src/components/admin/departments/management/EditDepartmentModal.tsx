'use client';

import { Department, User } from '@/lib/types';

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
    <div className="fixed inset-0 backdrop-blur-md bg-white/20 flex items-center justify-center z-50 p-4">
      <div className="bg-white/90 backdrop-blur-xl rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-white/30">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Edit Department
          </h3>

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

          <div className="flex gap-3 mt-6">
            <button
              onClick={onCancel}
              className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onSave}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}