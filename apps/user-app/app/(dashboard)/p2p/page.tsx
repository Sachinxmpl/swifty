import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { redirect } from "next/navigation";
import { SendMoneyp2p } from "../../../components/sendMoney";

export default async function () {

    const session = await getServerSession(authOptions)
    if (!session?.user.id) {
        redirect("/api/auth/signin")
    }

    return (
        <>
           <SendMoneyp2p/>
        </>
    )
}