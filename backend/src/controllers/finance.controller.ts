
import { createFinanceService, getAllFinancesService, getFinanceByIdService } from "../services/finance.service"
import { Request, Response } from "express";






export const createFinanceController = async (req: Request, res: Response) => {
    try {
        const finance = req.body
        const newFinace = await createFinanceService(finance)
        if (!newFinace) {
            res.status(400).json({ message: "Finance creation failed" });
            return;
        }
        res.status(201).json({
            message: "Finance created successfully",
            finance: newFinace
        });

        
    } catch (error) {
        console.error("Error in createFinanceController:", error);
        res.status(500).json({ message: "Internal Server Error" });
        
    }
}


export const getAllFinancesController = async (req: Request, res: Response) => {
    try {
        
        const allFinances = await getAllFinancesService()
        if (!allFinances) {
            res.status(404).json({ message: "No finances found" });
            return;
        }
        res.status(200).json({
            message: "Finances retrieved successfully",
            finances: allFinances
        });

        
    } catch (error) {
        console.error("Error in getAllFinancesController:", error);
        res.status(500).json({ message: "Internal Server Error" });
        
    }
}

export const getFinanceByIdController = async (req: Request, res: Response) => {
   
    try {
         const id = parseInt(req.params.id);
        const finance = await getFinanceByIdService(id);
        if (!finance) {
            return res.status(404).json({ message: "Finance not found" });
        }
        res.status(200).json({
            message: "Finance retrieved successfully",
            data: finance
        });

        
    } catch (error) {
        console.error("Error in getFinanceByIdController:", error);
        res.status(500).json({ message: "Internal Server Error" });
        
    }
}

