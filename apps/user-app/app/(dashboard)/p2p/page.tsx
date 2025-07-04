import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { redirect } from "next/navigation";
import { SendMoneyp2p } from "../../../components/sendMoney";
import prismaClient from "@repo/db/client";
import { RenderP2pTransaction } from "../../../components/renderP2ptransaction";

export interface P2PTransaction {
  id: number;
  timeStamp: Date;
  amount: number;
  senderUserId: number;
  receiverUserId: number;
}

async function getP2pTransactions(
  name: "sent" | "received"
): Promise<P2PTransaction[]> {
  const session = await getServerSession(authOptions);
  let transac: P2PTransaction[] = [];
  if (name == "sent") {
    transac = await prismaClient.p2pTransaction.findMany({
      where: {
        senderUserId: Number(session?.user.id),
      },
    });
  } else if (name == "received") {
    transac = await prismaClient.p2pTransaction.findMany({
      where: {
        receiverUserId: Number(session?.user.id),
      },
    });
  }

  return transac;
}

export default async function () {
  const session = await getServerSession(authOptions);
  if (!session?.user.id) {
    return redirect("/api/auth/signin");
  }

  const p2pTransactionsSent = await getP2pTransactions("sent");

  const p2pTransactionsReceived = await getP2pTransactions("received");

  return (
    <>
      <div className="flex flex-col md:flex-row p-4 gap-4 w-full">
        <div className = "md:w-1/3">
          <SendMoneyp2p />
        </div>
        <div className="md:w-1/2 w-full">
          <RenderP2pTransaction
            sentTransactions={p2pTransactionsSent}
            receivedTransactions={p2pTransactionsReceived}
          />
        </div>
      </div>
    </>
  );
}
