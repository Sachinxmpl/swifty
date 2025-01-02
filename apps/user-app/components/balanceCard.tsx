import { Card } from "@repo/ui/card";

export const BalanceCard = ({
    amount,
    locked,
}: {
    amount: number;
    locked: number;
}) => {
    return (
        <Card title={"Balance"} >
            <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-gray-200 pb-4">
                    <span className="text-gray-500 ">
                        Unlocked Balance
                    </span>
                    <span className="text-gray-700 ">
                        {amount / 100} NPR
                    </span>
                </div>

                <div className="flex justify-between items-center border-b border-gray-200 pb-4">
                    <span className="text-gray-500">
                        Locked Balance
                    </span>
                    <span className="text-gray-700">
                        {locked / 100} NPR
                    </span>
                </div>

    
                <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-medium">
                        Total Balance
                    </span>
                    <span className="text-blue-400 font-bold text-medium">
                        {(locked + amount) / 100} NPR
                    </span>
                </div>
            </div>
        </Card>
    );
};
