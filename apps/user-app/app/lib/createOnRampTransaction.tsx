"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "./auth"
import prismaClient from "@repo/db/client"



export async function createOnRampTransaction({amount , provider} : {amount : number , provider : string}){
    const session =await  getServerSession(authOptions)
    if(!session?.user || !session?.user.id){
        return {
            message : "Not logged in"
        }
    }
    const token = (Math.random()*9999).toString() ; 
    await prismaClient.onRampTransaction.create({
        data :{
            userId : Number(session?.user.id),
            amount  : amount , 
            provider : provider ,
            token : token , 
            startTime : new Date(),
            status : "Pending"
        }
    })
}