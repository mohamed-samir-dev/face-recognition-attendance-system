'use client';

import { useState, useEffect } from 'react';
import { Department } from '@/lib/types';
import { getCompanySettings, getDepartmentEmployees } from '@/lib/services/settingsService';

export interface DepartmentStats {
  department: Department;
  employeeCount: number;
  budgetPerEmployee: number;
}

export function useDepartmentAnalytics() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [stats, setStats] = useState<DepartmentStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [totalBudget, setTotalBudget] = useState(0);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const settings = await getCompanySettings();
      setDepartments(settings.departments);

      const departmentStats: DepartmentStats[] = [];
      let totalEmp = 0;
      let totalBud = 0;

      for (const dept of settings.departments) {
        const employees = await getDepartmentEmployees(dept.name);
        const employeeCount = employees.length;
        const budgetPerEmployee = dept.budget && employeeCount > 0 ? dept.budget / employeeCount : 0;

        departmentStats.push({
          department: dept,
          employeeCount,
          budgetPerEmployee
        });

        totalEmp += employeeCount;
        totalBud += dept.budget || 0;
      }

      setStats(departmentStats);
      setTotalEmployees(totalEmp);
      setTotalBudget(totalBud);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const largestDepartment = stats.reduce((prev, current) => 
    (prev.employeeCount > current.employeeCount) ? prev : current, stats[0]
  );

  const highestBudgetDept = stats.reduce((prev, current) => 
    ((prev.department.budget || 0) > (current.department.budget || 0)) ? prev : current, stats[0]
  );

  return {
    departments,
    stats,
    loading,
    totalEmployees,
    totalBudget,
    largestDepartment,
    highestBudgetDept
  };
}