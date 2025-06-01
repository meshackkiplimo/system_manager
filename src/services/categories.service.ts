import { sql } from "drizzle-orm";
import db from "../drizzle/db";
import { CategoriesTable, TICategory, TSCategory } from "../drizzle/schema";






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

export const getAllCategoriesService = async (categories:TSCategory) => {
    const result = await db.query.CategoriesTable.findMany({
        columns: {
            id: true,
            name: true,
            userId: true
        },
        where: sql`${CategoriesTable.id} = ${categories.id}`
    });
    return result || null;

}