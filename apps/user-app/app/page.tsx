"use client"


import { useBalance } from "@repo/store/usebalance"
import { useSession } from "next-auth/react"
import {AppbarUser} from "../components/Appbaruser"

export default function Home() {
	const balance = useBalance();
	const session = useSession();
	return (
		<>	
			<AppbarUser />
			<div>
				{
					JSON.stringify(session.data?.user)
				}
			</div>
			<div>
				The balance is {balance}
			</div>
		</>

	)
}


