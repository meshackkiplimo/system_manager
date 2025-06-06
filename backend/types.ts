
import {UsersTable,CategoriesTable,FinancesTable,BudgetsTable,TasksTable, NotesTable, PlansTable }from "./src/drizzle/schema"







export type TIUser = typeof UsersTable.$inferInsert;
export type TSUser = typeof UsersTable.$inferSelect;
export type TICategory = typeof CategoriesTable.$inferInsert;
export type TSCategory = typeof CategoriesTable.$inferSelect;
export type TIFinance = typeof FinancesTable.$inferInsert;
export type TSFinance = typeof FinancesTable.$inferSelect;
export type TIBudget = typeof BudgetsTable.$inferInsert;
export type TSBudget = typeof BudgetsTable.$inferSelect;
export type TITask = typeof TasksTable.$inferInsert;
export type TSTask = typeof TasksTable.$inferSelect;
export type TINote = typeof NotesTable.$inferInsert;
export type TSNote = typeof NotesTable.$inferSelect;
export type TIPlan = typeof PlansTable.$inferInsert;
export type TSPlan = typeof PlansTable.$inferSelect;