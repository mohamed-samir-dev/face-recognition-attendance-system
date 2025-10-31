'use client';

import { User, Mail, Building, Briefcase, DollarSign } from 'lucide-react';
import {FormData} from "@/lib/types/addemployee"


interface BasicInfoFieldsProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

export default function BasicInfoFields({ formData, setFormData }: BasicInfoFieldsProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <User className="w-4 h-4 inline mr-2" />
          Full Name
        </label>
        <input
          type="text"
          required
          value={formData.name}
          onChange={(e) =>
            setFormData({ ...formData, name: e.target.value })
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
          placeholder="Enter full name"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <Mail className="w-4 h-4 inline mr-2" />
          Email
        </label>
        <input
          type="email"
          required
          value={formData.email}
          onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
          placeholder="Enter email address"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <Building className="w-4 h-4 inline mr-2" />
          Department
        </label>
        <select
          required
          value={formData.department}
          onChange={(e) =>
            setFormData({ ...formData, department: e.target.value })
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
        >
          <option value="">Select Department</option>
          <option value="IT">IT</option>
          <option value="HR">HR</option>
          <option value="Finance">Finance</option>
          <option value="Marketing">Marketing</option>
          <option value="Operations">Operations</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <Briefcase className="w-4 h-4 inline mr-2" />
          Job Title
        </label>
        <input
          type="text"
          required
          value={formData.jobTitle}
          onChange={(e) =>
            setFormData({ ...formData, jobTitle: e.target.value })
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
          placeholder="Enter job title"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <DollarSign className="w-4 h-4 inline mr-2" />
          Salary
        </label>
        <input
          type="number"
          required
          value={formData.salary}
          onChange={(e) =>
            setFormData({ ...formData, salary: e.target.value })
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
          placeholder="Enter salary amount"
          min="0"
        />
      </div>
    </div>
  );
}