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
            <div className="pt-4 space-y-4">
                {
                    transactions.map(transac =>
                        <div className="flex justify-between items-center bg-gray-50 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                            <div>
                                <div className="text-sm font-medium text-gray-700">
                                    Received NPR
                                </div>
                                <div className="text-xs text-gray-500">
                                    {transac.time.toDateString()}
                                </div>
                            </div>
                            <div className="text-green-600 text-base font-semibold">
                                +Rs {transac.amount / 100}
                            </div>
                        </div>
                    )
                }
            </div>
        </Card >
    )
}