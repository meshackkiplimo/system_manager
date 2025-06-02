
import { Express } from "express"
import { getAllFinancesController } from "../controllers/finance.controller"





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
}