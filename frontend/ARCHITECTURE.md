# Project Architecture Documentation

## Overview
This Next.js Attendance Management System has been professionally restructured to follow modern React development best practices with a focus on component modularity, reusability, and maintainability.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── login/             # Login page
│   ├── camera/            # Camera page for attendance
│   ├── userData/          # Dashboard page
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page (redirects to login)
├── components/            # React components (organized by feature)
│   ├── auth/              # Authentication components
│   │   ├── LoginForm.tsx
│   │   ├── FacialRecognitionButton.tsx
│   │   ├── AuthDivider.tsx
│   │   └── index.ts
│   ├── camera/            # Camera-related components
│   │   ├── CameraPreview.tsx
│   │   ├── CameraControls.tsx
│   │   └── index.ts
│   ├── dashboard/         # Dashboard components
│   │   ├── ProfileSection.tsx
│   │   ├── AttendanceSummary.tsx
│   │   ├── AttendanceChart.tsx
│   │   └── index.ts
│   ├── layout/            # Layout components
│   │   ├── AppLogo.tsx
│   │   ├── PageHeader.tsx
│   │   ├── Navbar.tsx
│   │   └── index.ts
│   ├── common/            # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   └── index.ts
│   ├── ui/                # Basic UI components
│   │   ├── LoadingSpinner.tsx
│   │   ├── SearchInput.tsx
│   │   └── index.ts
│   ├── features/          # Feature-specific components
│   │   └── users/
│   │       └── UsersPage.tsx
│   └── NavigationBlocker.tsx
├── hooks/                 # Custom React hooks
│   ├── useAuth.ts         # Authentication logic
│   ├── useCamera.ts       # Camera functionality
│   └── index.ts
├── lib/                   # Utilities and configurations
│   ├── firebase/          # Firebase configuration
│   ├── services/          # API service layer
│   ├── types/             # TypeScript type definitions
│   │   ├── user.ts
│   │   ├── auth.ts
│   │   └── index.ts
│   └── constants/         # Application constants
├── utils/                 # Utility functions
│   └── faceDetection.ts   # Face detection API calls
└── public/                # Static assets
```

## Architecture Principles

### 1. Component Modularity
- **Single Responsibility**: Each component has one clear purpose
- **Small Components**: No component exceeds 100-150 lines of code
- **Focused Functionality**: Components handle specific UI concerns

### 2. Feature-Based Organization
- Components are grouped by feature (auth, camera, dashboard)
- Related components are co-located
- Clear separation between features

### 3. Reusability
- Common UI patterns extracted into reusable components
- Consistent prop interfaces across similar components
- Generic components in `common/` directory

### 4. Custom Hooks
- Business logic extracted from components
- Reusable stateful logic
- Clean separation of concerns

### 5. Type Safety
- Full TypeScript coverage
- Proper interface definitions
- Type exports from centralized locations

## Component Breakdown

### Authentication Components (`components/auth/`)

#### LoginForm.tsx
- Handles form state and validation
- Accepts onSubmit callback for flexibility
- Manages field-level error states

#### FacialRecognitionButton.tsx
- Dedicated button for facial recognition
- Consistent styling with other auth components
- Single responsibility for navigation

#### AuthDivider.tsx
- Reusable "OR" divider component
- Consistent styling across auth flows

### Camera Components (`components/camera/`)

#### CameraPreview.tsx
- Displays camera feed and status overlays
- Handles different states (ready, processing, success, error)
- Uses forwardRef for video element access

#### CameraControls.tsx
- Manages camera action buttons
- Conditional rendering based on camera state
- Clean separation from preview logic

### Dashboard Components (`components/dashboard/`)

#### ProfileSection.tsx
- User profile display and actions
- Configurable action buttons
- Responsive design

#### AttendanceSummary.tsx
- Monthly attendance statistics
- Reusable summary cards
- Modular card components

#### AttendanceChart.tsx
- Configurable chart component
- Supports line and bar chart types
- Reusable across different metrics

### Layout Components (`components/layout/`)

#### AppLogo.tsx
- Configurable logo component
- Multiple size variants
- Optional text display

#### PageHeader.tsx
- Standardized page headers
- Optional subtitle support
- Consistent typography

#### Navbar.tsx
- Flexible navigation component
- Configurable navigation items
- User profile integration

### Common Components (`components/common/`)

#### Button.tsx
- Standardized button component
- Multiple variants and sizes
- Loading state support

#### Card.tsx
- Consistent card styling
- Configurable padding options
- Reusable across features

## Custom Hooks

### useAuth.ts
- Centralized authentication logic
- Session management
- User state handling
- Logout functionality

### useCamera.ts
- Camera access and control
- Image capture functionality
- Error handling
- Resource cleanup

## Utility Functions

### faceDetection.ts
- API communication for face detection
- Error handling
- Type-safe responses

## Benefits of This Architecture

1. **Maintainability**: Small, focused components are easier to maintain
2. **Testability**: Individual components can be tested in isolation
3. **Reusability**: Common patterns are extracted and reusable
4. **Scalability**: New features can be added without affecting existing code
5. **Developer Experience**: Clear structure makes onboarding easier
6. **Type Safety**: Full TypeScript coverage prevents runtime errors
7. **Performance**: Smaller components enable better code splitting

## Development Guidelines

### Adding New Components
1. Determine the appropriate feature directory
2. Keep components under 150 lines
3. Extract reusable logic into custom hooks
4. Add proper TypeScript interfaces
5. Update index.ts files for clean imports

### Component Naming
- Use PascalCase for component files
- Use descriptive, specific names
- Avoid generic names like "Component" or "Item"

### Props Interface
- Define clear prop interfaces
- Use optional props with defaults when appropriate
- Avoid prop drilling - use context or state management when needed

### State Management
- Use custom hooks for complex state logic
- Keep component state minimal and focused
- Extract business logic from components

This architecture provides a solid foundation for scaling the attendance management system while maintaining code quality and developer productivity.