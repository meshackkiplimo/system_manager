import { Request, Response } from 'express';
import { getAllCategoriesService } from '../services/categories.service';



export const getAllCategoriesController = async (req:Request, res:Response) => {

    try {
        const categories = req.body;
        const allCategories = await getAllCategoriesService(categories)
        if (!allCategories || allCategories.length === 0) {
            res.status(404).json({ message: "No categories found" });
            return 
        }
        res.status(200).json({
            message: "Categories retrieved successfully",
            categories: allCategories
        });
        
    } catch (error) {
        
    }
}