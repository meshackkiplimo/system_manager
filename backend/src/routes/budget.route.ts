import { isAuthenticated } from "@/middleware/Auth";
import { createBudgetController, getAllBudgetsController } from "../controllers/budget.controller"
import { Express } from "express";



export const budget = (app:Express) =>{
    app.route("/budgets").get(
        // isAuthenticated,
        async (req,res,next) => {
            try {
                await getAllBudgetsController(req,res)
                
            } catch (error) {
                next(error)
                
            }
            
        }
    )
    //create budget
    app.route("/budgets").post(
        // isAuthenticated,
        async (req,res,next) => {
            try {
                await createBudgetController(req,res)
                
            } catch (error) {
                next(error)
                
            }
            
        }
    )
    //get budget by id
    app.route("/budgets/:id").get(
        // isAuthenticated,
        async (req,res,next) => {
            try {
                await getAllBudgetsController(req,res)
                
            } catch (error) {
                next(error)
                
            }
            
        }
    )
}