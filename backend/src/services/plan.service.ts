import db from "@/drizzle/db";




export const getAllPlansService = async () => {
    const plans = await db.query.PlansTable.findMany({
        columns: {
            id: true,
           userId: true,
            title: true,
            description: true,
            startDate: true,
            endDate: true,
           
            
        }
    });
    return plans || [];
}