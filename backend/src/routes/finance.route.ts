
import { Express } from "express"
import { createFinanceController, getAllFinancesController, getFinanceByIdController } from "../controllers/finance.controller"
import { getOneControllerById } from "@/controllers/category.controller"





export const finance = (app:Express)  =>{
    app.route("/finances").get(
        
        
        async (req,res,next) => {
           try {
             await getAllFinancesController(req,res)
            
            
           } catch (error) {
                next(error)
            
           }
        }
    )
    app.route("/finances/:id").get(
        async (req,res,next) => {
            try {
                await getFinanceByIdController(req,res)
            } catch (error) {
                next(error)
            }
        }
    )
    // create finance
    app.route("/finances").post(
        async (req,res,next) => {
            try {
                await createFinanceController(req,res)
            } catch (error) {
                next(error)
            }
        }
    )
}