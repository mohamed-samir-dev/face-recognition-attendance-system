import { Department } from '@/lib/types';

export interface DepartmentStats {
  department: Department;
  employeeCount: number;
  budgetPerEmployee: number;
}

export interface DepartmentBreakdownProps {
  stats: DepartmentStats[];
  totalEmployees: number;
  largestDepartment: DepartmentStats;
  highestBudgetDept: DepartmentStats;
}

export interface DepartmentCardProps {
  stat: DepartmentStats;
  index: number;
  totalEmployees: number;
  largestDepartment: DepartmentStats;
  highestBudgetDept: DepartmentStats;
}