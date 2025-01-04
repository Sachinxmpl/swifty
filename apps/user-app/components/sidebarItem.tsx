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
        ${selected ?"text-[#3c93f0]" : "text-slate-500" }
        cursor-pointer 
        p-4
        pl-10
        pr-0
        font-medium
        `}
            onClick={()=> router.push(href)}
        >   
            <div className="pr-2">
                {icon}
            </div>
            <div>
                {title}
            </div>
        </div>
    )
}