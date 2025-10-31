'use client';

import { Department } from '@/lib/types';

interface DepartmentStats {
  department: Department;
  employeeCount: number;
  budgetPerEmployee: number;
}

interface DepartmentBreakdownProps {
  stats: DepartmentStats[];
  totalEmployees: number;
  largestDepartment: DepartmentStats;
  highestBudgetDept: DepartmentStats;
}

export default function DepartmentBreakdown({ 
  stats, 
  totalEmployees, 
  largestDepartment, 
  highestBudgetDept 
}: DepartmentBreakdownProps) {
  return (
    <div className="space-y-4">
      <h4 className="text-base font-semibold text-gray-900">Department Breakdown</h4>
      
      <div className="space-y-3">
        {stats
          .sort((a, b) => b.employeeCount - a.employeeCount)
          .map((stat, index) => {
            const percentage = totalEmployees > 0 ? (stat.employeeCount / totalEmployees) * 100 : 0;
            
            return (
              <div key={stat.department.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`w-3 h-3 rounded-full ${
                        index === 0 ? 'bg-blue-500' :
                        index === 1 ? 'bg-green-500' :
                        index === 2 ? 'bg-purple-500' : 'bg-gray-400'
                      }`}></div>
                      <h5 className="font-medium text-gray-900">{stat.department.name}</h5>
                      {stat.department === largestDepartment.department && (
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                          Largest
                        </span>
                      )}
                      {stat.department === highestBudgetDept.department && (
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                          Highest Budget
                        </span>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Employees</p>
                        <p className="font-semibold text-gray-900">{stat.employeeCount}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Percentage</p>
                        <p className="font-semibold text-gray-900">{percentage.toFixed(1)}%</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Budget</p>
                        <p className="font-semibold text-gray-900">
                          ${(stat.department.budget || 0).toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600">Budget/Employee</p>
                        <p className="font-semibold text-gray-900">
                          ${stat.budgetPerEmployee.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="w-full sm:w-32">
                    <div className="bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          index === 0 ? 'bg-blue-500' :
                          index === 1 ? 'bg-green-500' :
                          index === 2 ? 'bg-purple-500' : 'bg-gray-400'
                        }`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}