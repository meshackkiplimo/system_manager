import { createBudgetService, getAllBudgetsService, getBudgetByIdService } from '@/services/budget.service';
import db from '../../src/drizzle/db'

jest.mock('../../src/drizzle/db', () => ({

    insert: jest.fn(),
    query: {
        BudgetsTable: {
            findFirst: jest.fn(),
            findMany: jest.fn()
        }
    }
}));

beforeEach(() => {
    jest.clearAllMocks();
});

describe ("budget service",()=>{
    const mockBudget = {
        id: 1,
        userId: 123,
        categoryId: 456,
        amount: "1000.00",
        period: 'monthly',
        startDate: new Date('2023-01-01'),
        endDate: new Date('2023-12-31')
    };
    const mockBudgetWithDetails ={
        ...mockBudget,
        category: {
            id: 456,
            name: 'Groceries'
        },
        user:{
            id: 123,
            first_name: 'John',
            last_name: 'Doe',
            username: 'johndoe',
            email: ''
        }

    }

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("createBudgetService", () => {
        it("should create a new budget", async () => {
            (db.insert as jest.Mock).mockReturnValue({
                values: jest.fn().mockReturnValue({
                    returning: jest.fn().mockResolvedValue([mockBudget])
                })
            });

            const result = await createBudgetService(mockBudget);
            expect(result).toEqual(mockBudget);
        });

        it("should throw an error if budget creation fails", async () => {
            (db.insert as jest.Mock).mockReturnValue({
                values: jest.fn().mockReturnValue({
                    returning: jest.fn().mockRejectedValue(new Error("Budget creation failed"))
                })
            });

            await expect(createBudgetService(mockBudget)).rejects.toThrow("Budget creation failed");
        });
    });

    it("should get a budget by ID", async () => {
        (db.query.BudgetsTable.findFirst as jest.Mock).mockResolvedValue(mockBudget);

        const result = await getBudgetByIdService('1');
        expect(result).toEqual(mockBudget);
    });
    it("should return null if budget not found", async () => {
        (db.query.BudgetsTable.findFirst as jest.Mock).mockResolvedValue(null);

        const result = await getBudgetByIdService('999');
        expect(result).toBeNull();
    }
    );
    it("should get all budgets with user and category details", async () => {
        (db.query.BudgetsTable.findMany as jest.Mock).mockResolvedValue([mockBudgetWithDetails]);

        const result = await getAllBudgetsService();
        expect(result).toEqual([mockBudgetWithDetails]);
        expect(db.query.BudgetsTable.findMany).toHaveBeenCalledWith({
            columns: {
                id: true,
                amount: true,
                startDate: true,
                endDate: true,
                period: true,
                userId: true,
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
                        username: true,
                        first_name: true,
                        last_name: true
                    }
                }
            }
        });
    })
        


})