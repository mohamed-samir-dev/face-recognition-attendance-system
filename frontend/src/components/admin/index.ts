// Employee Management
export * from './employee-management/forms';
export * from './employee-management/views';
export * from './employee-management/modals';
export * from './employee-management/hooks';
export {
  BasicInfoFields,
  EditFormFields,
  PhotoUploadSection,
  FacialDataSection,
  UserFilters,
  UserTable,
  UserCards,
  AssignmentForm,
  SearchBar,
  UnassignedUsers,
  DepartmentList,
  LoadingState as EmployeeManagementLoadingState,
  UserManagementLoadingState,
  AssignmentLoadingState
} from './employee-management/components';

// Attendance
export * from './attendance';

// Dashboard
export { 
  DashboardContent, 
  TeamPerformanceDashboard,
  DashboardHeader,
  AttendanceSummary,
  DepartmentSelector,
  LoadingState as DashboardLoadingState
} from './dashboard';

// Departments
export * from './departments';

// Reports
export * from './reports';

// Settings
export * from './settings';