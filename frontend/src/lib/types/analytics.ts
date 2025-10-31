export interface CompanyBudget {
  id: string;
  totalBudget: number;
  allocatedBudget: number;
  remainingBudget: number;
  year: number;
  month: number;
}

export interface CompanyExpense {
  id: string;
  category: string;
  amount: number;
  description: string;
  date: string;
  department?: string;
  type: 'operational' | 'salary' | 'equipment' | 'utilities' | 'other';
}

export interface SalaryAnalytics {
  totalSalaryExpense: number;
  averageSalary: number;
  departmentSalaries: { [department: string]: number };
  salaryDistribution: { range: string; count: number }[];
}

export interface BudgetAnalytics {
  budgetUtilization: number;
  monthlyExpenses: { month: string; amount: number }[];
  expensesByCategory: { category: string; amount: number; percentage: number }[];
  projectedBurnRate: number;
}