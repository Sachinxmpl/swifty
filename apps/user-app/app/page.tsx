"use client"


import {useBalance} from "@repo/store/usebalance"

import { useSession } from "next-auth/react";

export default function Home() {
	const session = useSession()
	const balance = useBalance() ; 
	return (
		<>		
				{
					JSON.stringify(session.data?.user)
				}
				<div>
					The balance is {balance}
				</div>
		</>
	);
}
