"use server";
import * as z from "zod";
import { RegisterSchema } from "@/schemas";
import bcrypt from "bcryptjs"
import { db } from "@/lib/db";
import { getUserByEmail } from "./user";

export const register = async (value: z.infer<typeof RegisterSchema>) => { 
    const validateFields = RegisterSchema.safeParse(value); 

    if (!validateFields.success) {
        return {
            error: "Invalid Fields!", 
        };
    } 

    const { name, email, password} = validateFields.data; 
    const hashedPassword = await bcrypt.hash(password, 10); 

    // unique email 
    const existingUser = await getUserByEmail(email)
    if (existingUser) { 
        return {
            error: "Email already in use!",
        }; 
    }
    await db.user.create({
        data: {
            name,
            email,
            password: hashedPassword, 
        },
    });

    // TODO: sent verification token email

    return {
        success: "User created."
    }

}