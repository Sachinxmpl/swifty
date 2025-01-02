"use client"

import { Button } from "@repo/ui/button"
import { Card } from "@repo/ui/card"
import { Select } from "@repo/ui/select"
import { TextInput } from "@repo/ui/TextInput.tsx"



import { useState } from "react"
import { createOnRampTransaction } from "../app/lib/createOnRampTransaction"

const supported_banks = [
    {
        name: "Nabil bank",
        redirectUrl: "https://nabilbank.com/"
    },
    {
        name: "Global Ime Bank",
        redirectUrl: "https://www.globalimebank.com/personal/"
    }
]

export const AddMoney = () => {
    const [redirectUrl, setRedirectUrl] = useState(supported_banks[0]?.redirectUrl)
    const [amount , setAmount] = useState(0)
    const [provider , setProvider] = useState(supported_banks[0]?.name || "")

    const handleChange = (val : string)=>{
        setAmount(Number(val))
    }

    const handleAddTransaction = async()=>{
        await createOnRampTransaction({amount,provider});
        window.location.reload();
    }
    return (
        <Card title="Add Money">
            <div className="w-full">
                <TextInput label={"Amount"} placeholder={"Enter amount"} handleChange={handleChange} />
                <div className="py-4 text-sm font-medium">
                    Bank
                </div>
                <Select onSelect={(value) => {
                    setProvider(supported_banks.find(x => x.name === value)?.name || "")
                    setRedirectUrl(supported_banks.find(x => x.name === value)?.redirectUrl || "")
                }} options={supported_banks.map(x => ({
                    key: x.name,
                    value: x.name
                }))} />

                <div className="flex justify-center pt-4">
                    <Button handleClick={handleAddTransaction}>
                        Add Money
                    </Button>
                </div>
            </div>
        </Card>
    )
}