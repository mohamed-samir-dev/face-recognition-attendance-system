// Re-export the modular useDepartmentAnalytics hook
export { useDepartmentAnalytics, type DepartmentStats } from './useDepartmentAnalytics/index';

// This file now serves as a bridge to the new modular structure
// The actual implementation is in ./useDepartmentAnalytics/index.ts