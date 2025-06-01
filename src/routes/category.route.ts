import { getAllCategoriesController } from "../controllers/category.controller"
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

}