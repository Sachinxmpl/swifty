import epxress from "express"

const app  = epxress() ; 


app.post("/webhook",(req,res)=>{
            //get details from the bank request (fake bank api )
            const paymentinformation = {
                        token : req.body.token , 
                        userId : req.body.userId  ,
                        amount : req.body.amout
            }

            //update the wallet balance 
})


