import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { NextResponse } from "next/server";




const getUserDetails = async() =>{
    const session = await getServerSession(authOptions) ; 
    if(session?.user){
        return NextResponse.json({
            user : session.user 
        })
    }
    return NextResponse.json({
        message : "You are not logged in "
    })
}


export {getUserDetails as GET , getUserDetails as POST}