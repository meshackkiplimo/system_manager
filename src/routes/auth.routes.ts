import { Express } from "express";
import { createUserController, loginUserController } from "../controllers/auth.controller";




export const user = (app:Express)=>{
    app.route("/auth/register").post(
        async(req,res,next)=>{
            try {
                await createUserController(req,res)
                
            } catch (error) {
                next(error)
                
            }

        }
    )


    app.route("/auth/login").post(
        async (req,res,next) => {
            try {
                await loginUserController(req,res)
                
            } catch (error) {
                next(error)
                
            }
            
        }

    )

}