"use client"

import { Button } from "@repo/ui/button"
import { Card } from "@repo/ui/card"
import { Select } from "@repo/ui/select"
import { TextInput } from "@repo/ui/TextInput.tsx"



import { useState } from "react"

const supported_banks = [
    {
        name: "Nabil bank",
        redirectUrl: "https://nabilbank.com/"
    },
    {
        name: "Global Ime Bank",
        redirectUrl: "http://globalimebank.org/"
    }
]

export const AddMoney = () => {
    const [redirectUrl, setRedirectUrl] = useState(supported_banks[0]?.redirectUrl)
    return (
        <Card title="Add Money">
            <div className="w-full">
                <TextInput label={"Amount"} placeholder={"Enter amount"} onChange={() => {

                }} />

                <div className="py-4 text-left">
                    Bank
                </div>
                <Select onSelect={(value) => {
                    setRedirectUrl(supported_banks.find(x => x.name === value)?.redirectUrl || "")
                }} options={supported_banks.map(x => ({
                    key: x.name,
                    value: x.name
                }))} />

                <div className="flex justify-center pt-4">
                    <Button handleClick={() => {
                        window.location.href = redirectUrl || "";
                    }}>
                        Add Money
                    </Button>
                </div>
            </div>
        </Card>
    )
}