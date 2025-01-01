"use client"

import { useRouter , usePathname} from "next/navigation"


export const SideBarItem = ({
    href , 
    title ,
    icon 
} : {
    href : string ,
    title : string , 
    icon : React.ReactNode
}) =>{
    const router = useRouter() 
    const pathname = usePathname() 
    const selected = pathname === href 

    return(
        <div className= {`flex 
        ${selected ?"text-[#2e48cb]" : "text-slate-500" }
        cursor-pointer 
        p-2
        pl-8
        `}
            onClick={()=> router.push(href)}
        >   
            <div>
                {icon}
            </div>
            <div>
                {title}
            </div>
        </div>
    )
}