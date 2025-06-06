import db from "@/drizzle/db"
import { NotesTable } from "@/drizzle/schema";
import { sql } from "drizzle-orm";






export const getAllNotesSevice = async () => {

    const notes = await db.query.NotesTable.findMany({
        columns:{
            id:true,
            userId:true,
            title:true,
            content:true,
            priority:true,

        }
        
    })
    return notes;
    
}

export const getOneNoteByIdService = async (id:number) => {

    const note = await db.query.NotesTable.findFirst({
      
        columns: {
            id: true,
            userId: true,
            title: true,
            content: true,
            priority: true,
        },
       where:sql`${NotesTable.id} = ${id}`
    });

    return note;

}