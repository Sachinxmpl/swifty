import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { redirect } from "next/navigation";
import { SendMoneyp2p } from "../../../components/sendMoney";
import prismaClient from "@repo/db/client";
import { RenderP2pTransaction } from "../../../components/renderP2ptransaction";



async function getP2pTransactions(name: ("sent" | "received")) {
    const session = await getServerSession(authOptions);
    let transac: any;
    if (name == "sent") {
        transac = await prismaClient.p2pTransaction.findMany(
            {
                where: {
                    senderUserId: session.user.id
                }
            }
        )
    } else if (name == "received") {
        transac = await prismaClient.p2pTransaction.findMany({
            where: {
                receiverUserId: session.user.id
            }
        })
    }

    return transac.map((t : any) => {
        return (
            {
                id : t.id , 
                time: t.timeStamp,
                amount: t.amount,
                sender : t.senderUserId , 
                receiver : t.receiverUserId , 
            }
        )
    })
}



export default async function () {

    const session = await getServerSession(authOptions)
    if (!session?.user.id) {
        redirect("/api/auth/signin")
    }

    const p2pTransactionsSent = await getP2pTransactions("sent")

    const p2pTransactionsReceived = await getP2pTransactions("received")

    return (
        <>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
                <div>
                    <SendMoneyp2p />
                </div>
                <div>
                    <RenderP2pTransaction p2pTransactionsSent={p2pTransactionsSent} p2pTransactionsReceived={p2pTransactionsReceived} />
                </div>
            </div>
        </>
    )
}