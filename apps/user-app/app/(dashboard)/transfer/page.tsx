import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import prismaClient from "@repo/db/client";
import { AddMoney } from "../../../components/addMoneyCard";
import { BalanceCard } from "../../../components/balanceCard";
import { OnRampTransactions } from "../../../components/onRampTransaction";

async function getBalance() {
    const session = await getServerSession(authOptions)
    const balance = await prismaClient.balance.findFirst({
        where: {
            userId: Number(session?.user?.id) 
        }
    })

    return {
        amount: balance?.amount || 0,
        locked: balance?.locked || 0,
    }
}

async function getOnRampTransactions() {
    const session = await getServerSession(authOptions);
    const transactions = await prismaClient.onRampTransaction.findMany({
        where: {
            userId: Number(session?.user?.id)
        }
    })

    return transactions.map(t => ({
        time: t.startTime,
        amount: t.amount,
        status: t.status,
        provider: t.provider
    }))
}

export default async function () {
    const balance = await getBalance();
    const transactions = await getOnRampTransactions();

    return (
        <>
            <div className="w-screen">
                <div className="text-3xl text-[#3470d9] pt-8 mb-8 font-bold">
                    Transfer
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
                    <div>
                        <AddMoney />
                    </div>
                    <div>
                        <BalanceCard amount={balance.amount} locked={balance.locked} />
                        <div className="pt-4">
                            <OnRampTransactions transactions={transactions} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}