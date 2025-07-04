import express from "express";
import prismaClient from "@repo/db/client";
import { Request } from "express";
import { paymentSchema } from "./utils/zodValidation";

const app = express();

app.use(express.json());


app.post("/verifytransactions", async (req: Request, res: any) => {
  const checkingValidReqeust = paymentSchema.safeParse(req.body);
  if (!checkingValidReqeust.success) {
    return res.status(400).json({
      message: "Validation failed bad schema ",
      details: checkingValidReqeust.error.errors.map((err) => err.message),
    });
  }
  
  const paymentInfomation = checkingValidReqeust.data;
  const Transaction = await prismaClient.onRampTransaction.findFirst({
    where: {
      token: paymentInfomation.token,
    },
  })
  if(Transaction == null || Transaction?.status == "Success"){
    return res.status(200).json({
      message: "The transaction was already processed or transaction doesn't exist",
    })
  }

  try {
    await prismaClient.$transaction([
      prismaClient.balance.update({
        where: {
          userId: Number(paymentInfomation.user_id),
        },
        data: {
          amount: {
            increment: (Number(paymentInfomation.amount) * 100),
          },
        },
      }),

      prismaClient.onRampTransaction.updateMany({
        where: {
          token: paymentInfomation.token,
        },
        data: {
          status: "Success",
        },
      }),
    ]);

    return res.status(200).json({
      message: "The transaction was successfull",
    });
  } catch (e) {
    console.log("error", e);
    res.status(411).json({
      message: "Error while processing webhook",
    });
  }
});

app.listen(3008, () => {
  console.log(`Server running on port 3008`);
});
