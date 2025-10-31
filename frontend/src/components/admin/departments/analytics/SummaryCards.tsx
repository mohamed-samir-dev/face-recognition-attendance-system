'use client';

import { Users, TrendingUp, Building, DollarSign } from 'lucide-react';

interface SummaryCardsProps {
  departmentCount: number;
  totalEmployees: number;
  totalBudget: number;
}

export default function SummaryCards({ departmentCount, totalEmployees, totalBudget }: SummaryCardsProps) {
  const avgEmployeesPerDept = departmentCount > 0 ? Math.round(totalEmployees / departmentCount) : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <div className="flex items-center gap-3">
          <Building className="w-8 h-8 text-blue-600" />
          <div>
            <p className="text-sm text-blue-600 font-medium">Total Departments</p>
            <p className="text-2xl font-bold text-blue-900">{departmentCount}</p>
          </div>
        </div>
      </div>

      <div className="bg-green-50 p-4 rounded-lg border border-green-200">
        <div className="flex items-center gap-3">
          <Users className="w-8 h-8 text-green-600" />
          <div>
            <p className="text-sm text-green-600 font-medium">Total Employees</p>
            <p className="text-2xl font-bold text-green-900">{totalEmployees}</p>
          </div>
        </div>
      </div>

      <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
        <div className="flex items-center gap-3">
          <DollarSign className="w-8 h-8 text-purple-600" />
          <div>
            <p className="text-sm text-purple-600 font-medium">Total Budget</p>
            <p className="text-2xl font-bold text-purple-900">
              ${totalBudget.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
        <div className="flex items-center gap-3">
          <TrendingUp className="w-8 h-8 text-orange-600" />
          <div>
            <p className="text-sm text-orange-600 font-medium">Avg. Employees/Dept</p>
            <p className="text-2xl font-bold text-orange-900">{avgEmployeesPerDept}</p>
          </div>
        </div>
      </div>
    </div>
  );
}