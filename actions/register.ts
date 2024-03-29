"use server";
import * as z from "zod";
import { RegisterSchema } from "@/schemas";

export const register = async (value: z.infer<typeof RegisterSchema>) => { 
    const validateFields = RegisterSchema.safeParse(value); 

    if (!validateFields.success) {
        return {
            error: "Invalid Fields!", 
        };
    } 
    return {
        success: "Email sent!"
    }

}