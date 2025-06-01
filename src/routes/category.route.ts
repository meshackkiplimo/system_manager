import { createCategoriesController, deleteCategoryController, getAllCategoriesController, getOneControllerById, updateCategoryController } from "../controllers/category.controller"
import { Express } from "express"





export const category = (app:Express) =>{
    app.route("/categories").get(
        async (req,res,next) => {
            try {
                await getAllCategoriesController(req,res)

                
            } catch (error) {
                next(error)
                
            }
            
        }
    )
    app.route("/categories/:id").get(
        async (req,res, next) => {
           try {
             await getOneControllerById(req,res)
            
           } catch (error) {
            next(error)
            
           }
            
        }
    )
    app.route("/categories").post(
        async (req,res , next) => {
            
            try {
                await createCategoriesController(req,res)
                
            } catch (error) {
                next(error)
                
            }
        }
    )
    app.route("/categories/:id").put(
        async (req,res,next) => {
            try {
                await updateCategoryController(req,res)
                
            } catch (error) {
                next(error)
                
            }
            
        }
    )
    app.route("/categories/:id").delete(
        async (req,res,next) => {
            try {
                await deleteCategoryController(req,res)
                
            } catch (error) {
                next(error)
                
            }
            
        }
    )

}