import client from "@repo/db/client"
import { NextResponse } from "next/server"

export async function POST(){
            
            console.log("checkpoitn ")
            
            try{

                        const sampleuser =  await client.user.create({
                                     data : {
                                                 name : "Sahcin" , 
                                                 email : "sachinxmpl6@gmail.com"
                                     }  , 
                                     select : {
                                                 name : true , 
                                                 email : true 
                                     }
                         })
            }
            catch(e){
                        console.log("Error is " + e ) ; 
            }
            return NextResponse.json({
                        "status" : "success" 
                        
            })
}