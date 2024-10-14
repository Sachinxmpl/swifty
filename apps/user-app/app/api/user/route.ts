import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { NextResponse } from "next/server";


export async function GET(){
            const session = await getServerSession(authOptions)
            console.log(session)
            if(session?.user){
                        return NextResponse.json({
                                    user : session.user 
                        })
            }
            return NextResponse.json({
                        message : "Your are not logged in" 
            })
}