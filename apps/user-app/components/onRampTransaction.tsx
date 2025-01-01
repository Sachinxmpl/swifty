import { Card } from "@repo/ui/card"

export const OnRampTransactions = ({
    transactions
}: {
    transactions: {
        amount: number,
        status: "Pending" | "Success" | "Failure",
        time: Date,
        provider: String
    }[]
}) => {
    if (!transactions.length) {
        return (
            <Card title="Recent transactions">
                <div className="text-center pb-8 pt-8">
                    No Recent Transactions
                </div>
            </Card>
        )
    }
    return (
        <Card title="Recent transactions">
            <div className=" pt-2">
                {
                    transactions.map(transac=> 
                        <div className="flex justify-between">
                            <div>
                                <div className="text-sm">
                                    Recieved NPR
                                </div>
                                <div className="text-state-600 text-xs">
                                    {transac.time.toDateString()}
                                </div>
                            </div>
                            <div className="flex flex-col justify-center">
                                +Rs {transac.amount/100}
                            </div>
                        </div>
                    )
                }
        </div>
        </Card >
    )
}