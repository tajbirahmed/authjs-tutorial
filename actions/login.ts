"use server";
import * as z from "zod";
import { LoginSchema } from "@/schemas";

export const login = async (value : z.infer<typeof LoginSchema>) => { 
    const validateFields = LoginSchema.safeParse(value); 

    if (!validateFields.success) {
        return {
            error: "Invalid Fields!", 
        };
    } 
    return {
        success: "Email sent!"
    }

}