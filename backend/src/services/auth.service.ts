import { sql } from "drizzle-orm";
import db from "../drizzle/db";
import {  UsersTable } from "../drizzle/schema";
import { TIUser } from "../../types";

export const createUserService = async (user: TIUser) => {
    const newUser = await db.insert(UsersTable).values(user).returning();
    const newUserData = newUser[0];
    return newUserData;
}

export const getUserByLoginService = async (user: TIUser): Promise<TIUser | null> => {
    const { email } = user;
    const result = await db.query.UsersTable.findFirst({
        columns: {
            id: true,
            first_name: true,
            last_name: true,
            username: true,
            email: true,
            password: true
        },
        where: sql`${UsersTable.email} = ${email}`
    });
    return result || null;
}

export const updateVerificationStatus = async (email:string,isVerified:boolean) => {
    const updatedUser  = await db.update(UsersTable)
        .set({ isVerified: isVerified })
        .where(sql`${UsersTable.email} = ${email}`)
        .returning();
    return updatedUser[0] || null;
    
}