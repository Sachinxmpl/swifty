"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "./auth"
import prismaClient from "@repo/db/client";



export async function sendP2pTrasactionMoney(receiverNo : string , amount : number){
    const session = await getServerSession(authOptions) ;
    const sender : any = session?.user ;
    if(!sender || !sender.id){
        return {
            status : "error" , message : `User is not logged in`
        }
    } 

    const receiver = await prismaClient.user.findFirst({
        where : {
            number : receiverNo
        }
    })

    if(!receiver){
        return {
            status : "error" , message : `User with number ${receiverNo} does not exist`
        }
    }
    await prismaClient.$transaction(async(tx)=>{
        await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(sender.id)} FOR UPDATE`;
        const sendersBalance = await tx.balance.findFirst({
            where : {
                userId : Number(sender.id)
            }
        })

        if(!sendersBalance || sendersBalance.amount < amount * 100){
            return { status : "error" , message : `You do not have enough money in your account to make the transaction` }
        }
        await tx.balance.update({
            where : {
                userId : Number(sender.id)
            } , 
            data : {
                amount : {
                    decrement : amount * 100 
                }
            }
       })
       

       await tx.balance.update({
        where : {
            userId : Number(receiver.id)
        } , 
        data : {
            amount : {
                increment : amount * 100 
            }
        }
       })

       await tx.p2pTransaction.create({
        data : {
            amount : amount  , 
            timeStamp : new Date() , 
            senderUserId : Number(sender.id) , 
            receiverUserId : Number(receiver.id)
        }
       })

   })
}