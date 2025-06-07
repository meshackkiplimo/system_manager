import { isAuthenticated } from "@/middleware/Auth";
import { getAllBudgetsController } from "../controllers/budget.controller"
import { Express } from "express";



export const budget = (app:Express) =>{
    app.route("/budgets").get(
        isAuthenticated,
        async (req,res,next) => {
            try {
                await getAllBudgetsController(req,res)
                
            } catch (error) {
                next(error)
                
            }
            
        }
    )
}