"use client"

import { useSession, signIn, signOut } from "next-auth/react"
import { Appbar } from "@repo/ui/appbar"
import { useRouter } from "next/navigation";

export const AppbarUser = () => {
            const session = useSession();
            const router = useRouter()
            return (
                        <Appbar
                                    Login={() => signIn()}
                                    Logout={async()=> {
                                                await signOut() ;
                                                router.push("/api/auth/signin")
                                    } }
                                    user={session.data?.user} />
            )
}