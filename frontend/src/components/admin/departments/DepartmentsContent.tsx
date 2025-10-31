'use client';

import { useEffect } from 'react';
import DepartmentManagement from './DepartmentManagement';
import UserDepartmentAssignment from '../employee-management/UserDepartmentAssignment';
import DepartmentAnalytics from './DepartmentAnalytics';
import { LoadingState, PageHeader, useDepartmentsContent } from './content';

export default function DepartmentsContent() {
  const { settings, loading, fetchSettings } = useDepartmentsContent();

  useEffect(() => {
    console.log('DepartmentsContent - Loading:', loading);
    console.log('DepartmentsContent - Settings:', settings);
  }, [loading, settings]);

  if (loading) {
    console.log('DepartmentsContent - Showing loading state');
    return <LoadingState />;
  }

  console.log('DepartmentsContent - Rendering main content');
  return (
    <div className="p-4 sm:p-6">
      <PageHeader />

      <div className="space-y-6">
        <DepartmentAnalytics />
        
        <DepartmentManagement 
          departments={settings?.departments || []} 
          onDepartmentsChange={fetchSettings}
        />

        <UserDepartmentAssignment 
          onAssignmentChange={fetchSettings}
        />
      </div>
    </div>
  );
}