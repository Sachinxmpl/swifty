"use client"

import { Card } from "@repo/ui/card";
import { P2PTransaction } from "../app/(dashboard)/p2p/page";


export const RenderP2pTransaction = ({sentTransactions, receivedTransactions} : {sentTransactions : any , receivedTransactions : any}) => {
    const recentTransactions = [...sentTransactions, ...receivedTransactions];
    return (
        <>
            <Card title="Recent transactions">
                <div className="pt-4 space-y-4">
                    {recentTransactions.map((transac) => (
                        <div
                            key={transac.id}
                            className="flex justify-between items-center bg-gray-50 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow border-l-4"
                        >
                            <div>
                                <div className="text-sm font-medium text-gray-700">
                                    {sentTransactions.includes(transac)
                                        ? `Sent NPR to ${transac.receiverUserId}`
                                        : `Received NPR from ${transac.senderUserId}`}
                                </div>
                                <div className="text-xs text-gray-500">
                                    {new Date(transac.timeStamp).toDateString()}
                                </div>
                            </div>
                            <div className="text-base font-semibold text-gray-700">
                                {sentTransactions.includes(transac)
                                    ? `-Rs ${transac.amount / 100}`
                                    : `+Rs ${transac.amount / 100}`}
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
        </>
    );
}   