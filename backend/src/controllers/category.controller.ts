import { Request, Response } from 'express';
import { createCategoriesService, deleteCategoryService, getAllCategoriesService, getCategoriesByIdService, updateCategoryService } from '../services/categories.service';




export const createCategoriesController = async (req: Request, res: Response) => {
    try {

        const categories = req.body
        const newCategory = await createCategoriesService(categories)
        if (!newCategory) {
            res.status(400).json({ message: "Category creation failed" });
            return;
        }
        res.status(201).json({
            message: "Category created successfully",
            category: newCategory
        });
        
    } catch (error) {
        console.error("Error in createCategoriesController:", error);
        res.status(500).json({ message: "Internal Server Error" });
        
    }
}

export const getOneControllerById = async (req:Request, res:Response) => {
    try {
        const category = req.params.id
        const oneCategory = await getCategoriesByIdService(category)
        if (!oneCategory) {
            res.status(404).json({ message: "Category not found" });
            return;
        }
        res.status(200).json({
            message: "Category retrieved successfully",
            category: oneCategory
        });
        
    } catch (error) {
        console.error("Error in getOneControllerById:", error);
        res.status(500).json({ message: "Internal Server Error" });
        
    }
    
}



export const getAllCategoriesController = async (req:Request, res:Response) => {
    try {
        const allCategories = await getAllCategoriesService();
        
        if (!allCategories || allCategories.length === 0) {
            res.status(404).json({ message: "No categories found" });
            return;
        }
        
        res.status(200).json({
            message: "Categories retrieved successfully",
            categories: allCategories
        });
    } catch (error) {
        console.error("Error in getAllCategoriesController:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const updateCategoryController = async (req: Request, res: Response) => {
    try {
        const categoryId = req.params.id;
        const updatedCategoryData = req.body;

        // Validate input data
        if (!updatedCategoryData || (Object.keys(updatedCategoryData).length === 0)) {
            res.status(400).json({ message: "No update data provided" });
            return;
        }

        const updatedCategory = await updateCategoryService(categoryId, updatedCategoryData);
        
        if (!updatedCategory) {
            res.status(404).json({ message: "Category not found" });
            return;
        }

        res.status(200).json({
            message: "Category updated successfully",
            category: updatedCategory
        });
    } catch (error) {
        console.error("Error in updateCategoryController:", error);
        if (error instanceof Error) {
            res.status(500).json({
                message: "Internal Server Error",
                error: error.message
            });
        } else {
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
}

export const deleteCategoryController = async (req: Request, res: Response) => {
    try {
        const categoryId = req.params.id;
        const deletedCategory = await getCategoriesByIdService(categoryId);
        if (!deletedCategory) {
            res.status(404).json({ message: "Category not found" });
            return;
        }
        await deleteCategoryService(categoryId);
        res.status(200).json({
            message: "Category deleted successfully",
            category: deletedCategory
        });
    } catch (error) {
        console.error("Error in deleteCategoryController:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
