import db from "../drizzle/db";
import { TIUser, TSUser, UsersTable } from "../drizzle/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";


const hashPassword = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};

const verifyPassword = async (password: string, hashedPassword: string): Promise<boolean> => {
    return bcrypt.compare(password, hashedPassword);
};


export const registerUserService = async (user: TIUser): Promise<TSUser> => {
    const hashedPassword = await hashPassword(user.password);
    const [newUser] = await db.insert(UsersTable)
        .values({ ...user, password: hashedPassword })
        .returning();
    return newUser;
};

export const loginUserService = async (email: string, password: string): Promise<TSUser | null> => {
    const [user] = await db.select()
        .from(UsersTable)
        .where(eq(UsersTable.email, email));
    
    if (!user) return null;

    const isValidPassword = await verifyPassword(password, user.password);
    if (!isValidPassword) return null;

    return user;
};