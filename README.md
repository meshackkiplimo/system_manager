# Personal Management System

A full-stack web application for managing personal tasks, finances, notes, and budgets.

## Features

- 📝 Task Management
- 💰 Finance Tracking
- 📒 Note Taking
- 💵 Budget Planning
- 🏷️ Category Management
- 🔐 User Authentication

## Tech Stack

### Backend
- Node.js with TypeScript
- Express.js for API routes
- PostgreSQL with Drizzle ORM
- JWT for authentication
- Jest for testing

### Frontend
- Next.js 15 with App Router
- React 19
- TypeScript
- TailwindCSS
- ESLint for code quality

## Project Structure

```
.
├── backend/                 # Backend API server
│   ├── src/
│   │   ├── controllers/    # Request handlers
│   │   ├── services/       # Business logic
│   │   ├── routes/        # API route definitions
│   │   └── drizzle/       # Database configuration
│   └── package.json
│
└── frontend/              # Next.js frontend
    └── task/
        ├── src/
        │   ├── app/       # Next.js app router
        │   └── components/  # React components
        └── package.json
```

## Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- PostgreSQL
- pnpm package manager

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
pnpm install
```

3. Create a `.env` file with your database configuration:
```
DATABASE_URL=postgres://user:password@localhost:5432/dbname
JWT_SECRET=your_jwt_secret
```

4. Run database migrations:
```bash
pnpm migrate
```

5. Start the development server:
```bash
pnpm dev
```

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend/task
```

2. Install dependencies:
```bash
pnpm install
```

3. Start the development server:
```bash
pnpm dev
```

The frontend will be available at http://localhost:3000

## Development Scripts

### Backend
- `pnpm dev` - Start development server with hot reload
- `pnpm test` - Run tests
- `pnpm build` - Build for production
- `pnpm generate` - Generate Drizzle migrations
- `pnpm migrate` - Run database migrations
- `pnpm seed` - Seed the database with initial data

### Frontend
- `pnpm dev` - Start development server using Turbopack
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

## API Routes

The backend provides the following main API endpoints:

- `/api/auth` - Authentication endpoints
- `/api/tasks` - Task management
- `/api/notes` - Note taking
- `/api/finance` - Financial tracking
- `/api/budget` - Budget planning
- `/api/categories` - Category management

## License

ISC