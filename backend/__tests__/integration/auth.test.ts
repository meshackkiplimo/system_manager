import db from '@/drizzle/db';
import { UsersTable } from '@/drizzle/schema';
import bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';
import request from 'supertest';
import {app} from '../../index'; 

let userId: number;

 let testUser ={
    
    first_name: "Test",
    last_name: "User",
    username: "testgggguser",
    email: "testuseaaar@gmail.com",
    password: "password123",
    role: "user",
    isVerified: true

}

beforeAll(async () => {
    const hashedPassword = await bcrypt.hashSync(testUser.password, 10);
    await db.insert(UsersTable).values({
        ...testUser,
        password: hashedPassword
    })
});
afterAll(async () => {
        await db.delete(UsersTable).where(eq(UsersTable.email, testUser.email));
    });

    
    describe("auth reggistration",()=>{
        it("should register a new user", async () => {
            const response = await request(app)
                .post('/auth/register')
                .send({
                    first_name: testUser.first_name,
                    last_name: testUser.last_name,
                    username: testUser.username,
                    email: testUser.email,
                    password: testUser.password
                });

            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('message', 'User created successfully');
            expect(response.body).toHaveProperty('user');
            userId = response.body.user.id;
        });

    })



