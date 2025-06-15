import { sql } from "drizzle-orm";
import db from "../drizzle/db";
import { BudgetsTable} from "../drizzle/schema";
import { TIBudget } from "../../types";






export const createBudgetService = async (budget: TIBudget): Promise<TIBudget | null> => {
    try {
        // Validate required fields
        if (!budget.userId || !budget.amount || !budget.period || !budget.startDate) {
            console.error('Missing required fields:', { budget });
            return null;
        }

        // Log the incoming budget data
        console.log('Creating budget with data:', {
            ...budget,
            startDate: budget.startDate instanceof Date ? budget.startDate.toISOString() : budget.startDate,
            endDate: budget.endDate instanceof Date ? budget.endDate.toISOString() : budget.endDate
        });

        const newBudget = await db.insert(BudgetsTable).values({
            ...budget,
            // Ensure dates are properly formatted
            startDate: budget.startDate instanceof Date ? budget.startDate : new Date(budget.startDate),
            endDate: budget.endDate instanceof Date ? budget.endDate : budget.endDate ? new Date(budget.endDate) : null
        }).returning();

        const newBudgetData = newBudget[0];
        console.log('Created budget:', newBudgetData);
        return newBudgetData;
    } catch (error) {
        console.error('Error in createBudgetService:', error);
        throw error;
    }
}

export const getBudgetByIdService = async(id:string)=>{
    const budgetOne = await db.query.BudgetsTable.findFirst({
        columns:{
            amount:true,
            id:true,
            startDate:true,
            endDate:true,
            categoryId:true,
            period:true,
            userId:true


            
        },
        where:sql`${BudgetsTable.id}=${id}`

        




    })
    return budgetOne || null;



}

export const getAllBudgetsService = async () => {
    const budgetAll = await db.query.BudgetsTable.findMany({
        columns:{
            id: true,
            amount: true,
            startDate: true,
            endDate: true,
            period: true,
            userId: true,
            categoryId: true


        },
        with:{
            category:{
                columns:{
                    id:true,
                    name:true
                }
            },
            user: {
                columns: {
                    id: true,
                    username: true
                }
            }

        }

    })
    return budgetAll || [];

}

export const updateBudgetService = async (id: string, budget: Partial<TIBudget>) => {
    const updatedBudget = await db
    .update(BudgetsTable)
    .set(budget)
    .where(sql`${BudgetsTable.id} = ${id}`)
    .returning();
    return updatedBudget[0] || null;
}

export const deleteBudgetService = async (id: string) => {
    const deletedBudget = await db
    .delete(BudgetsTable)
    .where(sql`${BudgetsTable.id} = ${id}`)
    .returning();
    return deletedBudget[0] || null;
}
    