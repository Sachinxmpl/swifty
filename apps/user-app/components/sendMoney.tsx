"use client"

import { Button } from "@repo/ui/button"
import { Card } from "@repo/ui/card"
import { TextInput } from "@repo/ui/TextInput.tsx"
import { useState } from "react"
import { sendP2pTrasactionMoney } from "../app/lib/sendp2ptransaction"

export const SendMoneyp2p = () => {
    const [amount, setAmount] = useState(0);
    const [receiverNo, setReceiverNo] = useState("")
    const handleAmountChange = (value: string) => {
        setAmount(Number(value))
    }

    const handlePhoneChange = (value: string) => {
        setReceiverNo(value);
    }

    const handleSendTransaction = async () => {
        await  sendP2pTrasactionMoney(receiverNo , amount) ;
        window.location.reload() ;
    }

    return (
        <div className="w-300">
            <Card title="Send Money">
            <div className="w-full p-5">
                <TextInput label={"Receiver"} placeholder={"Enter receiver number"} handleChange={handlePhoneChange} />
                <TextInput label={"Amount"} placeholder={"Enter amount"} handleChange={handleAmountChange} />
                <div className="flex justify-center pt-4">
                    <Button handleClick={handleSendTransaction}>
                        Send Money
                    </Button>
                </div>
            </div>
        </Card>
        </div>
    )
}