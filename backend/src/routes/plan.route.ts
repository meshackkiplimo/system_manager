
import { getAllPlansController } from "@/controllers/plan.controller";
import { Express } from "express";

export const plan = (app:Express)=>{
    app.route("/plans").get(
        async (req,res,next) => {
            try {
                await getAllPlansController(req,res);
                
            } catch (error) {
                next(error);
                
            }
            
        }
    )
}