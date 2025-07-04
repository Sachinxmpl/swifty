import { getServerSession } from "next-auth";
import { getTransaction } from "../../lib/getTransactions";
import { authOptions } from "../../lib/auth";
import { redirect } from "next/navigation";
import { RenderP2pTransaction } from "../../../components/renderP2ptransaction";
import { OnRampTransactions } from "../../../components/onRampTransaction";


export default async function transactionsPage(){
    const session = await getServerSession(authOptions) ; 
    if(!session?.user || !session?.user.id){
        redirect("/api/auth/signin")
    }

    const alltransactions = await getTransaction() ;

    const onramps = alltransactions.onRampTransactions
        ? alltransactions.onRampTransactions.map((t) => ({
            time: t.startTime,
            amount: t.amount,
            status: t.status,
            provider: t.provider
        }))
        : [];

    return (
        <>
             <div className="flex flex-col md:flex-row p-4 gap-4 w-full">
                    <div className = "md:w-1/3">
                        <OnRampTransactions transactions={onramps} />
                    </div>
                    <div className="md:w-1/2 w-full">
                      <RenderP2pTransaction
                        sentTransactions={alltransactions.p2pTransactionsSent}
                        receivedTransactions={alltransactions.p2pTransactionsReceived}
                      />
                    </div>
                  </div>
        </>
    )

}