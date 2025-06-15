import { Request, Response } from 'express';

import { createBudgetService, getAllBudgetsService, getBudgetByIdService, updateBudgetService } from '../services/budget.service';





export const createBudgetController = async (req: Request, res: Response) => {
    try {
        const budget = req.body;
        
        // Log incoming request
        console.log('Create budget request:', {
            ...budget,
            startDate: budget.startDate,
            endDate: budget.endDate
        });

        // Validate required fields
        if (!budget.userId || !budget.amount || !budget.period || !budget.startDate) {
            const missingFields = [];
            if (!budget.userId) missingFields.push('userId');
            if (!budget.amount) missingFields.push('amount');
            if (!budget.period) missingFields.push('period');
            if (!budget.startDate) missingFields.push('startDate');

            console.error('Missing required fields:', missingFields);
            return res.status(400).json({
                message: "Budget creation failed",
                error: `Missing required fields: ${missingFields.join(', ')}`
            });
        }

        const newBudget = await createBudgetService(budget);
        if (!newBudget) {
            console.error('Budget creation failed in service');
            return res.status(400).json({ message: "Budget creation failed in service" });
        }

        console.log('Budget created successfully:', newBudget);
        res.status(201).json({
            message: "Budget created successfully",
            budget: newBudget
        });
    } catch (error) {
        console.error("Error in createBudgetController:", error);
        res.status(500).json({
            message: "Internal Server Error",
            error: error instanceof Error ? error.message : String(error)
        });
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

