"use client"


import {useBalance} from "@repo/store/usebalance"



export default function Home() {
	const balance = useBalance() ; 
	return (
		<>		
			
				<div>
					The balance is {balance}
				</div>
		</>
	);
}
