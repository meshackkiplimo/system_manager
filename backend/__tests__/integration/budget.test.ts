import  request from "supertest";

import { app } from "../../index";
import bcrypt from "bcryptjs";
import db from "@/drizzle/db";
import { BudgetsTable, CategoriesTable, UsersTable } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

let userId: number;
let budgetId: number;
let categoryId: number;
const timestamp = Date.now();

let testUser = {
    first_name: "Test",
    last_name: "User",
    username: `testuser_${timestamp}`,
    email: `testuser_${timestamp}@gmail.com`,
    password: "password123",
    role: "user",
    isVerified: true
}

let testCategory = {
    name: `Test Category ${timestamp}`
}

let testBudget = {
    amount: 1000,
    period: "monthly",
    startDate: new Date(),
    endDate: new Date(new Date().setMonth(new Date().getMonth() + 1))
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
});

afterAll(async () => {
    await db.delete(BudgetsTable).where(eq(BudgetsTable.id, budgetId));
    await db.delete(CategoriesTable).where(eq(CategoriesTable.id, categoryId));
    await db.delete(UsersTable).where(eq(UsersTable.id, userId));
});

describe("Budget API", () => {
    it("should create a budget", async () => {
        try {
            const budget = {
                userId: userId,
                categoryId: categoryId,
                amount: testBudget.amount,
                period: testBudget.period,
                startDate: testBudget.startDate.toISOString(),
                endDate: testBudget.endDate.toISOString()
            }
            
            console.log('Request payload:', budget); // Debug logging
            
            const res = await request(app)
                .post('/budgets')
                .send(budget)
                .set('Authorization', `Bearer ${userId}`);
            
            console.log('Response:', res.body); // Debug logging
            
            expect(res.status).toBe(201);
            expect(res.body).toHaveProperty('message', 'Budget created successfully');
            
            // Store the created budget ID for cleanup
            if (res.body.budget && res.body.budget.id) {
                budgetId = res.body.budget.id;
            } else {
                console.error('Missing budget ID in response:', res.body);
            }
        } catch (error) {
            console.error('Test error:', error);
            throw error;
        }
    });
    it("should get all budgets", async () => {
        const res = await request(app)
            .get('/budgets')
            // .set('Authorization', `Bearer ${userId}`);
        
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body.budgets)).toBe(true);
        expect(res.body.budgets.length).toBeGreaterThan(0);
    });
    it("should get a budget by ID", async () => {
        if (!budgetId) {
            throw new Error("No budget ID available for testing");
        }
        
        const res = await request(app)
            .get(`/budgets/${budgetId}`)
            // .set('Authorization', `Bearer ${userId}`);
        
        expect(res.status).toBe(200);
        
    });
});