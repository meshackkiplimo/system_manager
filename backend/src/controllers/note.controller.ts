
import { getAllNotesSevice } from '@/services/notes.service';
import { Request, Response } from 'express';


export const getAllNotesController = async (req:Request,res:Response) => {

    try {
        
        const allNotes = await getAllNotesSevice();
        if (!allNotes || allNotes.length === 0) {
            return res.status(404).json({ message: "No notes found" });
        }
        res.status(200).json({message:"fetched all notes successfully", data: allNotes});

        
    } catch (error) {
        console.error("Error in getAllNotesController:", error);
        res.status(500).json({ message: "Internal Server Error" });
        
    }


    
}