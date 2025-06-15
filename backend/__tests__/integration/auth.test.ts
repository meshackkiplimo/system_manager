import db from '@/drizzle/db';
import { UsersTable } from '@/drizzle/schema';
import bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';
import request from 'supertest';
import {app} from '../../index'; 

let userId: number;

const timestamp = Date.now();
let testUser = {
    first_name: "Test",
    last_name: "User",
    username: `testuser_${timestamp}`,
    email: `testuser_${timestamp}@gmail.com`,
    password: "password123",
    role: "user",
    isVerified: true
}

let registerUser = {
    first_name: "Register",
    last_name: "User",
    username: `register_${timestamp}`,
    email: `register_${timestamp}@gmail.com`,
    password: "password123"
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
                    first_name: registerUser.first_name,
                    last_name: registerUser.last_name,
                    username: registerUser.username,
                    email: registerUser.email,
                    password: registerUser.password
                });

            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('message', 'User created successfully. A verification email has been sent.');
            expect(response.body).toHaveProperty('user');
            userId = response.body.user.id;
        });
        it("should not register a user with an existing email", async () => {
            const response = await request(app)
                .post('/auth/register')
                .send({
                    first_name: "Another",
                    last_name: "User",
                    username: `another_${Date.now()}`,
                    email: registerUser.email, // Reuse same email to test duplicate check
                    password: "password123"
                });

            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('message', 'Email already exists');
        });
        it("should not register a user with missing fields", async () => {
            const response = await request(app)
                .post('/auth/register')
                .send({
                    first_name: "Incomplete",
                    last_name: "User",
                    // Missing username and email
                    password: "password123"
                });

            expect(response.status).toBe(500);
            expect(response.body).toHaveProperty('message', 'Internal Server Error');
        });

    })



