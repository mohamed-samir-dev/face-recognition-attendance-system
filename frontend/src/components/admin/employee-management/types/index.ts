// Employee Management Types
export interface Employee {
  id: string;
  name: string;
  email: string;
  department?: string;
  status: 'active' | 'inactive';
  photoUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Department {
  id: string;
  name: string;
  description?: string;
  employeeCount: number;
}

export interface FormData {
  name: string;
  email: string;
  department: string;
  photo?: File | string;
}

export interface DeleteModalState {
  isOpen: boolean;
  user: Employee | null;
}

export type FilterType = 'all' | 'active' | 'inactive';
export type SortType = 'name' | 'email' | 'department' | 'status';