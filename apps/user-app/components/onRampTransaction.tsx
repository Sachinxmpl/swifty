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
    const oneDayAgo = new Date();
    oneDayAgo.setDate(oneDayAgo.getDate() - 1)
    const recentTransactions = transactions.filter(t => (t.time > oneDayAgo))
    return (
        <Card title="Recent transactions">
            <div className="pt-4 space-y-4">
                {recentTransactions.map((transac) => (
                    <div
                        key={Math.random() * 10000}
                        className={`flex justify-between items-center bg-gray-50 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow ${transac.status === "Success"
                                ? "border-l-4 border-green-500"
                                : transac.status === "Failure"
                                    ? "border-l-4 border-red-500"
                                    : "border-l-4 border-yellow-500"
                            }`}
                    >
                        <div>
                            <div className="text-sm font-medium text-gray-700">
                                Received NPR from {transac.provider}
                            </div>
                            <div className="text-xs text-gray-500">
                                {new Date(transac.time).toDateString()}
                            </div>
                            <div
                                className={`text-xs font-semibold mt-1 ${transac.status === "Success"
                                        ? "text-green-500"
                                        : transac.status === "Failure"
                                            ? "text-red-500"
                                            : "text-yellow-500"
                                    }`}
                            >
                                {transac.status === "Pending"
                                    ? "Pending"
                                    : transac.status.charAt(0).toUpperCase() + transac.status.slice(1)}
                            </div>
                        </div>
                        <div
                            className={`text-base font-semibold ${transac.status === "Success"
                                    ? "text-green-600"
                                    : transac.status === "Failure"
                                        ? "text-red-600"
                                        : "text-yellow-600"
                                }`}
                        >
                            {transac.status === "Failure" ? "-Rs" : "+Rs"} {transac.amount / 100}
                        </div>
                    </div>
                ))}
            </div>


        </Card >
    )
}