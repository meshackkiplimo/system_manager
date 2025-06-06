import { sql } from "drizzle-orm";
import db from "../drizzle/db";
import { TasksTable, TITask } from "../drizzle/schema";






export const createTaskService = async (task: TITask) => {

    const newTask = await db.insert(TasksTable).values(task).returning();
    return newTask[0] || null;
    
}

export const getTaskByIdService = async (id: string) => {
    const task = await db.query.TasksTable.findFirst({
        columns: {
            id: true,
            userId: true,
            title: true,
            description: true,
            dueDate: true,
            completed: true,
            priority: true
        },
        where: sql`${TasksTable.id}=${id}`
    });
    return task || null;
}


export const getAllTasksService = async () => {
    const tasks = await db.query.TasksTable.findMany({
        columns: {
            id: true,
            userId: true,
            title: true,
            description: true,
            dueDate: true,
            completed: true,
            priority: true
        }
    });
    return tasks || [];
}