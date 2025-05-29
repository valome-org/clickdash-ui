# ClickDash UI Installation Guide

This guide will help you set up the UI component of ClickDash, a Next.js-based frontend application.

## Prerequisites

- Node.js 18.x or higher
- npm 9.x or higher (comes with Node.js)
- Git

## Installation Steps

### 1. Clone the Repository

```bash
git clone <repository-url>
cd clickdash/ui
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the UI root directory with the following variables:

```
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:8000/api

# Authentication
NEXT_PUBLIC_AUTH_ENABLED=true
```

Adjust the API URL if your backend is running on a different host or port.

### 4. Run Development Server

```bash
npm run dev
```

This will start the development server with Turbopack. The application will be available at `http://localhost:3000`.

### 5. Build for Production

When you're ready to deploy:

```bash
npm run build
```

### 6. Start Production Server

```bash
npm run start
```

The production server will be available at `http://localhost:3000` (or the port specified in your environment variables).

## Project Structure

The UI project follows the standard Next.js 15.x structure:

- `src/`: Main source code
  - `app/`: App router components and pages
  - `components/`: Reusable UI components
  - `lib/`: Utility functions and shared code
- `public/`: Static assets
- `tailwind.config.js`: Tailwind CSS configuration
- `next.config.ts`: Next.js configuration

## Tailwind CSS

This project uses Tailwind CSS for styling. Utility classes can be used directly in your components.

## Adding New Components

Follow the project's component structure and use the existing patterns. The project uses:
- Radix UI for accessible primitives
- clsx and tailwind-merge for class composition
- Lucide React for icons

## Troubleshooting

If you encounter issues:

1. Make sure you're using the correct Node.js version
2. Verify that the API server is running and accessible
3. Check your `.env.local` file for correct configuration
4. Clear your browser cache if you experience UI inconsistencies

For more detailed information, refer to the project's main documentation.
