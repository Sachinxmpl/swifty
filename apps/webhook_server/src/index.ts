import epxress from "express"

const app = epxress();
import prismaClient from "@repo/db/client";

interface PaymentInfo {
            token: string,
            userId: string,
            amount: number,
}

app.post("/webhook", async (req, res) => {
            //get details from the bank request (fake bank api ) bank specifies a token to each transaction with given userId(userId provided by swifty)

            const paymentInformation: PaymentInfo = {
                        token: req.body.token,
                        userId: req.body.userId,
                        amount: req.body.amount,
            }


            //now update and wallet balance () and update the onRampTransaction
            try {
                        await prismaClient.$transaction([
                                    prismaClient.balance.update({
                                                where: {
                                                            userId: paymentInformation.userId
                                                },
                                                data: {
                                                            amount: {
                                                                        increment:paymentInformation.amount
                                                            }
                                                }
                                    }),

                                    prismaClient.onRampTransaction.update({
                                                where : {
                                                            token : paymentInformation.token
                                                } , 
                                                data : {
                                                            status : "Success"
                                                }
                                    })
                        ])
            } catch (e) {
                        console.log(e)
                        res.status(411).json({
                                    message: "Error transaction in webhook failed "
                        })
            }
})


