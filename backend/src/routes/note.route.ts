import { getOneControllerById } from "@/controllers/category.controller";
import { getAllNotesController } from "@/controllers/note.controller";
import { Express } from "express";  


export  const note = async (app:Express) => {

    app.route("/notes").get(
        async (req,res,next) => {
            try {
                await getAllNotesController(req,res);
                
            } catch (error) {
                next(error);
                
            }
            
        }
    )
    app.route("/notes/:id").get(
        async (req,res,next) => {
            try {
                await getOneControllerById(req,res);
                
            } catch (error) {
                next(error);
                
            }
            
        }
    )
    
}