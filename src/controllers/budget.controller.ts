import { Request, Response } from 'express';
import { Express } from 'express';
import { createBudgetService, getAllBudgetsService, getBudgetByIdService, updateBudgetService } from '../services/budget.service';
import { TSBudget } from '../drizzle/schema';




export const createBudgetController = async (req:Request,res:Response) => {

    try {
        const budget= req.body
        const newBudget = await createBudgetService(budget);
        if (!newBudget) {
            res.status(400).json({ message: "Budget creation failed" });
            return;
        }
        res.status(201).json({
            message: "Budget created successfully",
            budget: newBudget
        });
        
    } catch (error) {
        console.error("Error in createBudgetController:", error);
        res.status(500).json({ message: "Internal Server Error" });
        
    }
    
}


export const getAllBudgetsController = async (req:Request, res:Response) => {
    try {
        
        const allBudgets = await getAllBudgetsService();
        if (!allBudgets ) {
            res.status(404).json({ message: "No budgets found" });
            return;
        }
        res.status(200).json({
            message: "Budgets retrieved successfully",
            budgets: allBudgets
        });
        
        
    } catch (error) {
        console.error("Error in getAllBudgetsController:", error);
        res.status(500).json({ message: "Internal Server Error" });
        
    }
}

export const getBudgetByIdController = async (req:Request, res:Response) => {
    try {
        const budgetId = req.params.id;
      
        const budgetById = await getBudgetByIdService(budgetId); 
        if (!budgetById) {
            res.status(404).json({ message: "Budget not found" });
            return;
        }
        res.status(200).json({
            message: "Budget retrieved successfully",
            budget: budgetById
        });
        
    } catch (error) {
        console.error("Error in getBudgetByIdController:", error);
        res.status(500).json({ message: "Internal Server Error" });
        
    }
}


export const updateBudgetController = async (req:Request, res:Response) => {
    try {
        const budgetId = req.params.id
        const updatedBudget = await updateBudgetService(budgetId,req.body)
        if (!updatedBudget) {
            res.status(404).json({ message: "Budget not found or update failed" });
            return;
        }
        res.status(200).json({
            message: "Budget updated successfully",
            budget: updatedBudget
        });

        
    } catch (error) {
        console.error("Error in updateBudgetController:", error);
        res.status(500).json({ message: "Internal Server Error" });
        
    }
}

