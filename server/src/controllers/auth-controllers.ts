import prisma from "@/lib/db";
import type { Request, Response } from "express"
import bcrypt from 'bcryptjs'



export const singUp = async (req: Request, res: Response)=>{
    try {
        const {email , password, name} = req.body;

        if(!email || !password || !name){
            return res.status(400).json({message: "All fields are required"})
        }
       
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const result = await prisma.user.create({
            data: {
                email,
                name,
                password: hashedPassword,
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



