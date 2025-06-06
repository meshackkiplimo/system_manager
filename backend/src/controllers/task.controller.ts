import { createTaskService, getAllTasksService } from "../services/task.service";
import { Request, Response } from "express";






export const createTaskController = async (req:Request, res:Response) => {
    try {
        const task = req.body;
        const newTask = await createTaskService(task);
        if (!newTask) {
            return res.status(400).json({ message: "Failed to create task" });
        }
        return res.status(201).json(newTask);
        
    } catch (error) {
        console.error("Error creating task:", error);
        return res.status(500).json({ message: "Internal server error" });
        
    }
    
}

export const getAllTaskController = async (req: Request, res: Response) => {

    try {
        const tasks = await getAllTasksService();
        if (!tasks || tasks.length === 0) {
            return res.status(404).json({ message: "No tasks found" });
        }
        return res.status(200).json(tasks);
        
    } catch (error) {
        console.error("Error fetching tasks:", error);
        return res.status(500).json({ message: "Internal server error" });
        
    }
}