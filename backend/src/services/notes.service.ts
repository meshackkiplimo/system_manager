import db from "@/drizzle/db"






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