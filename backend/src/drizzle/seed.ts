import db from "./db";
import {
    UsersTable,
    CategoriesTable,
    FinancesTable,
    BudgetsTable,
    TasksTable,
    NotesTable,
    PlansTable
} from "./schema";





async function seed() {
    console.log("......seeding started......");

    // Insert users
   await db.insert(UsersTable).values([
        { first_name: "Mesh", last_name: "Smith", username: "mesh", email: "jj@gmail.com", password: "password123", role: "user", isVerified: true },
        { first_name: "John", last_name: "Doe", username: "john", email: "doe@gmail.com", password: "password123", role: "user", isVerified: true },
        { first_name: "Sarah", last_name: "Connor", username: "sarah", email: "sss@gmail.com", password: "password123", role: "user", isVerified: true },
        { first_name: "David", last_name: "Wilson", username: "david", email: "david@gmail.com", password: "password123", role: "user", isVerified: true },
        { first_name: "Emma", last_name: "Brown", username: "emma", email: "emma@gmail.com", password: "password123", role: "user", isVerified: true },
        { first_name: "Michael", last_name: "Taylor", username: "michael", email: "michael@gmail.com", password: "password123", role: "user", isVerified: true },
        { first_name: "Lisa", last_name: "Anderson", username: "lisa", email: "lisa@gmail.com", password: "password123", role: "user", isVerified: true },
        { first_name: "James", last_name: "Martinez", username: "james", email: "james@gmail.com", password: "password123", role: "user", isVerified: true },
        { first_name: "Anna", last_name: "Garcia", username: "anna", email: "anna@gmail.com", password: "password123", role: "user", isVerified: true },
        { first_name: "Kevin", last_name: "Lee", username: "kevin", email: "kevin@gmail.com", password: "password123", role: "user", isVerified: true }
   ])

    // Insert categories for each user
    await db.insert(CategoriesTable).values([
        // User 1 (mesh) categories
        { userId: 1, name: "Housing" },
        { userId: 1, name: "Transportation" },
        { userId: 1, name: "Food" },
        { userId: 1, name: "Utilities" },
        { userId: 1, name: "Entertainment" },
        { userId: 1, name: "Healthcare" },
        { userId: 1, name: "Education" },
        // User 2 (john) categories
        { userId: 2, name: "Housing" },
        { userId: 2, name: "Food" },
        { userId: 2, name: "Entertainment" },
        // User 3 (sarah) categories
        { userId: 3, name: "Housing" },
        { userId: 3, name: "Transportation" },
        { userId: 3, name: "Food" },
        // User 4 (david) categories
        { userId: 4, name: "Housing" },
        { userId: 4, name: "Utilities" }
    ]);

    // Insert finances for multiple users
    await db.insert(FinancesTable).values([
        // User 1 (mesh) finances
        {
            userId: 1,
            type: "expense",
            amount: "1000.00",
            description: "Monthly rent",
            categoryId: 1,
            date: new Date("2025-06-01")
        },
        {
            userId: 1,
            type: "income",
            amount: "5000.00",
            description: "Monthly salary",
            categoryId: 1,
            date: new Date("2025-06-01")
        },
        // User 2 (john) finances
        {
            userId: 2,
            type: "expense",
            amount: "800.00",
            description: "Rent payment",
            categoryId: 8,
            date: new Date("2025-06-01")
        },
        // User 3 (sarah) finances
        {
            userId: 3,
            type: "expense",
            amount: "500.00",
            description: "Car payment",
            categoryId: 12,
            date: new Date("2025-06-01")
        },
        // User 4 (david) finances
        {
            userId: 4,
            type: "income",
            amount: "4500.00",
            description: "Salary",
            categoryId: 14,
            date: new Date("2025-06-01")
        }
    ]);

    // Insert budgets for multiple users
    await db.insert(BudgetsTable).values([
        // User 1 (mesh) budgets
        {
            userId: 1,
            categoryId: 1,
            amount: "1200.00",
            period: "monthly",
            startDate: new Date("2025-06-01"),
            endDate: new Date("2025-12-31")
        },
        // User 2 (john) budgets
        {
            userId: 2,
            categoryId: 8,
            amount: "900.00",
            period: "monthly",
            startDate: new Date("2025-06-01"),
            endDate: new Date("2025-12-31")
        },
        // User 3 (sarah) budgets
        {
            userId: 3,
            categoryId: 12,
            amount: "600.00",
            period: "monthly",
            startDate: new Date("2025-06-01"),
            endDate: new Date("2025-12-31")
        }
    ]);

    // Insert tasks for multiple users
    await db.insert(TasksTable).values([
        // User 1 (mesh) tasks
        {
            userId: 1,
            title: "Pay rent",
            description: "Pay monthly rent for apartment",
            dueDate: new Date("2025-06-05"),
            completed: false,
            priority: "high"
        },
        // User 2 (john) tasks
        {
            userId: 2,
            title: "Car maintenance",
            description: "Take car for service",
            dueDate: new Date("2025-06-10"),
            completed: false,
            priority: "medium"
        },
        // User 3 (sarah) tasks
        {
            userId: 3,
            title: "Job interview",
            description: "Prepare for tech interview",
            dueDate: new Date("2025-06-15"),
            completed: false,
            priority: "high"
        },
        // User 4 (david) tasks
        {
            userId: 4,
            title: "Team meeting",
            description: "Weekly team sync",
            dueDate: new Date("2025-06-03"),
            completed: false,
            priority: "medium"
        }
    ]);

    // Insert notes for multiple users
    await db.insert(NotesTable).values([
        // User 1 (mesh) notes
        {
            userId: 1,
            title: "Budget Planning",
            content: "Need to review monthly budget and cut down on unnecessary expenses",
            priority: "high"
        },
        // User 2 (john) notes
        {
            userId: 2,
            title: "Project Ideas",
            content: "List of potential side projects to work on",
            priority: "medium"
        },
        // User 3 (sarah) notes
        {
            userId: 3,
            title: "Learning Goals",
            content: "Topics to study for career development",
            priority: "high"
        },
        // User 4 (david) notes
        {
            userId: 4,
            title: "Meeting Notes",
            content: "Action items from team meetings",
            priority: "medium"
        }
    ]);

    // Insert plans for multiple users
    await db.insert(PlansTable).values([
        // User 1 (mesh) plans
        {
            userId: 1,
            title: "Vacation Planning",
            description: "Plan summer vacation budget and itinerary",
            startDate: new Date("2025-07-01"),
            endDate: new Date("2025-07-15")
        },
        // User 2 (john) plans
        {
            userId: 2,
            title: "Career Development",
            description: "Plan for professional certification",
            startDate: new Date("2025-07-01"),
            endDate: new Date("2025-12-31")
        },
        // User 3 (sarah) plans
        {
            userId: 3,
            title: "Fitness Goal",
            description: "Training plan for marathon",
            startDate: new Date("2025-06-15"),
            endDate: new Date("2025-12-15")
        },
        // User 4 (david) plans
        {
            userId: 4,
            title: "Business Plan",
            description: "Strategy for Q3 and Q4",
            startDate: new Date("2025-07-01"),
            endDate: new Date("2025-12-31")
        }
    ]);

    console.log("......seeding completed......");
}

// Execute the seed function
seed().catch((error) => {
    console.error("Error seeding database:", error);
    process.exit(1);
});