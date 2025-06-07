import { sql } from "drizzle-orm";
import db from "../drizzle/db";
import { FinancesTable} from "../drizzle/schema";
import { TIFinance } from "../../types";




export const createFinanceService = async (finance:TIFinance) :Promise < TIFinance | null > => {
    const newFinance = await db.insert(FinancesTable).values(finance).returning();
    return newFinance[0];
    


    
}

export const getFinanceByIdService = async (id:number) => {
    const oneFinance = await db.query.FinancesTable.findFirst({
        columns:{
            id:true,
            userId:true,
            type:true,
            amount:true,
            date:true,
            description:true,
            categoryId:true
        },
        with: {
            category: {
                columns: {
                    id: true,
                    name: true
                }
            },
            user: {
                columns: {
                    id: true,
                    username: true
                }
            }
        },
        where: sql`${FinancesTable.id}=${id}`
    })
    return oneFinance ;
}

export const getAllFinancesService = async () => {

    const allFinances = await db.query.FinancesTable.findMany({
        columns: {
            id: true,
            userId: true,
            type: true,
            amount: true,
            date: true,
            description: true,
            categoryId: true
        },
        with: {
            category: {
                columns: {
                    id: true,
                    name: true
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
    return allFinances || [];
}