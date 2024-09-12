"use client"
import store from "@repo/store/store";
import {Provider} from "react-redux" ;


export const Storewrapper = ({
            children,
    }: Readonly<{
            children: React.ReactNode;
    }>) =>{
            return (
                        <Provider store={store}>
                                                {children}
                        </Provider>
            )

    }