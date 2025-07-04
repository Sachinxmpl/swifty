"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "./auth"
import prismaClient from "@repo/db/client"

export async function getTransaction(){
    const session = await getServerSession(authOptions)
    if(!session?.user || !session?.user.id){
        return {
            status: ":error" , 
            message: "User is not logged in"
        }
    }

    const [onRampTransactions, p2pTransactionsSent, p2pTransactionsReceived] = await Promise.all([
        prismaClient.onRampTransaction.findMany({
            where : {
                userId  : Number(session?.user.id)
            }
        }) , 

        prismaClient.p2pTransaction.findMany({
            where : {
                senderUserId: Number(session?.user.id)
            }
        }) , 

        prismaClient.p2pTransaction.findMany({
            where : {
                receiverUserId: Number(session?.user.id)
            }
        })
    ])

    return {
        status : "success" , 
        onRampTransactions , 
        p2pTransactionsSent,
        p2pTransactionsReceived
    }
}