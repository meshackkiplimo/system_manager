import { Express } from 'express';
import { createTaskController, deleteTaskController, getAllTaskController, getTaskByIdController, updateTaskController } from '../controllers/task.controller';


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

    app.route("/tasks/:id").get(
        async (req,res,next) => {
            try {
                await getTaskByIdController(req,res)
                
            } catch (error) {
                next(error)
                
            }
            
        }
    )

    app.route("/tasks").post(
        async (req, res, next) => {
            try {
                await createTaskController(req, res)
                
            } catch (error) {
                next(error)
                
            }
            
        }
    )
    app.route("/tasks/:id").put(
        async (req, res, next) => {
            try {
                await updateTaskController(req, res)
                
            } catch (error) {
                next(error)
                
            }
            
        }
    )

    app.route("/tasks/:id").delete(
        async (req, res, next) => {
            try {
                await deleteTaskController(req, res)
                
            } catch (error) {
                next(error)
                
            }
            
        }
    )
    

}