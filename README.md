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

## Database Schema and Relationships

```
Users
+--------------------+
|        id         |
|     username      |
|      email        |
|     password      |
+--------------------+
         ▲
         │
         │ 1:N
         │
    +-----------+-----------+-----------+-----------+
    │           │           │           │           │
    │           │           │           │           │
    ▼           ▼           ▼           ▼           ▼
Categories    Tasks       Notes      Plans     Finances
+--------+  +--------+  +--------+  +--------+ +--------+
|   id   |  |   id   |  |   id   |  |   id   | |   id   |
|user_id |  |user_id |  |user_id |  |user_id | |user_id |
| name   |  | title  |  | title  |  | title  | | type   |
+--------+  |  desc  |  |content |  |  desc  | |amount  |
    ▲       |dueDate |  |priority|  |startDate| |  desc  |
    │       |priority|  +--------+  |endDate | |category_|
    │       +--------+             +--------+ |   id    |
    │                                        +--------+
    │                                             ▲
    │                                             │
    │              Budgets                        │
    │           +----------+                      │
    └-----------|    id    |                      │
                | user_id  |----------------------┘
                |category_id|
                |  amount  |
                |  period  |
                |startDate |
                | endDate  |
                +----------+
```

### Table Relationships

1. **Users** - Central entity that owns all other resources
   - One user can have many categories, tasks, notes, plans, finances, and budgets
   - Primary key for user authentication and resource ownership

2. **Categories** - Classifies finances and budgets
   - Belongs to one user (user_id)
   - Can be linked to multiple finances and budgets
   - Used for organizing financial transactions and budget planning

3. **Finances** - Tracks income and expenses
   - Belongs to one user (user_id)
   - Can be assigned to one category (category_id)
   - Stores transaction amount, type (income/expense), and date

4. **Budgets** - Sets spending limits by category
   - Belongs to one user (user_id)
   - Linked to one category (category_id)
   - Defines budget period (monthly/yearly) and amount

5. **Tasks** - Manages to-do items
   - Belongs to one user (user_id)
   - Includes due date, priority, and completion status
   - Independent of other entities except user

6. **Notes** - Stores user notes
   - Belongs to one user (user_id)
   - Contains title, content, and priority
   - Independent of other entities except user

7. **Plans** - Manages long-term planning
   - Belongs to one user (user_id)
   - Includes start and end dates
   - Independent of other entities except user

### Key Points for Querying

1. Always join through user_id when querying related data
2. Use category_id to link finances with their categories
3. Budget queries can combine with categories and finances for spending analysis
4. Tasks, notes, and plans are standalone entities only linked to users
5. All tables include timestamps for tracking creation/updates

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