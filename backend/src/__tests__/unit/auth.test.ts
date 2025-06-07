import db from "../../drizzle/db"

import { createUserService } from "@/services/auth.service"

jest.mock("../../drizzle/db", () =>({
    insert: jest.fn()

}))

beforeEach(() => {
    jest.clearAllMocks();
})

describe("Auth Service", ()=>{
    it("should create a user", async () => {
        const user ={
            first_name: "John",
            last_name: "Doe",
            username: "johndoe",
            email: "jdoe@gmail.com",
            password: "password123",

        }
        const insertedUser = {id:1, ...user};
        (db.insert as jest.Mock).mockReturnValue({
            values: jest.fn().mockReturnValue({
                returning: jest.fn().mockResolvedValue([insertedUser])
            })

        })

        
    })
})