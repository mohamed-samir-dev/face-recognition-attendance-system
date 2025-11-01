import { Department } from '@/lib/types';

export interface DepartmentStats {
  department: Department;
  employeeCount: number;
  budgetPerEmployee: number;
}

export interface DepartmentAnalyticsReturn {
  departments: Department[];
  stats: DepartmentStats[];
  loading: boolean;
  totalEmployees: number;
  totalBudget: number;
  largestDepartment: DepartmentStats;
  highestBudgetDept: DepartmentStats;
}