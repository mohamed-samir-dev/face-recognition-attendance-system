'use client';

import { User } from '@/lib/types';
import { NewDepartment } from "@/lib/types/dapartment";
import FormField from './FormField';

interface DepartmentFormFieldsProps {
  newDepartment: NewDepartment;
  setNewDepartment: React.Dispatch<React.SetStateAction<NewDepartment>>;
  users: User[];
}

export default function DepartmentFormFields({ newDepartment, setNewDepartment, users }: DepartmentFormFieldsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <FormField label="Department Name" required>
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
      </FormField>

      <FormField label="Department Head" required>
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
      </FormField>

      <FormField label="Location">
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
      </FormField>

      <FormField label="Budget ($)">
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
      </FormField>

      <div className="md:col-span-2">
        <FormField label="Description">
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
        </FormField>
      </div>
    </div>
  );
}