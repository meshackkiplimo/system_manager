import { sql } from "drizzle-orm";
import db from "../drizzle/db";
import { BudgetsTable, TIBudget, TICategory } from "../drizzle/schema";






export const createBudgetService = async (budget:TIBudget) :Promise<TIBudget |null > => {

    const newBidget = await db.insert(BudgetsTable).values(budget).returning();
    const newBudgetData = newBidget[0];
    return newBudgetData;
    

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
    