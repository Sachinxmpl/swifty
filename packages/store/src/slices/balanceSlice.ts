import { createSlice } from "@reduxjs/toolkit";

const initailState = {
                    value : 0
}

const balanceSlice = createSlice({
                                        name : 'balance' , 
                                        initialState  : initailState , 
                                        reducers : {
                                                            increment : (state , action) =>{
                                                                                state.value = state.value + action.payload ;
                                                            } , 
                                                            decrement : (state ,action)=>{
                                                                                state.value = state.value - action.payload ; 
                                                            }
                                        }
})


export const {increment , decrement}   = balanceSlice.actions ; 
export default balanceSlice.reducer ; 