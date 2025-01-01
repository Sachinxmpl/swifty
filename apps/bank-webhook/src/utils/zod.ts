import {z} from "zod" 

const paymentSchema = z.object({
    token : z.string().nonempty("Token is required") , 
    user_id : z.string().nonempty("User id is required") , 
    amount : z.string().regex(/^\d+$/, "Amount must be a numeric string").nonempty("Amount is required")
})


export {paymentSchema}