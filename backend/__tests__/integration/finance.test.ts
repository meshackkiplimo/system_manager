import db from "@/drizzle/db";
import { CategoriesTable, FinancesTable, UsersTable } from "@/drizzle/schema";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { date } from "drizzle-orm/mysql-core";



let userId: number;
let categoryId: number;

const testUser = {
    first_name: "Test",
    last_name: "User",
    username: `testuser_${Date.now()}`,
    email: `testuser_${Date.now()}@gmail.com`,
    password: "password123",
    role: "user",
    isVerified: true
}
const testCategory = {
    name: `Test Category ${Date.now()}`
}

const testFinance = {
    type: "income",
    amount: "1000.00",
    description: "Test income",
    date: new Date(),
}
beforeAll(async () => {
    // Create test user
    const hashedPassword = await bcrypt.hashSync(testUser.password, 10);
    const userResponse = await db.insert(UsersTable).values({
        ...testUser,
        password: hashedPassword
    }).returning();
    userId = userResponse[0].id;

    // Create test category with the generated userId
    const categoryResponse = await db.insert(CategoriesTable).values({
        ...testCategory,
        userId: userId
    }).returning();
    categoryId = categoryResponse[0].id;
}
);
afterAll(async () => {
    await db.delete(FinancesTable).where(eq(FinancesTable.userId, userId));
    await db.delete(CategoriesTable).where(eq(CategoriesTable.id, categoryId));
    await db.delete(UsersTable).where(eq(UsersTable.id, userId));
    
}
);

describe("Finance API", () => {
    it("should create a finance record", async () => {
        const financeResponse = await db.insert(FinancesTable).values({
            ...testFinance,
            userId: userId,
            categoryId: categoryId
        }).returning();
        
        
        expect(financeResponse.length).toBe(1);
        expect(financeResponse[0]).toHaveProperty("id");
        expect(financeResponse[0].type).toBe(testFinance.type);
        expect(financeResponse[0].amount).toBe(testFinance.amount);
        expect(financeResponse[0].description).toBe(testFinance.description);
        expect(financeResponse[0].date).toEqual(testFinance.date);
    });

    it("should get all finance records ", async () => {
        const finances = await db.select().from(FinancesTable).where(eq(FinancesTable.userId, userId));
        
        expect(finances.length).toBeGreaterThan(0);
        expect(finances[0]).toHaveProperty("id");
        expect(finances[0].userId).toBe(userId);
    });
});