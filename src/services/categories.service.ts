import { sql } from "drizzle-orm";
import db from "../drizzle/db";
import {
    CategoriesTable,
    BudgetsTable,
    FinancesTable,
    TICategory,
    TSCategory
} from "../drizzle/schema";


export const createCategoriesService = async (categories:TICategory) => {

    const newCategory = await db.insert(CategoriesTable).values(categories).returning();
    const newCategoryData = newCategory[0];
    return newCategoryData;

    
}

export const getCategoriesByIdService = async (id: string) => {
    const result = await db.query.CategoriesTable.findFirst({
       columns: {
            id: true,
            name: true,
          
            userId: true
        },
        where: sql`${CategoriesTable.id} = ${id}`
        
    
       }
    );
    return result || null;

}

export const getAllCategoriesService = async () => {
    const result = await db.query.CategoriesTable.findMany({
        columns: {
            id: true,
            name: true,
            userId: true
        }
    });
    return result;
}

export const getCategoryByIdService = async (id: string) => {
    const result = await db.query.CategoriesTable.findFirst({
        columns: {
            id: true,
            name: true,
            userId: true
        },
        where: sql`${CategoriesTable.id} = ${id}`
    });
    return result || null;

}

export const updateCategoryService = async (id: string, category: Partial<TICategory>): Promise<TICategory | null> => {
    try {
        // Check if category exists
        const existingCategory = await getCategoryByIdService(id);
        if (!existingCategory) {
            return null;
        }

        // Update only provided fields
        const updatedCategory = await db.update(CategoriesTable)
            .set({
                ...existingCategory,
                ...category
            })
            .where(sql`${CategoriesTable.id} = ${id}`)
            .returning();

        return updatedCategory[0] || null;
    } catch (error) {
        console.error("Error in updateCategoryService:", error);
        throw error;
    }
}

export const deleteCategoryService = async (id: string) => {
    try {
        // First, delete all related finances
        await db.delete(FinancesTable)
            .where(sql`${FinancesTable.categoryId} = ${id}`);

        // Then, delete all related budgets
        await db.delete(BudgetsTable)
            .where(sql`${BudgetsTable.categoryId} = ${id}`);

        // Finally, delete the category
        const deletedCategory = await db.delete(CategoriesTable)
            .where(sql`${CategoriesTable.id} = ${id}`)
            .returning();
        return deletedCategory[0] || null;
    } catch (error) {
        console.error("Error in deleteCategoryService:", error);
        throw error;
    }
}