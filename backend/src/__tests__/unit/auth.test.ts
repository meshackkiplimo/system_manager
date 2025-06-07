import db from "../../drizzle/db"
import { createUserService, getUserByLoginService } from "@/services/auth.service"

jest.mock("../../drizzle/db", () => ({
    insert: jest.fn(),
    query: {
        UsersTable: {
            findFirst: jest.fn()
        }
    }
}))

beforeEach(() => {
    jest.clearAllMocks();
})

describe("Auth Service", () => {
    it("should create a user", async () => {
        const user = {
            first_name: "John",
            last_name: "Doe",
            username: "johndoe",
            email: "jdoe@gmail.com",
            password: "password123",
        }
        const insertedUser = { id: 1, ...user };
        (db.insert as jest.Mock).mockReturnValue({
            values: jest.fn().mockReturnValue({
                returning: jest.fn().mockResolvedValue([insertedUser])
            })
        })

        const result = await createUserService(user);
        expect(result).toEqual(insertedUser);
    })

    it("should login a user successfully and return user data", async () => {
        const credentials = {
            email: "messi@gmail.com",
            password: "password123",
            first_name: "Lionel",
            last_name: "Messi",
            username: "messi"

        }
        const foundUser = {
            id: 1,
            first_name: "Lionel",
            last_name: "Messi",
            username: "messi",
            email: "messi@gmail.com",
            password: "password123"
        };

        (db.query.UsersTable.findFirst as jest.Mock).mockResolvedValue(foundUser);

        const result = await getUserByLoginService(credentials);
        expect(result).toEqual(foundUser);
    })

    it("should return null if user not found during login", async () => {
        const credentials = {
            email: "nonexistent@gmail.com",
            password: "password123",
            first_name: "Non",
            last_name: "Existent",
            username: "nonexistent"
            
        };

        (db.query.UsersTable.findFirst as jest.Mock).mockResolvedValue(null);

        const result = await getUserByLoginService(credentials);
        expect(result).toBeNull();
    })

    it("should throw an error if user already exists", async () => {
        const user = {
            first_name: "Jane",
            last_name: "Doe",
            username: "janedoe",
            email: "hshs@gmail.com",
            password: "password123"
        };

        (db.insert as jest.Mock).mockReturnValue({
            values: jest.fn().mockReturnValue({
                returning: jest.fn().mockRejectedValue(new Error("User already exists"))
            })
        })

        await expect(createUserService(user)).rejects.toThrow("User already exists");
    })
})