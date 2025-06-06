import { sql } from "drizzle-orm";
import db from "../drizzle/db";
import { TIUser, UsersTable } from "../drizzle/schema";

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
            username: true,
            email: true,
            password: true
        },
        where: sql`${UsersTable.email} = ${email}`
    });
    return result || null;
}