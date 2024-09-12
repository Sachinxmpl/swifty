"use client"
import {useSelector , useDispatch} from "react-redux"
import {increment , decrement} from "@repo/store/slices"
import {Idea} from "@repo/store/idea"

 const Sample = ()=>{
            console.log(Idea)

            const balance = useSelector((state : any )=>{
                        console.log(state) 
                        return state.balance.balance ; 
            })
            console.log(balance)
            return (
                                    <div>
                                                            {
                                                                        Idea
                                                            }
                                    </div>
            )
}

export default Sample