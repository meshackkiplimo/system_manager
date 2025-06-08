import { createTaskService, deleteTaskService, getAllTasksService, getTaskByIdService, updateTaskService } from "../services/task.service";
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

export const getTaskByIdController = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const task = await getTaskByIdService(id);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        return res.status(200).json(task);
        
    } catch (error) {
        console.error("Error fetching task:", error);
        return res.status(500).json({ message: "Internal server error" });
        
    }
}

export const updateTaskController = async (req: Request, res: Response) => {
    const { id } = req.params;
    const taskUpdates = req.body;

    try {
        const updatedTask = await updateTaskService(id, taskUpdates);
        if (!updatedTask) {
            return res.status(404).json({ message: "Task not found or update failed" });
        }
        return res.status(200).json(updatedTask);
        
    } catch (error) {
        console.error("Error updating task:", error);
        return res.status(500).json({ message: "Internal server error" });
        
    }
}

export const deleteTaskController = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const deletedTask = await deleteTaskService(id);
        if (!deletedTask) {
            return res.status(404).json({ message: "Task not found or deletion failed" });
        }
        return res.status(200).json({ message: "Task marked as completed", task: deletedTask });
        
    } catch (error) {
        console.error("Error deleting task:", error);
        return res.status(500).json({ message: "Internal server error" });
        
    }
}