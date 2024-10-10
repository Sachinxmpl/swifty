"use client"


import {useBalance} from "@repo/store/usebalance"
import { Appbar } from "@repo/ui/appbar";


export default function Home() {
	const balance = useBalance() ; 
	return (
		<>		
				<Appbar  onSignin={()=> console.log("singiin")} onSignout={()=> console.log("signout")}/>
				<div>
					The balance is {balance}
				</div>
		</>
	);
}
