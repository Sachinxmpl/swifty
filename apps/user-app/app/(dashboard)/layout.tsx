import type { Metadata } from "next";




import React from "react";
import { AppbarUser } from "../../components/Appbaruser";


export const metadata: Metadata = {
            title: "Swifty",
            description: "Generated by create next app",
};

export default function RootLayout({
            children,
}: {
            children: React.ReactNode,

}) {


            return (
                       <div>
                           <AppbarUser />
                                    {children}
                       </div>
            );
}
