# Migration Guide: Component Restructuring

## Overview
This guide documents the migration from monolithic page components to a modular, professional component architecture.

## What Changed

### Before: Monolithic Components
- Large page components (500+ lines)
- Mixed concerns (UI, business logic, state management)
- Difficult to test and maintain
- Code duplication across pages

### After: Modular Architecture
- Small, focused components (< 150 lines)
- Separated concerns with custom hooks
- Reusable UI components
- Clear feature-based organization

## Component Mapping

### Login Page (`src/app/login/page.tsx`)

**Before**: Single 200+ line component
**After**: Composed of smaller components:

```typescript
// Old structure
export default function LoginPage() {
  // 200+ lines of mixed UI and logic
}

// New structure
export default function LoginPage() {
  return (
    <div>
      <AppLogo />
      <PageHeader />
      <Card>
        <LoginForm />
        <AuthDivider />
        <FacialRecognitionButton />
      </Card>
    </div>
  );
}
```

**New Components Created**:
- `LoginForm.tsx` - Form handling and validation
- `FacialRecognitionButton.tsx` - Facial recognition navigation
- `AuthDivider.tsx` - "OR" divider component
- `AppLogo.tsx` - Reusable logo component
- `PageHeader.tsx` - Standardized page headers
- `Card.tsx` - Consistent card styling

### Camera Page (`src/app/camera/page.tsx`)

**Before**: Single 300+ line component with complex state
**After**: Composed with custom hooks and smaller components:

```typescript
// Old structure
export default function CameraPage() {
  // Complex camera logic mixed with UI
  // 300+ lines
}

// New structure
export default function CameraPage() {
  const { user } = useAuth();
  const { cameraActive, startCamera, captureImage } = useCamera();
  
  return (
    <div>
      <Navbar />
      <Card>
        <CameraPreview />
        <CameraControls />
      </Card>
    </div>
  );
}
```

**New Components Created**:
- `CameraPreview.tsx` - Camera display and status overlays
- `CameraControls.tsx` - Camera action buttons
- `Navbar.tsx` - Reusable navigation component

**New Hooks Created**:
- `useAuth.ts` - Authentication state management
- `useCamera.ts` - Camera functionality

**New Utilities**:
- `faceDetection.ts` - API communication utility

### Dashboard Page (`src/app/userData/page.tsx`)

**Before**: Single 400+ line component with complex layout
**After**: Composed of feature-specific components:

```typescript
// Old structure
export default function DashboardPage() {
  // Complex dashboard layout and logic
  // 400+ lines
}

// New structure
export default function DashboardPage() {
  const { user, logout } = useAuth();
  
  return (
    <div>
      <Navbar />
      <ProfileSection />
      <AttendanceSummary />
      <div className="grid">
        <AttendanceChart type="line" />
        <AttendanceChart type="bar" />
      </div>
    </div>
  );
}
```

**New Components Created**:
- `ProfileSection.tsx` - User profile and actions
- `AttendanceSummary.tsx` - Monthly statistics
- `AttendanceChart.tsx` - Configurable charts

## Import Changes

### Before
```typescript
// Direct component imports
import SomeComponent from '../components/SomeComponent';
```

### After
```typescript
// Clean imports from index files
import { LoginForm, AuthDivider } from '@/components/auth';
import { useAuth, useCamera } from '@/hooks';
import { Card, Button } from '@/components/common';
```

## Benefits Achieved

### 1. Maintainability
- **Before**: Changing login form required editing 200+ line file
- **After**: Login form is isolated in 50-line component

### 2. Reusability
- **Before**: Logo duplicated across pages
- **After**: Single `AppLogo` component used everywhere

### 3. Testability
- **Before**: Testing required mocking entire page
- **After**: Individual components can be tested in isolation

### 4. Developer Experience
- **Before**: Finding specific functionality required searching large files
- **After**: Clear component names and locations

### 5. Performance
- **Before**: Large components loaded everything at once
- **After**: Smaller components enable better code splitting

## Migration Checklist

If you need to add new features or modify existing ones:

### ✅ Component Guidelines
- [ ] Keep components under 150 lines
- [ ] Single responsibility per component
- [ ] Extract business logic to custom hooks
- [ ] Use TypeScript interfaces for props
- [ ] Add to appropriate feature directory

### ✅ Hook Guidelines
- [ ] Extract stateful logic from components
- [ ] Make hooks reusable across components
- [ ] Handle cleanup and error states
- [ ] Provide clear return interfaces

### ✅ Import Guidelines
- [ ] Use index files for clean imports
- [ ] Group imports by type (React, libraries, local)
- [ ] Use absolute imports with @ alias

### ✅ Testing Guidelines
- [ ] Test components in isolation
- [ ] Mock custom hooks in component tests
- [ ] Test hooks separately from components
- [ ] Use proper TypeScript types in tests

## Common Patterns

### 1. Component with Custom Hook
```typescript
// Component
export default function MyComponent() {
  const { data, loading, error } = useMyHook();
  
  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;
  
  return <div>{data}</div>;
}

// Hook
export function useMyHook() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Logic here
  
  return { data, loading, error };
}
```

### 2. Configurable Component
```typescript
interface MyComponentProps {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
}

export default function MyComponent({ 
  variant = 'primary', 
  size = 'md', 
  children 
}: MyComponentProps) {
  // Implementation
}
```

### 3. Compound Components
```typescript
// Parent component
export default function Card({ children }: { children: ReactNode }) {
  return <div className="card">{children}</div>;
}

// Usage
<Card>
  <CardHeader title="Title" />
  <CardContent>Content here</CardContent>
  <CardActions>
    <Button>Action</Button>
  </CardActions>
</Card>
```

## Troubleshooting

### Import Errors
If you see import errors after the restructure:
1. Check if the component moved to a new directory
2. Use the new index file imports
3. Update absolute import paths

### Type Errors
If you see TypeScript errors:
1. Check if interfaces moved to `lib/types/`
2. Import types from the new locations
3. Update component prop interfaces

### Hook Errors
If custom hooks aren't working:
1. Ensure hooks are called at component top level
2. Check hook dependencies and cleanup
3. Verify hook return types match usage

This migration provides a solid foundation for future development while maintaining all existing functionality.