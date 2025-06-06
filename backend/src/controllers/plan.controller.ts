

import { getAllPlansService } from '@/services/plan.service';
import { Request, Response } from 'express';

export const getAllPlansController = async (req:Request,res:Response) => {

    try {
        const plans = await getAllPlansService();
        if (!plans || plans.length === 0) {
            return res.status(404).json({ message: "No plans found" });
        }
        res.status(200).json({ message: "Fetched all plans successfully", data: plans });
        
    } catch (error) {
        console.error("Error in getAllPlansController:", error);
        res.status(500).json({ message: "Internal Server Error" });
        
    }
    
}