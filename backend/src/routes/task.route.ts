import { Express } from 'express';
import { getAllTaskController } from '../controllers/task.controller';


export const task =(app:Express)=>{
    app.route("/tasks").get(
        async (req,res,next) => {
            try {
                await getAllTaskController(req,res)
                
            } catch (error) {
                next(error)
                
            }
            
        }
    )
    

}