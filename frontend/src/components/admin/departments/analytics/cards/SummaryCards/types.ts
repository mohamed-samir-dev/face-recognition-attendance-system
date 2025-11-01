import { LucideIcon } from 'lucide-react';

export interface SummaryCardsProps {
  departmentCount: number;
  totalEmployees: number;
  totalBudget: number;
}

export interface SummaryCardProps {
  icon: LucideIcon;
  title: string;
  value: string | number;
  colorClass: string;
}