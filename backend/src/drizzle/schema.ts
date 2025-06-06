import { relations } from 'drizzle-orm';
import { pgTable, serial, varchar, text, timestamp, decimal, boolean, integer } from 'drizzle-orm/pg-core';

export const UsersTable = pgTable('users', {
  id: serial('id').primaryKey(),
  first_name: varchar('firstname', { length: 50 }).notNull(),
  last_name: varchar('lastname', { length: 50 }).notNull(),
  username: varchar('username', { length: 50 }).notNull().unique(),
  email: varchar('email', { length: 100 }).notNull().unique(),
  password: varchar('password', { length: 255 }).notNull(),
  role: varchar('role', { length: 20 }).default('user').notNull(), // 'user' or 'admin'
  isVerified: boolean('is_verified').default(false).notNull(),
  
});

export const CategoriesTable = pgTable('categories', {
  id: serial('id').primaryKey(),
  userId: serial('user_id').references(() => UsersTable.id).notNull(),
  name: varchar('name', { length: 50 }).notNull(),
  
});

export const FinancesTable = pgTable('finances', {
  id: serial('id').primaryKey(),
  userId: serial('user_id').references(() => UsersTable.id).notNull(),
  type: varchar('type', { length: 20 }).notNull(), // 'income' or 'expense'
  amount: decimal('amount', { precision: 10, scale: 2 }).notNull(),
  description: text('description'),
  categoryId: serial('category_id').references(() => CategoriesTable.id),
  date: timestamp('date').notNull(),
  
});

export const BudgetsTable = pgTable('budgets', {
  id: serial('id').primaryKey(),
  userId: serial('user_id').references(() => UsersTable.id).notNull(),
  categoryId: serial('category_id').references(() => CategoriesTable.id),
  amount: decimal('amount', { precision: 10, scale: 2 }).notNull(),
  period: varchar('period', { length: 20 }).notNull(), // e.g., 'monthly', 'yearly'
  startDate: timestamp('start_date').notNull(),
  endDate: timestamp('end_date'),
  
});

export const TasksTable = pgTable('tasks', {
  id: serial('id').primaryKey(),
  userId: serial('user_id').references(() => UsersTable.id).notNull(),
  title: varchar('title', { length: 100 }).notNull(),
  description: text('description'),
  dueDate: timestamp('due_date'),
  completed: boolean('completed').default(false).notNull(),
  priority: varchar('priority', { length: 20 }).default('medium').notNull(), // 'high', 'medium', 'low'
  
});

export const NotesTable = pgTable('notes', {
  id: serial('id').primaryKey(),
  userId: serial('user_id').references(() => UsersTable.id).notNull(),
  title: varchar('title', { length: 100 }).notNull(),
  content: text('content').notNull(),
  priority: varchar('priority', { length: 20 }).default('medium').notNull(),
  
});

export const PlansTable = pgTable('plans', {
  id: serial('id').primaryKey(),
  userId: serial('user_id').references(() => UsersTable.id).notNull(),
  title: varchar('title', { length: 100 }).notNull(),
  description: text('description'),
  startDate: timestamp('start_date').notNull(),
  endDate: timestamp('end_date'),
  
});


// reltions
export const UserRelations = relations(UsersTable, ({ many }) => ({
  categories: many(CategoriesTable),
  finances: many(FinancesTable),
  budgets: many(BudgetsTable),
  tasks: many(TasksTable),
  notes: many(NotesTable),
  plans: many(PlansTable),
}));

export const CategoryRelations = relations(CategoriesTable, ({ one, many }) => ({
  user: one(UsersTable, {
    fields: [CategoriesTable.userId],
    references: [UsersTable.id],
  }),
  finances: many(FinancesTable),
  budgets: many(BudgetsTable),
}));

export const FinanceRelations = relations(FinancesTable, ({ one }) => ({
  user: one(UsersTable, {
    fields: [FinancesTable.userId],
    references: [UsersTable.id],
  }),
  category: one(CategoriesTable, {
    fields: [FinancesTable.categoryId],
    references: [CategoriesTable.id],
  }),
}));

export const BudgetRelations = relations(BudgetsTable, ({ one }) => ({
  user: one(UsersTable, {
    fields: [BudgetsTable.userId],
    references: [UsersTable.id],
  }),
  category: one(CategoriesTable, {
    fields: [BudgetsTable.categoryId],
    references: [CategoriesTable.id],
  }),
}));

export const TaskRelations = relations(TasksTable, ({ one }) => ({
  user: one(UsersTable, {
    fields: [TasksTable.userId],
    references: [UsersTable.id],
  }),
}));

export const NoteRelations = relations(NotesTable, ({ one }) => ({
  user: one(UsersTable, {
    fields: [NotesTable.userId],
    references: [UsersTable.id],
  }),
}));

export const PlanRelations = relations(PlansTable, ({ one }) => ({
  user: one(UsersTable, {
    fields: [PlansTable.userId],
    references: [UsersTable.id],
  }),
}));

// Inferred Types

