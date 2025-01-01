import { authOptions } from "../lib/auth";

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation"
import { SigninPage } from "../../components/signinpage";

const SingTn = async () => {
    const session = await getServerSession(authOptions);
    if (session?.user) {
        redirect("/")
    }
    return <>
        <SigninPage />
    </>
}

export default SingTn;

