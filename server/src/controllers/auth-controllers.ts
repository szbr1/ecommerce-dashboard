import prisma from "@/lib/db";
import type { Request, Response } from "express"



export const singUp = async (req: Request, res: Response)=>{
    try {
        console.log("hello")
        const {email , password, name} = req.body;
        const result = await prisma.user.create({
            data: {
                email,
                name,
                password,
            }
        }) 

        res.status(200).json({message: "successfully created user", result})
    } catch (error) {
        console.error(error)
        res.status(500).json({message: "signup failed server is not responding"})
    }
}

export const signIn = async (req: Request, res: Response)=>{
    try {
        const {email, password} = req.body;

        const result = await prisma.user.findFirst({
            where: {email, password}
        }) 
        res.status(200).json({message: "successfully logged In", result})
    } catch (error) {
        console.error(error)
        res.status(500).json({message: "sigin failed server is not responding"})
    }
}