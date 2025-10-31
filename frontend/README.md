# Next.js Attendance Management System

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

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
│   ├── camera/            # Camera-related components
│   ├── dashboard/         # Dashboard components
│   ├── layout/            # Layout components
│   ├── common/            # Reusable UI components
│   ├── ui/                # Basic UI components
│   └── features/          # Feature-specific components
├── hooks/                 # Custom React hooks
├── lib/                   # Utilities and configurations
│   ├── firebase/          # Firebase configuration
│   ├── services/          # API service layer
│   ├── types/             # TypeScript type definitions
│   └── constants/         # Application constants
├── utils/                 # Utility functions
└── public/                # Static assets
```

## Features

- **Authentication System**: Login with username/password and facial recognition
- **User Management**: View and search through user profiles
- **Attendance Tracking**: Camera-based attendance marking
- **Responsive Design**: Mobile-first responsive UI
- **TypeScript**: Full type safety throughout the application
- **Firebase Integration**: Real-time database for user data

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Technology Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Firebase Firestore
- **Authentication**: Custom Firebase authentication
- **Image Handling**: Next.js Image optimization

## Project Architecture

### Component Organization
- **Feature-based structure**: Components organized by features (auth, camera, dashboard)
- **Small, focused components**: Each component has a single responsibility
- **Custom hooks**: Business logic extracted into reusable hooks
- **Reusable UI components**: Common patterns in `components/common/`

### Key Architectural Principles
- **Modularity**: Small components (< 150 lines) for better maintainability
- **Reusability**: Extracted common UI patterns and business logic
- **Type Safety**: Full TypeScript coverage with proper interfaces
- **Separation of Concerns**: Clear distinction between UI, business logic, and data

### Custom Hooks
- **useAuth**: Centralized authentication and session management
- **useCamera**: Camera access, control, and image capture functionality

### Type Safety
- **TypeScript interfaces**: Defined in `lib/types/` with proper exports
- **Strict typing**: All components, hooks, and services are fully typed
- **Type-safe API calls**: Utility functions with proper return types

### Firebase Integration
- **Configuration**: Centralized in `lib/firebase/config.ts`
- **Services**: Database operations abstracted in service layer

For detailed architecture documentation, see [ARCHITECTURE.md](./ARCHITECTURE.md)

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.