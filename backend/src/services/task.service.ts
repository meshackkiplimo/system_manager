import { sql } from "drizzle-orm";
import db from "../drizzle/db";
import { TasksTable } from "../drizzle/schema";
import { TITask } from "../../types";






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

export const updateTaskService = async (id: string, task: Partial<TITask>) => {

    const updatedTask = await db
        .update(TasksTable)
        .set(task)
        .where(sql`${TasksTable.id}=${id}`)
        .returning();
    
    return updatedTask[0] || null;

}

export const deleteTaskService = async (id: string) => {
    const deletedTask = await db
        .delete(TasksTable)
        .where(sql`${TasksTable.id}=${id}`)
        .returning();
    
    return deletedTask[0] || null;
}