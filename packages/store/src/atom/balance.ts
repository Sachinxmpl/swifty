import {atom} from "recoil"

export const balance = atom <number>({
            key : "totalBalance" , 
            default : 100
})