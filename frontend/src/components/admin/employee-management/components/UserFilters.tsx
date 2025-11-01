'use client';

import { Search, Filter, ArrowUpDown } from 'lucide-react';
import { Department } from '@/lib/types';

interface UserFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filter: string;
  setFilter: (filter: string) => void;
  departmentFilter: string;
  setDepartmentFilter: (filter: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  departments: Department[];
}

export default function UserFilters({
  searchTerm,
  setSearchTerm,
  filter,
  setFilter,
  departmentFilter,
  setDepartmentFilter,
  sortBy,
  setSortBy,
  departments
}: UserFiltersProps) {
  return (
    <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4 mb-6">
      <div className="flex items-center space-x-2 flex-1">
        <Search className="w-4 h-4 text-gray-500 flex-shrink-0" />
        <input
          type="text"
          placeholder="Search by name or ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-gray-500 flex-shrink-0" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="flex-1 sm:flex-none border border-gray-300 rounded-lg px-3 py-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="OnLeave">On Leave</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-gray-500 flex-shrink-0" />
          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className="flex-1 sm:flex-none border border-gray-300 rounded-lg px-3 py-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All Departments</option>
            <option value="Unassigned">Unassigned</option>
            {departments.map(dept => (
              <option key={dept.id} value={dept.name}>{dept.name}</option>
            ))}
          </select>
        </div>
        <div className="flex items-center space-x-2">
          <ArrowUpDown className="w-4 h-4 text-gray-500 flex-shrink-0" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="flex-1 sm:flex-none border border-gray-300 rounded-lg px-3 py-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="name">Sort by Name</option>
            <option value="id">Sort by ID</option>
            <option value="department">Sort by Department</option>
          </select>
        </div>
      </div>
    </div>
  );
}